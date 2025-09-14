import React from 'react';
import { ExternalLink } from 'lucide-react';
import { financialTools } from '@/lib/affiliate-system';

interface AffiliateLinkProps {
  partnerId: string;
  children?: React.ReactNode;
  className?: string;
  fallbackText?: string;
}

export default function AffiliateLink({ 
  partnerId, 
  children = "Learn More", 
  className = "text-white hover:text-white/80 font-medium text-sm",
  fallbackText = "Learn More"
}: AffiliateLinkProps) {
  // Find the partner in our affiliate data
  const partner = financialTools.find(p => p.id === partnerId);
  
  if (!partner || !partner.url || partner.url === '#') {
    // Fallback: show a button that explains how to request the link
    return (
      <button 
        className={`${className} cursor-pointer`}
        onClick={() => {
          // Could open a modal or redirect to contact form
          window.open('/contact?subject=Affiliate%20Link%20Request&partner=' + partnerId, '_blank');
        }}
      >
        {fallbackText}
        <ExternalLink className="h-4 w-4 ml-1 inline" />
      </button>
    );
  }
  
  // Valid affiliate link
  return (
    <a 
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ExternalLink className="h-4 w-4 ml-1 inline" />
    </a>
  );
}
