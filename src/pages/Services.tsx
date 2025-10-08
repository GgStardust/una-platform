import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, FileText, Target, ChevronDown, ChevronUp, BookOpen, Clock, Building2 } from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleExpanded = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <>
      <SEOHead
        title="Unincorporated Association Formation Services | Professional UNA Formation"
        description="Professional unincorporated association formation services with expert administrative support. Get UNA structure guidance, state-specific UNA requirements, and complete formation assistance."
        keywords={[
          'unincorporated association formation',
          'UNA formation services',
          'UNA formation',
          'UNA structure',
          'UNA requirements',
          'unincorporated association',
          'UNA tax exemption',
          'California UNA',
          'state-specific UNA requirements'
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
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Header */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6 font-montserrat">
            <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Unincorporated Association Formation</span> Services
          </h1>
          <p className="text-xl text-white/90 font-lora mb-4">
            Expert <strong className="text-white font-semibold">UNA formation services</strong> for groups seeking sovereignty and legal clarity.
            Get professional support for <strong>unincorporated association formation</strong>, state-specific UNA requirements,
            and tax exemption guidance nationwide.
          </p>
          <p className="text-sm text-white/70 font-lora italic">
            We provide educational information and document preparation services. For legal representation or state-specific advice, contact a licensed attorney.
          </p>
        </div>
      </div>

      {/* Services Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
            Professional UNA Formation Services
          </h2>
          <p className="text-lg text-white/90 font-lora mb-6">
            Specialized expertise for organizations that choose to establish their UNA with clarity and confidence.
          </p>
        </div>
      </div>

      {/* Services - Subtle Card Design */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Free Path Exploration */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-300">
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Free Path Exploration</h3>
              <p className="text-white/80 font-lora mb-4">
                Guided assessment to understand your UNA formation options and get personalized strategic insights.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Link 
                to="/explore" 
                className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] transition-colors duration-200 font-medium text-sm font-montserrat group"
              >
                Start Free Exploration
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button
                onClick={() => toggleExpanded('free')}
                className="text-white/60 hover:text-white/80 transition-colors duration-200"
              >
                {expandedService === 'free' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedService === 'free' && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-[#C49A6C] text-sm font-medium font-montserrat mb-4">Free • 15 minutes</div>
                <div className="space-y-3 mb-6">
                  <div className="text-white/60 text-sm font-lora">• 3-step guided assessment</div>
                  <div className="text-white/60 text-sm font-lora">• Mission and impact analysis</div>
                  <div className="text-white/60 text-sm font-lora">• Strategic insights and recommendations</div>
                  <div className="text-white/60 text-sm font-lora">• Resource and next steps guidance</div>
                </div>
                <p className="text-white/50 text-xs font-lora italic">
                  Perfect for groups just starting their UNA formation journey or wanting to understand their options before committing to paid services.
                </p>
              </div>
            )}
          </div>

          {/* Strategy Session */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-300">
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#2F7E7E] to-[#D4AF37] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Strategy Session</h3>
              <p className="text-white/80 font-lora mb-4">
                Expert one-on-one consultation with strategic planning tailored to your organization's mission, goals, and state requirements.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/intake?package=strategy-session"
                className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] transition-colors duration-200 font-medium text-sm font-montserrat group"
              >
                Start Strategy Session
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button
                onClick={() => toggleExpanded('strategy')}
                className="text-white/60 hover:text-white/80 transition-colors duration-200"
              >
                {expandedService === 'strategy' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedService === 'strategy' && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-[#C49A6C] text-sm font-medium font-montserrat mb-4">$1,000 • 90 minutes</div>
                <div className="space-y-3 mb-6">
                  <div className="text-white/60 text-sm font-lora">• Pre-session preparation with personalized insights</div>
                  <div className="text-white/60 text-sm font-lora">• Strategic discussion on mission, vision, and governance</div>
                  <div className="text-white/60 text-sm font-lora">• Actionable roadmap with timeline and priorities</div>
                  <div className="text-white/60 text-sm font-lora">• Resource connections and specialized guidance</div>
                  <div className="text-white/60 text-sm font-lora">• Follow-up resources and next steps</div>
                </div>
                <p className="text-white/50 text-xs font-lora italic">
                  Once scheduled, you'll complete a short intake form so we can tailor your consultation to your goals.
                </p>
              </div>
            )}
          </div>

          {/* Complete Formation Package */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-300">
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Formation Package</h3>
              <p className="text-white/80 font-lora mb-4">
                White-glove UNA formation service with comprehensive documentation, expert guidance, and dedicated support.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/intake?package=complete-formation"
                className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] transition-colors duration-200 font-medium text-sm font-montserrat group"
              >
                Start Formation Package
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button
                onClick={() => toggleExpanded('complete')}
                className="text-white/60 hover:text-white/80 transition-colors duration-200"
              >
                {expandedService === 'complete' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedService === 'complete' && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-[#C49A6C] text-sm font-medium font-montserrat mb-4">$5,000 • Includes Strategy Session</div>
                <div className="space-y-3 mb-6">
                  <div className="text-white/60 text-sm font-lora">• Everything in Strategy Session</div>
                  <div className="text-white/60 text-sm font-lora">• Professional document preparation</div>
                  <div className="text-white/60 text-sm font-lora">• EIN application assistance</div>
                  <div className="text-white/60 text-sm font-lora">• Banking setup guidance</div>
                  <div className="text-white/60 text-sm font-lora">• 30-day email support</div>
                  <div className="text-white/60 text-sm font-lora">• Compliance checklist</div>
                </div>
                <div className="p-3 bg-[#C49A6C]/10 border border-[#C49A6C]/20 rounded-lg mb-4">
                  <div className="text-[#C49A6C] text-sm font-medium font-lora">Strategy Session Included</div>
                  <div className="text-white/60 text-xs font-lora mt-1">
                    Already completed Strategy Session? Pay only $4,000 more
                  </div>
                </div>
                <p className="text-white/50 text-xs font-lora italic">
                  Your organization deserves formation that reflects its purpose and integrity from day one.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Annual Partnership - Contact for Pricing */}
        <div className="mt-16 md:mt-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 font-montserrat">Formation + Annual Partnership</h3>
            <p className="text-white/70 mb-6 text-base md:text-lg font-lora max-w-2xl mx-auto leading-relaxed">
              Build on your completed formation with a full year of dedicated advisory and structural support. Quarterly sessions, priority guidance, and continuous alignment keep your UNA lawful, adaptive, and strong through its first full cycle of operation.
            </p>
            <div className="text-[#D4AF37] text-sm font-medium font-montserrat mb-8">Contact for Pricing • Annual Partnership</div>
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors duration-200 font-medium text-sm font-montserrat group"
            >
              Contact for More Information
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>


      {/* Why Choose Our Guidance */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
              Why Choose Our Guidance?
            </h2>
            <p className="text-lg text-white/90 font-lora max-w-2xl mx-auto">
              Specialized expertise and personalized support for your UNA formation journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-200">
              <div className="bg-gradient-to-br from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Personalized Approach</h3>
              <p className="text-white/80 font-lora">
                Every UNA is unique. We tailor our guidance to your specific mission, goals, and situation.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-200">
              <div className="bg-gradient-to-br from-[#2F7E7E] to-[#D4AF37] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Complete Documentation</h3>
              <p className="text-white/80 font-lora">
                Get all the documents you need, prepared with attention to detail and your specific requirements.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-200">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Ongoing Support</h3>
              <p className="text-white/80 font-lora">
                Our team supports you through every stage of your UNA formation and ongoing evolution.
              </p>
            </div>
          </div>
        </div>
      </div>



    </div>
    </>
  );
} 