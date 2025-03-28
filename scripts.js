const sb = supabase.createClient(
  'https://qqplzgqhkffwvefbnyte.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcGx6Z3Foa2Zmd3ZlZmJueXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Nzc2NzEsImV4cCI6MjA1ODU1MzY3MX0.hBssyXE-kkV5cOiwxD33Ejd2YSgexZUvOZBGIs1fVkQ'
);

async function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const errorBox = document.getElementById('errorBox');

  try {
    const { data, error } = await sb
      .from("logins")
      .select("id, username")
      .eq("username", user)
      .eq("password", pass)
      .maybeSingle();

    if (error) {
      errorBox.innerText = "❌ Server error: " + error.message;
      return;
    }

    if (!data) {
      errorBox.innerText = "❌ Invalid username or password";
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
  const { data, error } = await sb
    .from("notes")
    .select("note, created_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error loading note:", error.message);
    return;
  }

  if (data) {
    document.getElementById("noteBox").value = data.note || "";
    if (data.created_at) {
      document.getElementById("noteTimestamp").innerText = `Last updated: ${new Date(data.created_at).toLocaleString()}`;
    }
  }
}

function logout() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

async function saveNote() {
  const note = document.getElementById("noteBox").value;

  const { error } = await sb
    .from("notes")
    .upsert([{ user_id: userId, note }], { onConflict: ['user_id'] });

  const status = document.getElementById("saveStatus");
  if (error) {
    console.error("Error saving note:", error.message);
    status.innerText = "❌ Failed to save.";
  } else {
    status.innerText = "✅ Note saved!";
    await loadNote();
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

      const { data: existing } = await sb.from("logins").select("*").eq("username", username).limit(1);
      if (existing.length > 0) {
        alert("❌ Username already exists.");
        return;
      }

      const { error: authError } = await sb.auth.signUp({ email, password });
      if (authError) {
        alert("❌ Auth error: " + authError.message);
        return;
      }

      const { error: insertError } = await sb.from("logins").insert([{ username, password }]);
      if (insertError) {
        alert("❌ Database error: " + insertError.message);
        return;
      }

      alert("✅ Registered! Please check your email to confirm your account.");
      window.location.href = "index.html";
    });
  }
  if (window.location.pathname.includes('dashboard.html')) {
    fetchSessionAndUser();
  }
});