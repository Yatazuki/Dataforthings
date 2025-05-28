-- Drop the existing game_scores table
DROP TABLE IF EXISTS game_scores;

-- Create a new high scores table with one row per user and columns for each game
CREATE TABLE IF NOT EXISTS user_high_scores (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  snake_score INTEGER DEFAULT 0,
  tictactoe_wins INTEGER DEFAULT 0,
  memory_score INTEGER DEFAULT 0,
  clickspeed_score INTEGER DEFAULT 0,
  blackjack_score INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for user_id
CREATE INDEX IF NOT EXISTS idx_high_scores_user_id ON user_high_scores(user_id);

-- Enable Row Level Security
ALTER TABLE user_high_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for high scores
CREATE POLICY "Anyone can view high scores" 
  ON user_high_scores FOR SELECT USING (true);

CREATE POLICY "Users can insert their own scores" 
  ON user_high_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scores" 
  ON user_high_scores FOR UPDATE USING (auth.uid() = user_id); 