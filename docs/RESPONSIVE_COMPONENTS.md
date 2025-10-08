# Responsive Component System Documentation

## Overview

The UNA Platform uses a centralized responsive component system to ensure consistent mobile/desktop experiences across all pages. This system eliminates the need for inline responsive utilities and provides a maintainable, scalable architecture.

## Architecture

### 3-Tier System

1. **Design Tokens** (`src/styles/tokens.ts`) - Single source of truth for spacing, typography, and layout
2. **Responsive Components** (`src/components/ui/Responsive*.tsx`) - Reusable building blocks
3. **Page Composition** - Pages compose responsive components without inline utilities

---

## Design Tokens

Location: `src/styles/tokens.ts`

### Available Tokens

```typescript
import { spacing, typography, textVariants, containerSizes, cardVariants } from '@/styles/tokens';
```

**Key Token Categories:**
- `spacing` - Mobile/desktop spacing values
- `typography` - Mobile/desktop font sizes
- `textVariants` - Predefined text sizing (h1-h4, body, caption)
- `containerSizes` - Container padding patterns (tight, default, spacious)
- `cardVariants` - Card padding patterns (compact, default, spacious)

---

## Components

### 1. ResponsiveContainer

**Purpose:** Standardized page/section containers with responsive padding

**Usage:**
```tsx
import { ResponsiveContainer } from '@/components/ui';

<ResponsiveContainer size="default" maxWidth="2xl">
  <h1>Page Content</h1>
</ResponsiveContainer>
```

**Props:**
- `size`: `'tight' | 'default' | 'spacious'` (default: `'default'`)
- `maxWidth`: `'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` (default: `'2xl'`)
- `as`: `'div' | 'section' | 'article' | 'main'` (default: `'div'`)
- `className`: Additional Tailwind classes

**Mobile Behavior:**
- `tight`: px-3 py-2 (mobile) → px-4 py-3 (desktop)
- `default`: px-4 py-3 (mobile) → px-6 py-4 (desktop)
- `spacious`: px-6 py-4 (mobile) → px-8 py-6 (desktop)

---

### 2. ResponsiveText

**Purpose:** Standardized text with automatic responsive sizing

**Usage:**
```tsx
import { ResponsiveText } from '@/components/ui';

<ResponsiveText variant="h1" weight="bold" font="montserrat">
  Welcome to UNA Platform
</ResponsiveText>

<ResponsiveText variant="body" font="lora">
  Body text content here
</ResponsiveText>
```

**Props:**
- `variant`: `'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyLarge' | 'caption' | 'captionSmall'`
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'` (default: `'normal'`)
- `font`: `'montserrat' | 'lora' | 'inherit'` (default: `'inherit'`)
- `as`: Override semantic HTML element
- `className`: Additional Tailwind classes

**Responsive Variants:**
| Variant | Mobile | Desktop |
|---------|--------|---------|
| h1 | 3xl | 4xl-6xl |
| h2 | 2xl | 3xl-4xl |
| h3 | xl | 2xl |
| h4 | lg | xl |
| body | sm | base |
| bodyLarge | base | lg |
| caption | xs | sm |
| captionSmall | xs | xs |

---

### 3. ResponsiveCard

**Purpose:** Standardized cards with glassmorphism and responsive padding

**Usage:**
```tsx
import { ResponsiveCard } from '@/components/ui';

<ResponsiveCard variant="default" glass>
  <h3>Card Title</h3>
  <p>Card content</p>
</ResponsiveCard>

// Interactive card
<ResponsiveCard variant="compact" onClick={handleClick}>
  <p>Clickable card</p>
</ResponsiveCard>
```

**Props:**
- `variant`: `'compact' | 'default' | 'spacious'` (default: `'default'`)
- `glass`: Enable glassmorphism effect (default: `true`)
- `onClick`: Optional click handler (adds hover/cursor styles)
- `className`: Additional Tailwind classes

**Mobile Behavior:**
- `compact`: p-3 rounded-xl (mobile) → p-5 rounded-2xl (desktop)
- `default`: p-4 rounded-xl (mobile) → p-6 rounded-2xl (desktop)
- `spacious`: p-6 rounded-xl (mobile) → p-8 rounded-2xl (desktop)

**Glass Effect:**
- Enabled: `bg-white/10 backdrop-blur-sm border border-white/20`
- Disabled: `bg-white border border-gray-200`

---

### 4. ResponsiveButton

**Purpose:** Standardized buttons with responsive sizing and variants

**Usage:**
```tsx
import { ResponsiveButton } from '@/components/ui';

<ResponsiveButton variant="primary" size="md" onClick={handleSubmit}>
  Get Started
</ResponsiveButton>

<ResponsiveButton variant="outline" size="sm" fullWidth>
  Learn More
</ResponsiveButton>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `fullWidth`: Stretch to full width (default: `false`)
- `disabled`: Disable button (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `onClick`: Click handler
- `className`: Additional Tailwind classes

**Variants:**
- `primary`: Gold gradient (main CTA)
- `secondary`: Teal gradient (secondary CTA)
- `outline`: Transparent with white border
- `ghost`: No border, minimal styling

**Mobile Optimizations:**
- Minimum 44px touch target on all sizes
- Active state scale feedback (0.95)
- Hover disabled on mobile (prevents sticky hover states)

---

## Migration Guide

### Before (Old Pattern)
```tsx
<div className="max-w-2xl mx-auto px-3 md:px-4 py-2 md:py-4">
  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 font-montserrat">
    {currentQuestion.question}
  </h2>
  <p className="text-white/60 text-xs md:text-sm font-lora mb-2 md:mb-3">
    {currentQuestion.subtitle}
  </p>
  <button className="px-5 md:px-8 py-2 md:py-2.5 rounded-lg font-semibold bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white">
    Next
  </button>
