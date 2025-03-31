# Project Documentation

## Part 1: Core Files and Structure

### HTML Files

#### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login - Yatazuki</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script>
    const BACKEND_URL = 'http://0.0.0.0:3000';
    const API_KEY = 'your-api-key';
  </script>
</head>
<body>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form id="login-form" onsubmit="event.preventDefault(); login();">
        <input type="text" id="username" class="form-control mb-3" placeholder="Username">
        <input type="password" id="password" class="form-control mb-3" placeholder="Password">
        <button type="submit" class="btn btn-light w-100 mb-3">Login</button>
        <p class="text-center">Don't have an account? <a href="register.html">Register</a></p>
        <div id="errorBox" class="error"></div>
      </form>
    </div>
  </div>
  <script src="scripts.js"></script>
</body>
</html>
```

## Part 2: Game Implementation Files

### Snake Game Implementation

#### snake.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake Game - Yatazuki</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="dashboard.html">Yatazuki</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="dashboard.html">Dashboard</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="gamesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="gamesDropdown">
              <li><a class="dropdown-item active" href="snake.html">Snake Game</a></li>
              <li><a class="dropdown-item" href="tictactoe.html">Tic-tac-toe</a></li>
              <li><a class="dropdown-item" href="memory.html">Memory</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="japan.html">Japan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="logout" onclick="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-5 d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 100px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h2>Snake Game</h2>
        <canvas id="gameCanvas" width="400" height="400" style="background: rgba(0, 0, 0, 0.7); border: 2px solid #fff; cursor: pointer; border-radius: 15px; box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);"></canvas>
        <div class="mt-3">
          <p>Score: <span id="score">0</span> | High Score: <span id="highScore">0</span></p>
          <button id="startButton" class="btn btn-success mb-2">Start Game</button>
          <p>Click Start or canvas to begin!</p>
          <div class="mobile-controls d-md-none">
            <div class="d-flex flex-column align-items-center">
              <button id="upBtn" class="control-btn mb-2">↑</button>
              <div class="d-flex justify-content-center align-items-center">
                <button id="leftBtn" class="control-btn me-4">←</button>
                <button id="downBtn" class="control-btn mx-2">↓</button>
                <button id="rightBtn" class="control-btn ms-4">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="snake.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Memory Game Implementation

#### memory.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory Game - Yatazuki</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="dashboard.html">Yatazuki</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="dashboard.html">Dashboard</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="gamesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="gamesDropdown">
              <li><a class="dropdown-item" href="snake.html">Snake Game</a></li>
              <li><a class="dropdown-item" href="tictactoe.html">Tic-tac-toe</a></li>
              <li><a class="dropdown-item active" href="memory.html">Memory</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="logout" onclick="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="text-center">
      <h1>Memory Game</h1>
      <div class="mt-3">
        <p>Moves: <span id="moves">0</span> | Best Score: <span id="bestScore">-</span></p>
        <div class="mb-3 text-center">
          <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="difficulty" id="easy" value="easy" checked>
            <label class="btn btn-outline-light" for="easy">Easy</label>

            <input type="radio" class="btn-check" name="difficulty" id="medium" value="medium">
            <label class="btn btn-outline-light" for="medium">Medium</label>

            <input type="radio" class="btn-check" name="difficulty" id="hard" value="hard">
            <label class="btn btn-outline-light" for="hard">Hard</label>
          </div>
        </div>
        <button id="startButton" class="btn btn-success mb-2">New Game</button>
      </div>
      <div id="game-board" class="mt-4"></div>
    </div>
  </div>

  <script src="memory.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### HTML Files

#### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login - Yatazuki</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script>
    const BACKEND_URL = 'http://0.0.0.0:3000';
    const API_KEY = 'your-api-key';
  </script>
</head>
<body>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form id="login-form" onsubmit="event.preventDefault(); login();">
        <input type="text" id="username" class="form-control mb-3" placeholder="Username">
        <input type="password" id="password" class="form-control mb-3" placeholder="Password">
        <button type="submit" class="btn btn-light w-100 mb-3">Login</button>
        <p class="text-center">Don't have an account? <a href="register.html">Register</a></p>
        <div id="errorBox" class="error"></div>
      </form>
    </div>
  </div>
  <script src="scripts.js"></script>
</body>
</html>
```

