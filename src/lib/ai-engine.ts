// Local AI processing - no external APIs or costs
// Rule-based AI engine for UNA formation guidance

import { ExploreAnswers, IntakeData } from '@/lib/types';

export interface AIRecommendation {
  recommendation: 'UNA' | 'EXPLORE' | 'OTHER_STRUCTURE';
  confidence: number;
  reasoning: string[];
  nextSteps: string[];
  considerations?: string[];
}

export interface SmartSuggestion {
  entityPurpose?: string;
  entityActivities?: string;
  leadershipStructure?: string;
  governanceNotes?: string;
  fundingApproach?: string;
  commonPitfalls?: string[];
}

// UNA Philosophy & Sovereignty Principles (available for future use)
// const unaPhilosophy = {
//   sovereignty: "A UNA is not just a legal container, it is a sovereignty practice. It affirms that structure should serve mission and creativity rather than constrain them.",
//   s2sMethodology: "S2S itself is a UNA, demonstrating how sovereignty, relational coherence, and multidimensional awareness can be encoded into legal/financial containers.",
//   counterCulture: "The UNA is part of the parallel economy — it resists corporate default structures and creates flexible, low-cost, community-centered options.",
//   communityCentered: "Instead of boards built for compliance, UNA governance is built for alignment, collaboration, and adaptability."
// };

// California UNA Legal Knowledge (available for future use)
// const californiaUnaLaw = {
//   requiredFilings: {
//     lpUna128: "LP/UNA-128 is required to hold property in the UNA's name and register name/insignia under Corporations Code §21300. Fee: $10 per box checked + optional $5 certification.",
//     ua100: "UA-100 designates principal office and agent for service of process. Expires 5 years from December 31 after filing. Natural person agents require complete California street address (no PO Boxes).",
//     dbaFbn: "DBA/FBN filing is county-level. Many counties require in-person/mail filing and 4-week publication in adjudicated newspaper. County lookup needed for specific requirements."
//   },
//   hiddenBenefits: [
//     "Ability to open bank account and hold assets without incorporation",
//     "Flexibility in governance (no rigid board requirements)", 
//     "Low-cost setup and maintenance compared to LLCs and nonprofits",
//     "Legal recognition without corporate structure"
//   ],
//   commonMistakes: [
//     "Not filing LP/UNA-128 when holding land or property",
//     "Failing to separate UNA vs for-profit activities",
//     "Not defining officer roles clearly",
//     "Skipping UA-100 agent designation",
//     "Ignoring DBA publication requirements"
//   ]
// };

// When NOT to recommend UNA (available for future use)
// const unaContraindications = {
//   highLiability: "When entering into high-value contracts with significant liability exposure",
//   federalTaxExempt: "When the group plans to seek federal tax-exempt status (501(c)(3)) immediately",
//   outsideInvestors: "When founders want outside investors or equity financing",
//   corporateCompliance: "When the group needs extensive corporate compliance and governance structures"
// };

// Target Audience Insights (available for future use)
// const audienceInsights = {
//   creativePractitioners: {
//     fears: ["Being boxed in by corporate/legal language", "Losing creative freedom", "Bureaucratic paperwork"],
//     needs: ["Simple, values-aligned structure", "Preservation of autonomy", "Minimal administrative burden"],
//     resonantLanguage: ["sovereignty", "parallel economy", "collective", "living system", "mission-first"]
//   },
//   communityOrganizers: {
//     concerns: ["Protecting members and mission", "Liability clarity", "Collective voice preservation"],
//     needs: ["Legal protection without corporate assimilation", "Clear governance that serves community"],
//     resonantLanguage: ["collective", "community-first", "mission-aligned", "decentralized"]
//   },
//   alternativeEconomyBuilders: {
//     values: ["Sovereignty", "Parallel economy", "Decentralized structures", "Community-first"],
//     turnOffs: ["Compliance", "Corporate governance", "Nonprofit industrial complex", "Tax shelter"]
//   }
// };

// Success Patterns & Best Practices (available for future use)
// const successPatterns = {
//   governanceStructures: [
//     "Small member councils (3-5 people)",
//     "Rotating officer roles",
//     "Clear financial stewardship guidelines",
//     "Mission-aligned decision-making processes"
//   ],
//   fundingStrategies: [
//     "Mission-aligned grants",
//     "Fiscal sponsorship arrangements", 
//     "Community sponsorships",
//     "Earned income from programs/classes",
//     "NOT corporate fundraising or VC-style investment"
//   ],
//   successFactors: [
//     "Groups that define mission, governance, and roles clearly",
//     "Those that treat UNA as mission-aligned structure, not placeholder",
//     "Organizations using UNA as teaching tool for governance participation"
//   ],
//   failurePatterns: [
//     "Treating UNA like placeholder 'just to get bank account'",
//     "Unclear mission or unstable group dynamics",
//     "Desire for investor capital or high-growth scaling"
//   ]
// };

