import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Schedule() {
  const [searchParams] = useSearchParams();
  const [isScheduled, setIsScheduled] = useState(false);
  const packageType = searchParams.get('package') || 'strategy-session';

  // Get package information
  const getPackageInfo = (packageType: string) => {
    switch (packageType) {
      case 'strategy-session':
        return {
          name: 'Strategy Session',
          price: '$1,000',
          duration: '90 minutes',
          format: 'Zoom or In-person'
        };
      case 'complete-formation':
        return {
          name: 'Complete Formation Package',
          price: '$5,000',
          duration: 'Multiple sessions',
          format: 'Zoom or In-person'
        };
      case 'premium-partnership':
        return {
          name: 'Premium Partnership',
          price: 'Contact for Pricing',
          duration: '12 months ongoing',
          format: 'Zoom or In-person'
        };
      default:
        return {
          name: 'Strategy Session',
          price: '$1,000',
          duration: '90 minutes',
          format: 'Zoom or In-person'
        };
    }
  };

  const packageInfo = getPackageInfo(packageType);

  const handleScheduleConfirmation = () => {
    setIsScheduled(true);
  };

  return (
    <>
      <SEOHead
        title="Schedule Your UNA Consultation"
        description="Schedule your personalized UNA formation consultation after completing payment. Choose a time that works for you."
        keywords={[
          'UNA consultation scheduling',
          'UNA formation appointment',
          'UNA strategy session booking',
          'UNA formation guidance',
          'nonprofit consultation'
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "UNA Formation Consultation Scheduling",
          "description": "Schedule your personalized UNA formation consultation after payment completion.",
          "provider": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0]">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-[#C49A6C] mr-3" />
                <h1 className="text-3xl font-bold text-white font-montserrat">
                  Schedule Your Session
                </h1>
              </div>
              <p className="text-xl text-white/90 font-lora">
                You're scheduling your {packageInfo.name} session. Select a date and time that works best for you.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Session Summary */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 font-montserrat">Session Details</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white/70 font-lora">Service:</span>
                <div className="text-white font-semibold font-montserrat">{packageInfo.name}</div>
              </div>
              <div>
                <span className="text-white/70 font-lora">Duration:</span>
                <div className="text-white font-semibold font-montserrat">{packageInfo.duration}</div>
              </div>
              <div>
                <span className="text-white/70 font-lora">Format:</span>
                <div className="text-white font-semibold font-montserrat">{packageInfo.format}</div>
              </div>
            </div>
          </div>

          {/* Scheduling Instructions */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="una-card p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-[#C49A6C] mr-3" />
                <h3 className="text-xl font-semibold text-white font-montserrat">
                  Choose Your Time
                </h3>
              </div>
              <p className="text-white/90 font-lora mb-4">
                Select a date and time that works best for your schedule. 
                Consultations are typically 60-90 minutes long.
              </p>
              <ul className="text-sm text-white/90 space-y-2 font-lora">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  Available Monday-Friday, 9 AM - 6 PM PST
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  Video call via Google Meet
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  Meeting link sent via email
                </li>
              </ul>
            </div>

            <div className="una-card p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-[#C49A6C] mr-3" />
                <h3 className="text-xl font-semibold text-white font-montserrat">
                  What to Expect
                </h3>
              </div>
              <p className="text-white/90 font-lora mb-4">
                Your consultation will be personalized to your UNA formation needs.
              </p>
              <ul className="text-sm text-white/90 space-y-2 font-lora">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  Strategic planning session
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  State-specific requirements review
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  Next steps and resources
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[#C49A6C] mr-2" />
                  Follow-up materials
                </li>
              </ul>
            </div>
          </div>

          {/* Google Calendar Embed */}
          <div className="una-card p-6">
            <h2 className="text-2xl font-bold text-white text-center mb-6 font-montserrat">
              Schedule Your Consultation
            </h2>
            <p className="text-white/90 text-center mb-8 font-lora">
              Use the calendar below to select your preferred date and time.
            </p>
            
            <div className="bg-white rounded-lg p-4">
              <iframe 
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2snmiII8idU672uu4kcXpFFI9AVbVMeWSekRGVFVB3ZNIMgPFhnOQe2Ez_wLwlgHV8zt5EKLYm?gv=true" 
                style={{ border: 0 }} 
                width="100%" 
                height="600" 
                frameBorder="0"
                title="Schedule Consultation"
              />
            </div>
          </div>

          {/* Confirmation Modal */}
          {isScheduled && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
                <CheckCircle className="h-16 w-16 text-[#C49A6C] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">
                  Session Scheduled!
                </h3>
                <p className="text-white/90 mb-6 font-lora">
                  Your {packageInfo.name} session has been scheduled. Continue to the intake form to prepare for our meeting.
                </p>
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/intake"
                    className="bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 font-montserrat"
                  >
                    Continue to Intake Form
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </Link>
                  <button
                    onClick={() => setIsScheduled(false)}
                    className="text-white/70 hover:text-white text-sm font-lora underline"
                  >
                    Schedule Another Time
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4 font-montserrat">
              After Scheduling
            </h3>
            <p className="text-white/90 mb-6 font-lora">
              Once you've scheduled your consultation, you can start filling out the intake form to prepare for our meeting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScheduleConfirmation}
                className="bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 font-montserrat"
              >
                I've Scheduled My Session
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
              <Link 
                to="/contact" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 font-montserrat"
              >
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
