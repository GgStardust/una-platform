import { Link } from 'react-router-dom';
import { ExternalLink, Building, CreditCard, FileText, BookOpen, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import { GradientHeader, SectionContainer, GlassCard } from '@/components/ui';

export default function Resources() {
  return (
    <>
      <SEOHead
        title="Recommended Tools & Services for UNA Management"
        description="Trusted tools and services for managing your UNA, including banking, accounting, legal compliance, and organizational tools. Affiliate partners that support our platform."
        keywords={[
          'UNA tools',
          'nonprofit banking',
          'nonprofit accounting software',
          'legal services',
          'UNA management tools'
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <GradientHeader
          title="Recommended Tools & Services"
          subtitle="Trusted partners and resources to help you manage your UNA effectively"
        />

        <SectionContainer>
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Affiliate Disclosure */}
            <GlassCard variant="solid" className="bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1 font-montserrat">Affiliate Disclosure</h3>
                  <p className="text-sm text-blue-800 font-lora">
                    Some of the tools and services listed below are affiliate partners. This means we may earn a commission when you sign up, at no extra cost to you. We only recommend products we genuinely believe will benefit your UNA, and your support helps us maintain this free educational platform.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Banking Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white font-montserrat">Banking Services</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Bluevine</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Business checking account with no monthly fees. Great for UNAs with regular transaction volume.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• No monthly fees</li>
                    <li>• Free ACH transfers</li>
                    <li>• Mobile deposit</li>
                    <li>• 2.0% APY on balances</li>
                  </ul>
                  <AffiliateLink partnerId="bluevine" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Novo</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Simple, modern banking designed for small businesses and nonprofits. Integrates with accounting software.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• $0 monthly fees</li>
                    <li>• Free business debit card</li>
                    <li>• Integrates with QuickBooks</li>
                    <li>• Invoice tools included</li>
                  </ul>
                  <AffiliateLink partnerId="novo" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Wise Business</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Perfect for UNAs with international members or transactions. Multi-currency accounts with low fees.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Multi-currency accounts</li>
                    <li>• Low international fees</li>
                    <li>• Real exchange rates</li>
                    <li>• Business debit card</li>
                  </ul>
                  <AffiliateLink partnerId="wise" />
                </GlassCard>
              </div>
            </div>

            {/* Accounting & Financial Tools */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white font-montserrat">Accounting & Payments</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Wave</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Free accounting software perfect for UNAs. Track income, expenses, and generate financial reports.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• 100% free accounting</li>
                    <li>• Unlimited invoicing</li>
                    <li>• Receipt scanning</li>
                    <li>• Financial reports</li>
                  </ul>
                  <AffiliateLink partnerId="wave" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Stripe</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Accept donations and payments online. Simple integration with your website or payment links.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• 2.9% + $0.30 per transaction</li>
                    <li>• Recurring donations</li>
                    <li>• Donation forms</li>
                    <li>• No monthly fees</li>
                  </ul>
                  <AffiliateLink partnerId="stripe" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Square</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Accept in-person payments at events. Free point-of-sale app with simple hardware options.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Free POS software</li>
                    <li>• 2.6% + $0.10 per tap/swipe</li>
                    <li>• Inventory management</li>
                    <li>• Event ticketing</li>
                  </ul>
                  <AffiliateLink partnerId="square" />
                </GlassCard>
              </div>
            </div>

            {/* Legal & Compliance Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white font-montserrat">Legal Services</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">LegalZoom</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Legal document templates and attorney consultations for ongoing compliance needs.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Legal document templates</li>
                    <li>• Attorney consultations</li>
                    <li>• Business agreements</li>
                    <li>• Trademark services</li>
                  </ul>
                  <AffiliateLink partnerId="legalzoom" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Rocket Lawyer</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    On-demand legal help with document templates and attorney consultations via subscription.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Unlimited legal docs</li>
                    <li>• Attorney consultations</li>
                    <li>• Contract review</li>
                    <li>• $39.99/month</li>
                  </ul>
                  <AffiliateLink partnerId="rocket-lawyer" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Northwest RA</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Registered agent services for states requiring a physical address for legal documents.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Registered agent service</li>
                    <li>• Mail forwarding</li>
                    <li>• Compliance alerts</li>
                    <li>• All 50 states</li>
                  </ul>
                  <AffiliateLink partnerId="northwest-ra" />
                </GlassCard>
              </div>
            </div>

            {/* Organizational Tools */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white font-montserrat">Organizational Tools</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Google Workspace</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Professional email and collaboration tools. Nonprofit discount available.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Custom email domain</li>
                    <li>• 30GB-2TB storage</li>
                    <li>• Google Meet & Calendar</li>
                    <li>• Nonprofit discount</li>
                  </ul>
                  <AffiliateLink partnerId="google-workspace" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Notion</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    All-in-one workspace for documentation, project management, and team collaboration.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Unlimited pages</li>
                    <li>• Team collaboration</li>
                    <li>• Database & wikis</li>
                    <li>• Free for small teams</li>
                  </ul>
                  <AffiliateLink partnerId="notion" />
                </GlassCard>

                <GlassCard variant="outline">
                  <h3 className="text-xl font-semibold text-white mb-3 font-montserrat">Calendly</h3>
                  <p className="text-white/80 mb-4 font-lora text-sm">
                    Scheduling tool for member meetings, consultations, and events. Integrates with calendars.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-4 font-lora">
                    <li>• Automated scheduling</li>
                    <li>• Calendar sync</li>
                    <li>• Team scheduling</li>
                    <li>• Payment integration</li>
                  </ul>
                  <AffiliateLink partnerId="calendly" />
                </GlassCard>
              </div>
            </div>

            {/* Need Help Choosing? CTA */}
            <GlassCard variant="solid" className="bg-gradient-to-r from-[#C49A6C]/20 to-[#2F7E7E]/20 border-[#C49A6C]/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-3 font-montserrat">
                Need Help Choosing the Right Tools?
              </h3>
              <p className="text-white/90 mb-6 font-lora max-w-2xl mx-auto">
                Every UNA has unique needs. Our Strategy Session includes personalized recommendations for banking, accounting, legal, and organizational tools based on your specific situation.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 font-montserrat"
              >
                Book a Strategy Session
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </GlassCard>

            {/* Back to Learning */}
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] font-semibold font-montserrat"
              >
                ← Back to Educational Resources
              </Link>
            </div>
          </div>
        </SectionContainer>
      </div>
    </>
  );
}
