import { useState } from 'react';
import { Share2, Linkedin, Facebook, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  postSlug: string;
}

export default function ShareButtons({ url, postSlug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${url}`;

  const addUTMs = (platform: string) => {
    const utmParams = new URLSearchParams({
      utm_source: platform,
      utm_medium: 'social',
      utm_campaign: postSlug
    });
    return `${fullUrl}?${utmParams.toString()}`;
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(addUTMs('linkedin'))}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(addUTMs('facebook'))}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(addUTMs('copy'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = addUTMs('copy');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-navy-50 rounded-lg p-6 border border-navy-200">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="h-5 w-5 text-navy-600" />
        <h3 className="text-lg font-medium text-navy-900">Share This Post</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={shareOnLinkedIn}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          <span>Share on LinkedIn</span>
        </button>
        
        <button
          onClick={shareOnFacebook}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
        >
          <Facebook className="h-4 w-4" />
          <span>Share on Facebook</span>
        </button>
        
        <button
          onClick={copyLink}
          className="flex items-center space-x-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
      
      <div className="mt-4 text-sm text-navy-600">
        <p>Share this post with your network to help others discover UNA formation best practices.</p>
      </div>
    </div>
  );
}
