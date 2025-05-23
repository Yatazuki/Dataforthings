const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs').promises;
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Environment variables - MUST be set in the environment
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://yatazuki.com';
const PORT = process.env.PORT || 3000;

// Check for required environment variables
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('ERROR: Required environment variables SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
  process.exit(1);
}

// Initialize Supabase client with the service key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Database connection (if using external PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Only for development, remove in production
  }
});

// Initialize database
const initDatabase = async () => {
  try {
    const schema = await fs.readFile('schema.sql', 'utf8');
    await pool.query(schema);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: [FRONTEND_URL, 'https://yatazuki.com', 'http://yatazuki.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// API Key middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== SUPABASE_SERVICE_KEY) {
    return res.status(403).json({ error: 'Access forbidden' });
  }

  // Verify if request comes from allowed origins
  const origin = req.headers.origin;
  const allowedOrigins = [FRONTEND_URL, 'https://yatazuki.com', 'http://yatazuki.com'];
  
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  next();
};

// Apply API key validation to all routes
app.use(validateApiKey);

// Notes endpoints
app.post('/notes', async (req, res) => {
  try {
    const { content, userId } = req.body;
    
    if (!content || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use Supabase instead of direct database access
    const { data, error } = await supabase
      .from('notes')
      .insert([{ content, user_id: userId }])
      .select();

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error saving note:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/notes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Use Supabase instead of direct database access
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    res.json(data);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Game scores endpoints
app.post('/scores', async (req, res) => {
  try {
    const { userId, gameType, score } = req.body;
    
    if (!userId || !gameType || score === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('game_scores')
      .insert([{ 
        user_id: userId,
        game_type: gameType,
        score: score
      }])
      .select();

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/scores/:gameType', async (req, res) => {
  try {
    const { gameType } = req.params;
    
    if (!gameType) {
      return res.status(400).json({ error: 'Game type is required' });
    }

    const { data, error } = await supabase
      .from('game_scores')
      .select('*, login(username)')
      .eq('game_type', gameType)
      .order('score', { ascending: false })
      .limit(10);

    if (error) throw error;
    
    res.json(data);
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Only initialize database if not running with Supabase
if (process.env.USE_LOCAL_DB === 'true') {
  initDatabase();
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});