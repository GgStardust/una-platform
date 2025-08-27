export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'banking' | 'legal' | 'financial' | 'tools' | 'insurance';
  description: string;
  url: string;
  affiliateId?: string;
  affiliateLink?: string;
  commission?: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  status: 'active' | 'coming-soon' | 'inactive';
  // New fields for full dashboard
  slug: string;
  contactEmail?: string;
  contactPhone?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  monthlyRevenue?: number;
  totalRevenue?: number;
  notes?: string;
}

export interface BankRecommendation {
  id: string;
  name: string;
  type: 'credit-union' | 'community-bank' | 'online-bank' | 'traditional-bank';
  mission: string;
  unaFriendly: boolean;
  requirements: string[];
  features: string[];
  affiliateStatus: 'partner' | 'recommended' | 'neutral';
  affiliateLink?: string;
  affiliateId?: string;
  url?: string;
  notes: string;
}

// Mission-aligned credit unions and community banks
export const bankRecommendations: BankRecommendation[] = [
  {
    id: 'self-help-cu',
    name: 'Self-Help Credit Union',
    type: 'credit-union',
    mission: 'Community development and economic justice',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation', 'Officer ID'],
    features: ['Community development focus', 'UNA experience', 'Low fees', 'Mission alignment'],
    affiliateStatus: 'recommended',
    notes: 'Excellent for community-focused UNAs, experienced with alternative business structures'
  },
  {
    id: 'patelco-cu',
    name: 'Patelco Credit Union',
    type: 'credit-union',
    mission: 'Member-owned financial cooperative',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation', 'Officer ID'],
    features: ['California-based', 'UNA experience', 'Competitive rates', 'Member-focused'],
    affiliateStatus: 'recommended',
    notes: 'Strong California presence, good for local UNAs'
  },
  {
    id: 'redwood-cu',
    name: 'Redwood Credit Union',
    type: 'credit-union',
    mission: 'Community development and financial education',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation', 'Officer ID'],
    features: ['North Bay focused', 'UNA experience', 'Community programs', 'Low fees'],
    affiliateStatus: 'recommended',
    notes: 'Excellent for North Bay area UNAs'
  },
  {
    id: 'bluevine',
    name: 'BlueVine',
    type: 'online-bank',
    mission: 'Small business banking solutions',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation'],
    features: ['Online-only', 'Business checking', 'Invoice factoring', 'Fast setup'],
    affiliateStatus: 'partner',
    affiliateLink: 'https://bluevine.com/ref/una-platform',
    notes: 'Affiliate partner - excellent for online-first UNAs'
  },
  {
    id: 'novo',
    name: 'Novo',
    type: 'online-bank',
    mission: 'Fee-light business checking for startups',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation'],
    features: ['No monthly fees', 'Business checking', 'Startup-friendly', 'Fast setup'],
    affiliateStatus: 'partner',
    affiliateLink: 'https://novo.com/ref/una-platform',
    notes: 'Affiliate partner - great for startup UNAs with minimal fees'
  },
  {
    id: 'wise',
    name: 'Wise',
    type: 'online-bank',
    mission: 'International money transfers and accounts',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation'],
    features: ['International transfers', 'Multi-currency accounts', 'Low fees', 'Global reach'],
    affiliateStatus: 'partner',
    affiliateLink: 'https://wise.com/ref/una-platform',
    notes: 'Affiliate partner - excellent for UNAs with international operations'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'online-bank',
    mission: 'Banking for startups and tech companies',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation'],
    features: ['Startup-focused', 'API access', 'Modern interface', 'Fast setup'],
    affiliateStatus: 'partner',
    affiliateLink: 'https://mercury.com/ref/una-platform',
    notes: 'Affiliate partner - great for tech-focused UNAs'
  },
  {
    id: 'relay',
    name: 'Relay',
    type: 'online-bank',
    mission: 'Business banking with financial management tools',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation'],
    features: ['Built-in accounting', 'Multiple accounts', 'Team access', 'Financial tools'],
    affiliateStatus: 'partner',
    affiliateLink: 'https://relayfi.com/ref/una-platform',
    notes: 'Affiliate partner - excellent for UNAs needing financial management'
  },
  {
    id: 'novo',
    name: 'Novo',
    type: 'online-bank',
    mission: 'Business banking for entrepreneurs',
    unaFriendly: true,
    requirements: ['EIN letter', 'UNA Agreement', 'LP/UNA-128 confirmation'],
    features: ['Entrepreneur-focused', 'Free checking', 'Integrations', 'Mobile-first'],
    affiliateStatus: 'partner',
    affiliateLink: 'https://novo.co/ref/una-platform',
    notes: 'Affiliate partner - great for entrepreneurial UNAs'
  }
];

