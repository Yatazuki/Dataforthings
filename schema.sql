-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom login profile table
-- This connects to Supabase auth.users
CREATE TABLE IF NOT EXISTS login (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_login_user_id ON login(user_id);
CREATE INDEX IF NOT EXISTS idx_login_username ON login(username);

-- Notes table with RLS
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for notes
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);

-- Game scores table (legacy)
CREATE TABLE IF NOT EXISTS game_scores (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  game_type VARCHAR(20) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for game scores
CREATE INDEX IF NOT EXISTS idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_type ON game_scores(game_type);
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score);

-- User scores table (new format - one row per user)
CREATE TABLE IF NOT EXISTS user_scores (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  username TEXT NOT NULL,
  snake_score INTEGER DEFAULT 0,
  tictactoe_wins INTEGER DEFAULT 0,
  memory_score INTEGER DEFAULT 0,
  clickspeed_score INTEGER DEFAULT 0,
  blackjack_score INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for user scores
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_snake ON user_scores(snake_score);
CREATE INDEX IF NOT EXISTS idx_user_scores_tictactoe ON user_scores(tictactoe_wins);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE login ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notes
CREATE POLICY "Users can view their own notes" 
  ON notes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" 
  ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
  ON notes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
  ON notes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for game_scores
CREATE POLICY "Anyone can view game scores" 
  ON game_scores FOR SELECT USING (true);

CREATE POLICY "Users can insert their own scores" 
  ON game_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scores" 
  ON game_scores FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scores" 
  ON game_scores FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_scores
CREATE POLICY "Anyone can view user scores" 
  ON user_scores FOR SELECT USING (true);

CREATE POLICY "Users can insert their own user scores" 
  ON user_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own user scores" 
  ON user_scores FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own user scores" 
  ON user_scores FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for login
CREATE POLICY "Users can view their own profile" 
  ON login FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON login FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "New users can insert their profile" 
  ON login FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow service role to access profiles
CREATE POLICY "Service role can access all profiles" 
  ON login FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');