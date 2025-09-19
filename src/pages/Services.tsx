import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, Users, Shield, FileText, Target, Clock } from 'lucide-react';
import { useState } from 'react';
import { redirectToCheckout, STRIPE_PRODUCTS } from '@/lib/stripe';
import SEOHead from '../components/SEOHead';

export default function Services() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePayment = async (productId: keyof typeof STRIPE_PRODUCTS) => {
    setIsLoading(productId);
    try {
      await redirectToCheckout(productId);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

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
                  "description": "Personalized 1 hour consultation for UNA formation planning and guidance."
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
    <div className="min-h-screen bg-[#F4F1E8]">
      {/* Header */}
      <div className="una-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6 font-montserrat">
            <strong className="text-[#C49A6C]">UNA Formation Guidance</strong> & Strategy
          </h1>
          <p className="text-xl text-white font-lora">
            Get clear guidance for your <strong className="text-[#C49A6C]">Unincorporated Nonprofit Association</strong> 
            formation journey. Our <strong className="text-[#C49A6C]">expert guidance approach</strong> helps you understand 
            your options and prepare personalized documents.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Path Exploration */}
          <div className="una-card p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-montserrat">Free Path Exploration</h3>
            </div>
            <p className="text-white/90 mb-4 font-lora">
              Start your UNA formation journey with our guided assessment to understand 
              your options and get personalized strategic insights.
            </p>
            <ul className="text-sm text-white/90 mb-4 space-y-1 font-lora">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                3-step guided assessment
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Mission and impact analysis
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Strategic insights and recommendations
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Resource and next steps guidance
              </li>
            </ul>
            <Link to="/explore" className="btn-grad btn-primary text-sm px-6 py-3 w-full text-center">
              Start Free Exploration
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>

          {/* Strategy Session - Payment Enabled */}
          <div className="una-card p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-montserrat">Strategy Session</h3>
            </div>
            <p className="text-white/90 mb-4 font-lora">
              Get personalized guidance and strategic planning through our 1:1 consultation 
              sessions tailored to your specific situation.
            </p>
            <ul className="text-sm text-white/90 mb-4 space-y-1 font-lora">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                60-90 minute personalized session
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Strategic summary and roadmap
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Mission and vision clarity
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                State-specific requirements review
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Follow-up resources
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-[#C49A6C]">$250</div>
              <div className="text-sm text-white/90">One-time session</div>
            </div>
            <button
              onClick={() => handlePayment('STRATEGY_SESSION')}
              disabled={isLoading === 'STRATEGY_SESSION'}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading === 'STRATEGY_SESSION'
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#C49A6C] to-[#A67C4A] hover:from-[#B88A5A] hover:to-[#956B3F] hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isLoading === 'STRATEGY_SESSION' ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Book Strategy Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </button>
          </div>

          {/* Document Creation Package */}
          <div className="una-card p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-montserrat">Document Preparation</h3>
            </div>
            <p className="text-white/90 mb-4 font-lora">
              Complete preparation of your UNA formation documents with step-by-step guidance 
              materials tailored to your specific situation.
            </p>
            <ul className="text-sm text-white/90 mb-4 space-y-1 font-lora">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                All consultation benefits
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Complete UNA formation documents
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Step-by-step guidance materials
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#C49A6C] mr-2" />
                Personalized implementation plan
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-[#C49A6C]">$750</div>
              <div className="text-sm text-white/90">Complete package</div>
              <div className="mt-2 p-2 bg-green-500/20 border border-green-400/30 rounded-lg">
                <div className="text-sm text-green-300 font-semibold">Strategy Session Credit</div>
                <div className="text-sm text-green-200">
                  $250 Strategy Session payment applies as credit toward Document Preparation
                </div>
              </div>
            </div>
            <button
              onClick={() => handlePayment('DOCUMENT_PREP')}
              disabled={isLoading === 'DOCUMENT_PREP'}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading === 'DOCUMENT_PREP'
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] hover:from-[#1F6B6B] hover:to-[#6B3F8F] hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isLoading === 'DOCUMENT_PREP' ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Book Document Prep
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Upsell Credit Explanation */}
        <div className="mt-12 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-8 border border-green-400/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#1C1F3B] mb-4 font-montserrat">Strategy Session Credit System</h3>
            <p className="text-[#2A2A28] mb-6 text-lg font-lora max-w-4xl mx-auto">
              When you invest in a $250 Strategy Session, that payment is fully credited toward Document Preparation if you move forward. 
              Your strategy work becomes the foundation for your documents, so you save $250 on the $750 preparation service.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-[#1C1F3B] mb-2">Step 1: Strategy Session</h4>
                <p className="text-sm text-[#2A2A28]">Invest $250 in personalized guidance and strategic planning</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-[#1C1F3B] mb-2">Step 2: Document Preparation</h4>
                <p className="text-sm text-[#2A2A28]">Apply your $250 credit toward the $750 document service</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-[#1C1F3B] mb-2">Step 3: Complete Package</h4>
                <p className="text-sm text-[#2A2A28]">Pay only $500 more for full document preparation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Offer */}
        <div className="mt-12 bg-gradient-to-r from-[#C49A6C]/20 to-[#2F7E7E]/20 rounded-lg p-8 border border-[#C49A6C]/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#1C1F3B] mb-4 font-montserrat">Bundle & Save</h3>
            <p className="text-[#2A2A28] mb-4 text-lg font-lora">
              Get both services with maximum value - your Strategy Session becomes the foundation for your documents
            </p>
            <div className="text-3xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
              Strategy Session + Document Preparation: <span className="text-[#C49A6C]">$750</span>
            </div>
            <div className="text-sm text-[#2A2A28] mb-4 font-lora">
              <div className="line-through text-gray-500">Strategy Session: $250</div>
              <div className="line-through text-gray-500">Document Preparation: $750</div>
              <div className="font-semibold text-green-600">Total: $750 (Save $250!)</div>
            </div>
            <button
              onClick={() => handlePayment('BUNDLE')}
              disabled={isLoading === 'BUNDLE'}
              className={`px-8 py-3 text-lg rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading === 'BUNDLE'
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] hover:from-[#6B3F8F] hover:to-[#B88A5A] hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isLoading === 'BUNDLE' ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Book Bundle Package
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* What's Included in Strategy Session */}
      <div className="bg-[#F4F1E8] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1C1F3B] text-center mb-12 font-montserrat">
            What's Included in a Strategy Session
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#C49A6C]/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Target className="h-4 w-4 text-[#C49A6C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Pre-Session Preparation</h3>
                  <p className="text-[#2A2A28] text-sm font-lora">
                    Review your exploration results and prepare personalized insights for your specific situation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#C49A6C]/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Users className="h-4 w-4 text-[#C49A6C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Strategic Discussion</h3>
                  <p className="text-[#2A2A28] text-sm font-lora">
                    Deep dive into your mission, goals, and formation strategy with expert guidance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#C49A6C]/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FileText className="h-4 w-4 text-[#C49A6C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Actionable Roadmap</h3>
                  <p className="text-[#2A2A28] text-sm font-lora">
                    Clear next steps and timeline for your UNA formation journey.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#C49A6C]/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Shield className="h-4 w-4 text-[#C49A6C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Resource Connections</h3>
                  <p className="text-[#2A2A28] text-sm font-lora">
                    Access to our network of UNA formation resources and specialized services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Guidance */}
      <div className="bg-[#F4F1E8] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1C1F3B] mb-8 font-montserrat">
            Why Choose Our Guidance?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#C49A6C]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#C49A6C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">Personalized Approach</h3>
              <p className="text-[#2A2A28] font-lora">
                Every UNA is unique. We tailor our guidance to your specific mission, goals, and situation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#C49A6C]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-[#C49A6C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">Complete Documentation</h3>
              <p className="text-[#2A2A28] font-lora">
                Get all the documents you need, prepared with attention to detail and your specific requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#C49A6C]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#C49A6C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">Ongoing Support</h3>
              <p className="text-[#2A2A28] font-lora">
                We're here to support you throughout your UNA formation journey and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>



    </div>
    </>
  );
} 