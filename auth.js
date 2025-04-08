
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://qqplzgqhkffwvefbnyte.supabase.co',
  'sbp_1a4f543fb917a5d78183d4576a97e18b960c96a5'
);

window.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
});