// Smart suggestions based on mission and context
const smartSuggestions = {
  // Mission-based suggestions
  'Education': {
    entityPurpose: 'Provide educational programs and community learning initiatives',
    entityActivities: 'workshops, classes, mentorship programs, educational events, community learning spaces',
    leadershipStructure: 'Educational collaborative with shared teaching responsibilities and rotating program leadership',
    governanceNotes: 'Consider rotating program directors and shared curriculum development',
    fundingApproach: 'Program fees, community sponsorships, educational grants, sliding scale models',
    commonPitfalls: ['Not separating educational vs commercial activities', 'Failing to define instructor roles clearly']
  },
  'Art': {
    entityPurpose: 'Support artistic creation and cultural expression in the community',
    entityActivities: 'art exhibitions, creative workshops, artist residencies, cultural events, public art projects',
    leadershipStructure: 'Artist collective with rotating creative leadership and shared curatorial responsibilities',
    governanceNotes: 'Balance artistic autonomy with collective decision-making',
    fundingApproach: 'Exhibition fees, workshop income, community sponsorships, cultural grants',
    commonPitfalls: ['Blurring personal art business with collective activities', 'Not defining exhibition vs commercial sales']
  },
  'Community Development': {
    entityPurpose: 'Foster community resilience and local economic development',
    entityActivities: 'community workshops, local business support, neighborhood initiatives, skill-sharing programs',
    leadershipStructure: 'Community council with rotating neighborhood representatives and shared project leadership',
    governanceNotes: 'Ensure diverse neighborhood representation and transparent decision-making',
    fundingApproach: 'Community contributions, local business sponsorships, development grants, program fees',
    commonPitfalls: ['Not clearly defining community boundaries', 'Failing to separate advocacy from service activities']
  },
  'Environmental': {
    entityPurpose: 'Protect and restore local ecosystems and promote environmental awareness',
    entityActivities: 'restoration projects, educational programs, advocacy campaigns, community monitoring',
    leadershipStructure: 'Stewardship council with rotating project leadership and shared ecological knowledge',
    governanceNotes: 'Balance restoration work with educational outreach and advocacy',
    fundingApproach: 'Environmental grants, community donations, workshop fees, restoration contracts',
    commonPitfalls: ['Not separating restoration work from advocacy', 'Failing to define liability for field work']
  },
  'Health & Wellness': {
    entityPurpose: 'Promote community health and holistic wellness practices',
    entityActivities: 'wellness workshops, health education, community support groups, holistic services',
    leadershipStructure: 'Wellness collective with rotating program leadership and shared health knowledge',
    governanceNotes: 'Ensure qualified practitioners and clear scope of practice',
    fundingApproach: 'Workshop fees, sliding scale services, health grants, community sponsorships',
    commonPitfalls: ['Not defining scope of practice clearly', 'Blurring health services with commercial wellness business']
  }
};

// California-specific validation rules
const californiaValidationRules = {
  agentAddress: (address: string) => {
    if (!address || address.includes('PO Box') || address.includes('P.O. Box')) {
      return { valid: false, error: 'Natural person agents require complete California street address. PO Boxes are not accepted.' };
    }
    return { valid: true };
  },
  dbaPublicationRequirements: (county: string) => {
    const publicationCounties = ['Riverside', 'San Bernardino', 'Imperial'];
    return {
      requiresPublication: publicationCounties.includes(county),
      publicationPeriod: '4 consecutive weeks in adjudicated newspaper',
      filingMethod: 'In-person or mail filing required'
    };
  }
};

// Intelligent recommendation engine
export function getRecommendation(answers: ExploreAnswers): AIRecommendation {
  let score = 0;
  const reasoning: string[] = [];
  const considerations: string[] = [];
  
  // Location scoring
  if (answers.entityState === 'CA') {
    score += 30;
    reasoning.push('California resident - UNA formation is well-supported');
  } else {
    score -= 20;
    reasoning.push('Non-California resident - UNA formation may have limited legal recognition');
    considerations.push('Consider consulting local legal counsel for your jurisdiction');
  }
  
  // Mission clarity scoring
  if (answers.mission && answers.mission.length > 0) {
    score += 25;
    reasoning.push('Clear mission focus identified');
  } else {
    score -= 15;
    reasoning.push('Mission focus unclear - may need more exploration');
  }
  
  // Current form scoring
  if (answers.currentForm === null) {
    score += 20;
    reasoning.push('No existing structure - UNA provides legal foundation');
  } else if (answers.currentForm === 'team' || answers.currentForm === 'community') {
    score -= 10;
    reasoning.push('Existing corporate structure - consider if UNA benefits outweigh conversion costs');
  }
  
  // Impact goals scoring
  if (answers.impact && answers.impact.includes('community')) {
    score += 15;
    reasoning.push('Community impact goals align with UNA structure');
  }
  
  // Support needs scoring
  if (answers.support && answers.support.includes('legal')) {
    score += 10;
    reasoning.push('Legal structure support needed - UNA provides this');
  }
  
  // Check contraindications
  // Note: fundingNeeds not in ExploreAnswers interface, skipping this check
  // if (answers.fundingNeeds === 'investors' || answers.fundingNeeds === 'equity') {
  //   score -= 30;
  //   reasoning.push('Investor/equity funding needs - UNA not suitable');
  //   considerations.push('Consider LLC or corporation for investor-backed structure');
  // }
  
  // Note: liabilityConcerns not in ExploreAnswers interface, skipping this check
  // if (answers.liabilityConcerns === 'high') {
  //   score -= 25;
  //   reasoning.push('High liability concerns - UNA may not provide sufficient protection');
  //   considerations.push('Consider LLC or corporation for high-liability activities');
  // }
  
  // Determine recommendation
  let recommendation: 'UNA' | 'EXPLORE' | 'OTHER_STRUCTURE';
  
  if (score >= 60) {
    recommendation = 'UNA';
  } else if (score >= 30) {
    recommendation = 'EXPLORE';
  } else {
    recommendation = 'OTHER_STRUCTURE';
  }
  
  return {
    recommendation,
    confidence: Math.min(Math.abs(score), 100),
    reasoning,
    considerations,
    nextSteps: getNextSteps(recommendation, answers)
  };
}

