const API_URL = 'http://your-backend-url:3000';
const API_KEY = 'your-api-key'; // This should be stored securely

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

// Dashboard functionality
let userId = null;

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