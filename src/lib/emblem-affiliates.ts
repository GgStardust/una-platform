export interface EmblemAffiliate {
  id: string;
  name: string;
  category: 'printing' | 'branding' | 'digital' | 'professional' | 'merchandise';
  description: string;
  url: string;
  affiliateId: string;
  commission: string;
  features: string[];
  bestFor: string;
  pricing: string;
  status: 'active' | 'coming-soon' | 'inactive';
  logo?: string;
}

export interface EmblemProduct {
  id: string;
  name: string;
  description: string;
  affiliate: EmblemAffiliate;
  productUrl: string;
  imageUrl?: string;
  price: string;
  category: string;
}

// Affiliate partners for emblem-related products and services
export const emblemAffiliates: EmblemAffiliate[] = [
  // Printing Services
  {
    id: 'vistaprint',
    name: 'VistaPrint',
    category: 'printing',
    description: 'Professional business cards, letterhead, and signage with your new emblem',
    url: 'https://www.vistaprint.com',
    affiliateId: 'vista_una_emblem',
    commission: '15%',
    features: [
      'Business cards with emblem',
      'Letterhead and envelopes',
      'Banners and signage',
      'Fast turnaround',
      'Professional quality'
    ],
    bestFor: 'Quick professional printing needs',
    pricing: 'Starting at $9.99',
    status: 'active'
  },
  {
    id: 'moo',
    name: 'MOO',
    category: 'printing',
    description: 'Premium business cards and stationery with your emblem',
    url: 'https://www.moo.com',
    affiliateId: 'moo_una_emblem',
    commission: '12%',
    features: [
      'Luxury business cards',
      'Premium paper options',
      'Custom finishes',
      'Design templates',
      'Bulk discounts'
    ],
    bestFor: 'High-end professional printing',
    pricing: 'Starting at $19.99',
    status: 'active'
  },
  
  // Branding Materials
  {
    id: 'customink',
    name: 'Custom Ink',
    category: 'branding',
    description: 'Custom apparel and merchandise featuring your emblem',
    url: 'https://www.customink.com',
    affiliateId: 'customink_una_emblem',
    commission: '10%',
    features: [
      'T-shirts and polos',
      'Hats and caps',
      'Hoodies and jackets',
      'Team uniforms',
      'Bulk ordering'
    ],
    bestFor: 'Team apparel and merchandise',
    pricing: 'Starting at $12.99',
    status: 'active'
  },
  {
    id: 'stickermule',
    name: 'Sticker Mule',
    category: 'branding',
    description: 'High-quality stickers and decals with your emblem',
    url: 'https://www.stickermule.com',
    affiliateId: 'stickermule_una_emblem',
    commission: '8%',
    features: [
      'Vinyl stickers',
      'Die-cut decals',
      'Bumper stickers',
      'Window clings',
      'Fast production'
    ],
    bestFor: 'Promotional materials and branding',
    pricing: 'Starting at $29.99',
    status: 'active'
  },
  
  // Digital Services
  {
    id: 'canva',
    name: 'Canva Pro',
    category: 'digital',
    description: 'Professional design tools to create materials with your emblem',
    url: 'https://www.canva.com',
    affiliateId: 'canva_una_emblem',
    commission: '20%',
    features: [
      'Design templates',
      'Brand kit setup',
      'Social media graphics',
      'Presentation templates',
      'Collaboration tools'
    ],
    bestFor: 'DIY design and marketing materials',
    pricing: '$12.99/month',
    status: 'active'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'digital',
    description: 'Email marketing with branded templates featuring your emblem',
    url: 'https://www.mailchimp.com',
    affiliateId: 'mailchimp_una_emblem',
    commission: '15%',
    features: [
      'Email templates',
      'Brand customization',
      'Automation tools',
      'Analytics dashboard',
      'Integration options'
    ],
    bestFor: 'Email marketing and communication',
    pricing: 'Starting at $10/month',
    status: 'active'
  },
  
  // Professional Services
  {
    id: 'fiverr',
    name: 'Fiverr',
    category: 'professional',
    description: 'Professional designers to enhance your emblem and create materials',
    url: 'https://www.fiverr.com',
    affiliateId: 'fiverr_una_emblem',
    commission: '5%',
    features: [
      'Logo enhancement',
      'Brand identity design',
      'Marketing materials',
      'Social media graphics',
      'Professional designers'
    ],
    bestFor: 'Professional design services',
    pricing: 'Starting at $5',
    status: 'active'
  },
  {
    id: 'upwork',
    name: 'Upwork',
    category: 'professional',
    description: 'Freelance professionals for emblem refinement and brand development',
    url: 'https://www.upwork.com',
    affiliateId: 'upwork_una_emblem',
    commission: '3%',
    features: [
      'Logo designers',
      'Brand strategists',
      'Marketing consultants',
      'Web developers',
      'Quality assurance'
    ],
    bestFor: 'Long-term professional relationships',
    pricing: 'Variable based on project',
    status: 'active'
  },
  
  // Merchandise
  {
    id: 'printful',
    name: 'Printful',
    category: 'merchandise',
    description: 'Print-on-demand merchandise featuring your emblem',
    url: 'https://www.printful.com',
    affiliateId: 'printful_una_emblem',
    commission: '7%',
    features: [
      'T-shirts and apparel',
      'Mugs and drinkware',
      'Phone cases',
      'Home decor',
      'Dropshipping integration'
    ],
    bestFor: 'E-commerce and merchandise sales',
    pricing: 'No setup fees',
    status: 'active'
  },
  {
    id: 'redbubble',
    name: 'Redbubble',
    category: 'merchandise',
    description: 'Artistic merchandise and home decor with your emblem',
    url: 'https://www.redbubble.com',
    affiliateId: 'redbubble_una_emblem',
    commission: '6%',
    features: [
      'Artistic designs',
      'Home decor items',
      'Stationery products',
      'Accessories',
      'Global shipping'
    ],
    bestFor: 'Creative merchandise and gifts',
    pricing: 'Variable pricing',
    status: 'active'
  }
];

