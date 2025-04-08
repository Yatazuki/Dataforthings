-- Users table
CREATE TABLE IF NOT EXISTS login (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Global notes table
CREATE TABLE IF NOT EXISTS global_notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES login(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
alter table notes enable row level security;

-- Create policies
create policy "Users can read all notes" on notes
  for select using (true);

create policy "Users can insert their own notes" on notes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own notes" on notes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own notes" on notes
  for delete using (auth.uid() = user_id);

-- Create notes table if it doesn't exist
create table if not exists notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- Game scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES login(id) ON DELETE CASCADE,
  game_type VARCHAR(20) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_global_notes_user_id ON global_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_type ON game_scores(game_type);