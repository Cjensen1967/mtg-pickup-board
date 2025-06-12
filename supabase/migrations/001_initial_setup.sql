CREATE TABLE game_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT,
  location TEXT,
  format TEXT,
  preferred_time TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE game_posts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read all posts
CREATE POLICY "Allow anonymous read access" ON game_posts
  FOR SELECT USING (true);

-- Allow anonymous users to insert new posts
CREATE POLICY "Allow anonymous insert access" ON game_posts
  FOR INSERT WITH CHECK (true);

-- Create the trade_posts table
CREATE TABLE trade_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT,
  location TEXT,
  contact TEXT,
  have TEXT,
  want TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security for trade_posts
ALTER TABLE trade_posts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read all trade posts
CREATE POLICY "Allow anonymous read access for trades" ON trade_posts
  FOR SELECT USING (true);

-- Allow anonymous users to insert new trade posts
CREATE POLICY "Allow anonymous insert access for trades" ON trade_posts
  FOR INSERT WITH CHECK (true);

-- Function to delete old posts
CREATE OR REPLACE FUNCTION delete_old_posts()
RETURNS void AS $$
BEGIN
  DELETE FROM game_posts WHERE created_at < now() - interval '7 days';
  DELETE FROM trade_posts WHERE created_at < now() - interval '7 days';
END;
$$ LANGUAGE plpgsql;
