
const API_URL = BACKEND_URL;
const API_KEY = API_KEY;

async function loadNotes() {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error loading notes:", data.error);
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
        <small>By: ${note.username || 'Unknown'}</small>
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
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        content,
        userId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add note');
    }

    await loadNotes();
  } catch (err) {
    console.error("Failed to add note:", err);
  }
}

async function deleteNote(noteId) {
  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }

    await loadNotes();
  } catch (err) {
    console.error("Failed to delete note:", err);
  }
}
