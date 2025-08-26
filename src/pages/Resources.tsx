import { ExternalLink, Building2, Scale, Calculator, Shield, Zap, Star } from 'lucide-react';

interface AffiliateResource {
  id: string;
  name: string;
  description: string;
  whyRecommend: string;
  category: 'banking' | 'legal' | 'accounting' | 'insurance' | 'productivity';
  logo: string;
  affiliateUrl: string;
  rating: number;
}

const affiliateResources: AffiliateResource[] = [
  {
    id: 'chase-business',
    name: 'Chase Business Banking',
    description: 'Comprehensive business banking solutions with dedicated support for small businesses and nonprofits.',
    whyRecommend: 'Excellent UNA-friendly banking options with low fees and robust online tools.',
    category: 'banking',
    logo: '🏦',
    affiliateUrl: 'https://www.chase.com/business',
    rating: 4.8
  },
  {
    id: 'legalzoom',
    name: 'LegalZoom',
    description: 'Online legal services for business formation, contracts, and legal document preparation.',
    whyRecommend: 'Streamlined legal services that work well with UNA formation and ongoing compliance.',
    category: 'legal',
    logo: '⚖️',
    affiliateUrl: 'https://www.legalzoom.com',
    rating: 4.6
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    description: 'Cloud-based accounting software designed for small businesses and nonprofits.',
    whyRecommend: 'Perfect for UNA financial tracking with easy reporting and tax preparation.',
    category: 'accounting',
    logo: '📊',
    affiliateUrl: 'https://quickbooks.intuit.com',
    rating: 4.7
  },
  {
    id: 'hiscox',
    name: 'Hiscox Business Insurance',
    description: 'Specialized insurance coverage for small businesses, nonprofits, and professional services.',
    whyRecommend: 'Comprehensive coverage options that understand the unique needs of UNA organizations.',
    category: 'insurance',
    logo: '🛡️',
    affiliateUrl: 'https://www.hiscox.com',
    rating: 4.5
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, project management, and team collaboration.',
    whyRecommend: 'Excellent for UNA governance documentation, member communication, and project tracking.',
    category: 'productivity',
    logo: '📝',
    affiliateUrl: 'https://www.notion.so',
    rating: 4.9
  },
  {
    id: 'credit-union',
    name: 'Local Credit Unions',
    description: 'Community-focused financial institutions often more supportive of local organizations.',
    whyRecommend: 'Better rates and more personal service for UNA banking needs.',
    category: 'banking',
    logo: '🏛️',
    affiliateUrl: 'https://www.findacreditunion.com',
    rating: 4.7
  },
  {
    id: 'nolo',
    name: 'Nolo Legal Guides',
    description: 'Self-help legal books and software for business formation and compliance.',
    whyRecommend: 'Comprehensive legal information to help you understand UNA requirements.',
    category: 'legal',
    logo: '📚',
    affiliateUrl: 'https://www.nolo.com',
    rating: 4.4
  },
  {
    id: 'wave',
    name: 'Wave Financial',
    description: 'Free accounting software with invoicing and receipt scanning capabilities.',
    whyRecommend: 'Great free option for UNA organizations just starting out with financial management.',
    category: 'accounting',
    logo: '🌊',
    affiliateUrl: 'https://www.waveapps.com',
    rating: 4.3
  },
  {
    id: 'techsoup',
    name: 'TechSoup',
    description: 'Technology products and services at discounted rates for nonprofits.',
    whyRecommend: 'Access to essential technology tools at nonprofit pricing for your UNA.',
    category: 'productivity',
    logo: '💻',
    affiliateUrl: 'https://www.techsoup.org',
    rating: 4.8
  }
];

const categoryIcons = {
  banking: Building2,
  legal: Scale,
  accounting: Calculator,
  insurance: Shield,
  productivity: Zap
};

const categoryColors = {
  banking: 'bg-blue-100 text-blue-800 border-blue-200',
  legal: 'bg-purple-100 text-purple-800 border-purple-200',
  accounting: 'bg-green-100 text-green-800 border-green-200',
  insurance: 'bg-orange-100 text-orange-800 border-orange-200',
  productivity: 'bg-indigo-100 text-indigo-800 border-indigo-200'
};

export default function Resources() {
  const resourcesByCategory = affiliateResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, AffiliateResource[]>);

  const categoryNames = {
    banking: 'Banking & Finance',
    legal: 'Legal Services',
    accounting: 'Accounting & Taxes',
    insurance: 'Insurance & Risk Management',
    productivity: 'Productivity & Tools'
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            UNA Resource Library
          </h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Curated tools, services, and resources to support your UNA formation journey and ongoing operations. 
            We've selected these based on their UNA-friendliness and proven track record.
          </p>
        </div>

        {/* Resource Categories */}
        {Object.entries(resourcesByCategory).map(([category, resources]) => {
          const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
          const categoryColor = categoryColors[category as keyof typeof categoryColors];
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg ${categoryColor}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-navy-900">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="border border-navy-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{resource.logo}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-gold-500 fill-current" />
                        <span className="text-sm font-medium text-navy-700">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-navy-800 mb-2">{resource.name}</h3>
                    <p className="text-navy-600 text-sm mb-3 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-navy-700 mb-1">Why we recommend it:</h4>
                      <p className="text-navy-600 text-sm leading-relaxed">
                        {resource.whyRecommend}
                      </p>
                    </div>
                    
                    <a
                      href={resource.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gold-600 hover:text-gold-800 font-medium text-sm transition-colors"
                    >
                      Learn More
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Affiliate Disclosure */}
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Affiliate Disclosure</h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            Some of the links on this page are affiliate links. This means that if you click on the link and 
            purchase the product or service, we may receive a small commission at no additional cost to you. 
            We only recommend products and services that we genuinely believe will be helpful for UNA organizations.
          </p>
        </div>

        {/* Additional Support */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg mb-6 opacity-90">
            These resources are a great start, but sometimes you need expert advice tailored to your specific situation.
          </p>
          <a
            href="/consultation"
            className="inline-flex items-center bg-gold-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gold-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Schedule a Strategy Session
          </a>
        </div>

        {/* Resource Request */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-navy-900 mb-3">Can't Find What You're Looking For?</h3>
          <p className="text-navy-600 mb-4">
            We're constantly updating our resource library. If you need something specific, let us know!
          </p>
          <a
            href="mailto:gigi@gigistardust.com?subject=Resource Request&body=Hi Gigi,%0D%0A%0D%0AI'm looking for resources related to: [describe what you need]%0D%0A%0D%0AThank you!"
            className="inline-flex items-center bg-navy-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-700 transition-colors"
          >
            Request a Resource
          </a>
        </div>
      </div>
    </div>
  );
}
