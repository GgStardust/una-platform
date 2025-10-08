import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import Symbol from '../components/Symbol';
import { GlassCard, GradientHeader, SectionContainer } from '@/components/ui';

interface ExploreData {
  state: string;
  readiness: {
    hasMembers: boolean | null;
    hasBylaws: boolean | null;
    hasEIN: boolean | null;
    needsEINHelp: boolean | null;
    needsBanking: boolean | null;
  };
  timestamp: number;
}

export default function Toolkit() {
  const [exploreData, setExploreData] = useState<ExploreData | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleExpanded = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  useEffect(() => {
    // Check for Explore assessment data
    const storedData = localStorage.getItem('exploreData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData) as ExploreData;
        // Check if data is less than 30 days old
        const daysSinceAssessment = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
        if (daysSinceAssessment < 30) {
          setExploreData(data);
          setIsPersonalized(true);
        }
      } catch (error) {
        console.error('Error parsing explore data:', error);
      }
    }
  }, []);

  return (
    <>
      <SEOHead
        title="UNA Formation Toolkit - Complete Guide for All 50 States"
        description="Complete UNA formation toolkit with state-specific guidance, consulting services, and essential tools. Formation guidance for all 50 states with legal research and business experience."
        keywords={[
          'UNA formation toolkit',
          'UNA formation all states',
          'UNA formation guidance',
          'UNA formation consulting',
          'UNA formation requirements',
          'unincorporated nonprofit association formation'
        ]}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "UNA Formation Toolkit",
          "description": "Complete UNA formation guidance and tools for all 50 states with consulting services and affiliate resources."
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <GradientHeader
          title="UNA Formation Toolkit"
          subtitle="Complete formation guidance for all 50 states. Begin with your free assessment, receive personalized guidance, and access trusted tools for your UNA formation journey."
        />

        <SectionContainer>
          <div className="max-w-6xl mx-auto space-y-8">


            {/* No Assessment Banner */}
            {!isPersonalized && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <p className="text-white/90 font-lora mb-4">
                  Receive personalized tool recommendations for your UNA.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 font-montserrat"
                >
                  Take Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-[#C49A6C]/20 backdrop-blur-sm border border-[#C49A6C]/30 text-white rounded-full text-base font-medium font-montserrat">
                All 50 States Covered
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-base font-medium font-montserrat">
                Legal Research + Business Experience
              </span>
              <span className="px-4 py-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 text-white rounded-full text-base font-medium font-montserrat">
                No Attorney Required for Basic Formation
              </span>
            </div>


          {/* Step 1: Find Your UNA Formation Path */}
          <div className="text-center mb-8">
            <p className="text-white/80 font-lora italic text-lg">
              Every UNA begins with clarity. This first step helps you locate your starting point.
            </p>
          </div>
          <GlassCard variant="solid">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-lg">
                  <Symbol name="orb" size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 1: Find Your UNA Formation Path</h2>
              </div>
              <button
                onClick={() => toggleExpanded('step1')}
                className="text-[#1C1F3B]/60 hover:text-[#1C1F3B]/80 transition-colors duration-200"
              >
                {expandedStep === 'step1' ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <p className="text-[#1C1F3B]/80 mb-6 font-lora">
              Begin with your free assessment to clarify your state's requirements and receive personalized guidance for your UNA formation journey.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#C49A6C]/10 rounded-lg p-6 border border-[#C49A6C]/30">
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Free Path Exploration</h3>
                <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Take our 4-step assessment to understand your UNA formation options and get strategic insights.</p>
                <Link to="/explore" className="inline-flex items-center justify-center bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 w-full font-montserrat">
                  Start Your UNA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="bg-[#2F7E7E]/10 rounded-lg p-6 border border-[#2F7E7E]/30">
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">State Requirements Guide</h3>
                <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Research-based guidance for UNA formation in all 50 states. No attorney required for basic formation.</p>
                <Link to="/blog/top-10-states-una-requirements" className="inline-flex items-center justify-center bg-gradient-to-r from-[#2F7E7E] to-[#246666] text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 w-full font-montserrat">
                  View State Requirements Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Step 2: Get Professional Guidance */}
          <div className="text-center mb-8">
            <p className="text-white/80 font-lora italic text-lg">
              Once your vision is defined, structure gives it form.
            </p>
          </div>
          <GlassCard variant="solid">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-[#2F7E7E] to-[#D4AF37] rounded-lg">
                  <Symbol name="triangle" size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 2: Get Professional Guidance</h2>
              </div>
              <button
                onClick={() => toggleExpanded('step2')}
                className="text-[#1C1F3B]/60 hover:text-[#1C1F3B]/80 transition-colors duration-200"
              >
                {expandedStep === 'step2' ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <p className="text-[#1C1F3B]/80 mb-6 font-lora">
              Access personalized consulting and document preparation services based on your state's specific requirements and your UNA's needs.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Strategy Session */}
              <div className="bg-gradient-to-br from-[#C49A6C]/10 to-[#2F7E7E]/10 rounded-lg p-6 border-2 border-[#C49A6C]/30">
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-3 font-montserrat">Strategy Session</h3>
                <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">
                  <strong>What you get:</strong> 90-minute expert consultation with personalized formation guidance, strategic roadmap, and state-specific requirements review.
                </p>
                <p className="text-[#1C1F3B]/70 text-xs mb-4 font-lora">
                  <strong>Who it's for:</strong> Groups who want expert guidance before starting their UNA formation
                </p>
              </div>

              {/* Formation Package */}
              <div className="bg-gradient-to-br from-[#2F7E7E]/10 to-[#D4AF37]/10 rounded-lg p-6 border-2 border-[#2F7E7E]/40">
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-3 font-montserrat">Formation Package</h3>
                <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">
                  <strong>What you get:</strong> Complete UNA formation with essential UNA Agreement, professional document preparation, EIN application assistance, banking setup guidance, and 30-day support.
                </p>
                <p className="text-[#1C1F3B]/70 text-xs mb-4 font-lora">
                  <strong>Who it's for:</strong> Organizations that want full formation support with all essential legal documents
                </p>
              </div>

              {/* Formation + Annual Partnership */}
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#C49A6C]/10 rounded-lg p-6 border-2 border-[#D4AF37]/40">
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-3 font-montserrat">Formation + Annual Partnership</h3>
                <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">
                  <strong>What you get:</strong> Complete formation service (including essential UNA Agreement) plus 12 months of ongoing advisory support with quarterly check-ins, priority guidance, and document amendments.
                </p>
                <p className="text-[#1C1F3B]/70 text-xs mb-4 font-lora">
                  <strong>Who it's for:</strong> Organizations planning long-term growth who want a trusted formation partner
                </p>
              </div>
            </div>

            {/* Unified CTA */}
            <div className="mt-8 text-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-200 font-montserrat"
              >
                View All Services & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {expandedStep === 'step2' && (
              <div className="mt-8 pt-6 border-t border-[#1C1F3B]/10">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1C1F3B] font-montserrat">Strategy Session Includes:</h4>
                    <ul className="space-y-2 text-sm text-[#1C1F3B]/80 font-lora">
                      <li className="flex items-start">
                        <span className="text-[#C49A6C] mr-2">✓</span>
                        60-90 minute personalized session
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C49A6C] mr-2">✓</span>
                        Strategic summary and roadmap
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C49A6C] mr-2">✓</span>
                        State-specific requirements review
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C49A6C] mr-2">✓</span>
                        Follow-up resources
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1C1F3B] font-montserrat">Formation Package Includes:</h4>
                    <ul className="space-y-2 text-sm text-[#1C1F3B]/80 font-lora">
                      <li className="flex items-start">
                        <span className="text-[#2F7E7E] mr-2">✓</span>
                        Everything in Strategy Session
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2F7E7E] mr-2">✓</span>
                        Professional document prep
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2F7E7E] mr-2">✓</span>
                        EIN application assistance
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2F7E7E] mr-2">✓</span>
                        Banking setup guidance
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2F7E7E] mr-2">✓</span>
                        30-day email support
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1C1F3B] font-montserrat">Annual Partnership Includes:</h4>
                    <ul className="space-y-2 text-sm text-[#1C1F3B]/80 font-lora">
                      <li className="flex items-start">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        Everything in Formation Package
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        Quarterly compliance check-ins
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        12 months email/Slack support
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        Document amendments included
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        Priority response time
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Step 3: Build Your Infrastructure */}
          <div className="text-center mb-8">
            <p className="text-white/80 font-lora italic text-lg">
              Here, your association takes shape in the material world.
            </p>
          </div>
          <GlassCard variant="solid">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-[#D4AF37] to-[#2F7E7E] rounded-lg">
                  <Symbol name="triangle" size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 3: Build Your Infrastructure</h2>
              </div>
              <button
                onClick={() => toggleExpanded('step3')}
                className="text-[#1C1F3B]/60 hover:text-[#1C1F3B]/80 transition-colors duration-200"
              >
                {expandedStep === 'step3' ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <p className="text-[#1C1F3B]/80 mb-8 font-lora text-lg">
              Set up the essential tools and services your UNA needs to operate effectively. Each UNA operates best with a dedicated bank account and supporting infrastructure.
            </p>

            {!expandedStep || expandedStep !== 'step3' ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#2F7E7E]/10 rounded-lg p-6 border border-[#2F7E7E]/30">
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Essential Banking</h3>
                  <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Bluevine, Novo, and Wise for UNA-friendly banking solutions</p>
                  <div className="text-sm text-[#1C1F3B]/70 font-lora">Starting at $0/month</div>
                </div>
                <div className="bg-[#D4AF37]/10 rounded-lg p-6 border border-[#D4AF37]/30">
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Business Tools</h3>
                  <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Wave, Stripe, Google Workspace, and Notion for operations</p>
                  <div className="text-sm text-[#1C1F3B]/70 font-lora">Free to $40/month</div>
                </div>
              </div>
            ) : (
              <>
                {/* 1. Financial - Banking */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-[#1C1F3B] mb-4 font-montserrat flex items-center">
                <span className="bg-[#2F7E7E] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Financial: Banking & Accounts
              </h3>
              <p className="text-[#1C1F3B]/70 mb-6 font-lora">
                Each UNA operates best with a dedicated bank account to receive funds, pay expenses, and maintain financial records. These platforms work with UNAs and don't require 501(c)(3) status.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#2F7E7E]/20">
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Service</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Best For</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Monthly Cost</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Why UNAs Choose This</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1F3B]/10">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Bluevine</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">High transaction volume</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$0</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">No monthly fees, integrates with bookkeeping software</td>
                      <td className="p-4"><AffiliateLink partnerId="bluevine" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Novo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Simple checking needs</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$0</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Fee-light, easy setup for associations</td>
                      <td className="p-4"><AffiliateLink partnerId="novo" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Wise</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">International work</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$0</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Best rates for international transfers</td>
                      <td className="p-4"><AffiliateLink partnerId="wise" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Accounting - Bookkeeping & Payment Processing */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-[#1C1F3B] mb-4 font-montserrat flex items-center">
                <span className="bg-[#D4AF37] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Accounting: Bookkeeping & Payment Processing
              </h3>
              <p className="text-[#1C1F3B]/70 mb-6 font-lora">
                Track income and expenses, accept donations or payments, and maintain organized financial records for your UNA.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#D4AF37]/20">
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Service</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Best For</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Cost</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Why UNAs Choose This</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1F3B]/10">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Wave</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Basic bookkeeping</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Free</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Free accounting software, perfect for starting out</td>
                      <td className="p-4"><AffiliateLink partnerId="wave" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Stripe</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Online payments</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">2.9% + 30¢</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Industry standard for online donations/payments</td>
                      <td className="p-4"><AffiliateLink partnerId="stripe" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Square</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">In-person payments</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">2.6% + 10¢</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Point of sale for events and in-person transactions</td>
                      <td className="p-4"><AffiliateLink partnerId="square" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Operational - Business Tools */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-[#1C1F3B] mb-4 font-montserrat flex items-center">
                <span className="bg-[#C49A6C] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Operational: Business & Communication Tools
              </h3>
              <p className="text-[#1C1F3B]/70 mb-6 font-lora">
                Essential tools for running your UNA's day-to-day operations, from email to project management.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#C49A6C]/20">
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Service</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Best For</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Cost</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Why UNAs Choose This</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1F3B]/10">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Google Workspace</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Email & collaboration</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$6/user/mo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Professional email, docs, storage for your domain</td>
                      <td className="p-4"><AffiliateLink partnerId="google-workspace" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Notion</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Documentation & wiki</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Free - $8/mo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">All-in-one workspace for notes, docs, and databases</td>
                      <td className="p-4"><AffiliateLink partnerId="notion" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Calendly</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Scheduling</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Free - $12/mo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Easy scheduling for member meetings and consultations</td>
                      <td className="p-4"><AffiliateLink partnerId="calendly" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Legal & Compliance */}
            <div>
              <h3 className="text-xl font-bold text-[#1C1F3B] mb-4 font-montserrat flex items-center">
                <span className="bg-[#1C1F3B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
                Legal: Compliance & Protection
              </h3>
              <p className="text-[#1C1F3B]/70 mb-6 font-lora">
                Protect your UNA with proper legal documentation and compliance tools.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#1C1F3B]/20">
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Service</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Best For</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Cost</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Why UNAs Choose This</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1F3B]/10">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">LegalZoom</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Legal document templates</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Varies by service</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Affordable legal documents and registered agent services</td>
                      <td className="p-4"><AffiliateLink partnerId="legalzoom" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Rocket Lawyer</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Legal subscription</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$40/mo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Unlimited legal documents and attorney consultations</td>
                      <td className="p-4"><AffiliateLink partnerId="rocket-lawyer" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Northwest Registered Agent</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Registered agent</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$125/year</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Privacy-focused registered agent with mail forwarding</td>
                      <td className="p-4"><AffiliateLink partnerId="northwest-ra" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Affiliate Disclosure */}
            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <p className="text-sm text-white/70 font-lora text-center">
                Some listed tools are affiliate partners that align with UNA Platform values. Your use supports platform development at no additional cost.
              </p>
            </div>
              </>
            )}
          </GlassCard>

          {/* Step 4: Growth & Community Resources */}
          <div className="text-center mb-8">
            <p className="text-white/80 font-lora italic text-lg">
              As your UNA grows, support and community keep the field coherent.
            </p>
          </div>
          <GlassCard variant="solid">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-[#D4AF37] to-[#C49A6C] rounded-lg">
                  <Symbol name="constellation" size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 4: Growth & Community Resources</h2>
              </div>
              <button
                onClick={() => toggleExpanded('step4')}
                className="text-[#1C1F3B]/60 hover:text-[#1C1F3B]/80 transition-colors duration-200"
              >
                {expandedStep === 'step4' ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <p className="text-[#1C1F3B]/80 mb-8 font-lora text-lg">
              Connect with community, access ongoing education, and engage professional support as your UNA evolves.
            </p>

            {!expandedStep || expandedStep !== 'step4' ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#D4AF37]/10 rounded-lg p-6 border border-[#D4AF37]/30">
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Learning & Development</h3>
                  <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Coursera, Udemy, and LinkedIn Learning for business skills</p>
                  <div className="text-sm text-[#1C1F3B]/70 font-lora">Free to $59/month</div>
                </div>
                <div className="bg-[#C49A6C]/10 rounded-lg p-6 border border-[#C49A6C]/30">
                  <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Professional Support</h3>
                  <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Ongoing guidance and custom solutions for your UNA</p>
                  <div className="text-sm text-[#1C1F3B]/70 font-lora">Contact for pricing</div>
                </div>
              </div>
            ) : (
              <>
                {/* Community & Education */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-[#1C1F3B] mb-4 font-montserrat flex items-center">
                <span className="bg-[#D4AF37] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Community & Education
              </h3>
              <p className="text-[#1C1F3B]/70 mb-6 font-lora">
                Learn from others, stay up-to-date on best practices, and connect with the UNA community.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#D4AF37]/20">
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Resource</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Best For</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Cost</th>
                      <th className="p-4 text-left font-semibold text-[#1C1F3B] font-montserrat">Why UNAs Choose This</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1F3B]/10">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Coursera</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Business education</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Free - $59/mo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Business, finance, and management courses</td>
                      <td className="p-4"><AffiliateLink partnerId="coursera" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">Udemy</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Specific skills</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$15-$200/course</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">On-demand courses for marketing, operations, and more</td>
                      <td className="p-4"><AffiliateLink partnerId="udemy" /></td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-semibold text-[#1C1F3B] font-montserrat">LinkedIn Learning</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Professional development</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">$40/mo</td>
                      <td className="p-4 text-[#1C1F3B]/80 font-lora text-sm">Business skills and leadership training</td>
                      <td className="p-4"><AffiliateLink partnerId="linkedin-learning" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Professional Support */}
            <div>
              <h3 className="text-xl font-bold text-[#1C1F3B] mb-4 font-montserrat flex items-center">
                <span className="bg-[#C49A6C] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Professional Guidance & Support
              </h3>
              <p className="text-[#1C1F3B]/70 mb-6 font-lora">
                Professional support when you need it most. Our team can help with strategy, compliance, and ongoing operations.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#D4AF37]/10 rounded-lg p-6 border border-[#D4AF37]/30">
                  <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Formation Services</h4>
                  <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">White-glove formation support from strategy session to complete setup.</p>
                  <div className="text-lg font-semibold text-[#D4AF37] font-montserrat mb-2">
                    Contact for Pricing
                  </div>
                  <p className="text-[#1C1F3B]/70 text-xs mb-4 font-lora italic">
                    Pricing will be discussed and set based on your specific needs
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 w-full font-montserrat"
                  >
                    Contact for More Information
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-[#C49A6C]/10 rounded-lg p-6 border border-[#C49A6C]/30">
                  <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Get in Touch</h4>
                  <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">Questions about your UNA? Want a personalized consultation? Let's talk.</p>
                  <div className="text-sm text-[#1C1F3B]/80 font-lora mb-4">
                    • Strategic planning<br/>
                    • Compliance questions<br/>
                    • Custom solutions
                  </div>
                  <Link to="/contact" className="inline-flex items-center justify-center bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 w-full font-montserrat">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
              </>
            )}
          </GlassCard>

          </div>
        </SectionContainer>
      </div>
    </>
  );
}
