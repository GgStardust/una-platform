import { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface PremiumButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export default function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false
}: PremiumButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center';

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  const variantStyles = {
    primary: 'bg-[#C49A6C] text-white hover:bg-[#A67C4A] shadow-lg hover:shadow-xl disabled:bg-[#C49A6C]/50 disabled:cursor-not-allowed',
    secondary: 'bg-[#2F7E7E] text-white hover:bg-[#256565] shadow-lg hover:shadow-xl disabled:bg-[#2F7E7E]/50 disabled:cursor-not-allowed',
    outline: 'border-2 border-[#C49A6C] text-[#C49A6C] hover:bg-[#C49A6C]/10 disabled:border-[#C49A6C]/50 disabled:text-[#C49A6C]/50 disabled:cursor-not-allowed',
    ghost: 'text-[#C49A6C] hover:bg-[#C49A6C]/10 disabled:text-[#C49A6C]/50 disabled:cursor-not-allowed'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
