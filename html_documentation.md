
# HTML Documentation

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta Tags -->
  <meta charset="UTF-8">
  <title>Login - Yatazuki</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- External Dependencies -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">

  <!-- Configuration -->
  <script>
    const BACKEND_URL = 'http://0.0.0.0:3000';
    const API_KEY = 'your-api-key';
  </script>
</head>

<body>
  <!-- Login Container -->
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <!-- Login Form -->
      <form id="login-form" onsubmit="event.preventDefault(); login();">
        <input type="text" id="username" class="form-control mb-3" placeholder="Username">
        <input type="password" id="password" class="form-control mb-3" placeholder="Password">
        <button type="submit" class="btn btn-light w-100 mb-3">Login</button>
        <p class="text-center">Don't have an account? <a href="register.html">Register</a></p>
        <div id="errorBox" class="error"></div>
      </form>
    </div>
  </div>

  <!-- Scripts -->
  <script src="scripts.js"></script>
</body>
</html>
```
## dashboard.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Yatazuki</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="dashboard_styles.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Yatazuki</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Profile</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Settings</a></li>
                <li class="nav-item"><a class="nav-link" href="logout.html">Logout</a></li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mt-4">
        <h1>Welcome to the Dashboard!</h1>
        <p class="lead">Here is where you can manage your account and view statistics.</p>
        <!-- Additional content can be added here -->
    </div>

    <!-- Footer -->
    <footer class="footer mt-auto py-3 bg-light">
        <div class="container">
            <span class="text-muted">&copy; 2023 Yatazuki, Inc.</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
</body>
</html>
```