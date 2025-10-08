-- Add email field to quiz_submissions table
ALTER TABLE quiz_submissions
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON quiz_submissions(email);
