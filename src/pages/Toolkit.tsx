import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import Symbol from '../components/Symbol';

export default function Toolkit() {
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
      
      <div className="min-h-screen bg-[#F4F1E8]">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
              UNA Formation Toolkit
            </h1>
            <p className="text-xl text-[#1C1F3B] max-w-4xl mx-auto leading-relaxed font-lora">
              Complete formation guidance for all 50 states. Start with our free assessment, 
              get personalized consulting, and access essential tools for your UNA journey.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-[#C49A6C]/10 text-[#C49A6C] rounded-full text-sm font-medium">
                All 50 States Covered
              </span>
              <span className="px-4 py-2 bg-[#2F7E7E]/10 text-[#2F7E7E] rounded-full text-sm font-medium">
                Legal Research + Business Experience
              </span>
              <span className="px-4 py-2 bg-[#7A4CA0]/10 text-[#7A4CA0] rounded-full text-sm font-medium">
                No Attorney Required for Basic Formation
              </span>
            </div>
            
            {/* PDF Download Section */}
            <div className="mt-8 text-center">
              <a
                href="/assets/una-formation-guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center btn-grad btn-primary px-8 py-4 text-lg font-montserrat"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Download Complete UNA Formation Guide (PDF)
              </a>
            </div>
          </div>

          {/* Step 1: Find Your UNA Formation Path */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-lg">
                <Symbol name="orb" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-montserrat">Step 1: Find Your UNA Formation Path</h2>
            </div>
            <p className="text-white/90 mb-6 font-lora">
              Start with our free assessment to understand your state's requirements and get personalized guidance for your UNA formation journey.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#C49A6C]/20 rounded-lg p-6 border border-[#C49A6C]/30">
                <h3 className="font-semibold text-white mb-2 font-montserrat">Free Path Exploration</h3>
                <p className="text-white text-sm mb-4 font-lora">Take our 4-step assessment to understand your UNA formation options and get strategic insights.</p>
                <Link to="/explore" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
              <div className="bg-[#2F7E7E]/20 rounded-lg p-6 border border-[#2F7E7E]/30">
                <h3 className="font-semibold text-white mb-2 font-montserrat">State Requirements Guide</h3>
                <p className="text-white text-sm mb-4 font-lora">Research-based guidance for UNA formation in all 50 states. No attorney required for basic formation.</p>
                <Link to="/blog" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  View State Guides
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2: Get Professional Guidance */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-lg">
                <Symbol name="triangle" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-montserrat">Step 2: Get Professional Guidance</h2>
            </div>
            <p className="text-white/90 mb-6 font-lora">
              Get personalized consulting and document creation services based on your state's specific requirements and your UNA's needs.
            </p>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#C49A6C]/20 to-[#2F7E7E]/20 rounded-lg p-8 border border-[#C49A6C]/30 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4 font-montserrat">Professional UNA Formation Services</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-[#C49A6C] mb-2">$250</div>
                    <p className="text-white text-sm font-lora">Strategy Session</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#2F7E7E] mb-2">$750</div>
                    <p className="text-white text-sm font-lora">Document Creation</p>
                  </div>
                </div>
                <p className="text-white text-sm mb-6 font-lora">
                  Bundle both services for <strong>$1000</strong> (save $100)
                </p>
                <Link to="/services" className="btn-grad btn-primary text-lg px-8 py-3">
                  View All Services & Pricing
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 3: Activate Financial Rails */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#7A4CA0] to-[#2F7E7E] rounded-lg">
                <Symbol name="triangle" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-montserrat">Step 3: Activate Financial Rails</h2>
            </div>
            <p className="text-white/90 mb-6 font-lora">
              Choose how money flows without changing who you are. These are neutral rails.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-montserrat">Banking and Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/20 rounded-lg border border-[#2F7E7E]/30">
                    <div>
                      <h4 className="font-medium text-white font-montserrat">Bluevine</h4>
                      <p className="text-sm text-white font-lora">Online business banking</p>
                    </div>
                    <AffiliateLink partnerId="bluevine" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/20 rounded-lg border border-[#2F7E7E]/30">
                    <div>
                      <h4 className="font-medium text-white font-montserrat">Novo</h4>
                      <p className="text-sm text-white font-lora">Fee-light business checking</p>
                    </div>
                    <AffiliateLink partnerId="novo" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/20 rounded-lg border border-[#2F7E7E]/30">
                    <div>
                      <h4 className="font-medium text-white font-montserrat">Wise</h4>
                      <p className="text-sm text-white font-lora">International transfers</p>
                    </div>
                    <AffiliateLink partnerId="wise" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-montserrat">Bookkeeping and Payments</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/20 rounded-lg border border-[#2F7E7E]/30">
                    <div>
                      <h4 className="font-medium text-white font-montserrat">Wave</h4>
                      <p className="text-sm text-white font-lora">Free accounting software</p>
                    </div>
                    <AffiliateLink partnerId="wave" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/20 rounded-lg border border-[#2F7E7E]/30">
                    <div>
                      <h4 className="font-medium text-white font-montserrat">Stripe</h4>
                      <p className="text-sm text-white font-lora">Payment processing</p>
                    </div>
                    <AffiliateLink partnerId="stripe" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/20 rounded-lg border border-[#2F7E7E]/30">
                    <div>
                      <h4 className="font-medium text-white font-montserrat">Square</h4>
                      <p className="text-sm text-white font-lora">Point of sale and payments</p>
                    </div>
                    <AffiliateLink partnerId="square" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Ongoing Support & Expert Network */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-lg">
                <Symbol name="constellation" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-montserrat">Step 4: Ongoing Support & Expert Network</h2>
            </div>
            <p className="text-white/90 mb-6 font-lora">
              Get ongoing support for your UNA and access to our network of legal and financial experts when you need specialized guidance.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#7A4CA0]/20 rounded-lg p-6 border border-[#7A4CA0]/30">
                <h3 className="font-semibold text-white mb-2 font-montserrat">Ongoing Consultancy</h3>
                <p className="text-white text-sm mb-4 font-lora">Continuing support beyond initial setup. Regular check-ins, compliance reviews, and strategic guidance as your UNA grows.</p>
                <div className="text-lg font-semibold text-white font-montserrat mb-4">
                  Investment varies by engagement
                </div>
                <Link 
                  to="/services"
                  className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center"
                >
                  Discuss Ongoing Support
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
              <div className="bg-[#C49A6C]/20 rounded-lg p-6 border border-[#C49A6C]/30">
                <h3 className="font-semibold text-white mb-2 font-montserrat">Expert Referral Network</h3>
                <p className="text-white text-sm mb-4 font-lora">Expert referrals available upon request. Provided as an add-on outside core packages.</p>
                <div className="text-sm text-white font-lora mb-4">
                  • Attorneys for complex legal matters<br/>
                  • CPAs for tax and accounting<br/>
                  • Business consultants for growth
                </div>
                <Link to="/contact" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  Request Referral
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Ready to Build Your UNA Toolkit?</h2>
            <p className="text-xl mb-6 opacity-90 font-lora">
              Start with the foundation, then add the tools that serve your mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="btn-grad btn-secondary">
                Explore Your Path
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
              <Link to="/services" className="btn-grad btn-primary">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
