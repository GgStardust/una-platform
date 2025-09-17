# UNA Platform Design System

## Overview
This design system ensures consistent, professional styling across the entire UNA Platform. All colors, spacing, and components are defined using CSS custom properties for easy global updates.

## Color Palette

### Primary Colors
- **Primary**: `#1a365d` - Deep navy for headers, buttons, and primary elements
- **Primary Light**: `#2c5282` - Lighter navy for hover states
- **Primary Dark**: `#153e75` - Darker navy for active states

### Accent Colors
- **Accent**: `#d4af37` - Gold for CTAs and highlights
- **Accent Light**: `#e6c547` - Lighter gold for hover states
- **Accent Dark**: `#b8941f` - Darker gold for active states

### Neutral Colors
- **Background**: `#ffffff` - Pure white for main backgrounds
- **Surface**: `#f8fafc` - Light gray for card backgrounds
- **Surface Elevated**: `#ffffff` - White for elevated cards

### Text Colors
- **Primary**: `#1a202c` - Dark gray for main text
- **Secondary**: `#4a5568` - Medium gray for secondary text
- **Muted**: `#718096` - Light gray for muted text
- **Inverse**: `#ffffff` - White for text on dark backgrounds

### Status Colors
- **Success**: `#38a169` - Green for positive states
- **Warning**: `#ed8936` - Orange for attention states
- **Error**: `#e53e3e` - Red for error states
- **Info**: `#3182ce` - Blue for informational states

## Typography

### Font Families
- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Serif**: Crimson Text (serif) - for special content

### Font Sizes (8px grid)
- **xs**: 12px
- **sm**: 14px
- **base**: 16px
- **lg**: 18px
- **xl**: 20px
- **2xl**: 24px
- **3xl**: 30px
- **4xl**: 36px
- **5xl**: 48px
- **6xl**: 60px

## Spacing Scale (8px grid)
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **8**: 32px
- **10**: 40px
- **12**: 48px
- **16**: 64px
- **20**: 80px
- **24**: 96px

## Components

### Buttons
```css
.btn {
  /* Base button styles */
}

.btn-primary {
  /* Primary action buttons */
}

.btn-secondary {
  /* Secondary action buttons */
}

.btn-accent {
  /* Accent/highlight buttons */
}
```

### Cards
```css
.card {
  /* Base card container */
}

.card-header {
  /* Card header section */
}

.card-body {
  /* Card content section */
}

.card-footer {
  /* Card footer section */
}
```

### Layout
```css
.container {
  /* Responsive container */
}

.section {
  /* Standard section spacing */
}

.hero {
  /* Hero section styling */
}
```

## Usage Guidelines

### 1. Always Use CSS Custom Properties
Instead of hardcoded colors, use:
```css
color: var(--color-primary);
background-color: var(--color-accent);
```

### 2. Use Semantic Class Names
Instead of:
```html
<div class="bg-blue-500 text-white">
```

Use:
```html
<div class="bg-primary text-inverse">
```

### 3. Follow the 8px Grid
Use the spacing scale for consistent layouts:
```css
padding: var(--space-4); /* 16px */
margin: var(--space-8);  /* 32px */
```

### 4. Use Typography Classes
```html
<h1 class="text-4xl font-bold font-heading">
<p class="text-lg font-body text-secondary">
```

## Global Updates

To change colors across the entire site:

1. Update the CSS custom properties in `src/index.css`
2. Run the color update script: `node scripts/update-colors.js`
3. Test all pages to ensure consistency

## File Structure
```
src/
├── index.css          # Main design system
├── pages/             # Page components
├── components/        # Reusable components
└── lib/              # Utility functions

scripts/
└── update-colors.js   # Global color update script
```

## Best Practices

1. **Consistency**: Always use the design system classes
2. **Accessibility**: Ensure proper contrast ratios
3. **Responsive**: Use responsive design principles
4. **Performance**: Minimize custom CSS
5. **Maintainability**: Use semantic naming conventions
