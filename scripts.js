// Import Supabase client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qqplzgqhkffwvefbnyte.supabase.co',
  'sbp_1a4f543fb917a5d78183d4576a97e18b960c96a5'
);

async function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const errorBox = document.getElementById('errorBox');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user,
      password: pass
    });

    if (error) {
      errorBox.innerText = "❌ " + error.message;
      return;
    }

    localStorage.setItem("user_id", data.user.id);
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
  const { data: { user } } = await supabase.auth.getUser();
  userId = user?.id;
  if (!userId) {
    document.body.innerHTML = '<div class="text-center mt-5"><h2>❌ You are not logged in.</h2></div>';
    return;
  }
  await loadNote();
}

async function loadNote() {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    if (data) {
      document.getElementById("noteBox").value = data.content || "";
      if (data.created_at) {
        document.getElementById("noteTimestamp").innerText = `Last updated: ${new Date(data.created_at).toLocaleString()}`;
      }
    }
  } catch (error) {
    console.error("Error loading note:", error);
  }
}

function logout() {
  supabase.auth.signOut();
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

async function saveNote() {
  const note = document.getElementById("noteBox").value;
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
      const errorBox = document.getElementById('errorBox');

      if (!username || !email || !password) {
        if (errorBox) errorBox.innerText = "❌ Please fill in all fields.";
        return;
      }

      try {
        // First create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        });

        if (authError) throw authError;

        // Then insert into login table
        const { error: loginError } = await supabase
          .from('login')
          .insert([
            { 
              user_id: authData.user.id,
              username: username,
              email: email,
              created_at: new Date()
            }
          ]);

        if (loginError) throw loginError;

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
});