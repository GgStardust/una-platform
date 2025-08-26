import { Clock, CheckCircle, ExternalLink, ArrowRight, Info, FileText, Users, Target, Shield } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Consultation() {
  const location = useLocation();
  const bookingUrl = import.meta.env.VITE_BOOKING_URL || 'https://calendly.com/gigi-stardust/una-consultation';
  
  // Check if user was redirected from a disabled formation route
  const redirectMessage = location.state?.message;
  const fromRoute = location.state?.from;

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            Bring your UNA into focus with a Strategy Session
          </h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized guidance, strategic planning, and clear next steps for your UNA formation journey. 
            We'll refine your idea, outline governance, and prepare personalized document drafts with you.
          </p>
        </div>

        {/* Redirect Message */}
        {redirectMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Feature Coming Soon</h3>
                <p className="text-blue-700 mb-3">{redirectMessage}</p>
                {fromRoute && (
                  <p className="text-blue-600 text-sm">
                    You were redirected from: <span className="font-mono">{fromRoute}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Service Packages */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 text-center">Service Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Initial Consultation */}
            <div className="border border-gold-200 rounded-lg p-6 bg-gold-50">
              <div className="text-center mb-4">
                <Target className="h-12 w-12 text-gold-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Initial Consultation</h3>
                <div className="text-3xl font-bold text-gold-600 mb-2">$250</div>
                <p className="text-sm text-navy-600">One-time session</p>
              </div>
              <ul className="space-y-2 text-sm text-navy-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-gold-600 mt-0.5 flex-shrink-0" />
                  <span>60-90 minute focused session</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-gold-600 mt-0.5 flex-shrink-0" />
                  <span>Mission & vision clarity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-gold-600 mt-0.5 flex-shrink-0" />
                  <span>Strategic next steps</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-gold-600 mt-0.5 flex-shrink-0" />
                  <span>Resource recommendations</span>
                </li>
              </ul>
            </div>

            {/* Document Creation Package */}
            <div className="border border-navy-200 rounded-lg p-6 bg-navy-50">
              <div className="text-center mb-4">
                <FileText className="h-12 w-12 text-navy-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Document Creation & Guidance</h3>
                <div className="text-3xl font-bold text-navy-600 mb-2">$750</div>
                <p className="text-sm text-navy-600">Complete package</p>
              </div>
              <ul className="space-y-2 text-sm text-navy-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-navy-600 mt-0.5 flex-shrink-0" />
                  <span>All consultation benefits</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-navy-600 mt-0.5 flex-shrink-0" />
                  <span>Complete UNA formation documents</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-navy-600 mt-0.5 flex-shrink-0" />
                  <span>Step-by-step guidance materials</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-navy-600 mt-0.5 flex-shrink-0" />
                  <span>Personalized implementation plan</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bundle Offer */}
          <div className="mt-6 bg-gradient-to-r from-gold-100 to-amber-100 rounded-lg p-6 border border-gold-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-navy-800 mb-3">Bundle & Save</h3>
              <p className="text-navy-600 mb-4">
                Book both services together and save $100
              </p>
              <div className="text-2xl font-bold text-navy-800 mb-4">
                Consultation + Documents Package: <span className="text-gold-600">$1000</span>
              </div>
              <a 
                href={bookingUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Schedule Document Formation + Bundle
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* What We'll Cover */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-8 text-center">What We'll Cover</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gold-100 rounded-lg">
                <Target className="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Mission & Vision Clarity</h3>
                <p className="text-navy-600 text-lg leading-relaxed">
                  Refine your organizational purpose and the specific change you want to create in the world
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-navy-100 rounded-lg">
                <Users className="h-6 w-6 text-navy-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Structure & Governance</h3>
                <p className="text-navy-600 text-lg leading-relaxed">
                  Explore the best organizational structure and decision-making processes for your mission
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gold-100 rounded-lg">
                <Shield className="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Legal & Compliance</h3>
                <p className="text-navy-600 text-lg leading-relaxed">
                  Understand the legal requirements and best practices for UNA formation
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-navy-100 rounded-lg">
                <FileText className="h-6 w-6 text-navy-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Implementation Strategy</h3>
                <p className="text-navy-600 text-lg leading-relaxed">
                  Create a step-by-step plan to move forward with confidence and clarity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Consultancy */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 text-center">Ongoing Consultancy</h2>
          <p className="text-navy-600 text-lg text-center mb-8 max-w-3xl mx-auto">
            Continuing support beyond initial setup. Regular check-ins, compliance reviews, 
            strategic guidance, and responsive advisory support as your UNA grows.
          </p>
          
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-navy-800 mb-2">Investment varies by engagement</div>
            <p className="text-navy-600">Customized support packages based on your needs</p>
          </div>
          
          <div className="text-center">
            <a 
              href={`${bookingUrl}?service=ongoing`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Discuss Ongoing Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Book your UNA Strategy Session today and take the first step toward bringing your vision to life.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-gold-300 mb-2">
              <Clock className="h-5 w-5" />
              <span>60-90 minute session</span>
            </div>
            <div className="text-3xl font-bold text-gold-300">$250</div>
          </div>
          
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gold-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gold-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Schedule Strategy Session
            <ExternalLink className="h-5 w-5 ml-2" />
          </a>
          
          <p className="text-sm text-gold-200 mt-4">
            You'll be redirected to our booking calendar
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">What if I need more than one session?</h3>
              <p className="text-navy-600">Many clients find that one session provides the clarity they need to move forward. If you need additional support, we can discuss ongoing consultation packages.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">Do you provide ongoing support after the session?</h3>
              <p className="text-navy-600">Yes! We offer follow-up support and can provide continuing guidance as your UNA grows and evolves.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">What if I'm not ready to form a UNA yet?</h3>
              <p className="text-navy-600">That's perfectly fine! Our sessions help you assess readiness and create a timeline that works for you. We'll help you understand what needs to happen before you're ready to form.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">Can you help with the actual formation process?</h3>
              <p className="text-navy-600">Absolutely! Our Document Creation & Guidance Package includes complete preparation of your UNA formation documents, plus step-by-step guidance materials tailored to your specific situation.</p>
            </div>

            <div>
              <h3 className="font-semibold text-navy-800 mb-2">What documents do you prepare?</h3>
              <p className="text-navy-600">We prepare all the essential UNA formation documents including agreements, governance structures, and compliance materials. Everything is personalized to your specific mission and needs.</p>
            </div>
          </div>
        </div>

        {/* Resources Link */}
        <div className="text-center">
          <p className="text-navy-600 mb-4">
            Want to explore more resources before booking a session?
          </p>
          <a
            href="/resources"
            className="inline-flex items-center text-gold-600 hover:text-gold-800 font-medium"
          >
            Browse Our Resource Library
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
