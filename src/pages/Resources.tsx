import { Link } from 'react-router-dom';
import { 
  Shield, 
  Calculator, 
  Users, 
  Target, 
  ArrowRight,
  Lock,
  CreditCard,
  MessageCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';

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
      
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy-900 mb-6">
              UNA Startup Toolkit
            </h1>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto leading-relaxed">
              This toolkit extends your UNA foundation with optional tools that respect sovereignty. 
              Use what serves your mission. Skip what does not. Your UNA is the core. Everything else is modular.
            </p>
          </div>

          {/* Step 1: Form Your UNA */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-gold-500 to-amber-500 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Step 1: Form Your UNA</h2>
            </div>
            <p className="text-navy-600 mb-4">
              <strong>Core service:</strong> This is the legal foundation. We do not place affiliate links here.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gold-50 rounded-lg p-6 border border-gold-200">
                <h3 className="font-semibold text-navy-800 mb-2">UNA Consultation</h3>
                <div className="text-2xl font-bold text-gold-600 mb-2">$250</div>
                <p className="text-navy-600 text-sm mb-4">60-90 minute focused session</p>
                <Link to="/consultation" className="btn-primary text-sm px-4 py-2 w-full text-center">
                  Schedule Session
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
              <div className="bg-navy-50 rounded-lg p-6 border border-navy-200">
                <h3 className="font-semibold text-navy-800 mb-2">UNA Document Creation & Guidance</h3>
                <div className="text-2xl font-bold text-navy-600 mb-2">$750</div>
                <p className="text-navy-600 text-sm mb-4">Complete package with documents</p>
                <Link to="/consultation" className="btn-primary text-sm px-4 py-2 w-full text-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
            
            {/* Bundle Offer */}
            <div className="mt-6 bg-gradient-to-r from-gold-100 to-amber-100 rounded-lg p-4 border border-gold-200">
              <div className="text-center">
                <h4 className="font-semibold text-navy-800 mb-2">Bundle & Save</h4>
                <p className="text-navy-600 text-sm">
                  Book both services together: <strong>$1000</strong> (save $100)
                </p>
              </div>
            </div>
            
            {/* Ongoing Consultancy */}
            <div className="mt-6 bg-gradient-to-r from-navy-100 to-blue-100 rounded-lg p-6 border border-navy-200">
              <div className="text-center">
                <h4 className="font-semibold text-navy-800 mb-2">Ongoing Consultancy</h4>
                <p className="text-navy-600 text-sm mb-3">
                  Continuing support beyond initial setup. Regular check-ins, compliance reviews, 
                  strategic guidance, and responsive advisory support as your UNA grows.
                </p>
                <div className="text-lg font-semibold text-navy-800">
                  Investment varies by engagement
                </div>
                <Link to="/consultation" className="btn-primary text-sm px-4 py-2 mt-3">
                  Discuss Ongoing Support
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2: Activate Financial Rails */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Step 2: Activate Financial Rails</h2>
            </div>
            <p className="text-navy-600 mb-6">
              Choose how money flows without changing who you are. These are neutral rails.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Banking and Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Bluevine</h4>
                      <p className="text-sm text-navy-600">Online business banking</p>
                    </div>
                    <AffiliateLink partnerId="bluevine" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Novo</h4>
                      <p className="text-sm text-navy-600">Fee-light business checking</p>
                    </div>
                    <AffiliateLink partnerId="novo" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Wise</h4>
                      <p className="text-sm text-navy-600">International transfers</p>
                    </div>
                    <AffiliateLink partnerId="wise" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Crypto Custody</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Ledger</h4>
                      <p className="text-sm text-navy-600">Hardware wallet for asset custody</p>
                    </div>
                    <AffiliateLink partnerId="ledger" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Trezor</h4>
                      <p className="text-sm text-navy-600">Hardware wallet for asset custody</p>
                    </div>
                    <AffiliateLink partnerId="trezor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Build Sovereign Operations */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Step 3: Build Sovereign Operations</h2>
            </div>
            <p className="text-navy-600 mb-6">
              Protect identity and communications. Host what matters.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Private Email and VPN</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Proton Mail and Proton VPN</h4>
                      <p className="text-sm text-navy-600">Private email and network protection</p>
                    </div>
                    <AffiliateLink partnerId="proton" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Tutanota</h4>
                      <p className="text-sm text-navy-600">Encrypted email</p>
                    </div>
                    <AffiliateLink partnerId="tutanota" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Mullvad VPN</h4>
                      <p className="text-sm text-navy-600">Privacy-first VPN</p>
                    </div>
                    <AffiliateLink partnerId="mullvad" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Hosting and Custom Domain Email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">DigitalOcean</h4>
                      <p className="text-sm text-navy-600">Simple cloud hosting and apps</p>
                    </div>
                    <AffiliateLink partnerId="digitalocean" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Fastmail</h4>
                      <p className="text-sm text-navy-600">Custom domain email</p>
                    </div>
                    <AffiliateLink partnerId="fastmail" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Manage Money Flow */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Step 4: Manage Money Flow</h2>
            </div>
            <p className="text-navy-600 mb-6">
              Track income and expenses inside your UNA rhythm.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Bookkeeping and Invoicing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">FreshBooks</h4>
                      <p className="text-sm text-navy-600">Invoicing and bookkeeping</p>
                    </div>
                    <AffiliateLink partnerId="freshbooks" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Xero</h4>
                      <p className="text-sm text-navy-600">Accounting platform</p>
                    </div>
                    <AffiliateLink partnerId="xero" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Bench</h4>
                      <p className="text-sm text-navy-600">Done-for-you bookkeeping</p>
                    </div>
                    <AffiliateLink partnerId="bench" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Wave</h4>
                      <p className="text-sm text-navy-600">Free invoicing and bookkeeping</p>
                    </div>
                    <AffiliateLink partnerId="wave" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Protection and Risk Pooling */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Step 5: Protection and Risk Pooling</h2>
            </div>
            <p className="text-navy-600 mb-6">
              Choose protective layers that fit your ethos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Health Share Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Zion HealthShare</h4>
                      <p className="text-sm text-navy-600">Community-based medical cost sharing</p>
                    </div>
                    <AffiliateLink partnerId="zion-healthshare" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Sedera</h4>
                      <p className="text-sm text-navy-600">Medical cost sharing</p>
                    </div>
                    <AffiliateLink partnerId="sedera" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Liability Coverage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Next Insurance</h4>
                      <p className="text-sm text-navy-600">Business liability options</p>
                    </div>
                    <AffiliateLink partnerId="next-insurance" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Hiscox</h4>
                      <p className="text-sm text-navy-600">Small business coverage</p>
                    </div>
                    <AffiliateLink partnerId="hiscox" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6: Community, Education, and Growth */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Step 6: Community, Education, and Growth</h2>
            </div>
            <p className="text-navy-600 mb-6">
              Build your mission, educate your members, and diversify revenue.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Community and Education</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Mighty Networks</h4>
                      <p className="text-sm text-navy-600">Private community hub</p>
                    </div>
                    <AffiliateLink partnerId="mighty-networks" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Podia</h4>
                      <p className="text-sm text-navy-600">Courses, downloads, memberships</p>
                    </div>
                    <AffiliateLink partnerId="podia" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Thinkific</h4>
                      <p className="text-sm text-navy-600">Online courses and learning paths</p>
                    </div>
                    <AffiliateLink partnerId="thinkific" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">LearnWorlds</h4>
                      <p className="text-sm text-navy-600">Learning platform with assessments</p>
                    </div>
                    <AffiliateLink partnerId="learnworlds" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Ghost</h4>
                      <p className="text-sm text-navy-600">Open-source publishing</p>
                    </div>
                    <AffiliateLink partnerId="ghost" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Support and Funding</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Patreon</h4>
                      <p className="text-sm text-navy-600">Recurring member support</p>
                    </div>
                    <AffiliateLink partnerId="patreon" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Buy Me a Coffee</h4>
                      <p className="text-sm text-navy-600">Simple one-time or recurring support</p>
                    </div>
                    <AffiliateLink partnerId="buymeacoffee" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Wefunder</h4>
                      <p className="text-sm text-navy-600">Community crowdfunding portal</p>
                    </div>
                    <AffiliateLink partnerId="wefunder" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">Honeycomb</h4>
                      <p className="text-sm text-navy-600">Small business funding</p>
                    </div>
                    <AffiliateLink partnerId="honeycomb" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-navy-800">CNote</h4>
                      <p className="text-sm text-navy-600">Impact cash and investment platform</p>
                    </div>
                    <AffiliateLink partnerId="cnote" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Referrals */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-navy-900">Direct Referrals: CPA and Attorney</h2>
            </div>
            <p className="text-navy-600 mb-6">
              For specialized questions and reviews, we provide <strong>direct referrals</strong>.
              These are not affiliates. Contact us to be introduced.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">CPA</h3>
                <p className="text-emerald-700 text-sm mb-4">By referral through the UNA team</p>
                <Link to="/contact?type=referral&service=cpa" className="btn-primary text-sm px-4 py-2 w-full text-center">
                  Request Referral
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">Attorney</h3>
                <p className="text-emerald-700 text-sm mb-4">By referral through the UNA team</p>
                <Link to="/contact?type=referral&service=attorney" className="btn-primary text-sm px-4 py-2 w-full text-center">
                  Request Referral
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Reference */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-navy-900 mb-4">Need More Answers?</h2>
              <p className="text-navy-600 mb-6">
                Our comprehensive FAQ covers common questions about UNA formation, 
                legal requirements, and ongoing operations.
              </p>
              <Link to="/faq" className="btn-primary px-6 py-3">
                Browse FAQ
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
            </div>
          </div>

          {/* How We Vet Tools */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">How We Vet Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-navy-600" />
                </div>
                <h3 className="font-semibold text-navy-800 mb-2">Sovereignty Alignment</h3>
                <p className="text-navy-600 text-sm">Supports autonomy and privacy</p>
              </div>
              <div className="text-center">
                <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-navy-600" />
                </div>
                <h3 className="font-semibold text-navy-800 mb-2">Practical Fit</h3>
                <p className="text-navy-600 text-sm">Solves a real need for UNA operations</p>
              </div>
              <div className="text-center">
                <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-navy-600" />
                </div>
                <h3 className="font-semibold text-navy-800 mb-2">Clear Boundaries</h3>
                <p className="text-navy-600 text-sm">Tools extend the UNA; they do not replace it</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-navy-600">
                If a tool does not fit your mission, do not add it. Keep the system light.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your UNA Toolkit?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start with the foundation, then add the tools that serve your mission.
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
