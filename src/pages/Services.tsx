import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, Calendar, Users, Shield, Star, Info } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { FLAGS } from '@/lib/flags';

export default function Services() {
  return (
    <>
      <SEOHead
        title="UNA Formation Guidance & Strategy Sessions"
        description="Get personalized UNA formation guidance through our strategy sessions and explore your path with our free assessment. California-specific expertise."
        keywords={[
          'UNA formation guidance California',
          'UNA strategy session',
          'UNA formation consultation',
          'California UNA formation guidance',
          'UNA formation planning'
        ]}
        ogType="service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "UNA Formation Guidance & Strategy Sessions",
          "description": "Personalized guidance and strategic planning for UNA formation in California.",
          "provider": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          },
          "serviceType": "UNA Formation Guidance",
          "areaServed": "California",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UNA Formation Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Free Path Exploration",
                  "description": "Guided assessment to understand your UNA formation options and get strategic insights."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Strategy Session",
                  "description": "Personalized 60-90 minute consultation for UNA formation planning and guidance."
                }
              }
            ]
          }
        }}
      />
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            <strong>UNA Formation Guidance</strong> & Strategy
          </h1>
          <p className="text-xl text-navy-600">
            Get clear guidance for your <strong>Unincorporated Nonprofit Association</strong> 
            formation journey. Our <strong>guidance-first approach</strong> helps you understand 
            your options before making commitments.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Path Exploration */}
          <div className="card">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-navy-500" />
              <h3 className="text-xl font-semibold ml-3">Free Path Exploration</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Start your UNA formation journey with our guided assessment to understand 
              your options and get personalized strategic insights.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                3-step guided assessment
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Mission and impact analysis
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Strategic insights and recommendations
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Resource and next steps guidance
              </li>
            </ul>
            <Link to="/explore" className="btn-primary text-sm px-6 py-2 w-full text-center">
              Start Free Exploration
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>

          {/* Strategy Session */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">Strategy Session $250/hr</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Get personalized guidance and strategic planning through our 1:1 consultation 
              sessions tailored to your specific situation.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                60-90 minute personalized session
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Strategic summary and roadmap
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Optional document preparation
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Ongoing email support
              </li>
            </ul>
            <Link to="/consultation" className="btn-primary text-sm px-6 py-2 w-full text-center">
              Book Strategy Session
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </div>

      {/* What's Included in Strategy Session */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            What's Included in a Strategy Session
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gold-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-gold-800 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Pre-Session Preparation</h3>
                  <p className="text-navy-600 text-sm">
                    Review your exploration results and prepare personalized insights for your specific situation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-gold-800 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Strategic Discussion</h3>
                  <p className="text-navy-600 text-sm">
                    Deep dive into your mission, goals, and formation strategy with expert guidance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gold-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-gold-800 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Actionable Roadmap</h3>
                  <p className="text-navy-600 text-sm">
                    Clear next steps and timeline for your UNA formation journey.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-gold-800 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Resource Connections</h3>
                  <p className="text-navy-600 text-sm">
                    Access to our network of UNA formation experts and specialized services.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/consultation" className="btn-primary text-lg px-8 py-3">
              Book Your Strategy Session
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      {!FLAGS.ENABLE_FORMATION && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mx-4 sm:mx-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-blue-900">Automated Formation Coming Soon</h3>
            </div>
            <p className="text-blue-700 mb-6">
              We're building comprehensive automated UNA formation packages. For now, start with our free guidance 
              and book a strategy session to get personalized support for your formation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Start Free Exploration
              </Link>
              <Link to="/consultation" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors">
                Book Strategy Session
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
          Why Choose Our Guidance?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-navy-600" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-2">California Expertise</h3>
            <p className="text-navy-600">
              Deep knowledge of California UNA formation requirements and legal landscape.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Personalized Approach</h3>
            <p className="text-navy-600">
              Every strategy session is tailored to your specific mission, goals, and situation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-gold-600" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Proven Results</h3>
            <p className="text-navy-600">
              Successfully guided hundreds of collectives through their UNA formation journey.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore Your UNA Path?
          </h2>
          <p className="text-xl text-cream-100 mb-8">
            Get clarity on your formation journey with our guidance-first approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="bg-white text-navy-600 hover:bg-cream-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start Free Exploration
            </Link>
            <Link to="/consultation" className="border-2 border-white text-white hover:bg-white hover:text-navy-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Book Strategy Session
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 