// Financial tools and services
export const financialTools: AffiliatePartner[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    category: 'financial',
    description: 'Accounting and financial management software',
    url: 'https://quickbooks.intuit.com/',
    affiliateId: 'una-platform',
    commission: '30% first year',
    features: ['Accounting', 'Invoicing', 'Expense tracking', 'Reporting'],
    pros: ['Industry standard', 'Comprehensive features', 'Good integrations'],
    cons: ['Learning curve', 'Monthly cost', 'Complex for simple needs'],
    bestFor: 'UNAs with complex financial needs',
    status: 'active',
    slug: 'quickbooks'
  },
  {
    id: 'freshbooks',
    name: 'FreshBooks',
    category: 'financial',
    description: 'Simple invoicing and accounting for small businesses',
    url: 'https://www.freshbooks.com/',
    affiliateId: 'una-platform',
    commission: '25% first year',
    features: ['Invoicing', 'Time tracking', 'Expense management', 'Client portal'],
    pros: ['Easy to use', 'Beautiful interface', 'Good for service businesses'],
    cons: ['Limited features', 'Higher cost per user', 'Basic reporting'],
    bestFor: 'UNAs focused on services and invoicing',
    status: 'active',
    slug: 'freshbooks'
  },
  {
    id: 'wave',
    name: 'Wave',
    category: 'financial',
    description: 'Free accounting software for small businesses',
    url: 'https://waveapps.com/',
    affiliateId: 'una-platform',
    commission: '15% first year',
    features: ['Free accounting', 'Invoicing', 'Receipt scanning', 'Basic reporting'],
    pros: ['Free to use', 'Simple interface', 'Good for basic needs'],
    cons: ['Limited features', 'Basic reporting', 'No phone support'],
    bestFor: 'UNAs with simple financial needs and budget constraints',
    status: 'active',
    slug: 'wave'
  },
  {
    id: 'xero',
    name: 'Xero',
    category: 'financial',
    description: 'Accounting platform for small businesses',
    url: 'https://xero.com',
    affiliateId: 'XERO_UNA_PLATFORM',
    commission: '20%',
    features: ['Cloud accounting', 'Bank reconciliation', 'Expense tracking', 'Multi-currency', 'Mobile app'],
    pros: ['User-friendly', 'Good mobile app', 'Multi-currency', 'Strong integrations', 'Good support'],
    cons: ['Monthly subscription', 'Limited customization', 'Can be expensive'],
    bestFor: 'UNAs that need professional accounting with mobile access',
    status: 'active',
    slug: 'xero'
  },
  {
    id: 'bench',
    name: 'Bench',
    category: 'financial',
    description: 'Done-for-you bookkeeping service',
    url: 'https://bench.co',
    affiliateId: 'BENCH_UNA_PLATFORM',
    commission: '25%',
    features: ['Professional bookkeeping', 'Monthly reports', 'Tax preparation', 'Dedicated bookkeeper', 'Software included'],
    pros: ['Professional service', 'Monthly reports', 'Tax preparation', 'Saves time', 'Expert support'],
    cons: ['Expensive', 'Less control', 'Monthly commitment'],
    bestFor: 'UNAs that want professional bookkeeping without the hassle',
    status: 'active',
    slug: 'bench'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'tools',
    description: 'All-in-one workspace for notes, docs, and collaboration',
    url: 'https://www.notion.so/',
    affiliateId: 'una-platform',
    commission: '20% first year',
    features: ['Documentation', 'Project management', 'Knowledge base', 'Team collaboration'],
    pros: ['Highly flexible', 'Great templates', 'Good for teams'],
    cons: ['Learning curve', 'Can be overwhelming', 'Mobile app limitations'],
    bestFor: 'UNAs needing comprehensive project and knowledge management',
    status: 'active',
    slug: 'notion'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'tools',
    description: 'Database and project management platform',
    url: 'https://airtable.com/',
    affiliateId: 'una-platform',
    commission: '20% first year',
    features: ['Database', 'Project tracking', 'Automations', 'Integrations'],
    pros: ['Very flexible', 'Great for data', 'Powerful automations'],
    cons: ['Complex setup', 'Expensive for teams', 'Learning curve'],
    bestFor: 'UNAs with complex data and project management needs',
    status: 'active',
    slug: 'airtable'
  },
  {
    id: 'ledger',
    name: 'Ledger',
    category: 'financial',
    description: 'Hardware wallet for secure cryptocurrency custody',
    url: 'https://ledger.com',
    affiliateId: 'LEDGER_UNA_PLATFORM',
    commission: '10%',
    features: ['Hardware security', 'Multi-currency support', 'Cold storage', 'Mobile app', 'Backup recovery'],
    pros: ['Maximum security', 'Offline storage', 'Multi-currency', 'Portable', 'Industry standard'],
    cons: ['Hardware cost', 'Learning curve', 'Physical device required'],
    bestFor: 'UNAs that need secure cryptocurrency custody and cold storage',
    status: 'active',
    slug: 'ledger'
  },
  {
    id: 'trezor',
    name: 'Trezor',
    category: 'financial',
    description: 'Hardware wallet for secure cryptocurrency custody',
    url: 'https://trezor.io',
    affiliateId: 'TREZOR_UNA_PLATFORM',
    commission: '10%',
    features: ['Hardware security', 'Multi-currency support', 'Cold storage', 'Open source', 'Backup recovery'],
    pros: ['Open source', 'Maximum security', 'Offline storage', 'Multi-currency', 'Portable'],
    cons: ['Hardware cost', 'Learning curve', 'Physical device required'],
    bestFor: 'UNAs that prefer open-source cryptocurrency custody solutions',
    status: 'active',
    slug: 'trezor'
  },
  {
    id: 'proton',
    name: 'Proton Mail & VPN',
    category: 'tools',
    description: 'Private email and network protection',
    url: 'https://proton.me',
    affiliateId: 'PROTON_UNA_PLATFORM',
    commission: '15%',
    features: ['Encrypted email', 'VPN service', 'Privacy-focused', 'Swiss-based', 'No tracking'],
    pros: ['Maximum privacy', 'Encrypted communications', 'VPN included', 'No ads', 'Swiss privacy laws'],
    cons: ['Paid service', 'Limited free tier', 'Learning curve'],
    bestFor: 'UNAs that prioritize privacy and secure communications',
    status: 'active',
    slug: 'proton'
  },
  {
    id: 'tutanota',
    name: 'Tutanota',
    category: 'tools',
    description: 'Encrypted email service',
    url: 'https://tutanota.com',
    affiliateId: 'TUTANOTA_UNA_PLATFORM',
    commission: '15%',
    features: ['End-to-end encryption', 'Secure calendar', 'Mobile apps', 'No tracking', 'Open source'],
    pros: ['Strong encryption', 'Open source', 'No tracking', 'Secure calendar', 'Affordable'],
    cons: ['Limited features', 'Smaller user base', 'Basic interface'],
    bestFor: 'UNAs that need encrypted email with calendar functionality',
    status: 'active',
    slug: 'tutanota'
  },
  {
    id: 'mullvad',
    name: 'Mullvad VPN',
    category: 'tools',
    description: 'Privacy-first VPN service',
    url: 'https://mullvad.net',
    affiliateId: 'MULLVAD_UNA_PLATFORM',
    commission: '20%',
    features: ['No logging', 'WireGuard protocol', 'Multiple locations', 'Anonymous payment', 'Fast speeds'],
    pros: ['No logging policy', 'Fast speeds', 'Anonymous payment', 'WireGuard protocol', 'Privacy-focused'],
    cons: ['Paid service', 'Limited free trial', 'Technical setup'],
    bestFor: 'UNAs that need maximum privacy and fast VPN connections',
    status: 'active',
    slug: 'mullvad'
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    category: 'tools',
    description: 'Simple cloud hosting and apps',
    url: 'https://digitalocean.com',
    affiliateId: 'DIGITALOCEAN_UNA_PLATFORM',
    commission: '25%',
    features: ['Cloud hosting', 'Managed databases', 'Kubernetes', 'Load balancers', 'Monitoring'],
    pros: ['Developer-friendly', 'Good documentation', 'Affordable pricing', 'Reliable infrastructure'],
    cons: ['Technical knowledge required', 'Limited managed services', 'Support can be slow'],
    bestFor: 'UNAs that need technical expertise needing cloud infrastructure',
    status: 'active',
    slug: 'digitalocean'
  },
  {
    id: 'fastmail',
    name: 'Fastmail',
    category: 'tools',
    description: 'Custom domain email service',
    url: 'https://fastmail.com',
    affiliateId: 'FASTMAIL_UNA_PLATFORM',
    commission: '20%',
    features: ['Custom domains', 'Calendar', 'Contacts', 'File storage', 'Mobile apps'],
    pros: ['Custom domains', 'Good mobile apps', 'Reliable service', 'Privacy-focused', 'Fast'],
    cons: ['Paid service', 'Limited free tier', 'Basic features'],
    bestFor: 'UNAs that need professional email with custom domains',
    status: 'active',
    slug: 'fastmail'
  },
  {
    id: 'zion-healthshare',
    name: 'Zion HealthShare',
    category: 'insurance',
    description: 'Community-based medical cost sharing',
    url: 'https://zionhealthshare.com',
    affiliateId: 'ZION_UNA_PLATFORM',
    commission: '15%',
    features: ['Medical cost sharing', 'Community-based', 'Faith-based options', 'Affordable premiums', 'No network restrictions'],
    pros: ['Affordable', 'No network restrictions', 'Community-focused', 'Flexible plans', 'Good for families'],
    cons: ['Not insurance', 'Limited coverage', 'Pre-existing conditions', 'Religious requirements'],
    bestFor: 'UNAs that want affordable healthcare alternatives to traditional insurance',
    status: 'active',
    slug: 'zion-healthshare'
  },
  {
    id: 'sedera',
    name: 'Sedera',
    category: 'insurance',
    description: 'Medical cost sharing service',
    url: 'https://sedera.com',
    affiliateId: 'SEDERA_UNA_PLATFORM',
    commission: '15%',
    features: ['Medical cost sharing', 'Telemedicine', 'Prescription discounts', 'Health coaching', 'Mobile app'],
    pros: ['Affordable premiums', 'Telemedicine included', 'Health coaching', 'Good mobile app', 'Flexible plans'],
    cons: ['Not insurance', 'Limited coverage', 'Pre-existing conditions', 'Annual commitment'],
    bestFor: 'UNAs that want comprehensive health sharing with modern features',
    status: 'active',
    slug: 'sedera'
  },
  {
    id: 'next-insurance',
    name: 'Next Insurance',
    category: 'insurance',
    description: 'Business liability coverage options',
    url: 'https://nextinsurance.com',
    affiliateId: 'NEXT_UNA_PLATFORM',
    commission: '20%',
    features: ['Business liability', 'Professional liability', 'General liability', 'Workers comp', 'Fast quotes'],
    pros: ['Fast quotes', 'Online process', 'Good coverage', 'Affordable rates', 'Easy claims'],
    cons: ['Limited customization', 'Basic coverage', 'Online-only support'],
    bestFor: 'UNAs that need basic business liability coverage quickly',
    status: 'active',
    slug: 'next-insurance'
  },
  {
    id: 'hiscox',
    name: 'Hiscox',
    category: 'insurance',
    description: 'Small business coverage solutions',
    url: 'https://hiscox.com',
    affiliateId: 'HISCOX_UNA_PLATFORM',
    commission: '15%',
    features: ['Professional liability', 'General liability', 'Cyber liability', 'Employment practices', 'Customizable coverage'],
    pros: ['Comprehensive coverage', 'Customizable policies', 'Good reputation', 'Professional support', 'Claims handling'],
    cons: ['Higher premiums', 'Complex policies', 'Annual commitment'],
    bestFor: 'UNAs that need comprehensive business protection',
    status: 'active',
    slug: 'hiscox'
  },
  {
    id: 'mighty-networks',
    name: 'Mighty Networks',
    category: 'tools',
    description: 'Private community hub platform',
    url: 'https://mightybell.com',
    affiliateId: 'MIGHTY_UNA_PLATFORM',
    commission: '30%',
    features: ['Community building', 'Courses', 'Events', 'Mobile apps', 'Analytics'],
    pros: ['Community-focused', 'Good mobile apps', 'Course integration', 'Event hosting', 'Analytics'],
    cons: ['Monthly subscription', 'Limited customization', 'Learning curve'],
    bestFor: 'UNAs that want to build engaged communities around their mission',
    status: 'active',
    slug: 'mighty-networks'
  },
  {
    id: 'podia',
    name: 'Podia',
    category: 'tools',
    description: 'Courses, downloads, and memberships platform',
    url: 'https://podia.com',
    affiliateId: 'PODIA_UNA_PLATFORM',
    commission: '30%',
    features: ['Online courses', 'Digital downloads', 'Memberships', 'Email marketing', 'Affiliate tools'],
    pros: ['All-in-one platform', 'No transaction fees', 'Good templates', 'Affiliate tools', 'Easy setup'],
    cons: ['Limited customization', 'Basic analytics', 'Monthly subscription'],
    bestFor: 'UNAs that want to monetize knowledge and build recurring revenue',
    status: 'active',
    slug: 'podia'
  },
  {
    id: 'thinkific',
    name: 'Thinkific',
    category: 'tools',
    description: 'Online courses and learning paths',
    url: 'https://thinkific.com',
    affiliateId: 'THINKIFIC_UNA_PLATFORM',
    commission: '30%',
    features: ['Course creation', 'Student management', 'Assessments', 'Certificates', 'Mobile app'],
    pros: ['Powerful course builder', 'Good student experience', 'Assessments', 'Certificates', 'Mobile app'],
    cons: ['Monthly subscription', 'Transaction fees', 'Limited customization'],
    bestFor: 'UNAs that want to create comprehensive online learning experiences',
    status: 'active',
    slug: 'thinkific'
  },
  {
    id: 'learnworlds',
    name: 'LearnWorlds',
    category: 'tools',
    description: 'Learning platform with assessments',
    url: 'https://learnworlds.com',
    affiliateId: 'LEARNWORLDS_UNA_PLATFORM',
    commission: '25%',
    features: ['Course creation', 'Assessments', 'Social learning', 'White-label options', 'Mobile app'],
    pros: ['Social learning', 'Assessments', 'White-label options', 'Good mobile app', 'Community features'],
    cons: ['Monthly subscription', 'Transaction fees', 'Complex setup'],
    bestFor: 'UNAs that want social learning with assessment capabilities',
    status: 'active',
    slug: 'learnworlds'
  },
  {
    id: 'ghost',
    name: 'Ghost',
    category: 'tools',
    description: 'Open-source publishing platform',
    url: 'https://ghost.org',
    affiliateId: 'GHOST_UNA_PLATFORM',
    commission: '20%',
    features: ['Content publishing', 'Newsletter', 'Memberships', 'SEO tools', 'Open source'],
    pros: ['Open source', 'Good SEO', 'Newsletter integration', 'Memberships', 'Developer-friendly'],
    cons: ['Technical setup', 'Limited themes', 'Self-hosted complexity'],
    bestFor: 'UNAs that want open-source publishing with membership capabilities',
    status: 'active',
    slug: 'ghost'
  },
  {
    id: 'patreon',
    name: 'Patreon',
    category: 'tools',
    description: 'Recurring member support platform',
    url: 'https://patreon.com',
    affiliateId: 'PATREON_UNA_PLATFORM',
    commission: '5%',
    features: ['Recurring support', 'Tiered memberships', 'Exclusive content', 'Analytics', 'Mobile app'],
    pros: ['Recurring revenue', 'Tiered memberships', 'Good mobile app', 'Analytics', 'Large user base'],
    cons: ['High fees', 'Limited customization', 'Platform dependency'],
    bestFor: 'UNAs that want to build recurring support from members and fans',
    status: 'active',
    slug: 'patreon'
  },
  {
    id: 'buymeacoffee',
    name: 'Buy Me a Coffee',
    category: 'tools',
    description: 'Simple one-time or recurring support',
    url: 'https://buymeacoffee.com',
    affiliateId: 'BUYMEACOFFEE_UNA_PLATFORM',
    commission: '5%',
    features: ['One-time support', 'Recurring support', 'Simple setup', 'Mobile app', 'Low fees'],
    pros: ['Simple setup', 'Low fees', 'Good mobile app', 'Flexible support', 'Easy to use'],
    cons: ['Limited features', 'Basic analytics', 'Platform dependency'],
    bestFor: 'UNAs that want simple support collection with minimal setup',
    status: 'active',
    slug: 'buymeacoffee'
  },
  {
    id: 'wefunder',
    name: 'Wefunder',
    category: 'tools',
    description: 'Community crowdfunding portal',
    url: 'https://wefunder.com',
    affiliateId: 'WEFUNDER_UNA_PLATFORM',
    commission: '10%',
    features: ['Equity crowdfunding', 'Community building', 'Legal compliance', 'Investor relations', 'Analytics'],
    pros: ['Equity crowdfunding', 'Legal compliance', 'Community building', 'Investor relations', 'Professional platform'],
    cons: ['Complex setup', 'Legal requirements', 'High fees', 'Limited to accredited investors'],
    bestFor: 'UNAs that want to raise capital through community investment',
    status: 'active',
    slug: 'wefunder'
  },
  {
    id: 'honeycomb',
    name: 'Honeycomb',
    category: 'tools',
    description: 'Small business funding platform',
    url: 'https://honeycomb.com',
    affiliateId: 'HONEYCOMB_UNA_PLATFORM',
    commission: '15%',
    features: ['Business loans', 'Equipment financing', 'Invoice factoring', 'Fast approval', 'Online process'],
    pros: ['Fast approval', 'Online process', 'Multiple products', 'Good rates', 'Easy application'],
    cons: ['Credit requirements', 'Collateral needed', 'Limited amounts'],
    bestFor: 'UNAs that need quick business funding for growth',
    status: 'active',
    slug: 'honeycomb'
  },
  {
    id: 'cnote',
    name: 'CNote',
    category: 'tools',
    description: 'Impact cash and investment platform',
    url: 'https://cnote.com',
    affiliateId: 'CNOTE_UNA_PLATFORM',
    commission: '10%',
    features: ['Impact investing', 'Community development', 'Fixed returns', 'Social impact', 'Transparent reporting'],
    pros: ['Social impact', 'Fixed returns', 'Transparent reporting', 'Community development', 'Mission alignment'],
    cons: ['Limited liquidity', 'Longer terms', 'Lower returns'],
    bestFor: 'UNAs that want to invest in community development and social impact',
    status: 'active',
    slug: 'cnote'
  },
  {
    id: 'bluevine',
    name: 'BlueVine',
    category: 'financial',
    description: 'Online business banking solutions',
    url: 'https://bluevine.com',
    affiliateId: 'BLUEVINE_UNA_PLATFORM',
    commission: '25%',
    features: ['Business checking', 'Invoice factoring', 'Line of credit', 'Fast setup', 'Online banking'],
    pros: ['Fast setup', 'Invoice factoring', 'Line of credit', 'Good rates', 'Online-first'],
    cons: ['Limited branches', 'Technical requirements', 'Credit requirements'],
    bestFor: 'UNAs that need quick business banking with factoring options',
    status: 'active',
    slug: 'bluevine'
  },
  {
    id: 'novo',
    name: 'Novo',
    category: 'financial',
    description: 'Fee-light business checking for startups',
    url: 'https://novo.com',
    affiliateId: 'NOVO_UNA_PLATFORM',
    commission: '20%',
    features: ['No monthly fees', 'Business checking', 'Startup-friendly', 'Fast setup', 'Mobile app'],
    pros: ['No monthly fees', 'Startup-friendly', 'Fast setup', 'Good mobile app', 'Low fees'],
    cons: ['Limited features', 'No physical branches', 'Basic services'],
    bestFor: 'UNAs that want simple business banking with minimal fees',
    status: 'active',
    slug: 'novo'
  },
  {
    id: 'wise',
    name: 'Wise',
    category: 'financial',
    description: 'International money transfers and multi-currency accounts',
    url: 'https://wise.com',
    affiliateId: 'WISE_UNA_PLATFORM',
    commission: '15%',
    features: ['International transfers', 'Multi-currency accounts', 'Low fees', 'Fast transfers', 'Mobile app'],
    pros: ['Low fees', 'Fast transfers', 'Multi-currency', 'Good rates', 'Global reach'],
    cons: ['Transfer limits', 'Verification required', 'Limited customer service'],
    bestFor: 'UNAs that need international transfers and multi-currency accounts',
    status: 'active',
    slug: 'wise'
  }
];

