import { ReactNode } from 'react';
import { CardVariant } from '@/styles/tokens';

interface ResponsiveCardProps {
  children: ReactNode;
  variant?: CardVariant;
  glass?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * ResponsiveCard - Standardized card with responsive padding and borders
 *
 * Usage:
 *   <ResponsiveCard variant="default" glass>
 *     Card content here
 *   </ResponsiveCard>
 *
 * Variants:
 *   - compact: Minimal padding, best for lists/grids
 *   - default: Standard padding, most common use case
 *   - spacious: Extra padding, best for featured content
 *
 * Glass prop: Adds glassmorphism effect (backdrop blur + transparency)
 */
export default function ResponsiveCard({
  children,
  variant = 'default',
  glass = true,
  className = '',
  onClick
}: ResponsiveCardProps) {
  const variantStyles = {
    compact: 'p-3 md:p-4 rounded-xl md:rounded-2xl',
    default: 'p-3 md:p-5 rounded-xl md:rounded-2xl',
    spacious: 'p-4 md:p-6 rounded-xl md:rounded-2xl'
  };

  const glassStyles = glass
    ? 'bg-white/10 backdrop-blur-sm border border-white/20'
    : 'bg-white border border-gray-200';

  const interactiveStyles = onClick
    ? 'cursor-pointer hover:bg-white/15 transition-all duration-200'
    : '';

  return (
    <div
      className={`${variantStyles[variant]} ${glassStyles} ${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