</div>
```

### After (New Pattern)
```tsx
<ResponsiveContainer size="default" maxWidth="md">
  <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-2">
    {currentQuestion.question}
  </ResponsiveText>
  <ResponsiveText variant="caption" font="lora" className="text-white/60 mb-3">
    {currentQuestion.subtitle}
  </ResponsiveText>
  <ResponsiveButton variant="primary" size="md">
    Next
  </ResponsiveButton>
</ResponsiveContainer>
```

**Benefits:**
- ✅ 60% less code
- ✅ No inline responsive utilities
- ✅ Consistent with design system
- ✅ Easy to maintain globally
- ✅ Self-documenting

---

## Best Practices

### 1. Use Semantic Components
```tsx
// ✅ Good
<ResponsiveText variant="h1" as="h1">Title</ResponsiveText>

// ❌ Bad
<div className="text-3xl md:text-6xl">Title</div>
```

### 2. Compose, Don't Customize
```tsx
// ✅ Good - Use variants
<ResponsiveCard variant="compact">Content</ResponsiveCard>

// ⚠️ Acceptable - Additional classes when needed
<ResponsiveCard variant="default" className="border-gold-500">
  Content
</ResponsiveCard>

// ❌ Bad - Overriding responsive patterns
<ResponsiveCard className="p-10 md:p-20">Content</ResponsiveCard>
```

### 3. Nest Containers Thoughtfully
```tsx
// ✅ Good - Single container
<ResponsiveContainer size="default">
  <ResponsiveCard variant="default">
    Content
  </ResponsiveCard>
</ResponsiveContainer>

// ❌ Bad - Double padding
<ResponsiveContainer size="spacious">
  <ResponsiveContainer size="spacious">
    Content
  </ResponsiveContainer>
</ResponsiveContainer>
```

### 4. Trust the Tokens
```tsx
// ✅ Good - Use predefined variants
<ResponsiveText variant="h2">Heading</ResponsiveText>

// ❌ Bad - Custom responsive sizing
<h2 className="text-lg md:text-2xl lg:text-3xl">Heading</h2>
```

---

## Common Patterns

### Page Layout
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      <GradientHeader title="Page Title" subtitle="Subtitle" />

      <ResponsiveContainer size="default" maxWidth="xl">
        <ResponsiveCard variant="default">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-4">
            Section Title
          </ResponsiveText>
          <ResponsiveText variant="body" font="lora" className="text-white/90 mb-6">
            Section content goes here.
          </ResponsiveText>
          <ResponsiveButton variant="primary" size="md">
            Call to Action
          </ResponsiveButton>
        </ResponsiveCard>
      </ResponsiveContainer>
    </div>
  );
}
```

### Card Grid
```tsx
<ResponsiveContainer size="default">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {items.map(item => (
      <ResponsiveCard key={item.id} variant="compact">
        <ResponsiveText variant="h4" weight="semibold" className="text-white mb-2">
          {item.title}
        </ResponsiveText>
        <ResponsiveText variant="caption" className="text-white/70">
          {item.description}
        </ResponsiveText>
      </ResponsiveCard>
    ))}
  </div>
</ResponsiveContainer>
```

### Form Layout
```tsx
<ResponsiveContainer size="default" maxWidth="md">
  <ResponsiveCard variant="default">
    <ResponsiveText variant="h3" weight="bold" className="text-white mb-6">
      Contact Form
    </ResponsiveText>

    <form className="space-y-4">
      <input
        type="email"
        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white"
        placeholder="Email"
      />
      <ResponsiveButton variant="primary" size="md" fullWidth type="submit">
        Submit
      </ResponsiveButton>
    </form>
  </ResponsiveCard>
</ResponsiveContainer>
```

---

## Performance Considerations

### Lazy Loading (Already Implemented)
All page components are already lazy-loaded in App.tsx. The responsive components are lightweight and don't impact initial bundle size.

### CSS Purging
Tailwind automatically purges unused classes. The responsive component system actually **reduces** final CSS size by consolidating patterns.

### Mobile Performance
- All buttons have minimum 44px touch targets
- Active state feedback prevents double-tap issues
- GPU-accelerated transforms for smooth animations
- Reduced motion support via CSS media queries

---

## Troubleshooting

### Component Not Found
```tsx
// ❌ Error: Cannot find module
import ResponsiveText from '@/components/ui/ResponsiveText';

// ✅ Solution: Import from index
import { ResponsiveText } from '@/components/ui';
```

### Styling Not Applied
```tsx
// ❌ className overrides not working
<ResponsiveCard className="p-20">Content</ResponsiveCard>

// ✅ Use variant system instead
<ResponsiveCard variant="spacious">Content</ResponsiveCard>
```

### Type Errors
```typescript
// ❌ TypeScript error: Invalid variant
<ResponsiveText variant="huge">Text</ResponsiveText>

// ✅ Use valid variant
<ResponsiveText variant="h1">Text</ResponsiveText>
```

---

## Future Enhancements

### Planned Components
- `ResponsiveGrid` - Auto-responsive grid system
- `ResponsiveStack` - Vertical/horizontal spacing
- `ResponsiveNavigation` - Mobile menu patterns
- `ResponsiveModal` - Full-screen on mobile, centered on desktop

### Planned Features
- Dark mode variants
- Animation presets
- Accessibility enhancements (focus management)
- Custom theme support

---

## Questions?

For questions or suggestions about the responsive component system:
1. Check this documentation first
2. Review component source code in `src/components/ui/`
3. Review design tokens in `src/styles/tokens.ts`
4. Submit an issue or discussion in the repository

**Last Updated:** October 8, 2025
**Version:** 1.0.0