// Legal and professional services
export const legalServices: AffiliatePartner[] = [
  {
    id: 'legalzoom',
    name: 'LegalZoom',
    category: 'legal',
    description: 'Online legal document services',
    url: 'https://www.legalzoom.com/',
    affiliateId: 'una-platform',
    commission: '15% first year',
    features: ['Legal documents', 'Business formation', 'Trademark filing', 'Legal advice'],
    pros: ['Affordable', 'Wide range of services', 'Easy to use'],
    cons: ['Generic documents', 'Limited customization', 'Basic legal advice'],
    bestFor: 'UNAs needing basic legal documents and affordable services',
    status: 'active',
    slug: 'legalzoom'
  },
  {
    id: 'rocket-lawyer',
    name: 'Rocket Lawyer',
    category: 'legal',
    description: 'Legal document creation and attorney consultation',
    url: 'https://www.rocketlawyer.com/',
    affiliateId: 'una-platform',
    commission: '20% first year',
    features: ['Legal documents', 'Attorney consultation', 'Business services', 'Legal plans'],
    pros: ['Attorney access', 'Good document quality', 'Comprehensive services'],
    cons: ['Subscription model', 'Can be expensive', 'Limited attorney time'],
    bestFor: 'UNAs needing legal guidance and document review',
    status: 'active',
    slug: 'rocket-lawyer'
  }
];

