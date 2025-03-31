
# CSS Documentation

## Global Styles (styles.css)
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

/* Mobile Responsive Design */
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

/* Navigation & Dashboard */
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

/* Hero Section */
.hero {
  padding: 80px 0;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
}

/* Cards & Sections */
.card {
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 15px;
  color: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

/* Notes System */
.note {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
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
```
