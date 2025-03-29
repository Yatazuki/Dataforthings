
const sb = supabase.createClient(
  'https://qqplzgqhkffwvefbnyte.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcGx6Z3Foa2Zmd3ZlZmJueXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Nzc2NzEsImV4cCI6MjA1ODU1MzY3MX0.hBssyXE-kkV5cOiwxD33Ejd2YSgexZUvOZBGIs1fVkQ'
);

async function loadNotes() {
  try {
    const { data, error } = await sb
      .from("global_notes")
      .select(`
        *,
        logins (
          username
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error loading notes:", error.message);
      return;
    }

    const notesContainer = document.getElementById('notes-container');
    if (!notesContainer) return;

    const currentUserId = localStorage.getItem("user_id");
    notesContainer.innerHTML = data.map(note => `
      <div class="note position-relative">
        ${note.user_id === currentUserId ? 
          `<button onclick="deleteNote('${note.id}')" class="delete-btn">×</button>` : 
          ''
        }
        <p>${note.note_text}</p>
        ${note.link_url ? `<p><a href="${note.link_url}" target="_blank">Link</a></p>` : ''}
        <small>By: ${note.logins?.username || 'Unknown'}</small>
        <small>Posted: ${new Date(note.created_at).toLocaleString()}</small>
      </div>
    `).join('');
  } catch (err) {
    console.error("Failed to load notes:", err);
  }
}

async function addNote(content) {
  const userId = localStorage.getItem("user_id");
  if (!userId || !content) return;

  try {
    const { error } = await sb
      .from("global_notes")
      .insert([{ user_id: userId, note_text: content }]);

    if (error) {
      console.error("Error adding note:", error.message);
      return;
    }

    // Clear the input after successful addition
    document.getElementById('note-input').value = '';
    
    // Reload the notes
    await loadNotes();
  } catch (err) {
    console.error("Failed to add note:", err);
  }
}

async function deleteNote(noteId) {
  const userId = localStorage.getItem("user_id");
  if (!userId || !noteId) return;

  try {
    const { error } = await sb
      .from("global_notes")
      .delete()
      .eq('id', noteId)
      .eq('user_id', userId);

    if (error) {
      console.error("Error deleting note:", error.message);
      return;
    }

    await loadNotes();
  } catch (err) {
    console.error("Failed to delete note:", err);
  }
}

document.addEventListener('DOMContentLoaded', loadNotes);
