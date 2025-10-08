import { ReactNode } from 'react';

interface ResponsiveButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * ResponsiveButton - Standardized button with responsive sizing
 *
 * Usage:
 *   <ResponsiveButton variant="primary" size="md" onClick={handleClick}>
 *     Click Me
 *   </ResponsiveButton>
 *
 * Variants:
 *   - primary: Gold gradient (main CTA)
 *   - secondary: Teal gradient (secondary CTA)
 *   - outline: Transparent with border
 *   - ghost: No border, minimal styling
 *
 * Sizes:
 *   - sm: Compact button
 *   - md: Standard button (default)
 *   - lg: Large button (hero CTAs)
 *
 * Mobile optimizations:
 *   - Minimum 44px touch target
 *   - Scaled-down padding on mobile
 *   - Active state feedback
 */
export default function ResponsiveButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}: ResponsiveButtonProps) {
  const baseStyles = 'rounded-lg font-semibold font-montserrat transition-all duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white hover:shadow-lg hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-[#2F7E7E] to-[#246666] text-white hover:shadow-lg hover:scale-105 active:scale-95',
    outline: 'border-2 border-white/30 text-white hover:bg-white/10 active:scale-95',
    ghost: 'text-white hover:bg-white/10 active:scale-95'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 md:px-5 md:py-2.5 text-sm min-h-[44px]',
    md: 'px-5 py-2.5 md:px-8 md:py-3.5 text-sm md:text-base min-h-[44px]',
    lg: 'px-6 py-3 md:px-10 md:py-4 text-base md:text-lg min-h-[48px]'
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}
