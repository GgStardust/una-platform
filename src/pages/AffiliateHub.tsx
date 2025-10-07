import { useState } from 'react';
import { ExternalLink, Shield, Heart, Users, DollarSign, FileText, CreditCard, Building } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import { GlassCard, GradientHeader, SectionContainer } from '@/components/ui';

interface AffiliateCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  partners: AffiliatePartner[];
}

interface AffiliatePartner {
  id: string;
  name: string;
  description: string;
  category: string;
  bestFor: string;
  cost: string;
  whyChoose: string;
}

const affiliateCategories: AffiliateCategory[] = [
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    description: 'Mission-aligned banking solutions for UNAs',
    icon: <Building className="h-6 w-6" />,
    partners: [
      {
        id: 'bluevine',
        name: 'Bluevine',
        description: 'Business banking with no monthly fees',
        category: 'banking',
        bestFor: 'High transaction volume',
        cost: '$0/month',
        whyChoose: 'No monthly fees, integrates with bookkeeping software'
      },
      {
        id: 'novo',
        name: 'Novo',
        description: 'Fee-light business banking',
        category: 'banking',
        bestFor: 'Simple checking needs',
        cost: '$0/month',
        whyChoose: 'Fee-light, easy setup for associations'
      },
      {
        id: 'wise',
        name: 'Wise',
        description: 'International business banking',
        category: 'banking',
        bestFor: 'International work',
        cost: '$0/month',
        whyChoose: 'Best rates for international transfers'
      }
    ]
  },
  {
    id: 'accounting',
    name: 'Accounting & Payment Processing',
    description: 'Financial management tools for UNAs',
    icon: <DollarSign className="h-6 w-6" />,
    partners: [
      {
        id: 'wave',
        name: 'Wave',
        description: 'Free accounting software',
        category: 'accounting',
        bestFor: 'Basic bookkeeping',
        cost: 'Free',
        whyChoose: 'Free accounting software, perfect for starting out'
      },
      {
        id: 'stripe',
        name: 'Stripe',
        description: 'Online payment processing',
        category: 'accounting',
        bestFor: 'Online payments',
        cost: '2.9% + 30¢',
        whyChoose: 'Industry standard for online donations/payments'
      },
      {
        id: 'square',
        name: 'Square',
        description: 'Point of sale and payments',
        category: 'accounting',
        bestFor: 'In-person payments',
        cost: '2.6% + 10¢',
        whyChoose: 'Point of sale for events and in-person transactions'
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'Legal documentation and compliance tools',
    icon: <FileText className="h-6 w-6" />,
    partners: [
      {
        id: 'legalzoom',
        name: 'LegalZoom',
        description: 'Legal document templates',
        category: 'legal',
        bestFor: 'Legal document templates',
        cost: 'Varies by service',
        whyChoose: 'Affordable legal documents and registered agent services'
      },
      {
        id: 'rocket-lawyer',
        name: 'Rocket Lawyer',
        description: 'Legal subscription service',
        category: 'legal',
        bestFor: 'Legal subscription',
        cost: '$40/month',
        whyChoose: 'Unlimited legal documents and attorney consultations'
      },
      {
        id: 'northwest-ra',
        name: 'Northwest Registered Agent',
        description: 'Privacy-focused registered agent',
        category: 'legal',
        bestFor: 'Registered agent',
        cost: '$125/year',
        whyChoose: 'Privacy-focused registered agent with mail forwarding'
      }
    ]
  },
  {
    id: 'operations',
    name: 'Business Operations',
    description: 'Tools for running your UNA day-to-day',
    icon: <Users className="h-6 w-6" />,
    partners: [
      {
        id: 'google-workspace',
        name: 'Google Workspace',
        description: 'Email and collaboration suite',
        category: 'operations',
        bestFor: 'Email & collaboration',
        cost: '$6/user/month',
        whyChoose: 'Professional email, docs, storage for your domain'
      },
      {
        id: 'notion',
        name: 'Notion',
        description: 'All-in-one workspace',
        category: 'operations',
        bestFor: 'Documentation & wiki',
        cost: 'Free - $8/month',
        whyChoose: 'All-in-one workspace for notes, docs, and databases'
      },
      {
        id: 'calendly',
        name: 'Calendly',
        description: 'Scheduling automation',
        category: 'operations',
        bestFor: 'Scheduling',
        cost: 'Free - $12/month',
        whyChoose: 'Easy scheduling for member meetings and consultations'
      }
    ]
  }
];

export default function AffiliateHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = selectedCategory === 'all' 
    ? affiliateCategories 
    : affiliateCategories.filter(cat => cat.id === selectedCategory);

  return (
    <>
      <SEOHead
        title="UNA Platform Affiliate Hub - Trusted Tools & Services"
        description="Discover mission-aligned tools and services for UNA formation and operations. Banking, legal, accounting, and business tools that support your UNA's success."
        keywords={[
          'UNA formation tools',
          'nonprofit banking',
          'UNA legal services',
          'nonprofit accounting',
          'UNA business tools',
          'mission-aligned services'
        ]}
        ogType="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <GradientHeader
          title="Affiliate Hub"
          subtitle="Trusted tools and services that align with UNA Platform values. These recommendations support your UNA's success while helping sustain our platform."
        />

        <SectionContainer padding="lg" background="transparent">
          {/* Transparency Notice */}
          <div className="max-w-4xl mx-auto mb-12">
            <GlassCard variant="solid" className="border-2 border-[#C49A6C]/30">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#B8955A] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1C1F3B] mb-2 font-montserrat">
                    Transparency & Alignment
                  </h3>
                  <p className="text-[#1C1F3B]/80 font-lora mb-3">
                    Some tools and services we recommend include affiliate partnerships. Using these links supports the UNA Platform at no additional cost to you.
                  </p>
                  <p className="text-[#1C1F3B]/70 text-sm font-lora">
                    We only recommend tools that align with our values of sovereignty, transparency, and mission-driven purpose. Every recommendation has been tested and proven effective for UNA operations.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium font-montserrat transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white shadow-lg'
                    : 'bg-white/20 backdrop-blur text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                All Categories
              </button>
              {affiliateCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium font-montserrat transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white shadow-lg'
                      : 'bg-white/20 backdrop-blur text-white hover:bg-white/30 border border-white/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Affiliate Categories */}
          <div className="space-y-12">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-lg">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white font-montserrat">
                      {category.name}
                    </h2>
                    <p className="text-white/80 font-lora">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.partners.map((partner) => (
                    <GlassCard key={partner.id} variant="solid" className="overflow-hidden hover:shadow-xl transition-shadow duration-200">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-[#1C1F3B] font-montserrat">
                            {partner.name}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-[#1C1F3B]/60" />
                        </div>
                        
                        <p className="text-[#1C1F3B]/80 text-sm mb-4 font-lora">
                          {partner.description}
                        </p>

                        <div className="space-y-2 mb-4 text-xs">
                          <div>
                            <span className="text-[#1C1F3B]/70 font-lora">Best for:</span>
                            <div className="text-[#1C1F3B] font-semibold font-montserrat">{partner.bestFor}</div>
                          </div>
                          <div>
                            <span className="text-[#1C1F3B]/70 font-lora">Cost:</span>
                            <div className="text-[#1C1F3B] font-semibold font-montserrat">{partner.cost}</div>
                          </div>
                        </div>

                        <p className="text-[#1C1F3B]/70 text-xs mb-4 font-lora">
                          {partner.whyChoose}
                        </p>

                        <div className="pt-4 border-t border-[#1C1F3B]/10">
                          <AffiliateLink partnerId={partner.id} />
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Support Notice */}
          <div className="max-w-4xl mx-auto mt-16">
            <GlassCard variant="solid" className="text-center border-2 border-[#2F7E7E]/30">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#246666] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">
                Supporting the UNA Platform
              </h3>
              <p className="text-[#1C1F3B]/80 font-lora mb-4">
                When you use our affiliate links, you're helping sustain the UNA Platform and our mission to make UNA formation accessible to all.
              </p>
              <p className="text-[#1C1F3B]/70 text-sm font-lora">
                Your support enables us to continue providing free resources, educational content, and community support for UNA formation nationwide.
              </p>
            </GlassCard>
          </div>
        </SectionContainer>
      </div>
    </>
  );
}
