import { Link } from 'react-router-dom';
import { ArrowRight, Users, FileText, Target, ChevronDown, ChevronUp, BookOpen, Clock, Building2 } from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { ResponsiveContainer, ResponsiveText, ResponsiveCard } from '@/components/ui';

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleExpanded = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
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
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Header */}
      <ResponsiveContainer size="default" maxWidth="lg" className="py-16">
        <div className="text-center">
          <ResponsiveText variant="h1" weight="bold" font="montserrat" className="text-white mb-6">
            Professional <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">UNA Formation</span> Services
          </ResponsiveText>

          <ResponsiveText variant="h4" font="lora" className="text-white/90 mb-4">
            Expert support for your <strong className="text-white font-semibold">Unincorporated Nonprofit Association</strong>
            formation. We provide document preparation, strategic guidance, and administrative support
            for UNA formation nationwide.
          </ResponsiveText>

          <ResponsiveText variant="caption" font="lora" className="text-white/70 italic">
            We provide educational information and document preparation services. For legal representation or state-specific advice, contact a licensed attorney.
          </ResponsiveText>
        </div>
      </ResponsiveContainer>

      {/* Services Introduction */}
      <ResponsiveContainer size="default" maxWidth="lg" className="py-12">
        <div className="text-center mb-8">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-4">
            Professional UNA Formation Services
          </ResponsiveText>
          <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 mb-6">
            Specialized expertise for organizations that choose to establish their UNA with clarity and confidence.
          </ResponsiveText>
        </div>
      </ResponsiveContainer>

      {/* Services - Subtle Card Design */}
      <ResponsiveContainer size="default" maxWidth="xl" className="py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Path Exploration */}
          <ResponsiveCard variant="default" className="text-center hover:bg-white/15 transition-all duration-300">
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-3">
                Free Path Exploration
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/80 mb-4">
                Guided assessment to understand your UNA formation options and get personalized strategic insights.
              </ResponsiveText>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/explore"
                className="inline-flex items-center text-white hover:text-[#C49A6C] transition-colors duration-200 font-semibold text-base font-montserrat group"
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
                <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-[#C49A6C] mb-4 block">
                  Free • 15 minutes
                </ResponsiveText>
                <div className="space-y-3 mb-6">
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• 3-step guided assessment</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Mission and impact analysis</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Strategic insights and recommendations</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Resource and next steps guidance</ResponsiveText>
                </div>
                <ResponsiveText variant="captionSmall" font="lora" className="text-white/50 italic">
                  Perfect for groups just starting their UNA formation journey or wanting to understand their options before committing to paid services.
                </ResponsiveText>
              </div>
            )}
          </ResponsiveCard>

          {/* Strategy Session */}
          <ResponsiveCard variant="default" className="text-center hover:bg-white/15 transition-all duration-300">
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#2F7E7E] to-[#D4AF37] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-3">
                Strategy Session
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/80 mb-4">
                Expert one-on-one consultation with strategic planning tailored to your organization's mission, goals, and state requirements.
              </ResponsiveText>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/intake?package=strategy-session"
                className="inline-flex items-center text-white hover:text-[#C49A6C] transition-colors duration-200 font-semibold text-base font-montserrat group"
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
                <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-[#C49A6C] mb-4 block">
                  $1,000 • 90 minutes
                </ResponsiveText>
                <div className="space-y-3 mb-6">
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Pre-session preparation with personalized insights</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Strategic discussion on mission, vision, and governance</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Actionable roadmap with timeline and priorities</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Resource connections and specialized guidance</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Follow-up resources and next steps</ResponsiveText>
                </div>
                <ResponsiveText variant="captionSmall" font="lora" className="text-white/50 italic">
                  Once scheduled, you'll complete a short intake form so we can tailor your consultation to your goals.
                </ResponsiveText>
              </div>
            )}
          </ResponsiveCard>

          {/* Complete Formation Package */}
          <ResponsiveCard variant="default" className="text-center hover:bg-white/15 transition-all duration-300">
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-3">
                Formation Package
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/80 mb-4">
                White-glove UNA formation service with comprehensive documentation, expert guidance, and dedicated support.
              </ResponsiveText>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/intake?package=complete-formation"
                className="inline-flex items-center text-white hover:text-[#C49A6C] transition-colors duration-200 font-semibold text-base font-montserrat group"
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
                <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-[#C49A6C] mb-4 block">
                  $5,000 • Includes Strategy Session
                </ResponsiveText>
                <div className="space-y-3 mb-6">
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Everything in Strategy Session</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Professional document preparation</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• EIN application assistance</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Banking setup guidance</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• 30-day email support</ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/60 block">• Compliance checklist</ResponsiveText>
                </div>
                <div className="p-3 bg-[#C49A6C]/10 border border-[#C49A6C]/20 rounded-lg mb-4">
                  <ResponsiveText variant="caption" weight="medium" font="lora" className="text-[#C49A6C] block">
                    Strategy Session Included
                  </ResponsiveText>
                  <ResponsiveText variant="captionSmall" font="lora" className="text-white/60 mt-1 block">
                    Already completed Strategy Session? Pay only $4,000 more
                  </ResponsiveText>
                </div>
                <ResponsiveText variant="captionSmall" font="lora" className="text-white/50 italic">
                  Your organization deserves formation that reflects its purpose and integrity from day one.
                </ResponsiveText>
              </div>
            )}
          </ResponsiveCard>
        </div>

        {/* Annual Partnership - Contact for Pricing */}
        <ResponsiveCard variant="default" className="mt-16 bg-white/5 border-white/10">
          <div className="text-center mb-8">
            <ResponsiveText variant="h3" weight="normal" font="montserrat" className="text-white mb-4">
              Formation + Annual Partnership
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/70 mb-6 max-w-2xl mx-auto leading-relaxed">
              Build on your completed formation with a full year of dedicated advisory and structural support. Quarterly sessions, priority guidance, and continuous alignment keep your UNA lawful, adaptive, and strong through its first full cycle of operation.
            </ResponsiveText>
            <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-[#D4AF37] mb-8 block">
              Contact for Pricing • Annual Partnership
            </ResponsiveText>
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
        </ResponsiveCard>
      </ResponsiveContainer>


      {/* Why Choose Our Guidance */}
      <ResponsiveContainer size="default" maxWidth="xl" className="py-16">
        <div className="text-center mb-12">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-4">
            Why Choose Our Guidance?
          </ResponsiveText>
          <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 max-w-2xl mx-auto">
            Specialized expertise and personalized support for your UNA formation journey
          </ResponsiveText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ResponsiveCard variant="default" className="text-center hover:bg-white/15 transition-all duration-200">
            <div className="bg-gradient-to-br from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-3">
              Personalized Approach
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/80">
              Every UNA is unique. We tailor our guidance to your specific mission, goals, and situation.
            </ResponsiveText>
          </ResponsiveCard>

          <ResponsiveCard variant="default" className="text-center hover:bg-white/15 transition-all duration-200">
            <div className="bg-gradient-to-br from-[#2F7E7E] to-[#D4AF37] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-3">
              Complete Documentation
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/80">
              Get all the documents you need, prepared with attention to detail and your specific requirements.
            </ResponsiveText>
          </ResponsiveCard>

          <ResponsiveCard variant="default" className="text-center hover:bg-white/15 transition-all duration-200">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-3">
              Ongoing Support
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/80">
              Our team supports you through every stage of your UNA formation and ongoing evolution.
            </ResponsiveText>
          </ResponsiveCard>
        </div>
      </ResponsiveContainer>



    </div>
    </>
  );
}