// Get bank recommendations based on UNA needs
export function getBankRecommendations(unaNeeds: {
  missionAligned: boolean;
  onlineFirst: boolean;
  localPresence: boolean;
  financialTools: boolean;
}): BankRecommendation[] {
  let recommendations = bankRecommendations;

  // Filter by mission alignment preference
  if (unaNeeds.missionAligned) {
    recommendations = recommendations.filter(bank => 
      bank.type === 'credit-union' || bank.mission.includes('community')
    );
  }

  // Filter by online preference
  if (unaNeeds.onlineFirst) {
    recommendations = recommendations.filter(bank => 
      bank.type === 'online-bank'
    );
  }

  // Filter by local presence preference
  if (unaNeeds.localPresence) {
    recommendations = recommendations.filter(bank => 
      bank.type === 'credit-union' || bank.type === 'community-bank'
    );
  }

  // Sort by UNA friendliness and affiliate status
  return recommendations.sort((a, b) => {
    if (a.unaFriendly !== b.unaFriendly) return b.unaFriendly ? 1 : -1;
    if (a.affiliateStatus === 'partner' && b.affiliateStatus !== 'partner') return -1;
    if (b.affiliateStatus === 'partner' && a.affiliateStatus !== 'partner') return 1;
    return 0;
  });
}

