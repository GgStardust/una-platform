import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the markdown content
const markdownContent = fs.readFileSync('src/assets/una-formation-guide.md', 'utf8');

// Convert markdown to HTML with clean one-pager styling
function markdownToHtml(markdown) {
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gim, '<h1 style="color: #1C1F3B; font-family: Montserrat, sans-serif; font-size: 2.5rem; font-weight: bold; margin: 2rem 0 1rem 0; text-align: center;">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 style="color: #1C1F3B; font-family: Montserrat, sans-serif; font-size: 2rem; font-weight: bold; margin: 1.5rem 0 1rem 0; border-bottom: 3px solid #C49A6C; padding-bottom: 0.5rem;">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="color: #1C1F3B; font-family: Montserrat, sans-serif; font-size: 1.5rem; font-weight: bold; margin: 1.25rem 0 0.75rem 0;">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 style="color: #1C1F3B; font-family: Montserrat, sans-serif; font-size: 1.25rem; font-weight: bold; margin: 1rem 0 0.5rem 0;">$1</h4>')
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #C49A6C; font-weight: bold;">$1</strong>')
    
    // Italic text
    .replace(/\*(.*?)\*/g, '<em style="color: #1C1F3B; font-style: italic;">$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #C49A6C; text-decoration: underline;">$1</a>')
    
    // Tip callouts - clean styling (remove > Tip: and ---)
    .replace(/^> \*\*Tip:\*\* (.*$)/gim, '<div style="background: rgba(196, 154, 108, 0.1); border-left: 4px solid #C49A6C; padding: 0.75rem 1rem; margin: 0.75rem 0; border-radius: 0 4px 4px 0;"><strong style="color: #C49A6C; font-family: Montserrat, sans-serif; font-size: 0.9rem;">TIP:</strong> <span style="color: #1C1F3B; font-family: Lora, serif; font-size: 0.9rem;">$1</span></div>')
    
    // Action callouts - clean styling (remove > Action: and ---)
    .replace(/^> \*\*Action:\*\* (.*$)/gim, '<div style="background: rgba(47, 126, 126, 0.1); border-left: 4px solid #2F7E7E; padding: 0.75rem 1rem; margin: 0.75rem 0; border-radius: 0 4px 4px 0;"><strong style="color: #2F7E7E; font-family: Montserrat, sans-serif; font-size: 0.9rem;">ACTION:</strong> <span style="color: #1C1F3B; font-family: Lora, serif; font-size: 0.9rem;">$1</span></div>')
    
    // Remove horizontal rules
    .replace(/^---$/gim, '')
    
    // Remove any remaining markdown artifacts
    .replace(/^> /gim, '')
    
    // Lists - clean styling
    .replace(/^- \[ \] (.*$)/gim, '<li style="margin: 0.25rem 0; color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; list-style: none; padding-left: 1.25rem; position: relative; font-size: 0.9rem;"><span style="position: absolute; left: 0; color: #C49A6C;">☐</span> $1</li>')
    .replace(/^- \[x\] (.*$)/gim, '<li style="margin: 0.25rem 0; color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; list-style: none; padding-left: 1.25rem; position: relative; font-size: 0.9rem;"><span style="position: absolute; left: 0; color: #C49A6C;">☑</span> $1</li>')
    .replace(/^\* (.*$)/gim, '<li style="margin: 0.25rem 0; color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; font-size: 0.9rem;">$1</li>')
    .replace(/^1\. (.*$)/gim, '<li style="margin: 0.25rem 0; color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; font-size: 0.9rem;">$1</li>')
    
    // Wrap lists in ul/ol
    .replace(/(<li[^>]*>.*<\/li>)/gs, '<ul style="margin: 0.75rem 0; padding-left: 1.25rem;">$1</ul>')
    
    // Callout boxes - clean styling
    .replace(/:::callout\n(.*?)\n:::/gs, '<div style="background: rgba(196, 154, 108, 0.1); border: 2px solid #C49A6C; padding: 1rem; margin: 1rem 0; border-radius: 6px;"><p style="color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; margin: 0; font-size: 0.9rem;">$1</p></div>')
    
    // Paragraphs - compact styling
    .replace(/^(?!<[h|u|o|l|d])(.*$)/gim, '<p style="color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; margin: 0.75rem 0; font-size: 0.9rem;">$1</p>')
    
    // Remove empty paragraphs
    .replace(/<p style="[^"]*">\s*<\/p>/g, '')
    
    // Clean up list formatting
    .replace(/<ul[^>]*><li[^>]*>([^<]*)<\/li><\/ul>/g, '<ul style="margin: 0.75rem 0; padding-left: 1.25rem;"><li style="margin: 0.25rem 0; color: #1C1F3B; font-family: Lora, serif; line-height: 1.5; font-size: 0.9rem;">$1</li></ul>');

  return html;
}

// Generate the full HTML document
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNA Formation Guide - Complete Step-by-Step Instructions</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Lora, serif;
            line-height: 1.6;
            color: #1C1F3B;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
        }
        
        .header {
            text-align: center;
            background: linear-gradient(135deg, #1C1F3B 0%, #2F7E7E 100%);
            color: white;
            padding: 3rem 2rem;
            margin: -2rem -2rem 3rem -2rem;
            border-radius: 0 0 1rem 1rem;
        }
        
        .header h1 {
            color: white !important;
            font-size: 3rem !important;
            margin: 0 0 1rem 0 !important;
            text-align: center !important;
        }
        
        .header .subtitle {
            font-size: 1.25rem;
            color: #C49A6C;
            margin: 0;
            font-family: Lora, serif;
        }
        
        .step {
            background: #f8f9fa;
            border-left: 4px solid #C49A6C;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 0 0.5rem 0.5rem 0;
        }
        
        .step h3 {
            color: #C49A6C !important;
            margin-top: 0 !important;
        }
        
        .checklist {
            background: linear-gradient(135deg, #C49A6C 0%, #B8955A 100%);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            margin: 2rem 0;
        }
        
        .checklist h3 {
            color: white !important;
            margin-top: 0 !important;
        }
        
        .checklist ul {
            list-style: none;
            padding-left: 0;
        }
        
        .checklist li {
            color: white !important;
            margin: 0.75rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .checklist li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: white;
            font-weight: bold;
        }
        
        .callout {
            background: #e9ecef;
            border: 1px solid #dee2e6;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin: 2rem 0;
        }
        
        .footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #C49A6C;
            color: #6c757d;
        }
        
        @media print {
            body { margin: 0; padding: 1rem; }
            .header { margin: 0 0 2rem 0; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>UNA Formation Guide</h1>
        <p class="subtitle">Complete Step-by-Step Instructions for Forming Your Unincorporated Nonprofit Association</p>
    </div>
    
    ${markdownToHtml(markdownContent)}
    
    <div class="footer">
        <p><strong>Prepared by UNA Guide | unaguide.com</strong></p>
        <p>For professional assistance with UNA formation, visit our website or contact our team.</p>
    </div>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync('public/files/una-formation-guide.html', htmlContent);

console.log('✅ HTML guide generated successfully!');
console.log('📄 File saved to: public/files/una-formation-guide.html');
console.log('');
console.log('To convert to PDF, you can:');
console.log('1. Open the HTML file in a browser');
console.log('2. Use Print > Save as PDF');
console.log('3. Or use a tool like Puppeteer for automated conversion');
