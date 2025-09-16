import { IntakeData, VerificationFlag } from './types';

export interface VerificationResult {
  canProceed: boolean;
  flags: VerificationFlag[];
  requiresLegalReview: boolean;
  requiresCPAReview: boolean;
  recommendations: string[];
}

// Flag logic based on intake answers
export function checkVerificationFlags(data: IntakeData): VerificationFlag[] {
  const flags: VerificationFlag[] = [];

  // Check for landholding scenarios
  if (data.propertyPlans && data.propertyPlans.toLowerCase().includes('land') || 
      data.propertyPlans && data.propertyPlans.toLowerCase().includes('property') ||
      data.propertyPlans && data.propertyPlans.toLowerCase().includes('real estate')) {
    flags.push({
      id: 'landholding',
      type: 'legal',
      title: 'Landholding or Real Estate',
      description: 'Your UNA involves land or real property, which requires legal review of property title language and transfer mechanisms.',
      severity: 'high',
      requiresAction: true,
      referralType: 'attorney',
      referralReason: 'Property transfers and landholding require legal expertise to ensure proper title and compliance.',
      nextSteps: [
        'Consult with real estate attorney',
        'Review property title language',
        'Ensure proper transfer mechanisms',
        'Consider tax implications'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for tax-exempt status
  if (data.taxExemptIntent) {
    flags.push({
      id: 'tax-exempt',
      type: 'referral',
      title: 'Tax-Exempt Status Intent',
      description: 'You\'re seeking tax-exempt status, which requires IRS filing and may need professional guidance.',
      severity: 'medium',
      requiresAction: true,
      referralType: 'cpa',
      referralReason: 'Tax-exempt applications require specialized knowledge of IRS requirements and compliance.',
      nextSteps: [
        'Consult with CPA specializing in nonprofits',
        'Prepare IRS 501(c)(3) application',
        'Ensure compliance with state requirements',
        'Plan for ongoing compliance'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for fiscal sponsorship
  if (data.fiscalSponsorship) {
    flags.push({
      id: 'fiscal-sponsorship',
      type: 'referral',
      title: 'Fiscal Sponsorship',
      description: 'Fiscal sponsorship arrangements require legal review to ensure proper structure and compliance.',
      severity: 'medium',
      requiresAction: true,
      referralType: 'attorney',
      referralReason: 'Fiscal sponsorship involves complex legal relationships that need proper documentation.',
      nextSteps: [
        'Consult with nonprofit attorney',
        'Draft fiscal sponsorship agreement',
        'Ensure compliance with IRS rules',
        'Plan for financial oversight'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for family leadership
  if (data.familyLeadership) {
    flags.push({
      id: 'family-leadership',
      type: 'warning',
      title: 'Family Leadership Structure',
      description: 'Family-based leadership may require additional planning for succession and conflict resolution.',
      severity: 'low',
      requiresAction: false,
      referralType: 'specialist',
      referralReason: 'Family dynamics in organizations benefit from specialized guidance.',
      recommendation: 'Consider developing a family council structure and clear succession planning to prevent future conflicts and ensure organizational sustainability.',
      nextSteps: [
        'Consider family business consultant',
        'Plan for succession scenarios',
        'Establish conflict resolution processes',
        'Document family member roles clearly'
      ],
      faqLink: '/faq#family-leadership',
      blogLink: '/blog/family-leadership-in-unas',
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for interstate activity
  if (data.interstateActivity && data.statesOfOperation && 
      Array.isArray(data.statesOfOperation) && data.statesOfOperation.length > 1) {
    flags.push({
      id: 'interstate-activity',
      type: 'referral',
      title: 'Multi-State Operations',
      description: 'Operating in multiple states requires compliance with each state\'s UNA laws and may need legal review.',
      severity: 'medium',
      requiresAction: true,
      referralType: 'attorney',
      referralReason: 'Multi-state operations require knowledge of different state laws and compliance requirements.',
      nextSteps: [
        'Consult with multi-state business attorney',
        'Review compliance requirements for each state',
        'Consider foreign qualification needs',
        'Plan for state-specific filings'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for complex governance
  if (data.leadershipStructure && data.leadershipStructure.toLowerCase().includes('board') ||
      data.leadershipStructure && data.leadershipStructure.toLowerCase().includes('committee') ||
      data.leadershipStructure && data.leadershipStructure.toLowerCase().includes('complex')) {
    flags.push({
      id: 'complex-governance',
      type: 'warning',
      title: 'Complex Governance Structure',
      description: 'Your governance structure is more complex than standard UNA setups and may benefit from legal review.',
      severity: 'low',
      requiresAction: false,
      referralType: 'attorney',
      referralReason: 'Complex governance structures benefit from legal expertise to ensure clarity and compliance.',
      nextSteps: [
        'Consider legal review of governance structure',
        'Ensure clear role definitions',
        'Plan for decision-making processes',
        'Document governance procedures'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for grant-seeking
  if (data.grantPlans && data.grantPlans.toLowerCase().includes('grant') ||
      data.grantPlans && data.grantPlans.toLowerCase().includes('funding')) {
    flags.push({
      id: 'grant-seeking',
      type: 'referral',
      title: 'Grant-Seeking Activities',
      description: 'Grant-seeking requires proper documentation and may benefit from specialized guidance.',
      severity: 'low',
      requiresAction: false,
      referralType: 'specialist',
      referralReason: 'Grant applications benefit from specialized knowledge and review.',
      recommendation: 'Establish grant-ready documentation, financial tracking systems, and reporting structures before applying. Many grants require specific organizational capabilities and compliance records.',
      nextSteps: [
        'Consider grant writing specialist',
        'Ensure proper documentation',
        'Plan for reporting requirements',
        'Review compliance needs'
      ],
      faqLink: '/faq#grant-seeking',
      blogLink: '/blog/grant-readiness-for-unas',
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  return flags;
}

// Main verification function
export function verifyUNACompliance(data: IntakeData): VerificationResult {
  const flags = checkVerificationFlags(data);
  
  const requiresLegalReview = flags.some(flag => flag.type === 'legal');
  const requiresCPAReview = flags.some(flag => flag.referralType === 'cpa');
  
  const canProceed = !flags.some(flag => flag.severity === 'high' && flag.requiresAction);
  

  
  const recommendations = flags
    .filter(flag => flag.severity === 'high' || flag.severity === 'medium')
    .map(flag => `${flag.title}: ${flag.referralReason}`);

  return {
    canProceed,
    flags,
    requiresLegalReview,
    requiresCPAReview,
    recommendations
  };
}

// Get referral guidance based on flags
export function getReferralGuidance(flags: VerificationFlag[]): string {
  if (flags.length === 0) {
    return 'Your UNA formation appears straightforward and can proceed with standard documentation. All systems are ready for launch.';
  }

  const highPriorityFlags = flags.filter(flag => flag.severity === 'high');
  const mediumPriorityFlags = flags.filter(flag => flag.severity === 'medium');
  const lowPriorityFlags = flags.filter(flag => flag.severity === 'low');

  let guidance = 'Based on your UNA\'s unique characteristics, here\'s your personalized action plan:\n\n';

  if (highPriorityFlags.length > 0) {
    guidance += `Immediate Action Required\n\n`;
    highPriorityFlags.forEach(flag => {
      guidance += `• ${flag.title}: Schedule consultation immediately\n`;
      guidance += `  Professional needed: ${flag.referralType?.toUpperCase()}\n\n`;
    });
  }

  if (mediumPriorityFlags.length > 0) {
    guidance += `Professional Guidance Recommended\n\n`;
    mediumPriorityFlags.forEach(flag => {
      guidance += `• ${flag.title}: Schedule consultation within 2-4 weeks\n`;
      guidance += `  Professional needed: ${flag.referralType?.toUpperCase()}\n\n`;
    });
  }

  if (lowPriorityFlags.length > 0) {
    guidance += `Strategic Considerations\n\n`;
    lowPriorityFlags.forEach(flag => {
      guidance += `• ${flag.title}: Consider specialized guidance for long-term success\n`;
      guidance += `  Specialist type: ${flag.referralType?.toUpperCase()}\n\n`;
    });
  }

  guidance += `\nReady for Next Steps?\nSchedule a personalized consultation to create your custom roadmap and connect with the right professionals for your UNA's success.`;
  
  return guidance;
}
