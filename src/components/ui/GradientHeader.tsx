import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface GradientHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  ctaButtons?: CTAButton[];
  background?: 'teal' | 'purple' | 'mixed';
  className?: string;
}

export default function GradientHeader({
  title,
  subtitle,
  ctaButtons = [],
  background = 'mixed',
  className = ''
}: GradientHeaderProps) {
  const backgroundStyles = {
    teal: 'bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]',
    purple: 'bg-gradient-to-br from-[#1C1F3B] via-[#7A4CA0] to-[#1E2A38]',
    mixed: 'bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]'
  };

  return (
    <div className={`${backgroundStyles[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-montserrat mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-lora max-w-4xl mx-auto mb-8">
              {subtitle}
            </p>
          )}

          {ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {ctaButtons.map((button, index) => (
                <Link
                  key={index}
                  to={button.href}
                  className={`
                    font-semibold py-3 px-8 rounded-lg transition-all duration-200
                    ${button.variant === 'primary'
                      ? 'bg-[#C49A6C] text-white hover:bg-[#A67C4A] shadow-lg hover:shadow-xl'
                      : 'border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm'
                    }
                  `}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
