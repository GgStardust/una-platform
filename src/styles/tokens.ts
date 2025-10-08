/**
 * Design Token System - UNA Platform
 *
 * Centralized responsive design tokens for consistent mobile/desktop experience.
 * These tokens are the single source of truth for spacing, typography, and layout.
 */

export const spacing = {
  mobile: {
    xs: '0.375rem',    // 6px
    sm: '0.5rem',      // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
  },
  desktop: {
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '3rem',     // 48px
  }
} as const;

export const typography = {
  mobile: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px - minimum for iOS no-zoom
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    '4xl': '2.5rem',   // 40px
  },
  desktop: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    '4xl': '3.5rem',   // 56px
  }
} as const;

export const borderRadius = {
  mobile: {
    sm: '0.375rem',    // 6px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
  },
  desktop: {
    sm: '0.5rem',      // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
  }
} as const;

export const containerSizes = {
  tight: {
    mobile: { padding: spacing.mobile.md, gap: spacing.mobile.sm },
    desktop: { padding: spacing.desktop.lg, gap: spacing.desktop.md }
  },
  default: {
    mobile: { padding: spacing.mobile.lg, gap: spacing.mobile.md },
    desktop: { padding: spacing.desktop.xl, gap: spacing.desktop.lg }
  },
  spacious: {
    mobile: { padding: spacing.mobile.xl, gap: spacing.mobile.lg },
    desktop: { padding: spacing.desktop['2xl'], gap: spacing.desktop.xl }
  }
} as const;

export const textVariants = {
  h1: {
    mobile: typography.mobile['3xl'],
    desktop: typography.desktop['4xl']
  },
  h2: {
    mobile: typography.mobile['2xl'],
    desktop: typography.desktop['3xl']
  },
  h3: {
    mobile: typography.mobile.xl,
    desktop: typography.desktop['2xl']
  },
  h4: {
    mobile: typography.mobile.lg,
    desktop: typography.desktop.xl
  },
  body: {
    mobile: typography.mobile.base,
    desktop: typography.desktop.base
  },
  bodyLarge: {
    mobile: typography.mobile.lg,
    desktop: typography.desktop.lg
  },
  caption: {
    mobile: typography.mobile.sm,
    desktop: typography.desktop.sm
  },
  captionSmall: {
    mobile: typography.mobile.xs,
    desktop: typography.desktop.xs
  }
} as const;

export const cardVariants = {
  compact: {
    mobile: { padding: spacing.mobile.md, borderRadius: borderRadius.mobile.xl },
    desktop: { padding: spacing.desktop.lg, borderRadius: borderRadius.desktop.xl }
  },
  default: {
    mobile: { padding: spacing.mobile.lg, borderRadius: borderRadius.mobile.xl },
    desktop: { padding: spacing.desktop.xl, borderRadius: borderRadius.desktop.xl }
  },
  spacious: {
    mobile: { padding: spacing.mobile.xl, borderRadius: borderRadius.mobile.xl },
    desktop: { padding: spacing.desktop['2xl'], borderRadius: borderRadius.desktop.xl }
  }
} as const;

// Tailwind class mappings for easy use in components
export const tailwindMappings = {
  spacing: {
    mobile: {
      xs: 'px-1.5',
      sm: 'px-2',
      md: 'px-3',
      lg: 'px-4',
      xl: 'px-6',
      '2xl': 'px-8'
    },
    desktop: {
      xs: 'md:px-2',
      sm: 'md:px-3',
      md: 'md:px-4',
      lg: 'md:px-6',
      xl: 'md:px-8',
      '2xl': 'md:px-12'
    }
  },
  text: {
    mobile: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl'
    },
    desktop: {
      xs: 'md:text-xs',
      sm: 'md:text-sm',
      base: 'md:text-base',
      lg: 'md:text-lg',
      xl: 'md:text-xl',
      '2xl': 'md:text-2xl',
      '3xl': 'md:text-3xl',
      '4xl': 'md:text-4xl'
    }
  }
} as const;

// Helper function to build responsive class strings
export function buildResponsiveClass(
  mobileClass: string,
  desktopClass: string
): string {
  return `${mobileClass} ${desktopClass}`;
}

// Type exports for TypeScript consumers
export type SpacingSize = keyof typeof spacing.mobile;
export type TextVariant = keyof typeof textVariants;
export type ContainerSize = keyof typeof containerSizes;
export type CardVariant = keyof typeof cardVariants;
