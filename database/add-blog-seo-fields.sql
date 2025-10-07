-- Add SEO and additional fields to blogs table

ALTER TABLE blogs
ADD COLUMN IF NOT EXISTS excerpt text,
ADD COLUMN IF NOT EXISTS author text,
ADD COLUMN IF NOT EXISTS featured_image text,
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text[],
ADD COLUMN IF NOT EXISTS published boolean DEFAULT true;

-- Update existing blogs to be published by default
UPDATE blogs SET published = true WHERE published IS NULL;
