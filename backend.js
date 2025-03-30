
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

// API Key middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

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
