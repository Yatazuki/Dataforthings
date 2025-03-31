# Yatazuki Web Application - Complete Code Documentation

## Backend Files

### backend.js
```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs').promises;
const app = express();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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

initDatabase();

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
```

### schema.sql
```sql
-- Users table
CREATE TABLE IF NOT EXISTS logins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Global notes table
CREATE TABLE IF NOT EXISTS global_notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES logins(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Personal notes table
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES logins(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Game scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES logins(id) ON DELETE CASCADE,
  game_type VARCHAR(20) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_global_notes_user_id ON global_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_type ON game_scores(game_type);
```

## HTML Files

### index.html
```html
${rag://rag_source_5}
```

### dashboard.html
```html
${rag://rag_source_1}
```

### snake.html
```html
${rag://rag_source_2}
```

### tictactoe.html
```html
${rag://rag_source_0}
```

### memory.html
```html
${rag://rag_source_0}
```

### clickspeed.html
```html
${rag://rag_source_8}
```

### notes.html
```html
${rag://rag_source_3}
```

### profile.html
```html
${rag://rag_source_6}
```

### register.html
```html
${rag://rag_source_7}
```

## CSS Files

### styles.css
```css
/* Global Styles */
body {
  font-family: 'Montserrat', sans-serif;
  background: url('background1.jpg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  color: white;
}

/* Login/Register Styles */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh;
}

.login-box {
  background-color: rgba(0, 0, 0, 0.85);
  padding: 4vh 3vw;
  border-radius: 2vh;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 2vh rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .login-box {
    width: 95%;
    padding: 3vh 4vw;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .section {
    padding: 30px 0;
  }

  .card {
    margin-bottom: 20px;
  }

  body {
    padding-top: 56px;
  }

  .btn-group {
    flex-direction: column;
  }

  .btn-group .btn {
    margin: 5px 0;
    border-radius: 5px !important;
  }

  .mobile-controls {
    margin-top: 20px;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(128, 0, 255, 0.2);
    backdrop-filter: blur(8px);
  }

  .control-btn {
    width: 60px;
    height: 60px;
    background-color: rgba(128, 0, 255, 0.3);
    border: 2px solid rgba(128, 0, 255, 0.5);
    color: white;
    font-size: 28px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 5px;
    transition: all 0.2s ease;
    box-shadow: 0 0 15px rgba(128, 0, 255, 0.3);
  }

  .control-btn:active {
    background-color: rgba(128, 0, 255, 0.6);
    transform: scale(0.95);
    box-shadow: 0 0 20px rgba(128, 0, 255, 0.5);
  }

  .btn-success {
    background-color: #8000ff !important;
    border-color: #8000ff !important;
    box-shadow: 0 0 15px rgba(128, 0, 255, 0.5);
  }

  .btn-success:hover {
    background-color: #9933ff !important;
    border-color: #9933ff !important;
    box-shadow: 0 0 20px rgba(128, 0, 255, 0.7);
  }
}

.login-box h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form Controls */
.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
}

.form-control::placeholder {
  color: #ccc;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: none;
  color: white;
}

/* Dashboard Styles */
.navbar {
  background-color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

body {
  padding-top: 70px;
}

.hero {
  padding-top: 2rem;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-link {
  color: rgba(255,255,255,0.9) !important;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #8000ff !important;
}

.nav-link.active {
  color: #8000ff !important;
}

.hero {
  padding: 80px 0;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: white;
}

.hero p {
  font-size: 1.2rem;
  color: white;
}

.section {
  padding: 60px 0;
  background-color: rgba(128, 0, 255, 0.2);
}

.section h2 {
  text-align: center;
  margin-bottom: 40px;
}

.card {
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 15px;
  color: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.footer {
  padding: 30px 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.85);
  font-size: 0.9rem;
}

/* Game Elements */
.memory-card:hover {
  transform: scale(1.05);
}

.click-area {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 15px;
  font-size: 24px;
  transition: background-color 0.2s;
  user-select: none;
}

.click-area:hover {
  background: rgba(255, 255, 255, 0.2);
}

.click-area:active {
  background: rgba(255, 255, 255, 0.3);
}

/* Note System */
.note {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.note p {
  margin-bottom: 10px;
  color: #fff;
}

.note small {
  color: #aaa;
  display: block;
  font-size: 0.85em;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #ff4444;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.note:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: #ff0000;
}
```

