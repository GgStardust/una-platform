-- Sprint 7: Explore Path Redesign - Database Schema
-- Create explore_responses table for new 3-step UNA flow

CREATE TABLE IF NOT EXISTS explore_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES payments(id),
  state TEXT NOT NULL,
  readiness JSONB NOT NULL DEFAULT '{}',
  collective_type TEXT NOT NULL,
  priorities JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_explore_responses_state ON explore_responses(state);
CREATE INDEX IF NOT EXISTS idx_explore_responses_created_at ON explore_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_explore_responses_payment_id ON explore_responses(payment_id);

-- Add comments for documentation
COMMENT ON TABLE explore_responses IS 'Stores responses from the new 3-step UNA exploration flow';
COMMENT ON COLUMN explore_responses.state IS 'State where the UNA will be based (2-letter code)';
COMMENT ON COLUMN explore_responses.readiness IS 'JSON object containing readiness assessment answers';
COMMENT ON COLUMN explore_responses.collective_type IS 'Type of collective (Advocacy, Creative, Healing, etc.)';
COMMENT ON COLUMN explore_responses.priorities IS 'JSON array of formation priorities selected by user';
