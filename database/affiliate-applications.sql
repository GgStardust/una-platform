-- Affiliate Applications Table
-- This table stores affiliate program applications and their status

CREATE TABLE IF NOT EXISTS affiliate_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('banking', 'legal', 'financial', 'tools', 'insurance', 'other')),
  application_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not-applied' CHECK (status IN ('not-applied', 'applied', 'approved', 'rejected', 'pending-review')),
  commission_rate TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  application_date TIMESTAMP,
  approval_date TIMESTAMP,
  rejection_reason TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  estimated_monthly_revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_status ON affiliate_applications(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_category ON affiliate_applications(category);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_priority ON affiliate_applications(priority);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_partner_name ON affiliate_applications(partner_name);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_created_at ON affiliate_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_application_date ON affiliate_applications(application_date DESC);

-- Comments for documentation
COMMENT ON TABLE affiliate_applications IS 'Stores affiliate program applications and their tracking information';
COMMENT ON COLUMN affiliate_applications.partner_name IS 'Name of the affiliate partner';
COMMENT ON COLUMN affiliate_applications.category IS 'Category of the affiliate program';
COMMENT ON COLUMN affiliate_applications.application_url IS 'URL to apply for the affiliate program';
COMMENT ON COLUMN affiliate_applications.status IS 'Current status of the application';
COMMENT ON COLUMN affiliate_applications.commission_rate IS 'Commission rate offered by the partner';
COMMENT ON COLUMN affiliate_applications.requirements IS 'Array of requirements for the affiliate program';
COMMENT ON COLUMN affiliate_applications.application_date IS 'Date when the application was submitted';
COMMENT ON COLUMN affiliate_applications.approval_date IS 'Date when the application was approved';
COMMENT ON COLUMN affiliate_applications.rejection_reason IS 'Reason for rejection if applicable';
COMMENT ON COLUMN affiliate_applications.contact_email IS 'Contact email for the affiliate program';
COMMENT ON COLUMN affiliate_applications.contact_phone IS 'Contact phone for the affiliate program';
COMMENT ON COLUMN affiliate_applications.notes IS 'Additional notes about the application';
COMMENT ON COLUMN affiliate_applications.priority IS 'Priority level for pursuing this application';
COMMENT ON COLUMN affiliate_applications.estimated_monthly_revenue IS 'Estimated monthly revenue from this partnership';
