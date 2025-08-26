import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Check, ArrowRight, Users, Shield, Star } from 'lucide-react';
import { FLAGS } from '@/lib/flags';

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
              Our Lite model focuses on clarity and understanding before commitment.
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
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                  <p className="text-navy-500 text-sm">per hour</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">60-90 minute personalized session</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Strategic summary and roadmap</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Optional document preparation</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-navy-700">Ongoing email support</span>
                  </div>
                </div>
                
                <Link
                  to="/consultation"
                  className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gold-700 transition-colors flex items-center justify-center"
                >
                  Book Strategy Session
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        {!FLAGS.ENABLE_FORMATION && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Automated Formation Coming Soon</h3>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              We're building comprehensive automated UNA formation packages. For now, start with our free guidance 
              and book a strategy session to get personalized support for your formation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Start Free Exploration
              </Link>
              <Link to="/consultation" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-navy-900 mb-8">Why Choose Our Guidance?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-navy-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Expert Guidance</h4>
              <p className="text-navy-600">California-specific UNA formation expertise and legal knowledge</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Personalized Support</h4>
              <p className="text-navy-600">1:1 strategy sessions tailored to your specific mission and goals</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-gold-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Resource Network</h4>
              <p className="text-navy-600">Access to our curated network of UNA formation experts and services</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-navy-900 text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg border border-navy-200 p-6">
              <h4 className="font-semibold text-navy-900 mb-2">What's included in the free guidance?</h4>
              <p className="text-navy-600">
                Our free exploration includes a 3-step assessment, personalized insights, resource recommendations, 
                and clear next steps for your UNA formation journey.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-navy-200 p-6">
              <h4 className="font-semibold text-navy-900 mb-2">How long is a strategy session?</h4>
              <p className="text-navy-600">
                Strategy sessions are 60-90 minutes long, depending on your needs and the complexity of your situation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-navy-200 p-6">
              <h4 className="font-semibold text-navy-900 mb-2">Can I get documents prepared during a session?</h4>
              <p className="text-navy-600">
                Yes! During your strategy session, we can prepare sample agreements, governance structures, 
                and formation templates tailored to your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
