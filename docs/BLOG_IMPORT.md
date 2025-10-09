# Blog Import System

Streamlined system for importing blog posts into Supabase without manual copy-paste.

## Quick Start

```bash
# Import a single blog post
npm run import-blog src/content/blog/una-formation-guide.mdx

# Import without confirmation prompt (for bulk imports)
npm run import-blog src/content/blog/california-una.mdx --no-preview

# Import multiple posts
npm run import-blog src/content/blog/*.mdx
```

## How It Works

1. **Reads MDX/Markdown files** with frontmatter
2. **Parses metadata** (title, tags, excerpt, etc.)
3. **Shows preview** of what will be uploaded
4. **Uploads to Supabase** automatically
5. **Updates existing posts** by slug (no duplicates)

## File Format

Your blog files should have frontmatter:

```mdx
---
title: "Complete Guide to UNA Formation"
slug: "complete-una-formation-guide"
excerpt: "Everything you need to know about forming a UNA"
tags: ["una", "formation", "legal"]
author: "UNA Platform Team"
published: true
---

Your blog content here...
```

## Supported Fields

**Required:**
- `title` - Post title (auto-generated from filename if missing)
- `content` - Main blog content (everything after frontmatter)

**Optional:**
- `slug` - URL slug (auto-generated from filename if missing)
- `excerpt` - Short description (auto-generated from content if missing)
- `tags` - Array of tags for categorization
- `author` - Author name (defaults to "UNA Platform Team")
- `published` - Boolean (defaults to true)
- `featured_image` - Image URL
- `meta_title` - SEO title (defaults to title)
- `meta_description` - SEO description (defaults to excerpt)
- `meta_keywords` - Array of SEO keywords (defaults to tags)

## Writing New Blogs

### Option 1: Through Cursor Chat (Recommended)

1. Create a new `.mdx` or `.md` file in `src/content/blog/`
2. Write your blog with frontmatter
3. Run: `npm run import-blog src/content/blog/your-new-post.mdx`

### Option 2: Through Admin Dashboard

Go to `/admin` → Blog Management → New Blog

### Option 3: Direct Markdown

Just write markdown and let the tool parse it:

```bash
# Create file
echo "---
title: My New Post
tags: [una, guide]
---

Content here..." > src/content/blog/my-new-post.md

# Import
npm run import-blog src/content/blog/my-new-post.md
```

## Updating Existing Blogs

The tool automatically detects existing posts by slug and updates them:

```bash
# Edit your MDX file, then:
npm run import-blog src/content/blog/existing-post.mdx
```

It will show:
```
🔄 Updating existing blog (ID: 123)...
✅ Successfully uploaded to Supabase!
```

## Bulk Migration

To migrate all existing MDX blogs to Supabase:

```bash
# Import all blog files at once
npm run import-blog src/content/blog/*.mdx
```

## Tips

1. **No duplicate slugs** - Tool prevents duplicates by checking existing posts
2. **Preview before upload** - Always shows what will be uploaded
3. **Safe to re-run** - Updates existing posts instead of creating duplicates
4. **Works offline** - Just needs Supabase credentials in `.env`

## Troubleshooting

**Error: Supabase credentials not found**
- Make sure `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Error: File not found**
- Check the file path is correct
- Use relative or absolute paths

**Error: Upload failed**
- Check Supabase connection
- Verify blog table schema matches the fields
- Check permissions on Supabase

## Next Steps

After importing, view your blogs at:
- Public: `http://localhost:5173/blog`
- Admin: `http://localhost:5173/admin` (Blog Management section)