## JavaScript Files

### scripts.js
```javascript
const API_URL = 'https://5cb110af-956e-4abc-9ac8-0a402e499a2e-00-gksjpc3ojn7k.spock.replit.dev';
const API_KEY = 'yatazuki.dev';

async function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const errorBox = document.getElementById('errorBox');

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ username: user, password: pass })
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.innerText = "❌ " + data.error;
      return;
    }

    localStorage.setItem("user_id", data.id);
    localStorage.setItem("username", user);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login error:", err);
    errorBox.innerText = "❌ An error occurred during login";
  }
}

async function fetchSessionAndUser() {
  userId = localStorage.getItem("user_id");
  if (!userId) {
    document.body.innerHTML = '<div class="text-center mt-5"><h2>❌ You are not logged in.</h2></div>';
    return;
  }
  await loadNote();
}

async function loadNote() {
  try {
    const response = await fetch(`${API_URL}/notes/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("Error loading note:", data.error);
      return;
    }

    if (data) {
      document.getElementById("noteBox").value = data.note || "";
      if (data.created_at) {
        document.getElementById("noteTimestamp").innerText = `Last updated: ${new Date(data.created_at).toLocaleString()}`;
      }
    }
  } catch (error) {
    console.error("Error loading note:", error);
  }
}

function logout() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

