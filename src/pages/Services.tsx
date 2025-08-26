import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, Calendar, Users, Shield, FileText, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Services() {
  return (
    <>
      <SEOHead
        title="UNA Formation Guidance & Strategy Sessions"
        description="Get personalized UNA formation guidance through our strategy sessions and explore your path with our free assessment. Expert guidance and document preparation."
        keywords={[
          'UNA formation guidance',
          'UNA strategy session',
          'UNA formation consultation',
          'UNA formation planning',
          'UNA document preparation'
        ]}
        ogType="service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "UNA Formation Guidance & Strategy Sessions",
          "description": "Personalized guidance and strategic planning for UNA formation with document preparation.",
          "provider": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          },
          "serviceType": "UNA Formation Guidance",
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
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Document Creation & Guidance Package",
                  "description": "Complete UNA formation documents with step-by-step guidance materials."
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
            formation journey. Our <strong>expert guidance approach</strong> helps you understand 
            your options and prepare personalized documents.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
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
              <h3 className="text-xl font-semibold ml-3">Strategy Session</h3>
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
                Mission and vision clarity
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Resource recommendations
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gold-600">$250</div>
              <div className="text-sm text-navy-500">One-time session</div>
            </div>
            <Link to="/consultation" className="btn-primary text-sm px-6 py-2 w-full text-center">
              Schedule Strategy Session
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>

          {/* Document Creation Package */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-navy-500" />
              <h3 className="text-xl font-semibold ml-3">Document Creation & Guidance</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Complete preparation of your UNA formation documents with step-by-step guidance 
              materials tailored to your specific situation.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                All consultation benefits
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Complete UNA formation documents
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Step-by-step guidance materials
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Personalized implementation plan
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-navy-600">$750</div>
              <div className="text-sm text-navy-500">Complete package</div>
            </div>
            <Link to="/consultation" className="btn-primary text-sm px-6 py-2 w-full text-center">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>

        {/* Bundle Offer */}
        <div className="mt-12 bg-gradient-to-r from-gold-100 to-amber-100 rounded-lg p-8 border border-gold-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-navy-800 mb-4">Bundle & Save</h3>
            <p className="text-navy-600 mb-4 text-lg">
              Book both services together and save $100
            </p>
            <div className="text-3xl font-bold text-navy-800 mb-4">
              Consultation + Documents Package: <span className="text-gold-600">$1000</span>
            </div>
            <Link to="/consultation" className="btn-primary px-8 py-3 text-lg">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 inline" />
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
                  <Target className="h-4 w-4 text-gold-800" />
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
                  <Users className="h-4 w-4 text-gold-800" />
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
                  <FileText className="h-4 w-4 text-gold-800" />
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
                  <Shield className="h-4 w-4 text-gold-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Resource Connections</h3>
                  <p className="text-navy-600 text-sm">
                    Access to our network of UNA formation resources and specialized services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Guidance */}
      <div className="bg-cream-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">
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
      </div>



      {/* Final CTA */}
      <div className="bg-gradient-to-r from-navy-600 to-navy-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your UNA Formation Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you need clarity on your path or are ready for expert guidance, 
            we're here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="btn-secondary">
              Explore Your Path
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
            <Link to="/consultation" className="btn-primary">
              Schedule Strategy Session
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 