import { ReactNode } from 'react';
import { ContainerSize } from '@/styles/tokens';

interface ResponsiveContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

/**
 * ResponsiveContainer - Standardized container with responsive padding
 *
 * Usage:
 *   <ResponsiveContainer size="default">
 *     Content here
 *   </ResponsiveContainer>
 *
 * Sizes:
 *   - tight: Minimal padding, best for dense layouts
 *   - default: Standard padding, most common use case
 *   - spacious: Extra padding, best for featured content
 */
export default function ResponsiveContainer({
  children,
  size = 'default',
  className = '',
  as: Component = 'div',
  maxWidth = '2xl'
}: ResponsiveContainerProps) {
  const sizeStyles = {
    tight: 'px-3 py-1 md:px-4 md:py-2',
    default: 'px-3 py-2 md:px-6 md:py-4',
    spacious: 'px-4 py-2 md:px-8 md:py-6'
  };

  const maxWidthStyles = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <Component
      className={`${sizeStyles[size]} ${maxWidthStyles[maxWidth]} mx-auto ${className}`}
    >
      {children}
    </Component>
  );
}
