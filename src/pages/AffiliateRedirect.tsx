import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AffiliateManager } from '@/lib/affiliate-system';
import { Loader2, ExternalLink } from 'lucide-react';

export default function AffiliateRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
              setError('Invalid affiliate link');
        return;
      }

      const redirectToAffiliate = async () => {
        try {
          const affiliateManager = AffiliateManager.getInstance();
          const link = affiliateManager.getLinkBySlug(slug);

          if (!link) {
            setError(`Affiliate link '${slug}' not found`);
            return;
          }

        // Extract UTM parameters from current URL
        const utmParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          if (key.startsWith('utm_')) {
            utmParams[key] = value;
          }
        });

        // Log the click event
        affiliateManager.logClick(slug, document.referrer, utmParams);

        // Build destination URL with UTM parameters
        const destinationUrl = new URL(link.destinationUrl);
        Object.entries(utmParams).forEach(([key, value]) => {
          destinationUrl.searchParams.set(key, value);
        });

        // Add affiliate tracking parameters
        destinationUrl.searchParams.set('utm_source', link.utmSource);
        destinationUrl.searchParams.set('utm_medium', link.utmMedium);
        destinationUrl.searchParams.set('utm_campaign', link.utmCampaign);

        // Redirect after a short delay to show loading state
        setTimeout(() => {
          window.location.href = destinationUrl.toString();
        }, 1500);

              } catch (error) {
          console.error('Error processing affiliate redirect:', error);
          setError('Error processing affiliate link');
        }
      };

    redirectToAffiliate();
  }, [slug, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <ExternalLink className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-navy-900 mb-2">Affiliate Link Error</h2>
            <p className="text-navy-600 mb-4">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gold-100 mb-4">
            <Loader2 className="h-6 w-6 text-gold-600 animate-spin" />
          </div>
          <h2 className="text-lg font-semibold text-navy-900 mb-2">Redirecting...</h2>
          <p className="text-navy-600 mb-4">
            You are being redirected to our affiliate partner's website.
          </p>
          <div className="text-sm text-navy-500">
            <p>Click tracking and UTM parameters are being preserved.</p>
            <p className="mt-1">If you are not redirected automatically, please wait a moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
