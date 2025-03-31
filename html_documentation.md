
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

### Structure Breakdown

1. **Document Type Declaration**
   - HTML5 specification
   - Language set to English

2. **Head Section**
   - Character encoding: UTF-8
   - Responsive viewport settings
   - Title: "Login - Yatazuki"

3. **External Dependencies**
   - Supabase.js for backend integration
   - Bootstrap 5.3.0 for styling
   - Montserrat font (700 weight)
   - Custom styles.css

4. **Configuration Script**
   - Backend URL configuration
   - API key setup

5. **Body Structure**
   - Login container
     - Login box wrapper
     - Heading
     - Form elements
       - Username input
       - Password input
       - Submit button
       - Registration link
       - Error message box

6. **Scripts**
   - Core functionality in scripts.js

### Key Components

1. **Form Handling**
   - preventDefault() to stop default form submission
   - Custom login() function called on submit

2. **Styling Classes**
   - Bootstrap utility classes (mb-3, w-100)
   - Custom classes (login-container, login-box)
   - Form control styling

3. **Error Handling**
   - Dedicated error box for displaying messages
   - Form validation support

4. **Navigation**
   - Link to registration page
   - Clean URL structure
