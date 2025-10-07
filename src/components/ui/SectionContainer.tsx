import { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  background?: 'cream' | 'white' | 'gradient' | 'transparent';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SectionContainer({
  children,
  background = 'transparent',
  maxWidth = 'lg',
  padding = 'md',
  className = ''
}: SectionContainerProps) {
  const backgroundStyles = {
    cream: 'bg-[#F4F1E8]',
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]',
    transparent: 'bg-transparent'
  };

  const maxWidthStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full'
  };

  const paddingStyles = {
    none: '',
    sm: 'py-8',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24'
  };

  return (
    <div className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}>
      <div className={`${maxWidthStyles[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </div>
  );
}
