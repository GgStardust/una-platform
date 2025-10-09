# Blog Writing & Publishing Workflow

**Seamless blog management without manual copy-paste into the admin dashboard.**

## Quick Workflow

### 1. Write Your Blog

Create/edit an `.mdx` or `.md` file in `src/content/blog/`:

```mdx
---
title: "Your Blog Title"
tags: ["una", "formation", "guide"]
excerpt: "Brief description of the post"
author: "Your Name"
published: true
---

Your blog content here in markdown format...

## Headings work
- Bullet points work
- **Bold text** works
```

### 2. Import to Supabase

```bash
# Single file (no prompts)
npm run import-blog-auto src/content/blog/your-post.mdx

# Or with confirmation prompt
npm run import-blog src/content/blog/your-post.mdx

# Bulk import all blogs
npm run import-blog-auto src/content/blog/*.mdx
```

### 3. View Your Blog

- **Public**: http://localhost:5173/blog/your-slug
- **Admin**: http://localhost:5173/admin (Blog Management section)

## Features

✅ **No manual copy-paste** - Direct file to database
✅ **Auto-detects updates** - Updates existing posts by slug
✅ **Parses frontmatter** - Extracts title, tags, excerpt automatically
✅ **Works with Cursor** - Perfect for your chat-based workflow
✅ **Bulk operations** - Import multiple files at once
✅ **Safe** - Preview before upload option available

## Frontmatter Fields

```yaml
---
title: "Post Title"                    # Required (auto-gen from filename if missing)
slug: "url-slug"                       # Optional (auto-gen from filename)
excerpt: "Short description"           # Optional (auto-gen from content)
tags: ["tag1", "tag2"]                # Optional
author: "Author Name"                  # Optional (defaults to "UNA Platform Team")
published: true                        # Optional (defaults to true)
featured_image: "https://..."         # Optional
meta_title: "SEO Title"               # Optional (defaults to title)
meta_description: "SEO description"    # Optional (defaults to excerpt)
meta_keywords: ["seo", "keywords"]    # Optional (defaults to tags)
---
```

## Commands

### `npm run import-blog-auto <file>`
**Automatic import** - No prompts, direct upload
- Use for: Quick updates, bulk imports
- Best for: Your normal workflow

### `npm run import-blog <file>`
**Interactive import** - Shows preview, asks confirmation
- Use for: First-time imports, reviewing before upload
- Best for: New posts or major edits

## Examples

### Update Existing Blog
```bash
# 1. Edit the MDX file
code src/content/blog/una-formation-guide.mdx

# 2. Import (it detects existing and updates)
npm run import-blog-auto src/content/blog/una-formation-guide.mdx
```

### Create New Blog
```bash
# 1. Create file with Cursor
# 2. Write content with frontmatter
# 3. Import
npm run import-blog-auto src/content/blog/new-post.mdx
```

### Migrate All Legacy Blogs
```bash
npm run import-blog-auto src/content/blog/*.mdx
```

## Integration with Cursor

**Perfect workflow:**

1. **Ask Cursor to write a blog:**
   ```
   "Write a blog post about California UNA formation requirements"
   ```

2. **Cursor creates the MDX file** with proper frontmatter

3. **You import it:**
   ```bash
   npm run import-blog-auto src/content/blog/california-una-requirements.mdx
   ```

4. **Done!** Blog is live in Supabase

## Troubleshooting

**"Supabase credentials not found"**
- Check `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**"Blog already exists"**
- That's fine! It updates the existing post automatically

**"File not found"**
- Check the file path is correct
- Use tab completion to avoid typos

## Next Steps

- Blog posts are immediately available at `/blog/your-slug`
- View all blogs in Admin Dashboard
- Edit through admin dashboard OR re-import the MDX file
- Both systems stay in sync!

## Why This Is Better

**Before:**
1. Write content somewhere
2. Copy title
3. Paste into admin
4. Copy content
5. Paste into admin
6. Manually add tags one by one
7. Fill in meta fields
8. Click save
9. Repeat for updates...

**Now:**
1. Write MDX file (once)
2. Run `npm run import-blog-auto file.mdx`
3. Done!

Updates take **5 seconds** instead of 5 minutes. 🚀