// Get affiliate disclosure text
export function getAffiliateDisclosure(): string {
  return `Some of the links on this page are affiliate links. This means if you click on the link and purchase the item, we may receive an affiliate commission at no extra cost to you. We only recommend products and services that we believe will add value to our readers.`;
}

// Get referral link with tracking
export function getReferralLink(partnerId: string, userId?: string): string {
  const partner = [...bankRecommendations, ...financialTools, ...legalServices]
    .find(p => p.id === partnerId);
  
  if (!partner || !partner.affiliateLink) {
    return partner?.url || '#';
  }

  const trackingParams = new URLSearchParams({
    ref: partner.affiliateId || 'una-platform',
    source: 'una-platform',
    ...(userId && { user: userId })
  });

  return `${partner.affiliateLink}?${trackingParams.toString()}`;
}

// New interfaces for full affiliate dashboard
export interface AffiliateProduct {
  id: string;
  partnerId: string;
  name: string;
  description: string;
  url: string;
  slug: string;
  category: string;
  commission: string;
  status: 'active' | 'inactive' | 'coming-soon';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliateLink {
  id: string;
  productId: string;
  partnerId: string;
  slug: string;
  destinationUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  status: 'active' | 'inactive' | 'testing';
  createdAt: string;
  lastUsedAt?: string;
}

export interface ClickEvent {
  id: string;
  linkId: string;
  slug: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  utmParams: Record<string, string>;
  conversion?: boolean;
  conversionValue?: number;
}

export interface AffiliateConversion {
  id: string;
  linkId: string;
  partnerId: string;
  productId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'reversed';
  createdAt: string;
  confirmedAt?: string;
  reversedAt?: string;
  notes?: string;
}

export interface AffiliatePayout {
  id: string;
  partnerId: string;
  period: string; // e.g., "2024-01"
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  paidAt?: string;
  notes?: string;
  transactionRef?: string;
}

export interface AffiliateSettings {
  disclosureText: string;
  defaultUtmSource: string;
  defaultUtmMedium: string;
  trackingEnabled: boolean;
  conversionTracking: boolean;
}

// Default affiliate settings
export const defaultAffiliateSettings: AffiliateSettings = {
  disclosureText: "This post may contain affiliate links. We may earn a commission when you make a purchase at no additional cost to you.",
  defaultUtmSource: "una-platform",
  defaultUtmMedium: "affiliate",
  trackingEnabled: true,
  conversionTracking: true
};

// Mock data for demonstration
export const mockAffiliateProducts: AffiliateProduct[] = [
  {
    id: 'prod_1',
    partnerId: 'legalzoom',
    name: 'UNA Starter Package',
    description: 'Complete UNA formation with legal document templates',
    url: 'https://legalzoom.com/una-starter',
    slug: 'lz-una-starter',
    category: 'legal',
    commission: '15%',
    status: 'active',
    featured: true,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z'
  },
  {
    id: 'prod_2',
    partnerId: 'quickbooks',
    name: 'Business Accounting Pro',
    description: 'Professional accounting software for nonprofits',
    url: 'https://quickbooks.intuit.com/business',
    slug: 'qb-accounting-pro',
    category: 'financial',
    commission: '20%',
    status: 'active',
    featured: true,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z'
  },
  {
    id: 'prod_3',
    partnerId: 'bluevine',
    name: 'Business Banking',
    description: 'Online business banking with invoice factoring',
    url: 'https://bluevine.com',
    slug: 'bluevine-banking',
    category: 'banking',
    commission: '15%',
    status: 'active',
    featured: true,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z'
  },
  {
    id: 'prod_4',
    partnerId: 'proton',
    name: 'Proton Mail & VPN',
    description: 'Private email and network protection',
    url: 'https://proton.me',
    slug: 'proton-privacy',
    category: 'tools',
    commission: '15%',
    status: 'active',
    featured: true,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z'
  },
  {
    id: 'prod_5',
    partnerId: 'mighty-networks',
    name: 'Community Platform',
    description: 'Private community hub for mission-driven organizations',
    url: 'https://mightybell.com',
    slug: 'mighty-community',
    category: 'tools',
    commission: '30%',
    status: 'active',
    featured: true,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z'
  }
];

export const mockAffiliateLinks: AffiliateLink[] = [
  {
    id: 'link_1',
    productId: 'prod_1',
    partnerId: 'legalzoom',
    slug: 'lz-una-starter',
    destinationUrl: 'https://legalzoom.com/una-starter',
    utmSource: 'una-platform',
    utmMedium: 'affiliate',
    utmCampaign: 'lz-una-starter',
    status: 'active',
    createdAt: '2024-08-01T00:00:00Z',
    lastUsedAt: '2024-08-24T10:30:00Z'
  },
  {
    id: 'link_2',
    productId: 'prod_2',
    partnerId: 'quickbooks',
    slug: 'qb-accounting-pro',
    destinationUrl: 'https://quickbooks.intuit.com/business',
    utmSource: 'una-platform',
    utmMedium: 'affiliate',
    utmCampaign: 'qb-accounting-pro',
    status: 'active',
    createdAt: '2024-08-01T00:00:00Z',
    lastUsedAt: '2024-08-24T09:15:00Z'
  }
];

export const mockClickEvents: ClickEvent[] = [
  {
    id: 'click_1',
    linkId: 'link_1',
    slug: 'lz-una-starter',
    timestamp: '2024-08-24T10:30:00Z',
    referrer: 'https://una-platform.com/blog/una-formation-guide',
    utmParams: { utm_source: 'blog', utm_medium: 'organic' },
    conversion: false
  },
  {
    id: 'click_2',
    linkId: 'link_1',
    slug: 'lz-una-starter',
    timestamp: '2024-08-24T11:15:00Z',
    referrer: 'https://una-platform.com/explore',
    utmParams: { utm_source: 'explore', utm_medium: 'direct' },
    conversion: true,
    conversionValue: 299
  },
  {
    id: 'click_3',
    linkId: 'link_2',
    slug: 'qb-accounting-pro',
    timestamp: '2024-08-24T09:15:00Z',
    referrer: 'https://una-platform.com/blog/financial-management',
    utmParams: { utm_source: 'blog', utm_medium: 'organic' },
    conversion: false
  }
];

export const mockConversions: AffiliateConversion[] = [
  {
    id: 'conv_1',
    linkId: 'link_1',
    partnerId: 'legalzoom',
    productId: 'prod_1',
    amount: 299,
    currency: 'USD',
    status: 'confirmed',
    createdAt: '2024-08-24T11:15:00Z',
    confirmedAt: '2024-08-24T11:20:00Z'
  }
];

export const mockPayouts: AffiliatePayout[] = [
  {
    id: 'payout_1',
    partnerId: 'legalzoom',
    period: '2024-08',
    clicks: 2,
    conversions: 1,
    revenue: 299,
    commission: 44.85,
    status: 'paid',
    createdAt: '2024-08-01T00:00:00Z',
    paidAt: '2024-08-25T00:00:00Z',
    transactionRef: 'TX-2024-08-001'
  }
];

// Affiliate Management Class
export class AffiliateManager {
  private static instance: AffiliateManager;
  private products: AffiliateProduct[];
  private links: AffiliateLink[];
  private clickEvents: ClickEvent[];
  private conversions: AffiliateConversion[];
  private payouts: AffiliatePayout[];

