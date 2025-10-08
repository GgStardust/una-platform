import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, Users, Shield, FileText, Target, Clock } from 'lucide-react';
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
            Professional <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">UNA Formation</span> Services
          </h1>
          <p className="text-xl text-white/90 font-lora mb-4">
            Expert support for your <strong className="text-white font-semibold">Unincorporated Nonprofit Association</strong>
            formation. We provide document preparation, strategic guidance, and administrative support
            for UNA formation nationwide.
          </p>
          <p className="text-sm text-white/70 font-lora italic">
            We provide educational information and document preparation services. For legal representation or state-specific advice, contact a licensed attorney.
          </p>
        </div>
      </div>

      {/* Premium Pricing Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
            Professional UNA Formation Services
          </h2>
          <p className="text-lg text-white/90 font-lora mb-6">
            Specialized expertise for organizations that choose to establish their UNA with clarity and confidence.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-[#C49A6C]/40 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-white/90 font-lora text-base">
              <strong className="text-white font-semibold">Why invest in professional formation?</strong> Attorney fees for UNA work typically range from $5,000–$15,000.
              Our services deliver the same precision and assurance at a fraction of the cost,
              with the confidence that comes from specialized UNA expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Services - Minimalist Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-16">
          {/* Free Path Exploration */}
          <div className="border-b border-white/10 pb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-white font-montserrat mb-3">Free Path Exploration</h3>
                <p className="text-white/80 text-lg font-lora leading-relaxed max-w-2xl">
                  Start your UNA formation journey with our guided assessment to understand 
                  your options and get personalized strategic insights.
                </p>
              </div>
              <Link 
                to="/explore" 
                className="text-[#C49A6C] hover:text-[#B8955A] transition-colors duration-200 font-medium text-sm uppercase tracking-wide font-montserrat"
              >
                Start Free →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-white/70 font-lora">
              <div>3-step guided assessment</div>
              <div>Mission and impact analysis</div>
              <div>Strategic insights and recommendations</div>
              <div>Resource and next steps guidance</div>
            </div>
          </div>

          {/* Strategy Session - Payment Enabled */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white font-montserrat">Strategy Session</h3>
            </div>
            <p className="text-white/90 mb-3 md:mb-4 font-lora text-sm md:text-base">
              Expert one-on-one consultation with strategic planning tailored to your organization's mission, goals, and state requirements.
            </p>
            <ul className="text-xs md:text-sm text-white/90 mb-3 md:mb-4 space-y-1 font-lora">
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                60-90 minute personalized session
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Strategic summary and roadmap
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Mission and vision clarity
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                State-specific requirements review
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Follow-up resources
              </li>
            </ul>
            <div className="text-center mb-3 md:mb-4">
              <div className="text-2xl md:text-4xl font-bold text-[#C49A6C] font-montserrat">$1,000</div>
              <div className="text-xs md:text-sm text-white/90 font-lora">90-minute expert consultation</div>
              <div className="text-xs md:text-sm text-white/80 font-lora mt-1 md:mt-2 italic">
                Once scheduled, you'll complete a short intake form so we can tailor your consultation to your goals.
              </div>
            </div>
            <Link
              to="/intake?package=strategy-session"
              className="w-full inline-flex items-center justify-center py-2 md:py-3 px-4 md:px-6 rounded-full font-semibold text-white transition-all duration-200 bg-gradient-to-r from-[#C49A6C] to-[#A67C4A] hover:from-[#B88A5A] hover:to-[#956B3F] hover:shadow-lg font-montserrat text-xs md:text-sm"
            >
              Start Strategy Session
              <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </div>

          {/* Complete Formation Package - $5,000 */}
          <div className="bg-white/10 backdrop-blur-sm border-2 md:border-4 border-[#C49A6C] rounded-2xl p-4 md:p-6 relative">
            <div className="absolute top-0 right-0 bg-[#C49A6C] text-white px-3 md:px-4 py-1 rounded-bl-lg font-bold text-xs md:text-sm">
              BEST VALUE
            </div>
            <div className="flex items-center mb-3 md:mb-4 mt-2">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white font-montserrat">Complete Formation Package</h3>
            </div>
            <p className="text-white/90 mb-3 md:mb-4 font-lora text-sm md:text-base">
              White-glove UNA formation service with comprehensive documentation, expert guidance, and dedicated support.
              Your organization deserves formation that reflects its purpose and integrity from day one.
            </p>
            <ul className="text-xs md:text-sm text-white/90 mb-3 md:mb-4 space-y-1 font-lora">
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Everything in Strategy Session
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Professional document preparation
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                EIN application assistance
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Banking setup guidance
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                30-day email support
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                Compliance checklist
              </li>
            </ul>
            <div className="text-center mb-3 md:mb-4">
              <div className="text-3xl md:text-5xl font-bold text-[#C49A6C] mb-1 md:mb-2 font-montserrat">$5,000</div>
              <div className="text-sm md:text-base text-white/90 font-semibold font-lora">Complete Formation Package</div>
              <div className="mt-2 md:mt-3 p-2 md:p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                <div className="text-xs md:text-sm text-green-300 font-semibold font-lora">Strategy Session Included</div>
                <div className="text-xs md:text-sm text-green-200 font-lora">
                  Already completed Strategy Session? Pay only $4,000 more
                </div>
              </div>
            </div>
            <Link
              to="/intake?package=complete-formation"
              className="w-full inline-flex items-center justify-center py-2 md:py-3 px-4 md:px-6 rounded-full font-semibold text-white transition-all duration-200 bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] hover:from-[#1F6B6B] hover:to-[#6B3F8F] hover:shadow-lg font-montserrat text-xs md:text-sm"
            >
              Start Complete Formation
              <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </div>
        </div>

        {/* Premium Tier - Contact for Pricing */}
        <div className="mt-8 md:mt-12 bg-white/10 backdrop-blur-sm border-2 border-[#7A4CA0] rounded-2xl p-4 md:p-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] text-white px-4 md:px-6 py-1 md:py-2 rounded-full font-bold text-xs md:text-sm mb-3 md:mb-4">
              PREMIUM TIER
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 font-montserrat">Formation + Annual Partnership</h3>
            <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-lg font-lora max-w-3xl mx-auto">
              Our most comprehensive offering: complete formation service with a full year of dedicated advisory support.
              For organizations that want a trusted partner as they establish and grow their UNA.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 text-left">
                <h4 className="font-semibold text-white mb-3 md:mb-4 font-montserrat text-sm md:text-base">Everything in Complete Package, Plus:</h4>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/90 font-lora">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                    Quarterly compliance check-ins (4 sessions)
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                    12 months of email and Slack support
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                    Document amendments included
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-[#C49A6C] mr-2 flex-shrink-0" />
                    Priority response time (24hr)
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 text-left">
                <h4 className="font-semibold text-white mb-3 md:mb-4 font-montserrat text-sm md:text-base">Perfect For:</h4>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/90 font-lora">
                  <li className="flex items-start">
                    <span className="text-[#C49A6C] mr-2 mt-0.5">•</span>
                    Organizations expecting significant growth
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C49A6C] mr-2 mt-0.5">•</span>
                    Groups with complex governance needs
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C49A6C] mr-2 mt-0.5">•</span>
                    Collectives pursuing grants or major funding
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C49A6C] mr-2 mt-0.5">•</span>
                    Teams seeking ongoing clarity and continuity
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <div className="text-2xl md:text-4xl font-bold text-[#C49A6C] mb-1 md:mb-2 font-montserrat">Contact for Pricing</div>
              <div className="text-lg md:text-xl text-white font-semibold font-lora">Complete Formation + Annual Partnership</div>
              <div className="text-sm md:text-base text-white/80 font-lora mt-1 md:mt-2">Your dedicated UNA advisor for the first year</div>
              <div className="text-xs md:text-sm text-white/70 font-lora mt-2 md:mt-3 italic">
                Pricing will be discussed and set based on your specific needs and requirements
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 text-sm md:text-lg rounded-full font-bold text-white transition-all duration-200 bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] hover:from-[#6B3F8F] hover:to-[#B88A5A] hover:shadow-xl font-montserrat"
            >
              Contact for More Information
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Link>

            <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/70 font-lora">
              Ongoing fractional support provided upon request. Contact us to discuss custom support packages beyond the first year.
            </p>
          </div>
        </div>
      </div>

      {/* What's Included in Strategy Session */}
      <div className="py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 font-montserrat">
              What's Included in a Strategy Session
            </h2>
            <p className="text-sm md:text-lg text-white/90 font-lora max-w-2xl mx-auto">
              A comprehensive 90-minute consultation designed to set your UNA up for success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-200">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-[#C49A6C] to-[#2F7E7E] rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2 font-montserrat">Pre-Session Preparation</h3>
                  <p className="text-white/80 text-xs md:text-sm font-lora">
                    We review your Explore results and prepare personalized insights aligned with your organization's purpose and goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-200">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-[#2F7E7E] to-[#7A4CA0] rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2 font-montserrat">Strategic Discussion</h3>
                  <p className="text-white/80 text-xs md:text-sm font-lora">
                    Deep dive into your mission, vision, governance structure, and formation strategy with personalized expert guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-200">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-[#7A4CA0] to-[#C49A6C] rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2 font-montserrat">Actionable Roadmap</h3>
                  <p className="text-white/80 text-xs md:text-sm font-lora">
                    Receive a clear, step-by-step roadmap with timeline and priorities for your UNA formation journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-200">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-[#C49A6C] to-[#7A4CA0] rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2 font-montserrat">Resource Connections</h3>
                  <p className="text-white/80 text-xs md:text-sm font-lora">
                    Access our curated network of UNA formation resources, tools, and specialized service providers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <Link
              to="/intake?package=strategy-session"
              className="inline-flex items-center justify-center px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-200 bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] hover:from-[#B88A5A] hover:to-[#246666] hover:shadow-lg font-montserrat text-sm md:text-base"
            >
              Start Your Strategy Session
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
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
              <div className="bg-gradient-to-br from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Complete Documentation</h3>
              <p className="text-white/80 font-lora">
                Get all the documents you need, prepared with attention to detail and your specific requirements.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-200">
              <div className="bg-gradient-to-br from-[#7A4CA0] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
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