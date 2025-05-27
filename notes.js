async function loadNotes() {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*, login(username)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error loading notes:", error);
      return;
    }
    
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
        <h4>${note.login?.username || 'Unknown'}</h4>
        <p>${note.content}</p>
        ${note.link_url ? `<p><a href="${note.link_url}" target="_blank">Link</a></p>` : ''}
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
    // First get the user's username
    const { data: userData, error: userError } = await supabase
      .from('login')
      .select('username')
      .eq('user_id', userId)
      .single();

    if (userError) throw userError;

    const { error } = await supabase
      .from('notes')
      .insert([{
        content,
        title: userData.username,
        user_id: userId,
        created_at: new Date()
      }]);

    if (error) {
      throw error;
    }

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
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      throw error;
    }

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }

    await loadNotes();
  } catch (err) {
    console.error("Failed to delete note:", err);
  }
}
