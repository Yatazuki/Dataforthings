import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Initialize the Supabase client

const supabaseUrl = 'https://rzzqonauufewpyaahvin.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6enFvbmF1dWZld3B5YWFodmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzkwNTksImV4cCI6MjA2MzU1NTA1OX0.fdndzqNMsftLEl3PzFV0vVWYKdRmFHZ-te3OlspR4UI'
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if user is logged in
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Login function
async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
}

// Register function
async function register(username, email, password) {
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (authError) throw authError;

    // Then insert the user into the login table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('login')
        .insert([
          { 
            user_id: authData.user.id,
            username: username,
            email: email,
            created_at: new Date()
          }
        ]);

      if (profileError) throw profileError;
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Registration error:', error.message);
    return { success: false, error: error.message };
  }
}

// Logout function
async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error.message);
    return { success: false, error: error.message };
  }
}

// Get current user
async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user };
  } catch (error) {
    console.error('Get user error:', error.message);
    return { success: false, error: error.message };
  }
}

// Export all functions
export { 
  supabase, 
  login, 
  register, 
  logout, 
  getCurrentUser, 
  checkSession 
};

window.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
});

