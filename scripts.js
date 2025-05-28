// Import Supabase client and authentication functions from auth.js
import { supabase, login as authLogin, getCurrentUser, logout as authLogout, register } from './auth.js';

async function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const errorBox = document.getElementById('errorBox');

  try {
    const result = await authLogin(user, pass);
    
    if (!result.success) {
      errorBox.innerText = "❌ " + (result.error || "Login failed");
      return;
    }

    localStorage.setItem("user_id", result.user.id);
    localStorage.setItem("username", user);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login error:", err);
    errorBox.innerText = "❌ An error occurred during login";
  }
}

// Export functions that need to be accessible
export { login };

// Dashboard functionality
let userId = null;

async function fetchSessionAndUser() {
  const { success, user } = await getCurrentUser();
  userId = user?.id || localStorage.getItem("user_id");
  
  // Instead of replacing content, just check if we can load notes
  if (userId) {
    await loadNote();
  } else {
    console.log("User is browsing as a guest");
    
    // Try to get noteBox element, but don't throw error if it doesn't exist
    const noteBox = document.getElementById("noteBox");
    if (noteBox) {
      noteBox.placeholder = "Log in to save notes";
      noteBox.disabled = true;
    }
    
    const saveBtn = document.querySelector("button[onclick='saveNote()']");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.title = "Login required to save notes";
    }
  }
}

async function loadNote() {
  if (!userId) return; // Skip if not logged in
  
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    if (data) {
      const noteBox = document.getElementById("noteBox");
      if (noteBox) {
        noteBox.value = data.content || "";
      }
      
      const noteTimestamp = document.getElementById("noteTimestamp");
      if (noteTimestamp && data.created_at) {
        noteTimestamp.innerText = `Last updated: ${new Date(data.created_at).toLocaleString()}`;
      }
    }
  } catch (error) {
    console.error("Error loading note:", error);
  }
}

function logout() {
  authLogout();
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

async function saveNote() {
  // Check if logged in
  if (!userId) {
    alert("Please log in to save notes");
    return;
  }

  const noteBox = document.getElementById("noteBox");
  if (!noteBox) return;
  
  const note = noteBox.value;
  const status = document.getElementById("saveStatus");

  try {
    const { error } = await supabase
      .from('notes')
      .upsert({ 
        user_id: userId,
        content: note,
        updated_at: new Date()
      });

    if (error) throw error;

    if (status) {
      status.innerText = "✅ Note saved!";
      setTimeout(() => status.innerText = '', 3000);
    }
    await loadNote();
  } catch (error) {
    console.error("Error saving note:", error);
    if (status) {
      status.innerText = "❌ Failed to save.";
      setTimeout(() => status.innerText = '', 3000);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const username = document.getElementById("username").value.trim().toLowerCase();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();
      const errorBox = document.getElementById('errorBox');

      if (!username || !email || !password) {
        if (errorBox) errorBox.innerText = "❌ Please fill in all fields.";
        return;
      }

      try {
        // Use the register function from auth.js
        const { success, error, user } = await register(username, email, password);

        if (!success) throw new Error(error);

        if (errorBox) errorBox.innerText = "✅ Registration successful! Please check your email.";
        setTimeout(() => window.location.href = "index.html", 2000);

      } catch (error) {
        console.error("Registration error:", error);
        if (errorBox) errorBox.innerText = `❌ ${error.message || 'Registration failed'}`;
      }
    });
  }
  
  if (window.location.pathname.includes('dashboard.html')) {
    fetchSessionAndUser();
  }

  // Load navbar on all pages except register, login, and index
  const currentPage = window.location.pathname.split('/').pop();
  const excludedPages = ['index.html', 'register.html', 'login.html', ''];
  
  // Only load navbar if not on excluded pages
  if (!excludedPages.includes(currentPage)) {
    loadNavbar();
  }
});

// Function to load navbar
function loadNavbar() {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      // Insert the navbar at the beginning of the body
      const bodyElement = document.body;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      bodyElement.insertBefore(tempDiv, bodyElement.firstChild);
      
      // Now that navbar is loaded, add logout functionality
      const logoutButton = document.getElementById('logout');
      if (logoutButton) {
        logoutButton.addEventListener('click', logout);
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
    });
}

// Close window when F12 is pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'F12') {
    event.preventDefault();
    window.close();
  }
});