import { Link } from 'react-router-dom';
import { ExternalLink, Building, AlertCircle, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import { GradientHeader, SectionContainer, GlassCard, ResponsiveText } from '@/components/ui';
import { getAllAffiliatePartners, getAllBankRecommendations, getAffiliatePartnersByCategory } from '@/lib/affiliate-system';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get all affiliates from backend
  const allAffiliates = getAllAffiliatePartners();
  const allBanks = getAllBankRecommendations();

  // Filter affiliates based on search and category
  const filteredAffiliates = allAffiliates.filter(affiliate => {
    const matchesSearch = searchTerm === '' ||
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.bestFor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || affiliate.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Resources', count: allAffiliates.length },
    { id: 'financial', name: 'Financial Tools', count: getAffiliatePartnersByCategory('financial').length },
    { id: 'legal', name: 'Legal Services', count: getAffiliatePartnersByCategory('legal').length },
    { id: 'tools', name: 'Business Tools', count: getAffiliatePartnersByCategory('tools').length },
    { id: 'insurance', name: 'Insurance', count: getAffiliatePartnersByCategory('insurance').length }
  ];

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
            <GlassCard variant="solid" className="bg-blue-500/10 backdrop-blur-sm border-blue-400/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white mb-1">
                    Affiliate Disclosure
                  </ResponsiveText>
                  <ResponsiveText variant="caption" font="lora" className="text-white/80">
                    Some of the tools and services listed below are affiliate partners. This means we may earn a commission when you sign up, at no extra cost to you. We only recommend products we genuinely believe will benefit your UNA, and your support helps us maintain this free educational platform.
                  </ResponsiveText>
                </div>
              </div>
            </GlassCard>

            {/* Search and Filter */}
            <GlassCard variant="default" className="bg-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                  <select
                    className="w-full md:w-auto pl-10 pr-8 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#C49A6C] appearance-none text-base"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id} className="bg-[#1E2A38] text-white">
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ResponsiveText variant="caption" font="lora" className="text-white/70 text-center block">
                Showing {filteredAffiliates.length} of {allAffiliates.length} resources.
              </ResponsiveText>
            </GlassCard>

            {/* All Resources Grid */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white">
                  All Resources
                </ResponsiveText>
              </div>

              {filteredAffiliates.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAffiliates.map(affiliate => (
                    <GlassCard key={affiliate.id} variant="default">
                      <div className="flex items-center justify-between mb-3">
                        <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white">
                          {affiliate.name}
                        </ResponsiveText>
                        <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-white/70 font-lora">
                          {affiliate.category}
                        </span>
                      </div>
                      <ResponsiveText variant="caption" font="lora" className="text-white/80 mb-4 block">
                        {affiliate.description}
                      </ResponsiveText>
                      <div className="mb-4">
                        <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-white/90 mb-2 block">
                          Key Features:
                        </ResponsiveText>
                        <ul className="text-white/70 text-sm space-y-1 font-lora">
                          {affiliate.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                          {affiliate.features.length > 3 && (
                            <li className="text-white/50 text-xs">+ {affiliate.features.length - 3} more features</li>
                          )}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-white/90 mb-1 block">
                          Best For:
                        </ResponsiveText>
                        <ResponsiveText variant="caption" font="lora" className="text-white/70">
                          {affiliate.bestFor}
                        </ResponsiveText>
                      </div>
                      <AffiliateLink partnerId={affiliate.id} />
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <GlassCard variant="default" className="text-center py-12">
                  <ResponsiveText variant="body" font="lora" className="text-white/70">
                    No resources found matching your criteria. Try adjusting your search or filter.
                  </ResponsiveText>
                </GlassCard>
              )}
            </div>

            {/* Banking Services (from bankRecommendations) */}
            {allBanks.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white">
                    Banking Services
                  </ResponsiveText>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allBanks.map(bank => (
                    <GlassCard key={bank.id} variant="default">
                      <div className="flex items-center justify-between mb-3">
                        <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white">
                          {bank.name}
                        </ResponsiveText>
                        <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-white/70 font-lora">
                          {bank.type.replace('-', ' ')}
                        </span>
                      </div>
                      <ResponsiveText variant="caption" font="lora" className="text-white/80 mb-4 block">
                        {bank.mission}
                      </ResponsiveText>
                      <div className="mb-4">
                        <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-white/90 mb-2 block">
                          Key Features:
                        </ResponsiveText>
                        <ul className="text-white/70 text-sm space-y-1 font-lora">
                          {bank.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <ResponsiveText variant="caption" weight="medium" font="montserrat" className="text-white/90 mb-1 block">
                          Notes:
                        </ResponsiveText>
                        <ResponsiveText variant="caption" font="lora" className="text-white/70">
                          {bank.notes}
                        </ResponsiveText>
                      </div>
                      {bank.affiliateLink ? (
                        <a
                          href={bank.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] transition-colors duration-200 font-medium text-sm font-montserrat"
                        >
                          Learn More
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      ) : (
                        <a
                          href={bank.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] transition-colors duration-200 font-medium text-sm font-montserrat"
                        >
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Need Help Choosing? CTA */}
            <GlassCard variant="solid" className="bg-gradient-to-r from-[#C49A6C]/80 to-[#2F7E7E]/80 backdrop-blur-md border-[#C49A6C]/50 text-center">
              <ResponsiveText variant="h3" weight="bold" font="montserrat" className="text-white mb-3">
                Need Help Choosing the Right Tools?
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/95 mb-6 max-w-2xl mx-auto block">
                Every UNA has unique needs. Our Strategy Session includes personalized recommendations for banking, accounting, legal, and organizational tools based on your specific situation.
              </ResponsiveText>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1E2A38] rounded-full font-semibold hover:shadow-lg transition-all duration-200 font-montserrat hover:bg-white/90"
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
