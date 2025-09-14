import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Schedule() {
  const [searchParams] = useSearchParams();
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // In a real implementation, you would verify the payment with Stripe
    // For now, we'll check if session_id exists and is valid format
    if (sessionId && sessionId.startsWith('cs_')) {
      setPaymentVerified(true);
    }
    setIsLoading(false);
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!paymentVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="una-card p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4 font-montserrat">
              Payment Required
            </h1>
            <p className="text-white/90 mb-6 font-lora">
              You need to complete a payment before scheduling a consultation.
            </p>
            <Link 
              to="/services"
              className="btn-grad btn-primary px-6 py-3"
            >
              View Services & Pay
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
                <h1 className="text-3xl font-bold text-white font-montserrat">
                  Payment Confirmed!
                </h1>
              </div>
              <p className="text-xl text-white/90 font-lora">
                Thank you for your payment. Now let's schedule your consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Message */}
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-white font-montserrat">
                  Payment Successfully Processed
                </h2>
                <p className="text-white/90 font-lora">
                  Your payment has been confirmed. You can now schedule your consultation.
                </p>
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

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4 font-montserrat">
              After Scheduling
            </h3>
            <p className="text-white/90 mb-6 font-lora">
              Once you've scheduled your consultation, you can start filling out the intake form to prepare for our meeting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={`/intake-form?payment_id=${sessionId}&booking_id=placeholder`}
                className="btn-grad btn-primary px-6 py-3"
              >
                Start Intake Form
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
              <Link 
                to="/contact" 
                className="btn-grad btn-secondary px-6 py-3"
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
