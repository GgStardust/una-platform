import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { generateUNAFormationGuidePDF } from '../lib/pdf-generator';

interface PDFDownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function PDFDownloadButton({ 
  className = '', 
  children = 'Download UNA Formation Guide',
  variant = 'primary',
  size = 'md'
}: PDFDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate and download the PDF
      generateUNAFormationGuidePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'btn-grad btn-primary',
      secondary: 'btn-grad btn-secondary',
      outline: 'bg-transparent border-2 border-[#C49A6C] text-[#C49A6C] hover:bg-[#C49A6C] hover:text-white'
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={getButtonClasses()}
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          {children}
        </>
      )}
    </button>
  );
}
