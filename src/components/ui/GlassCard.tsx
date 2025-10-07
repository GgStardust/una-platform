import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'solid' | 'bordered';
  padding?: 'sm' | 'md' | 'lg';
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  padding = 'md'
}: GlassCardProps) {
  const baseStyles = 'rounded-2xl shadow-xl';

  const variantStyles = {
    default: 'bg-white/10 backdrop-blur-sm border border-white/20',
    solid: 'bg-white/95 backdrop-blur border border-white/30',
    bordered: 'bg-white/5 backdrop-blur-sm border-2 border-[#C49A6C]/40'
  };

  const paddingStyles = {
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10'
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}
