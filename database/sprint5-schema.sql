-- Sprint 5: State Handling Lite Schema
-- Blogs table for state-specific content
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL, -- Markdown content
  tags text[] DEFAULT '{}',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- State snippets table for quick state-specific information
CREATE TABLE IF NOT EXISTS state_snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text NOT NULL,
  title text NOT NULL,
  summary text,
  requirements jsonb,
  blog_id uuid REFERENCES blogs(id),
  created_at timestamp DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_state_snippets_state_code ON state_snippets(state_code);
CREATE INDEX IF NOT EXISTS idx_state_snippets_blog_id ON state_snippets(blog_id);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_snippets ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blogs and state snippets
CREATE POLICY "Allow public read access to blogs" ON blogs
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to state snippets" ON state_snippets
  FOR SELECT USING (true);

-- Allow admin write access (assuming admin role exists)
CREATE POLICY "Allow admin write access to blogs" ON blogs
  FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Allow admin write access to state snippets" ON state_snippets
  FOR ALL USING (auth.role() = 'admin');
