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