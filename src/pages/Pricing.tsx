import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Check, ArrowRight, Users, Star, FileText, Target } from 'lucide-react';


export default function Pricing() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              UNA Formation Guidance
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Start with free exploration and get personalized guidance through our strategy sessions. 
              Our expert guidance model focuses on clarity and understanding before commitment.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Choose Your Path
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Guidance */}
            <div className="relative bg-white rounded-2xl shadow-lg border-2 border-navy-200 hover:border-navy-300 transition-all duration-200">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-navy-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">Free Guidance</h3>
                  <p className="text-navy-600 mb-6">Explore your UNA formation options with our guided assessment</p>
                  <div className="text-4xl font-bold text-navy-900 mb-2">$0</div>
                  <p className="text-navy-500 text-sm">No cost, no commitment</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">3-step guided assessment</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Personalized strategic insights</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Resource recommendations</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Clear next steps guidance</span>
                  </div>
                </div>
                
                <Link
                  to="/explore"
                  className="w-full bg-navy-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-navy-700 transition-colors flex items-center justify-center"
                >
                  Explore Your Path
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Strategy Session */}
            <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gold-500 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gold-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Most Popular
                </div>
              </div>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gold-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">Strategy Session</h3>
                  <p className="text-navy-600 mb-6">Get personalized guidance and strategic planning</p>
                  <div className="text-4xl font-bold text-gold-600 mb-2">$250</div>
                  <p className="text-navy-500 text-sm">one-time session</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">60-90 minute personalized session</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Mission and vision clarity</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Strategic roadmap and next steps</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Resource recommendations</span>
                  </div>
                </div>
                
                <Link
                  to="/consultation"
                  className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-gold-700 transition-colors flex items-center justify-center"
                >
                  Schedule Strategy Session
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Document Creation Package */}
            <div className="relative bg-white rounded-2xl shadow-lg border-2 border-navy-200 hover:border-navy-300 transition-all duration-200">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-navy-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">Document Creation & Guidance</h3>
                  <p className="text-navy-600 mb-6">Complete UNA formation documents with step-by-step guidance</p>
                  <div className="text-4xl font-bold text-navy-900 mb-2">$750</div>
                  <p className="text-navy-500 text-sm">complete package</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">All consultation benefits</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Complete UNA formation documents</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Step-by-step guidance materials</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Personalized implementation plan</span>
                  </div>
                </div>
                
                <Link
                  to="/consultation"
                  className="w-full bg-navy-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-navy-700 transition-colors flex items-center justify-center"
                >
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bundle Offer */}
          <div className="mt-12 bg-gradient-to-r from-gold-100 to-amber-100 rounded-lg p-8 border border-gold-200 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-navy-800 mb-4">Bundle & Save</h3>
              <p className="text-navy-600 mb-4 text-lg">
                Book both services together and save $100
              </p>
              <div className="text-3xl font-bold text-navy-800 mb-6">
                Consultation + Documents Package: <span className="text-gold-600">$1000</span>
              </div>
              <Link to="/consultation" className="btn-primary px-8 py-3 text-lg">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Our Guidance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Why Choose Our Guidance?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Personalized Approach</h3>
              <p className="text-navy-600">
                Every UNA is unique. We tailor our guidance to your specific mission, goals, and situation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Complete Documentation</h3>
              <p className="text-navy-600">
                Get all the documents you need, prepared with attention to detail and your specific requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Ongoing Support</h3>
              <p className="text-navy-600">
                We're here to support you throughout your UNA formation journey and beyond.
              </p>
            </div>
          </div>
        </div>



        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
              <h3 className="font-semibold text-navy-800 mb-2">What if I need more than one session?</h3>
              <p className="text-navy-600">Many clients find that one session provides the clarity they need to move forward. If you need additional support, we can discuss ongoing consultation packages.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
              <h3 className="font-semibold text-navy-800 mb-2">Do you provide ongoing support after the session?</h3>
              <p className="text-navy-600">Yes! We offer follow-up support and can provide continuing guidance as your UNA grows and evolves.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
              <h3 className="font-semibold text-navy-800 mb-2">What documents do you prepare?</h3>
              <p className="text-navy-600">We prepare all the essential UNA formation documents including agreements, governance structures, and compliance materials. Everything is personalized to your specific mission and needs.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
              <h3 className="font-semibold text-navy-800 mb-2">Can you help with the actual formation process?</h3>
              <p className="text-navy-600">Absolutely! Our Document Creation & Guidance Package includes complete preparation of your UNA formation documents, plus step-by-step guidance materials tailored to your specific situation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
