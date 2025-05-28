-- Create a function to get the snake game leaderboard
CREATE OR REPLACE FUNCTION get_snake_leaderboard(limit_num integer)
RETURNS TABLE (
  id bigint,
  user_id uuid,
  score integer,
  created_at timestamptz
) 
LANGUAGE SQL
AS $$
  WITH ranked_scores AS (
    SELECT 
      gs.id,
      gs.user_id,
      gs.score,
      gs.created_at,
      ROW_NUMBER() OVER (PARTITION BY gs.user_id ORDER BY gs.score DESC) as rank
    FROM 
      game_scores gs
    WHERE 
      gs.game_type = 'snake'
  )
  SELECT 
    id,
    user_id,
    score,
    created_at
  FROM 
    ranked_scores
  WHERE 
    rank = 1
  ORDER BY 
    score DESC
  LIMIT limit_num;
$$; 