-- Create quiz_submissions table for Explore quiz data
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_goal TEXT NOT NULL,
  journey_stage TEXT NOT NULL,
  annual_budget TEXT NOT NULL,
  privacy_preference TEXT NOT NULL,
  state TEXT NOT NULL,
  score INTEGER NOT NULL,
  recommendation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert for quiz_submissions" ON quiz_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated read for quiz_submissions" ON quiz_submissions
  FOR SELECT
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_created_at ON quiz_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_state ON quiz_submissions(state);
