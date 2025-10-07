import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Calendar, CreditCard } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Confirmation() {
  const [intakeData, setIntakeData] = useState<any>(null);

  useEffect(() => {
    // Load intake data from localStorage
    const savedData = localStorage.getItem('intake_simplified');
    console.log('Confirmation page - savedData from localStorage:', savedData);
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('Confirmation page - parsed data:', parsedData);
        setIntakeData(parsedData);
      } catch (error) {
        console.error('Error parsing intake data:', error);
      }
    } else {
      console.log('No intake data found in localStorage');
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Booking Confirmed - UNA Platform"
        description="Your UNA formation consultation has been scheduled. Complete your payment to finalize your booking."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20 max-w-2xl w-full text-center">
          <CheckCircle className="h-20 w-20 text-[#C49A6C] mx-auto mb-6" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
            Intake Complete!
          </h1>
          
          <p className="text-lg text-white/90 mb-8 font-lora">
            Your session is reserved. You'll receive a direct confirmation once payment is received.
          </p>

          {intakeData ? (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-4 font-montserrat">Session Details</h3>
              <div className="space-y-2 text-sm text-white/90 font-lora">
                <div><strong>Organization:</strong> {intakeData.entityName || 'Not provided'}</div>
                <div><strong>Contact:</strong> {intakeData.organizerName || 'Not provided'}</div>
                <div><strong>Email:</strong> {intakeData.organizerEmail || 'Not provided'}</div>
                <div><strong>State:</strong> {intakeData.entityState || 'Not provided'}</div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8 text-center">
              <h3 className="text-lg font-semibold text-white mb-4 font-montserrat">Session Details</h3>
              <p className="text-white/70 font-lora">
                Session details will be confirmed via email once payment is received.
              </p>
            </div>
          )}

          {/* Payment Instructions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-[#C49A6C] mr-2" />
              <h3 className="text-lg font-semibold text-white font-montserrat">Complete Your Payment</h3>
            </div>
            <p className="text-sm text-white/90 mb-4 font-lora">
              Send payment using one of these methods:
            </p>
            <div className="space-y-2 text-sm text-white/80 font-lora">
              <div>• Venmo: <strong className="text-[#C49A6C]">@gigistardust</strong></div>
              <div>• Zelle: <strong className="text-[#C49A6C]">gigi@gigistardust.com</strong></div>
              <div>• Bank transfer: available upon request</div>
            </div>
            <p className="text-xs text-white/70 mt-3 font-lora italic">
              Once payment is received, your booking will be finalized and a confirmation email sent.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-center text-white/90 font-lora">
              <Mail className="h-5 w-5 mr-2" />
              <span>Confirmation email within 24 hours of payment</span>
            </div>
            <div className="flex items-center justify-center text-white/90 font-lora">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Session details and preparation materials</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/"
              className="bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 font-montserrat"
            >
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 font-montserrat"
            >
              Contact Support
            </Link>
          </div>

          <p className="text-white/70 text-sm mt-6 font-lora">
            Questions? We're here to help at <strong className="text-[#C49A6C]">gigi@gigistardust.com</strong>
          </p>
        </div>
      </div>
    </>
  );
}