// Get smart suggestions for form prefilling
export function getSmartSuggestions(mission: string[], currentForm: string, impact: string[]): SmartSuggestion {
  // Find matching mission suggestions
  const missionKey = mission.find(m => smartSuggestions[m as keyof typeof smartSuggestions]);
  const baseSuggestions = missionKey ? smartSuggestions[missionKey as keyof typeof smartSuggestions] : {};
  
  // Add context-specific suggestions
  const contextSuggestions: SmartSuggestion = {};
  
  if (currentForm === 'none' || currentForm === 'informal') {
    contextSuggestions.governanceNotes = 'Start with simple rotating leadership structure. You can evolve governance as your organization grows.';
  }
  
  if (impact.includes('community')) {
    contextSuggestions.fundingApproach = 'Consider community sponsorship models and sliding scale pricing to maintain accessibility.';
  }
  
  if (impact.includes('education')) {
    contextSuggestions.entityActivities = 'Include both formal programs and informal community learning opportunities.';
  }
  
  return { ...baseSuggestions, ...contextSuggestions };
}

// Get next steps based on recommendation
function getNextSteps(recommendation: string, _answers: ExploreAnswers): string[] {
  switch (recommendation) {
    case 'UNA':
      return [
        'Complete the UNA formation intake form',
        'Prepare your UNA Agreement document',
        'File LP/UNA-128 if registering name/insignia',
        'File UA-100 for agent designation',
        'Apply for EIN from IRS',
        'File DBA/FBN if using public-facing name',
        'Open bank account with required documents'
      ];
    case 'EXPLORE':
      return [
        'Schedule a consultation to discuss your specific needs',
        'Review alternative business structures (LLC, 501(c)(3))',
        'Clarify your mission and governance preferences',
        'Consider liability protection requirements'
      ];
    case 'OTHER_STRUCTURE':
      return [
        'Consult with business attorney for structure recommendation',
        'Consider LLC for liability protection and flexibility',
        'Explore 501(c)(3) for tax-exempt status',
        'Review corporate structures for investor needs'
      ];
    default:
      return ['Schedule a consultation to discuss your options'];
  }
}

// Validate California-specific requirements
export function validateCaliforniaRequirements(data: IntakeData) {
  const errors: string[] = [];
  
  // Agent address validation
  // Note: agentType and agentAddress not in IntakeData interface, using organizer info instead
  if (data.organizerRole === 'individual') {
    const addressValidation = californiaValidationRules.agentAddress(data.organizerAddress);
    if (!addressValidation.valid) {
      if (addressValidation.error) {
        errors.push(addressValidation.error);
      }
    }
  }
  
  // Note: hasDba and county not in IntakeData interface, skipping this check
  // DBA publication requirements
  // if (data.hasDba && data.county) {
  //   const dbaRequirements = californiaValidationRules.dbaPublicationRequirements(data.county);
  //   if (dbaRequirements.requiresPublication) {
  //     errors.push(`DBA filing in ${data.county} County requires 4-week publication in adjudicated newspaper`);
  //   }
  // }
  
  return errors;
}

// Get UNA-specific guidance
export function getUnaGuidance(context: string): string[] {
  const guidance: { [key: string]: string[] } = {
    'formation': [
      'UNA formation is about creating structure that serves your mission, not conforming to corporate standards',
      'Take time to define governance that reflects your values and community needs',
      'Remember: UNA is a sovereignty practice, not just a legal requirement'
    ],
    'governance': [
      'Start simple with 3-5 person council rather than complex board structure',
      'Rotate leadership roles to build collective capacity and prevent burnout',
      'Create clear financial stewardship guidelines that align with your mission'
    ],
    'funding': [
      'Focus on mission-aligned funding rather than corporate fundraising models',
      'Consider community sponsorships and sliding scale pricing for accessibility',
      'Avoid investor capital - it often conflicts with UNA values and structure'
    ],
    'compliance': [
      'LP/UNA-128 is required for property ownership and name registration',
      'UA-100 expires every 5 years - set calendar reminders',
      'DBA publication requirements vary by county - check local requirements'
    ]
  };
  
  return guidance[context] || guidance['formation'];
}
