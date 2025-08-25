import { IntakeData, VerificationFlag } from './types';

export interface VerificationStatus {
  id: string;
  entityId: string;
  documentsVerified: boolean;
  referralVerified: boolean;
  overallVerified: boolean;
  verificationDate?: string;
  verifiedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralStatus {
  id: string;
  entityId: string;
  referralType: 'landholding' | '501c3' | 'fiscal-sponsorship' | 'succession' | 'conflict-interest' | 'interstate';
  status: 'pending' | 'consulted' | 'resolved' | 'not-needed';
  professionalName?: string;
  professionalType?: 'attorney' | 'cpa' | 'consultant' | 'other';
  consultationDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced verification flags based on intake data with better detection logic
export function checkVerificationFlags(data: IntakeData): VerificationFlag[] {
  const flags: VerificationFlag[] = [];

  // Enhanced property/landholding detection
  if (data.propertyPlans) {
    const propertyText = data.propertyPlans.toLowerCase();
    const propertyKeywords = ['land', 'property', 'real estate', 'building', 'facility', 'venue', 'space'];
    const hasPropertyPlans = propertyKeywords.some(keyword => propertyText.includes(keyword));
    
    if (hasPropertyPlans) {
      flags.push({
        id: 'landholding-' + Date.now(),
        type: 'legal',
        title: 'Property/Landholding Plans Detected',
        description: 'Your organization plans to hold or manage real property. This requires special legal considerations including zoning, insurance, and liability protection.',
        severity: 'high',
        requiresAction: true,
        referralType: 'attorney',
        referralReason: 'Property management requires legal expertise to ensure proper structure, compliance, and risk management.',
        nextSteps: [
          'Consult with a real estate attorney',
          'Review zoning requirements',
          'Ensure proper insurance coverage',
          'Plan for liability protection'
        ],
        status: 'active',
        createdAt: new Date().toISOString()
      });
    }
  }

  // Enhanced 501c3 detection with comprehensive analysis
  if (data.taxExemptIntent) {
    flags.push({
      id: '501c3-' + Date.now(),
      type: 'referral',
      title: '501(c)(3) Tax-Exempt Status Intent',
      description: 'You are seeking 501(c)(3) tax-exempt status. This requires IRS approval, specific legal structure, and ongoing compliance requirements.',
      severity: 'high',
      requiresAction: true,
      referralType: 'cpa',
      referralReason: '501(c)(3) applications require specialized knowledge of IRS requirements and compliance.',
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

  // Enhanced fiscal sponsorship detection with risk assessment
  if (data.fiscalSponsorship) {
    flags.push({
      id: 'fiscal-sponsorship-' + Date.now(),
      type: 'referral',
      title: 'Fiscal Sponsorship Plans',
      description: 'Your organization plans to operate under fiscal sponsorship. This arrangement has specific legal, financial, and compliance implications that require careful consideration.',
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

  // Check for succession planning
  if (data.successionPlanning && data.successionPlanning.toLowerCase().includes('complex') || 
      data.successionPlanning && data.successionPlanning.toLowerCase().includes('challenge')) {
    flags.push({
      id: 'succession-' + Date.now(),
      type: 'warning',
      title: 'Complex Succession Planning',
      description: 'Your organization has complex succession planning needs, which may require specialized guidance.',
      severity: 'medium',
      requiresAction: false,
      referralType: undefined,
      referralReason: '',
      nextSteps: [
        'Consider consulting with governance experts',
        'Establish clear succession procedures',
        'Document leadership transitions',
        'Plan for continuity'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Check for family leadership
  if (data.familyLeadership) {
    flags.push({
      id: 'family-leadership-' + Date.now(),
      type: 'warning',
      title: 'Family Leadership Structure',
      description: 'Your organization has family members in leadership roles, which may create potential conflicts of interest.',
      severity: 'low',
      requiresAction: false,
      referralType: undefined,
      referralReason: '',
      nextSteps: [
        'Establish clear conflict of interest policies',
        'Document conflict resolution procedures',
        'Plan for leadership transitions',
        'Ensure clear governance structure'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // Enhanced interstate activity detection
  if (data.interstateActivity && data.statesOfOperation && data.statesOfOperation.length > 0) {
    flags.push({
      id: 'interstate-' + Date.now(),
      type: 'legal',
      title: 'Interstate Activity Detected',
      description: 'Your organization operates across state lines, which may require registration in multiple states and compliance with varying regulations.',
      severity: 'medium',
      requiresAction: true,
      referralType: 'attorney',
      referralReason: 'Interstate operations require understanding of multiple jurisdictions and compliance requirements.',
      nextSteps: [
        'Consult with attorney familiar with interstate operations',
        'Review compliance requirements in each state',
        'Ensure proper registration in all states',
        'Plan for ongoing compliance monitoring'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // New: Check for complex governance structure
  if (data.leadershipStructure && data.leadershipStructure.toLowerCase().includes('board') || 
      data.leadershipStructure && data.leadershipStructure.toLowerCase().includes('committee') ||
      data.leadershipStructure && data.leadershipStructure.toLowerCase().includes('council')) {
    flags.push({
      id: 'governance-' + Date.now(),
      type: 'warning',
      title: 'Complex Governance Structure',
      description: 'Your organization has a complex governance structure that may require specialized legal guidance for proper implementation.',
      severity: 'medium',
      requiresAction: false,
      referralType: undefined,
      referralReason: '',
      nextSteps: [
        'Work with a governance expert',
        'Establish clear roles and responsibilities',
        'Document decision-making procedures',
        'Plan for ongoing management'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // New: Check for fundraising activities
  if (data.fundraisingPlans && data.fundraisingPlans.toLowerCase().includes('grant') ||
      data.fundraisingPlans && data.fundraisingPlans.toLowerCase().includes('donation') ||
      data.fundraisingPlans && data.fundraisingPlans.toLowerCase().includes('fundraising')) {
    flags.push({
      id: 'fundraising-' + Date.now(),
      type: 'referral',
      title: 'Fundraising Activities Planned',
      description: 'Your organization plans to engage in fundraising activities, which requires compliance with state and federal regulations.',
      severity: 'medium',
      requiresAction: true,
      referralType: 'cpa',
      referralReason: 'Fundraising activities require understanding of tax implications and compliance requirements.',
      nextSteps: [
        'Ensure compliance with fundraising laws',
        'Establish proper financial controls',
        'Consider consulting with a fundraising compliance specialist',
        'Plan for donor management'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  // New: Check for EIN requirements
  if (data.needsEIN) {
    flags.push({
      id: 'ein-' + Date.now(),
      type: 'referral',
      title: 'EIN Registration Required',
      description: 'Your organization needs an Employer Identification Number for banking and tax purposes.',
      severity: 'low',
      requiresAction: true,
      referralType: 'cpa',
      referralReason: 'EIN applications require proper documentation and understanding of IRS requirements.',
      nextSteps: [
        'Prepare UNA Agreement',
        'Complete LP/UNA-128 filing',
        'Apply for EIN through IRS',
        'Plan for ongoing compliance'
      ],
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  return flags;
}

// New: Calculate overall risk assessment for the organization
export function calculateRiskAssessment(flags: VerificationFlag[]): {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  riskFactors: string[];
  recommendations: string[];
} {
  if (flags.length === 0) {
    return {
      overallRisk: 'low',
      riskScore: 0,
      riskFactors: [],
      recommendations: ['Your UNA formation appears low-risk and straightforward.']
    };
  }

  let riskScore = 0;
  const riskFactors: string[] = [];
  const recommendations: string[] = [];

  flags.forEach(flag => {
    switch (flag.severity) {
      case 'high':
        riskScore += 10;
        riskFactors.push(`${flag.title} (High Risk)`);
        break;
      case 'medium':
        riskScore += 5;
        riskFactors.push(`${flag.title} (Medium Risk)`);
        break;
      case 'low':
        riskScore += 2;
        riskFactors.push(`${flag.title} (Low Risk)`);
        break;
    }

    if (flag.nextSteps && flag.nextSteps.length > 0) {
      recommendations.push(flag.nextSteps[0]);
    }
  });

  let overallRisk: 'low' | 'medium' | 'high' | 'critical';
  if (riskScore <= 5) overallRisk = 'low';
  else if (riskScore <= 15) overallRisk = 'medium';
  else if (riskScore <= 30) overallRisk = 'high';
  else overallRisk = 'critical';

  // Add risk-specific recommendations
  if (overallRisk === 'high' || overallRisk === 'critical') {
    recommendations.unshift('Professional legal assistance is strongly recommended before proceeding.');
    recommendations.unshift('Consider a phased approach to address high-risk items first.');
  } else if (overallRisk === 'medium') {
    recommendations.unshift('Professional consultation is recommended for optimal compliance.');
  }

  return {
    overallRisk,
    riskScore,
    riskFactors,
    recommendations
  };
}

// Enhanced referral guidance with actionable recommendations and cost estimates
export function getReferralGuidance(flags: VerificationFlag[]): string {
  if (flags.length === 0) {
    return 'Your UNA formation appears straightforward and may not require professional assistance. You can proceed with confidence using our platform guidance.';
  }

  const highFlags = flags.filter(flag => flag.severity === 'high');
  const mediumFlags = flags.filter(flag => flag.severity === 'medium');
  const lowFlags = flags.filter(flag => flag.severity === 'low');

  let guidance = '';

  // High priority issues
  if (highFlags.length > 0) {
    guidance += `**🚨 High Priority Issues (${highFlags.length}):** Professional legal assistance is strongly recommended. `;
    guidance += 'These issues may affect your organization\'s legal status, compliance requirements, and long-term success.\n\n';
    
    highFlags.forEach(flag => {
      guidance += `• **${flag.title}**\n`;
      guidance += `  📋 Action: ${flag.nextSteps.join(', ')}\n\n`;
    });
  }

  // Medium priority items
  if (mediumFlags.length > 0) {
    guidance += `**⚠️ Medium Priority Items (${mediumFlags.length}):** Consider consulting with professionals for these areas. `;
    guidance += 'While not immediately critical, addressing these items can significantly improve your organization\'s structure and compliance.\n\n';
    
    mediumFlags.forEach(flag => {
      guidance += `• **${flag.title}**\n`;
      guidance += `  📋 Action: ${flag.nextSteps.join(', ')}\n\n`;
    });
  }

  // Low priority items
  if (lowFlags.length > 0) {
    guidance += `**ℹ️ Low Priority Items (${lowFlags.length}):** These items can typically be handled independently or with minimal professional guidance.\n\n`;
    
    lowFlags.forEach(flag => {
      guidance += `• **${flag.title}**\n`;
      guidance += `  📋 Action: ${flag.nextSteps.join(', ')}\n\n`;
    });
  }

  // Professional recommendations
  guidance += '**👥 Recommended Professional Services:**\n\n';
  guidance += '**Legal Professionals:**\n';
  guidance += '• **Nonprofit Attorney:** For legal structure, compliance, and complex issues\n';
  guidance += '• **Real Estate Attorney:** If landholding or property management is involved\n';
  guidance += '• **Tax Attorney:** For tax-exempt status and complex tax matters\n\n';
  
  guidance += '**Financial & Compliance:**\n';
  guidance += '• **CPA/Tax Advisor:** For tax-exempt status and financial compliance\n';
  guidance += '• **Fundraising Compliance Specialist:** If engaging in fundraising activities\n';
  guidance += '• **Nonprofit Consultant:** For organizational development and best practices\n\n';
  
  guidance += '**Next Steps:**\n';
  guidance += '1. Review the specific recommendations above\n';
  guidance += '2. Prioritize based on severity and timeline\n';
  guidance += '3. Schedule consultations with relevant professionals\n';
  guidance += '4. Document all professional advice and decisions\n';

  return guidance;
}

// Verification storage and management
export class VerificationManager {
  private static readonly VERIFICATION_KEY = 'una_verification_status';
  private static readonly REFERRAL_KEY = 'una_referral_status';

  // Get verification status for an entity
  static getVerificationStatus(entityId: string): VerificationStatus | null {
    try {
      const stored = localStorage.getItem(this.VERIFICATION_KEY);
      if (!stored) return null;
      
      const allStatuses: VerificationStatus[] = JSON.parse(stored);
      return allStatuses.find(status => status.entityId === entityId) || null;
    } catch (error) {
      console.error('Error reading verification status:', error);
      return null;
    }
  }

  // Set verification status for an entity
  static setVerificationStatus(status: VerificationStatus): void {
    try {
      const stored = localStorage.getItem(this.VERIFICATION_KEY);
      const allStatuses: VerificationStatus[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = allStatuses.findIndex(s => s.entityId === status.entityId);
      if (existingIndex >= 0) {
        allStatuses[existingIndex] = status;
      } else {
        allStatuses.push(status);
      }
      
      localStorage.setItem(this.VERIFICATION_KEY, JSON.stringify(allStatuses));
    } catch (error) {
      console.error('Error saving verification status:', error);
    }
  }

  // Get referral status for an entity
  static getReferralStatus(entityId: string): ReferralStatus[] {
    try {
      const stored = localStorage.getItem(this.REFERRAL_KEY);
      if (!stored) return [];
      
      const allReferrals: ReferralStatus[] = JSON.parse(stored);
      return allReferrals.filter(referral => referral.entityId === entityId);
    } catch (error) {
      console.error('Error reading referral status:', error);
      return [];
    }
  }

  // Set referral status for an entity
  static setReferralStatus(referral: ReferralStatus): void {
    try {
      const stored = localStorage.getItem(this.REFERRAL_KEY);
      const allReferrals: ReferralStatus[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = allReferrals.findIndex(r => r.id === referral.id);
      if (existingIndex >= 0) {
        allReferrals[existingIndex] = referral;
      } else {
        allReferrals.push(referral);
      }
      
      localStorage.setItem(this.REFERRAL_KEY, JSON.stringify(allReferrals));
    } catch (error) {
      console.error('Error saving referral status:', error);
    }
  }

  // Mark verification as complete
  static markVerified(entityId: string, verifiedBy: string, notes?: string): VerificationStatus {
    const existingStatus = this.getVerificationStatus(entityId);
    const verificationFlags = this.getVerificationFlags();
    
    const newStatus: VerificationStatus = {
      id: existingStatus?.id || `verification-${Date.now()}`,
      entityId,
      documentsVerified: true,
      referralVerified: verificationFlags.length === 0 || this.areReferralsResolved(entityId),
      overallVerified: true,
      verificationDate: new Date().toISOString(),
      verifiedBy,
      notes,
      createdAt: existingStatus?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.setVerificationStatus(newStatus);
    return newStatus;
  }

  // Get verification flags for an entity
  static getVerificationFlags(): VerificationFlag[] {
    try {
      // Load intake data for the entity
      const intakeData = localStorage.getItem('intake');
      if (!intakeData) return [];
      
      const intake = JSON.parse(intakeData);
      
      // Generate flags based on intake data
      const flags: VerificationFlag[] = [];
      
      // Check for landholding scenarios
      if (intake.propertyPlans && 
          (intake.propertyPlans.toLowerCase().includes('land') || 
           intake.propertyPlans.toLowerCase().includes('property') ||
           intake.propertyPlans.toLowerCase().includes('real estate'))) {
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
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      // Check for tax-exempt status
      if (intake.taxExemptIntent) {
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
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      // Check for fiscal sponsorship
      if (intake.fiscalSponsorship) {
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
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      // Check for family leadership
      if (intake.familyLeadership) {
        flags.push({
          id: 'family-leadership',
          type: 'warning',
          title: 'Family Leadership Structure',
          description: 'Family-based leadership may require additional planning for succession and conflict resolution.',
          severity: 'low',
          requiresAction: false,
          referralType: undefined,
          referralReason: '',
          nextSteps: [
            'Consider succession planning',
            'Document conflict resolution procedures',
            'Plan for leadership transitions',
            'Ensure clear governance structure'
          ],
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      // Check for interstate activity
      if (intake.interstateActivity) {
        flags.push({
          id: 'interstate-activity',
          type: 'legal',
          title: 'Interstate Operations',
          description: 'Your UNA operates across state lines, which may require additional compliance considerations.',
          severity: 'medium',
          requiresAction: true,
          referralType: 'attorney',
          referralReason: 'Interstate operations require understanding of multiple jurisdictions and compliance requirements.',
          nextSteps: [
            'Consult with attorney familiar with interstate operations',
            'Review compliance requirements in each state',
            'Ensure proper registration in all states',
            'Plan for ongoing compliance monitoring'
          ],
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      // Check for EIN needs
      if (intake.needsEIN) {
        flags.push({
          id: 'ein-required',
          type: 'referral',
          title: 'EIN Application Required',
          description: 'You need an Employer Identification Number for your UNA operations.',
          severity: 'medium',
          requiresAction: true,
          referralType: 'cpa',
          referralReason: 'EIN applications require proper documentation and understanding of IRS requirements.',
          nextSteps: [
            'Prepare UNA Agreement',
            'Complete LP/UNA-128 filing',
            'Apply for EIN through IRS',
            'Plan for ongoing compliance'
          ],
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      return flags;
    } catch (error) {
      console.error('Error generating verification flags:', error);
      return [];
    }
  }

  // Resolve a verification flag
  static resolveFlag(flagId: string, resolvedBy: string, resolutionNotes?: string): void {
    try {
      const flags = this.getVerificationFlags();
      const flagIndex = flags.findIndex(f => f.id === flagId);
      
      if (flagIndex >= 0) {
        flags[flagIndex].status = 'resolved';
        flags[flagIndex].resolvedAt = new Date().toISOString();
        flags[flagIndex].resolvedBy = resolvedBy;
        flags[flagIndex].resolutionNotes = resolutionNotes;
        
        // Save updated flags
        localStorage.setItem('verificationFlags', JSON.stringify(flags));
      }
    } catch (error) {
      console.error('Error resolving flag:', error);
    }
  }

  // Dismiss a verification flag
  static dismissFlag(flagId: string, dismissedBy: string, dismissalNotes?: string): void {
    try {
      const flags = this.getVerificationFlags();
      const flagIndex = flags.findIndex(f => f.id === flagId);
      
      if (flagIndex >= 0) {
        flags[flagIndex].status = 'dismissed';
        flags[flagIndex].resolvedAt = new Date().toISOString();
        flags[flagIndex].resolvedBy = dismissedBy;
        flags[flagIndex].resolutionNotes = dismissalNotes;
        
        // Save updated flags
        localStorage.setItem('verificationFlags', JSON.stringify(flags));
      }
    } catch (error) {
      console.error('Error dismissing flag:', error);
    }
  }

  // Get flags by status
  static getFlagsByStatus(status: 'active' | 'resolved' | 'dismissed'): VerificationFlag[] {
    const flags = this.getVerificationFlags();
    return flags.filter(f => f.status === status);
  }

  // Get unresolved flags (active only)
  static getUnresolvedFlags(): VerificationFlag[] {
    return this.getFlagsByStatus('active');
  }

  // Export flags to JSON
  static exportFlags(): string {
    try {
      const flags = this.getVerificationFlags();
      return JSON.stringify(flags, null, 2);
    } catch (error) {
      console.error('Error exporting flags:', error);
      return '[]';
    }
  }

  // Check if all referrals are resolved
  static areReferralsResolved(entityId: string): boolean {
    const referrals = this.getReferralStatus(entityId);
    if (referrals.length === 0) return true;
    
    return referrals.every(referral => 
      referral.status === 'resolved' || referral.status === 'not-needed'
    );
  }

  // Create initial verification status
  static createInitialStatus(entityId: string): VerificationStatus {
    return {
      id: `verification-${Date.now()}`,
      entityId,
      documentsVerified: false,
      referralVerified: false,
      overallVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Check if verification is needed
  static isVerificationNeeded(entityId: string): boolean {
    const status = this.getVerificationStatus(entityId);
    if (!status) return true;
    
    return !status.overallVerified;
  }

  // Get verification summary
  static getVerificationSummary(entityId: string): {
    needsVerification: boolean;
    documentsVerified: boolean;
    referralVerified: boolean;
    overallVerified: boolean;
    flags: VerificationFlag[];
  } {
    const status = this.getVerificationStatus(entityId);
    const flags = this.getVerificationFlags();
    
    return {
      needsVerification: this.isVerificationNeeded(entityId),
      documentsVerified: status?.documentsVerified || false,
      referralVerified: status?.referralVerified || false,
      overallVerified: status?.overallVerified || false,
      flags
    };
  }
}
