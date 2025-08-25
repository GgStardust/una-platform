export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  documents: string[];
  consultation?: {
    duration: string;
    description: string;
  };
  addOns?: string[];
  popular?: boolean;
}

export const pricingPackages: PricingPackage[] = [
  {
    id: 'core-una-startup',
    name: 'Core UNA Start-Up',
    price: 1000,
    description: 'Complete UNA formation package for California organizations',
    features: [
      'Comprehensive UNA Formation Guide',
      'UNA Agreement Template',
      'EIN Application Guide',
      'LP/UNA-128 Filing Package',
      'DBA/FBN Registration Guide',
      'Financial Tracking Templates',
      'Client Agreement & Disclaimer',
      'Bank Account Opening Guide',
      'Email support for 30 days'
    ],
    documents: [
      'comprehensive-formation-guide',
      'una_agreement',
      'ein_registration_guide',
      'lp_una_128_filing_package',
      'dba_fbn_registration_guide',
      'invoice_financial_tracking',
      'client_agreement_disclaimer',
      'bank_account_guide'
    ],
    popular: true
  },
  {
    id: 'full-alignment-package',
    name: 'Full Alignment Package',
    price: 2000,
    description: 'Core package plus strategic consultation and funding guidance',
    features: [
      'Everything in Core UNA Start-Up',
      '90-minute strategic consultation',
      'Funding roadmap and grant strategy',
      'Document review and customization',
      'Priority email support for 60 days',
      'Quarterly check-ins for 1 year'
    ],
    documents: [
      'comprehensive-formation-guide',
      'una_agreement',
      'ein_registration_guide',
      'lp_una_128_filing_package',
      'dba_fbn_registration_guide',
      'invoice_financial_tracking',
      'client_agreement_disclaimer',
      'bank_account_guide'
    ],
    consultation: {
      duration: '90 minutes',
      description: 'Strategic consultation to help with ideation and clarity around strategy and possibilities'
    }
  }
];

export const addOns: PricingPackage[] = [
  {
    id: 'grant-readiness',
    name: 'Grant Readiness Package',
    price: 500,
    description: 'Prepare your UNA for successful grant applications',
    features: [
      'Grant readiness assessment',
      'Documentation templates',
      'Financial tracking systems',
      'Reporting frameworks',
      'Grant application checklist'
    ],
    documents: ['grant_readiness_guide', 'financial_tracking_advanced']
  },
  {
    id: 'legal-cpa-referral',
    name: 'Legal/CPA Referral Network',
    price: 500,
    description: 'Access to vetted legal and accounting professionals',
    features: [
      'Curated professional network',
      'Introduction and consultation',
      'Rate negotiation support',
      'Ongoing relationship management'
    ],
    documents: ['professional_referral_guide']
  }
];

export function getPackageById(id: string): PricingPackage | undefined {
  return [...pricingPackages, ...addOns].find(pkg => pkg.id === id);
}

export function calculateTotalPrice(packageIds: string[]): number {
  return packageIds.reduce((total, id) => {
    const pkg = getPackageById(id);
    return total + (pkg?.price || 0);
  }, 0);
}

export function getPopularPackages(): PricingPackage[] {
  return pricingPackages.filter(pkg => pkg.popular);
}

export function getAddOns(): PricingPackage[] {
  return addOns;
}
