const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs').promises;
const app = express();

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qqplzgqhkffwvefbnyte.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcGx6Z3Foa2Zmd3ZlZmJueXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Nzc2NzEsImV4cCI6MjA1ODU1MzY3MX0.hBssyXE-kkV5cOiwxD33Ejd2YSgexZUvOZBGIs1fVkQ'
);

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

initDatabase();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://yatazuki.com', 'https://yatazuki.com', process.env.FRONTEND_URL || '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// API Key middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const supabaseKey = process.env.SUPABASE_KEY;
  
  if (!apiKey || apiKey !== supabaseKey || !supabaseKey) {
    return res.status(403).json({ error: 'Access forbidden' });
  }

  // Verify if request comes from allowed origins
  const origin = req.headers.origin;
  const allowedOrigins = [process.env.FRONTEND_URL, 'https://yatazuki.com', 'http://yatazuki.com'];
  
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  next();
};

// Apply API key validation to all routes
app.use(validateApiKey);

// Notes endpoints
app.post('/notes', validateApiKey, async (req, res) => {
  try {
    const { content, userId } = req.body;
    const result = await pool.query(
      'INSERT INTO notes (content, user_id) VALUES ($1, $2) RETURNING id',
      [content, userId]
    );
    res.json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/notes', validateApiKey, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Backend server running on port 3000');
});