import { Link } from 'react-router-dom';
import { Home, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found - UNA Platform"
        description="The page you're looking for doesn't exist. Return to UNA Platform home or contact us for assistance."
        keywords={['404', 'page not found', 'UNA platform']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20 max-w-2xl w-full text-center">
          <div className="text-6xl font-bold text-[#C49A6C] mb-6 font-montserrat">404</div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
            Page Not Found
          </h1>
          
          <p className="text-lg text-white/90 mb-8 font-lora">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track with your UNA formation journey.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 font-montserrat mr-4"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 font-montserrat"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Support
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white/70 text-sm font-lora">
              Need help? We're here to assist with your UNA formation needs.
            </p>
            <p className="text-white/60 text-sm font-lora mt-2">
              Email us at <strong className="text-[#C49A6C]">gigi@gigistardust.com</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
