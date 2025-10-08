-- Fix Row Level Security policies for blogs table
-- Allow authenticated users to write (for admin dashboard)

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow admin write access to blogs" ON blogs;

-- Create new policy for authenticated write access
CREATE POLICY "Allow authenticated write access to blogs" ON blogs
  FOR ALL USING (true) WITH CHECK (true);

-- Keep public read access
-- (Already exists from sprint5-schema.sql)