async function saveNote() {
  const note = document.getElementById("noteBox").value;
  const status = document.getElementById("saveStatus");

  try {
    const response = await fetch(`${API_URL}/notes/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ note })
    });

    if (!response.ok) {
      console.error("Error saving note:", await response.text());
      status.innerText = "❌ Failed to save.";
      return;
    }

    status.innerText = "✅ Note saved!";
    await loadNote();
  } catch (error) {
    console.error("Error saving note:", error);
    status.innerText = "❌ Failed to save.";
  }
  setTimeout(() => status.innerText = '', 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim().toLowerCase();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();

      if (!username || !email || !password) {
        alert("❌ Please fill in all fields.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          alert(`❌ Registration failed: ${data.error}`);
          return;
        }

        alert("✅ Registered! Please check your email to confirm your account.");
        window.location.href = "index.html";

      } catch (error) {
        console.error("Registration error:", error);
        alert("❌ An error occurred during registration.");
      }
    });
  }
  if (window.location.pathname.includes('dashboard.html')) {
    fetchSessionAndUser();
  }
});
```

### snake.js
```javascript
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let scoreElement = document.getElementById('score');
let highScoreElement = document.getElementById('highScore');

const GRID_SIZE = 20;
const SNAKE_COLOR = '#8000ff';
const FOOD_COLOR = '#ff0000';

let snake = [
  {x: 10, y: 10}
];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop;
let isPaused = false;

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
  });
}

function drawFood() {
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  
  if(head.x === food.x && head.y === food.y) {
    score += 10;
    scoreElement.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)),
    y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))
  };
  
  // Check if food spawned on snake
  if(snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    generateFood();
  }
}

function checkCollision() {
  const head = snake[0];
  
  // Wall collision
  if(head.x < 0 || head.x >= canvas.width / GRID_SIZE || 
     head.y < 0 || head.y >= canvas.height / GRID_SIZE) {
    return true;
  }
  
  // Self collision
  for(let i = 1; i < snake.length; i++) {
    if(head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  
  return false;
}

function gameOver() {
  clearInterval(gameLoop);
  if(score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
    highScoreElement.textContent = highScore;
  }
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '30px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over!', canvas.width/2, canvas.height/2);
  ctx.font = '20px Montserrat';
  ctx.fillText('Press Space to Restart', canvas.width/2, canvas.height/2 + 40);
}

function update() {
  if(isPaused) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  if(checkCollision()) {
    gameOver();
    return;
  }
  drawFood();
  drawSnake();
}

function startGame() {
  snake = [{x: 10, y: 10}];
  food = {x: 15, y: 15};
  dx = 0;
  dy = 0;
  score = 0;
  scoreElement.textContent = score;
  highScoreElement.textContent = highScore;
  clearInterval(gameLoop);
  gameLoop = setInterval(update, 100);
}

document.addEventListener('keydown', (e) => {
  if(e.code === 'Space') {
    if(!gameLoop) startGame();
    return;
  }
  
  if(e.code === 'KeyP') {
    isPaused = !isPaused;
    return;
  }
  
  if(isPaused) return;
  
  switch(e.code) {
    case 'ArrowUp':
      if(dy === 1) break;
      dx = 0;
      dy = -1;
      break;
    case 'ArrowDown':
      if(dy === -1) break;
      dx = 0;
      dy = 1;
      break;
    case 'ArrowLeft':
      if(dx === 1) break;
      dx = -1;
      dy = 0;
      break;
    case 'ArrowRight':
      if(dx === -1) break;
      dx = 1;
      dy = 0;
      break;
  }
});

// Mobile controls
const controls = document.querySelectorAll('.control-btn');
controls.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const direction = e.target.dataset.direction;
    
    switch(direction) {
      case 'up':
        if(dy === 1) return;
        dx = 0;
        dy = -1;
        break;
      case 'down':
        if(dy === -1) return;
        dx = 0;
        dy = 1;
        break;
      case 'left':
        if(dx === 1) return;
        dx = -1;
        dy = 0;
        break;
      case 'right':
        if(dx === -1) return;
        dx = 1;
        dy = 0;
        break;
    }
  });
});

startGame();
```

### tictactoe.js
```javascript
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = 'human';

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for(let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(index) {
    if(!gameActive || board[index] !== '') return;
    
    makeMove(index);
    
    if(gameMode !== 'human' && gameActive) {
        setTimeout(() => botMove(), 500);
    }
}

function makeMove(index) {
    board[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;
    
    if(checkWin()) {
        gameActive = false;
        alert(`Player ${currentPlayer} wins!`);
        return;
    }
    
    if(checkDraw()) {
        gameActive = false;
        alert("It's a draw!");
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('current-player').textContent = currentPlayer;
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function botMove() {
    let index;
    switch(gameMode) {
        case 'easy':
            index = makeRandomMove();
            break;
        case 'medium':
            index = Math.random() < 0.5 ? makeSmartMove() : makeRandomMove();
            break;
        case 'hard':
            index = makeSmartMove();
            break;
    }
    if(index !== undefined) makeMove(index);
}

function makeRandomMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if(cell === '') acc.push(index);
        return acc;
    }, []);
    
    if(emptyCells.length === 0) return;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function makeSmartMove() {
    // Try to win
    const winMove = findWinningMove('O');
    if(winMove !== undefined) return winMove;
    
    // Block opponent
    const blockMove = findWinningMove('X');
    if(blockMove !== undefined) return blockMove;
    
    // Take center
    if(board[4] === '') return 4;
    
    // Take corner
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => board[i] === '');
    if(emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
    
    // Take any available spot
    return makeRandomMove();
}

function findWinningMove(player) {
    for(let i = 0; i < board.length; i++) {
        if(board[i] === '') {
            board[i] = player;
            if(checkWin()) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
}

document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        gameMode = e.target.value;
        resetGame();
    });
});

document.getElementById('resetButton').addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('current-player').textContent = currentPlayer;
    createBoard();
}

createBoard();
```

### memory.js
```javascript
${rag://rag_source_13}
```

### clickspeed.js
```javascript
${rag://rag_source_14}
```

### notes.js
```javascript
${rag://rag_source_10}
```

### sphere.js
```javascript
${rag://rag_source_15}
```

## File Structure Overview
```
├── HTML Files
│   ├── index.html
│   ├── dashboard.html
│   ├── snake.html
│   ├── tictactoe.html
│   ├── memory.html
│   ├── clickspeed.html
│   ├── notes.html
│   ├── profile.html
│   └── register.html
├── CSS Files
│   └── styles.css
└── JavaScript Files
    ├── scripts.js
    ├── snake.js
    ├── tictactoe.js
    ├── memory.js
    ├── clickspeed.js
    ├── notes.js
    ├── sphere.js
    └── backend.js
```

Each file has been documented with its complete code, making it easy to reference and understand the entire codebase. The files work together to create a cohesive gaming platform with authentication, game features, and note-taking capabilities.