// Product recommendations based on emblem style and UNA type
export function getEmblemProductRecommendations(
  emblemStyle: string,
  _unaType: string,
  budget: 'low' | 'medium' | 'high'
): EmblemProduct[] {
  const recommendations: EmblemProduct[] = [];
  
  // Filter affiliates based on style and budget
  const relevantAffiliates = emblemAffiliates.filter(affiliate => {
    if (budget === 'low' && affiliate.pricing.includes('$29.99')) return false;
    if (budget === 'high' && affiliate.pricing.includes('$5')) return false;
    return true;
  });
  
  // Style-based recommendations
  switch (emblemStyle) {
    case 'professional':
      recommendations.push(
        createProduct('vistaprint', 'Business Cards', 'Professional business cards with your emblem', relevantAffiliates),
        createProduct('moo', 'Premium Stationery', 'Luxury letterhead and envelopes', relevantAffiliates),
        createProduct('canva', 'Brand Kit', 'Professional design templates', relevantAffiliates)
      );
      break;
      
    case 'creative':
      recommendations.push(
        createProduct('customink', 'Team Apparel', 'Creative t-shirts and merchandise', relevantAffiliates),
        createProduct('stickermule', 'Promotional Stickers', 'Eye-catching promotional materials', relevantAffiliates),
        createProduct('redbubble', 'Artistic Merchandise', 'Creative home decor and accessories', relevantAffiliates)
      );
      break;
      
    case 'community':
      recommendations.push(
        createProduct('customink', 'Community Gear', 'Team uniforms and community apparel', relevantAffiliates),
        createProduct('stickermule', 'Community Stickers', 'Local promotional materials', relevantAffiliates),
        createProduct('mailchimp', 'Community Communication', 'Email marketing for community outreach', relevantAffiliates)
      );
      break;
      
    case 'traditional':
      recommendations.push(
        createProduct('moo', 'Heritage Stationery', 'Traditional paper and printing', relevantAffiliates),
        createProduct('vistaprint', 'Classic Signage', 'Traditional banners and signs', relevantAffiliates),
        createProduct('printful', 'Heritage Merchandise', 'Traditional merchandise items', relevantAffiliates)
      );
      break;
      
    case 'modern':
      recommendations.push(
        createProduct('canva', 'Modern Templates', 'Contemporary design templates', relevantAffiliates),
        createProduct('mailchimp', 'Digital Marketing', 'Modern email marketing tools', relevantAffiliates),
        createProduct('fiverr', 'Modern Design', 'Contemporary design services', relevantAffiliates)
      );
      break;
      
    default:
      // General recommendations
      recommendations.push(
        createProduct('vistaprint', 'Essential Printing', 'Basic business materials', relevantAffiliates),
        createProduct('canva', 'Design Tools', 'Professional design software', relevantAffiliates),
        createProduct('customink', 'Team Apparel', 'Professional team gear', relevantAffiliates)
      );
  }
  
  return recommendations.slice(0, 6); // Return top 6 recommendations
}

// Create product object from affiliate
function createProduct(
  affiliateId: string,
  productName: string,
  description: string,
  affiliates: EmblemAffiliate[]
): EmblemProduct {
  const affiliate = affiliates.find(a => a.id === affiliateId) || affiliates[0];
  
  return {
    id: `${affiliateId}_${productName.toLowerCase().replace(/\s+/g, '_')}`,
    name: productName,
    description,
    affiliate,
    productUrl: affiliate.url,
    price: affiliate.pricing,
    category: affiliate.category
  };
}

// Get affiliate disclosure text
export function getAffiliateDisclosure(): string {
  return 'Some of the links above are affiliate links. We may earn a commission if you make a purchase through these links, at no additional cost to you. This helps support our platform and allows us to continue providing free UNA formation resources.';
}

// Generate affiliate link with tracking
export function generateAffiliateLink(affiliateId: string, userId?: string): string {
  const baseUrl = emblemAffiliates.find(a => a.id === affiliateId)?.url || '';
  if (!baseUrl) return '';
  
  const params = new URLSearchParams({
    ref: affiliateId,
    utm_source: 'una_platform',
    utm_medium: 'emblem_creation',
    utm_campaign: 'affiliate'
  });
  
  if (userId) {
    params.append('user_id', userId);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

// Get category-specific affiliates
export function getAffiliatesByCategory(category: string): EmblemAffiliate[] {
  return emblemAffiliates.filter(affiliate => affiliate.category === category);
}

// Get top-performing affiliates
export function getTopAffiliates(): EmblemAffiliate[] {
  return emblemAffiliates
    .filter(affiliate => affiliate.status === 'active')
    .sort((a, b) => {
      const aCommission = parseFloat(a.commission.replace('%', ''));
      const bCommission = parseFloat(b.commission.replace('%', ''));
      return bCommission - aCommission;
    });
}

// Get budget-friendly options
export function getBudgetFriendlyOptions(): EmblemAffiliate[] {
  return emblemAffiliates.filter(affiliate => 
    affiliate.status === 'active' && 
    (affiliate.pricing.includes('$5') || affiliate.pricing.includes('$9.99'))
  );
}

// Get premium options
export function getPremiumOptions(): EmblemAffiliate[] {
  return emblemAffiliates.filter(affiliate => 
    affiliate.status === 'active' && 
    (affiliate.pricing.includes('$19.99') || affiliate.pricing.includes('$29.99'))
  );
}
