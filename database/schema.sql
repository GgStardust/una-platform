-- UNA Platform Database Schema
-- This schema is designed for future database integration

-- Payments table for tracking Stripe payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL UNIQUE,
  customer_email TEXT,
  product TEXT NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_payments_customer_email ON payments(customer_email);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);

-- Intake data table for storing user intake information
CREATE TABLE intake_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT,
  entity_name TEXT,
  entity_purpose TEXT,
  entity_state TEXT,
  entity_address TEXT,
  entity_phone TEXT,
  entity_email TEXT,
  entity_website TEXT,
  entity_mission TEXT,
  entity_vision TEXT,
  entity_values TEXT,
  entity_goals TEXT,
  entity_activities TEXT,
  entity_beneficiaries TEXT,
  entity_governance TEXT,
  entity_financial TEXT,
  entity_legal TEXT,
  entity_other TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for intake data
CREATE INDEX idx_intake_user_email ON intake_data(user_email);
CREATE INDEX idx_intake_entity_state ON intake_data(entity_state);
CREATE INDEX idx_intake_created_at ON intake_data(created_at);

-- Blog posts table for dynamic blog management
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Gigi Stardust',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for blog posts
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published_at ON blog_posts(published_at);

-- Admin users table for admin dashboard access
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Indexes for admin users
CREATE INDEX idx_admin_email ON admin_users(email);

-- Analytics events table for tracking user behavior
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_email TEXT,
  session_id TEXT,
  page_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for analytics
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_user_email ON analytics_events(user_email);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

-- Comments for documentation
COMMENT ON TABLE payments IS 'Stores Stripe payment information and transaction details';
COMMENT ON TABLE intake_data IS 'Stores user intake form data for UNA formation';
COMMENT ON TABLE blog_posts IS 'Stores blog post content and metadata';
COMMENT ON TABLE admin_users IS 'Stores admin user credentials and access information';
COMMENT ON TABLE analytics_events IS 'Stores user analytics and tracking events';


