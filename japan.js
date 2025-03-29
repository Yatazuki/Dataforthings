async function loadNotes() {
  const { data, error } = await sb
    .from("global_notes")
    .select(`
      *,
      logins (
        username
      )
    `)
    .order('created_at', { ascending: false });
}