  private constructor() {
    this.products = [...mockAffiliateProducts];
    this.links = [...mockAffiliateLinks];
    this.clickEvents = [...mockClickEvents];
    this.conversions = [...mockConversions];
    this.payouts = [...mockPayouts];
    this.loadFromStorage();
  }

  static getInstance(): AffiliateManager {
    if (!AffiliateManager.instance) {
      AffiliateManager.instance = new AffiliateManager();
    }
    return AffiliateManager.instance;
  }

  // Products Management
  getProducts(): AffiliateProduct[] {
    return [...this.products];
  }

  getProductById(id: string): AffiliateProduct | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByPartner(partnerId: string): AffiliateProduct[] {
    return this.products.filter(p => p.partnerId === partnerId);
  }

  addProduct(product: Omit<AffiliateProduct, 'id' | 'createdAt' | 'updatedAt'>): AffiliateProduct {
    const newProduct: AffiliateProduct = {
      ...product,
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<AffiliateProduct>): AffiliateProduct | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = { 
      ...this.products[index], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    this.saveToStorage();
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Links Management
  getLinks(): AffiliateLink[] {
    return [...this.links];
  }

  getLinkBySlug(slug: string): AffiliateLink | undefined {
    return this.links.find(l => l.slug === slug);
  }

  getLinksByPartner(partnerId: string): AffiliateLink[] {
    return this.links.filter(l => l.partnerId === partnerId);
  }

  addLink(link: Omit<AffiliateLink, 'id' | 'createdAt'>): AffiliateLink {
    const newLink: AffiliateLink = {
      ...link,
      id: `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    this.links.push(newLink);
    this.saveToStorage();
    return newLink;
  }

  updateLink(id: string, updates: Partial<AffiliateLink>): AffiliateLink | null {
    const index = this.links.findIndex(l => l.id === id);
    if (index === -1) return null;
    
    this.links[index] = { ...this.links[index], ...updates };
    this.saveToStorage();
    return this.links[index];
  }

  deleteLink(id: string): boolean {
    const index = this.links.findIndex(l => l.id === id);
    if (index === -1) return false;
    
    this.links.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Click Tracking
  logClick(slug: string, referrer?: string, utmParams: Record<string, string> = {}): ClickEvent {
    const link = this.links.find(l => l.slug === slug);
    if (!link) {
      throw new Error(`Link with slug '${slug}' not found`);
    }

    const clickEvent: ClickEvent = {
      id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      linkId: link.id,
      slug,
      timestamp: new Date().toISOString(),
      referrer,
      utmParams,
      conversion: false
    };

    this.clickEvents.push(clickEvent);
    
    // Update link last used timestamp
    link.lastUsedAt = clickEvent.timestamp;
    
    this.saveToStorage();
    return clickEvent;
  }

  getClickEvents(linkId?: string, days?: number): ClickEvent[] {
    let events = this.clickEvents;
    
    if (linkId) {
      events = events.filter(e => e.linkId === linkId);
    }
    
    if (days) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      events = events.filter(e => new Date(e.timestamp) > cutoff);
    }
    
    return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Conversions Management
  getConversions(): AffiliateConversion[] {
    return [...this.conversions];
  }

  addConversion(conversion: Omit<AffiliateConversion, 'id' | 'createdAt'>): AffiliateConversion {
    const newConversion: AffiliateConversion = {
      ...conversion,
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    this.conversions.push(newConversion);
    this.saveToStorage();
    return newConversion;
  }

  updateConversionStatus(id: string, status: 'pending' | 'confirmed' | 'reversed'): AffiliateConversion | null {
    const conversion = this.conversions.find(c => c.id === id);
    if (!conversion) return null;
    
    conversion.status = status;
    if (status === 'confirmed') {
      conversion.confirmedAt = new Date().toISOString();
    } else if (status === 'reversed') {
      conversion.reversedAt = new Date().toISOString();
    }
    
    this.saveToStorage();
    return conversion;
  }

  // Payouts Management
  getPayouts(): AffiliatePayout[] {
    return [...this.payouts];
  }

  addPayout(payout: Omit<AffiliatePayout, 'id'>): AffiliatePayout {
    const newPayout: AffiliatePayout = {
      ...payout,
      id: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    this.payouts.push(newPayout);
    this.saveToStorage();
    return newPayout;
  }

  updatePayoutStatus(id: string, status: 'pending' | 'paid' | 'cancelled', paidAt?: string): AffiliatePayout | null {
    const payout = this.payouts.find(p => p.id === id);
    if (!payout) return null;
    
    payout.status = status;
    if (status === 'paid' && paidAt) {
      payout.paidAt = paidAt;
    }
    
    this.saveToStorage();
    return payout;
  }

  deletePayout(id: string): boolean {
    const index = this.payouts.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.payouts.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Analytics
  getAnalytics(partnerId?: string, days: number = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    let events = this.clickEvents.filter(e => new Date(e.timestamp) > cutoff);
    let conversions = this.conversions.filter(c => new Date(c.createdAt) > cutoff);
    let payouts = this.payouts.filter(p => new Date(p.paidAt || p.createdAt) > cutoff);
    
    if (partnerId) {
      const partnerLinks = this.links.filter(l => l.partnerId === partnerId);
      const linkIds = partnerLinks.map(l => l.id);
      events = events.filter(e => linkIds.includes(e.linkId));
      conversions = conversions.filter(c => c.partnerId === partnerId);
      payouts = payouts.filter(p => p.partnerId === partnerId);
    }
    
    const totalClicks = events.length;
    const totalConversions = conversions.filter(c => c.status === 'confirmed').length;
    const totalRevenue = conversions
      .filter(c => c.status === 'confirmed')
      .reduce((sum, c) => sum + c.amount, 0);
    const totalPayouts = payouts
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.commission, 0);
    
    return {
      totalClicks,
      totalConversions,
      totalRevenue,
      totalPayouts,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      events: events.slice(0, 100), // Limit to last 100 events
      conversions: conversions.slice(0, 50), // Limit to last 50 conversions
      payouts: payouts.slice(0, 20) // Limit to last 20 payouts
    };
  }

  // Export Functions
  exportAnalyticsCSV(partnerId?: string, days: number = 30): string {
    const analytics = this.getAnalytics(partnerId, days);
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Total Clicks', analytics.totalClicks.toString()],
      ['Total Conversions', analytics.totalConversions.toString()],
      ['Total Revenue', `$${analytics.totalRevenue.toFixed(2)}`],
      ['Total Payouts', `$${analytics.totalPayouts.toFixed(2)}`],
      ['Conversion Rate', `${analytics.conversionRate.toFixed(2)}%`]
    ];
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  exportClickEventsCSV(linkId?: string, days?: number): string {
    const events = this.getClickEvents(linkId, days);
    const headers = ['ID', 'Slug', 'Timestamp', 'Referrer', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Conversion', 'Conversion Value'];
    const rows = events.map(e => [
      e.id,
      e.slug,
      new Date(e.timestamp).toLocaleString(),
      e.referrer || '',
      e.utmParams.utm_source || '',
      e.utmParams.utm_medium || '',
      e.utmParams.utm_campaign || '',
      e.conversion ? 'Yes' : 'No',
      e.conversionValue ? `$${e.conversionValue.toFixed(2)}` : ''
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  // Storage
  private loadFromStorage(): void {
    try {
      const storedProducts = localStorage.getItem('affiliate-products');
      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
      }
      
      const storedLinks = localStorage.getItem('affiliate-links');
      if (storedLinks) {
        this.links = JSON.parse(storedLinks);
      }
      
      const storedClicks = localStorage.getItem('affiliate-clicks');
      if (storedClicks) {
        this.clickEvents = JSON.parse(storedClicks);
      }
      
      const storedConversions = localStorage.getItem('affiliate-conversions');
      if (storedConversions) {
        this.conversions = JSON.parse(storedConversions);
      }
      
      const storedPayouts = localStorage.getItem('affiliate-payouts');
      if (storedPayouts) {
        this.payouts = JSON.parse(storedPayouts);
      }
    } catch (error) {
      console.error('Error loading affiliate data from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('affiliate-products', JSON.stringify(this.products));
      localStorage.setItem('affiliate-links', JSON.stringify(this.links));
      localStorage.setItem('affiliate-clicks', JSON.stringify(this.clickEvents));
      localStorage.setItem('affiliate-conversions', JSON.stringify(this.conversions));
      localStorage.setItem('affiliate-payouts', JSON.stringify(this.payouts));
    } catch (error) {
      console.error('Error saving affiliate data to storage:', error);
    }
  }
}
