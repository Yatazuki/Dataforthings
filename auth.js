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
    console.log('Attempting login for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase login error:', error);
      // Check if it's an email verification error
      if (error.message.includes('Email not confirmed') || 
          error.message.includes('not verified') ||
          error.message.includes('not confirmed')) {
        
        console.log('User tried to login without verifying email');
        return { 
          success: false, 
          error: 'Email verification pending. Please check your email to verify your account.'
        };
      }
      throw error;
    }
    
    console.log('Login successful for:', email);
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
}

// Register function
async function register(username, email, password) {
  try {
    console.log('Registration attempt for:', email);
    
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (authError) {
      console.error('Auth error during registration:', authError);
      throw authError;
    }

    console.log('Auth registration successful:', authData);

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

      if (profileError) {
        console.error('Profile error during registration:', profileError);
        throw profileError;
      }
      
      console.log('Profile created successfully');
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
    console.log('Attempting to log out');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log('Logout successful');
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

// Resend verification email
async function resendVerificationEmail(email) {
  try {
    console.log('Attempting to resend verification email to:', email);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });
    
    if (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
    console.log('Verification email resent successfully');
    return { success: true, message: 'Verification email resent. Please check your inbox.' };
  } catch (error) {
    console.error('Resend verification error:', error.message);
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
  checkSession,
  resendVerificationEmail
};

