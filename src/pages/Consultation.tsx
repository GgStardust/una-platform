import { Calendar, Clock, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function Consultation() {
  const bookingUrl = import.meta.env.VITE_BOOKING_URL || 'https://calendly.com/gigi-stardust/una-consultation';

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
            Our 60-90 minute sessions are designed to bring clarity to your vision and create a roadmap for success.
          </p>
        </div>

        {/* What You'll Get */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 text-center">What You'll Get</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-navy-800">Strategic Summary</h3>
                  <p className="text-navy-600 text-sm">Clear understanding of your UNA's mission, structure, and impact potential</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-navy-800">Next Steps Roadmap</h3>
                  <p className="text-navy-600 text-sm">Prioritized action plan tailored to your specific situation and goals</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-navy-800">Optional Documentation</h3>
                  <p className="text-navy-600 text-sm">Sample agreements, governance structures, and formation templates</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-navy-800">Resource Connections</h3>
                  <p className="text-navy-600 text-sm">Access to our network of UNA formation experts and resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div className="bg-gold-50 rounded-lg border border-gold-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 text-center">Session Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <Clock className="h-12 w-12 text-gold-600" />
              <h3 className="font-semibold text-navy-800">Duration</h3>
              <p className="text-navy-600">60-90 minutes</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <Calendar className="h-12 w-12 text-gold-600" />
              <h3 className="font-semibold text-navy-800">Format</h3>
              <p className="text-navy-600">Video call or phone</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="h-12 w-12 bg-gold-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <h3 className="font-semibold text-navy-800">Investment</h3>
              <p className="text-navy-600">$250/hour</p>
            </div>
          </div>
        </div>

        {/* What We'll Cover */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 text-center">What We'll Cover</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-navy-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-navy-800 font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 mb-2">Mission & Vision Clarity</h3>
                <p className="text-navy-600">Refine your organizational purpose and the specific change you want to create in the world</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-navy-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-navy-800 font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 mb-2">Structure & Governance</h3>
                <p className="text-navy-600">Explore the best organizational structure and decision-making processes for your mission</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-navy-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-navy-800 font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 mb-2">Legal & Compliance</h3>
                <p className="text-navy-600">Understand the legal requirements and best practices for UNA formation in California</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-navy-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-navy-800 font-semibold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 mb-2">Implementation Strategy</h3>
                <p className="text-navy-600">Create a step-by-step plan to move forward with confidence and clarity</p>
              </div>
            </div>
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
            <div className="text-3xl font-bold text-gold-300">$250/hour</div>
          </div>
          
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gold-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gold-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Your Session
            <ExternalLink className="h-5 w-5 ml-2" />
          </a>
          
          <p className="text-sm text-gold-200 mt-4">
            You'll be redirected to our booking calendar
          </p>
        </div>

        {/* Payment Information */}
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Payment Instructions</h3>
          <p className="text-amber-800 text-sm mb-3">
            Payment instructions will be provided after your session is booked. We accept:
          </p>
          <ul className="text-amber-800 text-sm space-y-1">
            <li>• Bank transfer</li>
            <li>• PayPal</li>
            <li>• Cryptocurrency</li>
          </ul>
          <p className="text-amber-700 text-xs mt-3">
            Please include your UNA entity name in the payment reference for proper tracking.
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
              <p className="text-navy-600">Yes! We offer follow-up support and can connect you with resources and experts to help implement your plan.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">What if I'm not ready to form a UNA yet?</h3>
              <p className="text-navy-600">That's perfectly fine! Our sessions help you assess readiness and create a timeline that works for you. We'll help you understand what needs to happen before you're ready to form.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">Can you help with the actual formation process?</h3>
              <p className="text-navy-600">While our strategy sessions focus on planning and preparation, we can provide guidance on the formation process and connect you with the right professionals for implementation.</p>
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
