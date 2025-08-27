import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import Symbol from '../components/Symbol';

export default function Resources() {
  return (
    <>
      <SEOHead
        title="UNA Startup Toolkit"
        description="Your sovereignty-aligned setup path: core UNA services, financial rails, private communications, bookkeeping, protection, and growth platforms."
        keywords={[
          'UNA toolkit',
          'UNA formation tools',
          'sovereignty-aligned tools',
          'UNA resources',
          'UNA formation guidance'
        ]}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "UNA Startup Toolkit",
          "description": "A sovereignty-aligned path for your UNA: tools we trust, direct referrals, and optional services."
        }}
      />
      
      <div className="min-h-screen una-gradient-hero">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
              UNA Startup Toolkit
            </h1>
            <p className="text-xl text-[#1C1F3B] max-w-4xl mx-auto leading-relaxed font-lora">
              This toolkit extends your UNA foundation with optional tools that respect sovereignty. 
              Use what serves your mission. Skip what does not. Your UNA is the core. Everything else is modular.
            </p>
          </div>

          {/* Step 1: Form Your UNA */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-lg">
                <Symbol name="orb" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 1: Form Your UNA</h2>
            </div>
            <p className="text-[#1C1F3B] mb-4 font-lora">
              <strong>Core service:</strong> This is the legal foundation. We do not place affiliate links here.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#C49A6C]/10 rounded-lg p-6 border border-[#C49A6C]/20">
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">UNA Consultation</h3>
                <div className="text-2xl font-bold text-[#C49A6C] mb-2">$250</div>
                <p className="text-[#1C1F3B] text-sm mb-4 font-lora">60-90 minute focused session</p>
                <Link to="/consultation" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  Schedule Session
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
              <div className="bg-[#2F7E7E]/10 rounded-lg p-6 border border-[#2F7E7E]/20">
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">UNA Document Creation & Guidance</h3>
                <div className="text-2xl font-bold text-[#2F7E7E] mb-2">$750</div>
                <p className="text-[#1C1F3B] text-sm mb-4 font-lora">Complete package with documents</p>
                <Link to="/consultation" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
            
            {/* Bundle Offer */}
            <div className="mt-6 bg-gradient-to-r from-[#C49A6C]/20 to-[#2F7E7E]/20 rounded-lg p-4 border border-[#C49A6C]/30">
              <div className="text-center">
                <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Bundle & Save</h4>
                <p className="text-[#1C1F3B] text-sm">
                  Book both services together: <strong>$1000</strong> (save $100)
                </p>
              </div>
            </div>
            
            {/* Ongoing Consultancy */}
            <div className="mt-6 bg-gradient-to-r from-[#7A4CA0]/20 to-[#2F7E7E]/20 rounded-lg p-6 border border-[#7A4CA0]/30">
              <div className="text-center">
                <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Ongoing Consultancy</h4>
                <p className="text-[#1C1F3B] text-sm mb-3 font-lora">
                  Continuing support beyond initial setup. Regular check-ins, compliance reviews, 
                  strategic guidance, and responsive advisory support as your UNA grows.
                </p>
                <div className="text-lg font-semibold text-[#1C1F3B] font-montserrat">
                  Investment varies by engagement
                </div>
                <Link to="/consultation" className="btn-grad btn-primary text-sm px-4 py-2 mt-3">
                  Discuss Ongoing Support
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2: Activate Financial Rails */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-lg">
                <Symbol name="triangle" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 2: Activate Financial Rails</h2>
            </div>
            <p className="text-[#1C1F3B] mb-6 font-lora">
              Choose how money flows without changing who you are. These are neutral rails.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Banking and Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Bluevine</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Online business banking</p>
                    </div>
                    <AffiliateLink partnerId="bluevine" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Novo</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Fee-light business checking</p>
                    </div>
                    <AffiliateLink partnerId="novo" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Wise</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">International transfers</p>
                    </div>
                    <AffiliateLink partnerId="wise" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Crypto Custody</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Ledger</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Hardware wallet for asset custody</p>
                    </div>
                    <AffiliateLink partnerId="ledger" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Trezor</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Hardware wallet for asset custody</p>
                    </div>
                    <AffiliateLink partnerId="trezor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Build Sovereign Operations */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#7A4CA0] to-[#2F7E7E] rounded-lg">
                <Symbol name="hex-eye" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 3: Build Sovereign Operations</h2>
            </div>
            <p className="text-[#1C1F3B] mb-6 font-lora">
              Protect identity and communications. Host what matters.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Private Email and VPN</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Proton Mail and Proton VPN</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Private email and network protection</p>
                    </div>
                    <AffiliateLink partnerId="proton" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Tutanota</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Encrypted email</p>
                    </div>
                    <AffiliateLink partnerId="tutanota" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Mullvad VPN</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Privacy-first VPN</p>
                    </div>
                    <AffiliateLink partnerId="mullvad" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Hosting and Custom Domain Email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">DigitalOcean</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Simple cloud hosting and apps</p>
                    </div>
                    <AffiliateLink partnerId="digitalocean" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Fastmail</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Custom domain email</p>
                    </div>
                    <AffiliateLink partnerId="fastmail" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Manage Money Flow */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#2F7E7E] to-[#C49A6C] rounded-lg">
                <Symbol name="stack" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 4: Manage Money Flow</h2>
            </div>
            <p className="text-[#1C1F3B] mb-6 font-lora">
              Track income and expenses inside your UNA rhythm.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Bookkeeping and Invoicing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">FreshBooks</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Invoicing and bookkeeping</p>
                    </div>
                    <AffiliateLink partnerId="freshbooks" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Xero</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Accounting platform</p>
                    </div>
                    <AffiliateLink partnerId="xero" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Bench</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Done-for-you bookkeeping</p>
                    </div>
                    <AffiliateLink partnerId="bench" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#2F7E7E]/10 rounded-lg border border-[#2F7E7E]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Wave</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Free invoicing and bookkeeping</p>
                    </div>
                    <AffiliateLink partnerId="wave" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Protection and Risk Pooling */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-lg">
                <Symbol name="shield-check" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 5: Protection and Risk Pooling</h2>
            </div>
            <p className="text-[#1C1F3B] mb-6 font-lora">
              Choose protective layers that fit your ethos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Health Share Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#C49A6C]/10 rounded-lg border border-[#C49A6C]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Zion HealthShare</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Community-based medical cost sharing</p>
                    </div>
                    <AffiliateLink partnerId="zion-healthshare" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#C49A6C]/10 rounded-lg border border-[#C49A6C]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Sedera</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Medical cost sharing</p>
                    </div>
                    <AffiliateLink partnerId="sedera" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Liability Coverage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#C49A6C]/10 rounded-lg border border-[#C49A6C]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Next Insurance</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Business liability options</p>
                    </div>
                    <AffiliateLink partnerId="next-insurance" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#C49A6C]/10 rounded-lg border border-[#C49A6C]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Hiscox</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Small business coverage</p>
                    </div>
                    <AffiliateLink partnerId="hiscox" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6: Community, Education, and Growth */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-lg">
                <Symbol name="constellation" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Step 6: Community, Education, and Growth</h2>
            </div>
            <p className="text-[#1C1F3B] mb-6 font-lora">
              Build your mission, educate your members, and diversify revenue.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Community and Education</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Mighty Networks</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Private community hub</p>
                    </div>
                    <AffiliateLink partnerId="mighty-networks" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Podia</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Courses, downloads, memberships</p>
                    </div>
                    <AffiliateLink partnerId="podia" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Thinkific</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Online courses and learning paths</p>
                    </div>
                    <AffiliateLink partnerId="thinkific" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">LearnWorlds</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Learning platform with assessments</p>
                    </div>
                    <AffiliateLink partnerId="learnworlds" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Ghost</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Open-source publishing</p>
                    </div>
                    <AffiliateLink partnerId="ghost" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">Support and Funding</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Patreon</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Recurring member support</p>
                    </div>
                    <AffiliateLink partnerId="patreon" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Buy Me a Coffee</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Simple one-time or recurring support</p>
                    </div>
                    <AffiliateLink partnerId="buymeacoffee" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Wefunder</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Community crowdfunding portal</p>
                    </div>
                    <AffiliateLink partnerId="wefunder" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">Honeycomb</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Small business funding</p>
                    </div>
                    <AffiliateLink partnerId="honeycomb" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#7A4CA0]/10 rounded-lg border border-[#7A4CA0]/20">
                    <div>
                      <h4 className="font-medium text-[#1C1F3B] font-montserrat">CNote</h4>
                      <p className="text-sm text-[#1C1F3B] font-lora">Impact cash and investment platform</p>
                    </div>
                    <AffiliateLink partnerId="cnote" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Referrals */}
          <div className="una-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#2F7E7E] to-[#C49A6C] rounded-lg">
                <Symbol name="orb" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1C1F3B] font-montserrat">Direct Referrals: CPA and Attorney</h2>
            </div>
            <p className="text-[#1C1F3B] mb-6 font-lora">
              For specialized questions and reviews, we provide <strong>direct referrals</strong>.
              These are not affiliates. Contact us to be introduced.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#2F7E7E]/20 rounded-lg p-6 border border-[#2F7E7E]/30">
                <h3 className="font-semibold text-[#2F7E7E] mb-2 font-montserrat">CPA</h3>
                <p className="text-[#2F7E7E] text-sm mb-4 font-lora">By referral through the UNA team</p>
                <Link to="/contact?type=referral&service=cpa" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  Request Referral
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
              <div className="bg-[#2F7E7E]/20 rounded-lg p-6 border border-[#2F7E7E]/30">
                <h3 className="font-semibold text-[#2F7E7E] mb-2 font-montserrat">Attorney</h3>
                <p className="text-[#2F7E7E] text-sm mb-4 font-lora">By referral through the UNA team</p>
                <Link to="/contact?type=referral&service=attorney" className="btn-grad btn-primary text-sm px-4 py-2 w-full text-center">
                  Request Referral
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Reference */}
          <div className="una-card p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[#1C1F3B] mb-4 font-montserrat">Need More Answers?</h2>
              <p className="text-[#1C1F3B] mb-6 font-lora">
                Our comprehensive FAQ covers common questions about UNA formation, 
                legal requirements, and ongoing operations.
              </p>
              <Link to="/faq" className="btn-grad btn-primary px-6 py-3">
                Browse FAQ
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
            </div>
          </div>

          {/* How We Vet Tools */}
          <div className="una-card p-8">
            <h2 className="text-2xl font-semibold text-[#1C1F3B] mb-6 font-montserrat">How We Vet Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-[#C49A6C]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Symbol name="shield-check" size={32} className="text-[#C49A6C]" />
                </div>
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Sovereignty Alignment</h3>
                <p className="text-[#1C1F3B] text-sm font-lora">Supports autonomy and privacy</p>
              </div>
              <div className="text-center">
                <div className="bg-[#C49A6C]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Symbol name="triangle" size={32} className="text-[#C49A6C]" />
                </div>
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Practical Fit</h3>
                <p className="text-[#1C1F3B] text-sm font-lora">Solves a real need for UNA operations</p>
              </div>
              <div className="text-center">
                <div className="bg-[#C49A6C]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Symbol name="constellation" size={32} className="text-[#C49A6C]" />
                </div>
                <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Clear Boundaries</h3>
                <p className="text-[#1C1F3B] text-sm font-lora">Tools extend the UNA; they do not replace it</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-[#1C1F3B] font-lora">
                If a tool does not fit your mission, do not add it. Keep the system light.
              </p>
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
              <Link to="/consultation" className="btn-grad btn-primary">
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