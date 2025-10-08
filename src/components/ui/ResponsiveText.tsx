import { ReactNode } from 'react';
import { TextVariant } from '@/styles/tokens';

interface ResponsiveTextProps {
  children: ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  font?: 'montserrat' | 'lora' | 'inherit';
}

/**
 * ResponsiveText - Standardized text with responsive sizing
 *
 * Usage:
 *   <ResponsiveText variant="h1" weight="bold" font="montserrat">
 *     Heading Text
 *   </ResponsiveText>
 *
 * Variants:
 *   - h1, h2, h3, h4: Heading styles
 *   - body, bodyLarge: Body text
 *   - caption, captionSmall: Small text
 */
export default function ResponsiveText({
  children,
  variant = 'body',
  className = '',
  as,
  weight = 'normal',
  font = 'inherit'
}: ResponsiveTextProps) {
  // Auto-map variant to semantic HTML element if not specified
  const defaultElements: Record<TextVariant, string> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    bodyLarge: 'p',
    caption: 'span',
    captionSmall: 'span'
  };

  const Component = as || (defaultElements[variant] as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div');

  const variantStyles = {
    h1: 'text-3xl md:text-4xl lg:text-6xl',
    h2: 'text-xl md:text-2xl',
    h3: 'text-lg md:text-xl',
    h4: 'text-base md:text-lg',
    body: 'text-base md:text-base',
    bodyLarge: 'text-base md:text-lg',
    caption: 'text-sm md:text-sm',
    captionSmall: 'text-xs md:text-xs'
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const fontStyles = {
    montserrat: 'font-montserrat',
    lora: 'font-lora',
    inherit: ''
  };

  return (
    <Component
      className={`${variantStyles[variant]} ${weightStyles[weight]} ${fontStyles[font]} ${className}`}
    >
      {children}
    </Component>
  );
}