#### dashboard.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yatazuki Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="dashboard.html">Yatazuki</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="dashboard.html">Dashboard</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="gamesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="gamesDropdown">
              <li><a class="dropdown-item" href="snake.html">Snake Game</a></li>
              <li><a class="dropdown-item" href="tictactoe.html">Tic-tac-toe</a></li>
              <li><a class="dropdown-item" href="memory.html">Memory</a></li>
              <li><a class="dropdown-item" href="clickspeed.html">Click Speed Test</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="notes.html">Notes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="logout" onclick="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your central hub for managing all things Yatazuki.</p>
    </div>
  </section>

  <div id="sphere-container" style="width: 100%; height: 300px; margin-bottom: 30px;"></div>

  <section class="section" id="games">
    <div class="container">
      <h2>Games</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4 text-center">
            <div class="card-body">
              <h5 class="card-title">Snake Game</h5>
              <p class="card-text">Play our classic snake game with modern graphics.</p>
              <a href="snake.html" class="btn btn-light">Play Now</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4 text-center">
            <div class="card-body">
              <h5 class="card-title">Tic-tac-toe</h5>
              <p class="card-text">Challenge yourself in a classic game of Tic-tac-toe.</p>
              <a href="tictactoe.html" class="btn btn-light">Play Now</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4 text-center">
            <div class="card-body">
              <h5 class="card-title">Memory Game</h5>
              <p class="card-text">Test your memory by matching pairs of cards.</p>
              <a href="memory.html" class="btn btn-light">Play Now</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4 text-center">
            <div class="card-body">
              <h5 class="card-title">Click Speed Test</h5>
              <p class="card-text">Test your clicking speed and compete for high scores.</p>
              <a href="clickspeed.html" class="btn btn-light">Play Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="features">
    <div class="container">
      <h2>Features</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4 text-center">
            <div class="card-body">
              <h5 class="card-title">Notes</h5>
              <p class="card-text">Share and discover notes with the community.</p>
              <a href="notes.html" class="btn btn-light">View Notes</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      &copy; 2025 Yatazuki. All rights reserved.
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script type="module" src="sphere.js"></script>
</body>
</html>
```

## Part 3: JavaScript Game Implementations

### Snake Game (snake.js)
```javascript
// Core game variables and canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let dx = 10;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;

// Game mechanics
// moveSnake(): Handles snake movement and collision detection
// generateFood(): Randomly places food on the canvas
// drawSnake(): Renders snake segments with light purple color
// drawFood(): Renders food item in white
// gameLoop(): Main game loop handling drawing and updates
// handleKeyDown(): Processes keyboard input for movement

// Mobile controls implementation for touch devices
// Directional buttons for up, down, left, right
// Touch event handling for mobile gameplay
```

### Memory Game (memory.js)
```javascript
// Card sets for different difficulty levels
const easyCards = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊'];
const mediumCards = [...easyCards, '🐼', '🐨', '🦁', '🐯', '🐮', '🐷'];
const hardCards = [...mediumCards, '🐸', '🐙', '🦋', '🦉', ...];

// Game state management
let gameBoard = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let bestScores = {
  easy: localStorage.getItem('memoryBestScore_easy') || '-',
  medium: localStorage.getItem('memoryBestScore_medium') || '-',
  hard: localStorage.getItem('memoryBestScore_hard') || '-'
};

// Core functions
// createBoard(): Generates and renders the game grid
// flipCard(): Handles card flipping mechanics and matching logic
// startGame(): Initializes new game with selected difficulty
// shuffle(): Randomizes card positions
```

### Tic-tac-toe Game (tictactoe.js)
```javascript
// Game configuration
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;
let gameMode = 'human';

// AI difficulty levels
const difficulties = {
  easy: () => randomMove(),
  medium: () => smartMove(0.5),
  hard: () => minimax(gameBoard, 'O').index
};

// Core game logic
// makeMove(): Handles player moves and updates board
// checkWinner(): Validates win conditions
// minimax(): Implements AI strategy for hard mode
// resetGame(): Clears board and resets game state
```

### Click Speed Test (clickspeed.js)
```javascript
// Game settings
let clicks = 0;
let timeLeft = 10;
let timer = null;
let isGameActive = false;
let bestScore = localStorage.getItem('clickSpeedBestScore') || 0;

// Core functionality
// startTest(): Begins the click speed test
// updateClicks(): Tracks and validates clicks
// calculateCPS(): Computes clicks per second
// updateHighScore(): Manages best score tracking
```

### Utility Scripts

#### scripts.js
```javascript
// Authentication handling
// login(): Manages user login process
// register(): Handles new user registration
// logout(): Clears session and redirects

// Note management
// saveNote(): Persists user notes
// loadNote(): Retrieves saved notes
// deleteNote(): Removes notes

// Session management
// fetchSessionAndUser(): Validates user session
// checkAuth(): Middleware for protected routes
```

### Styling Implementation

#### styles.css
```css
// Global theming
// Dark mode color scheme
// Responsive typography
// Custom animations

// Game-specific styles
// Game board layouts
// Card designs
// Button animations
// Mobile-responsive controls

// Component styling
// Navigation bar
// Game cards
// Form elements
// Modal dialogs