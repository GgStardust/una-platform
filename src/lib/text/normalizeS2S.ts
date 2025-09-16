// S2S Text Normalization and Refinement System
// Transforms user inputs into professional, sovereignty-focused language

export interface S2SRefinement {
  original: string;
  refined: string;
  strategicGuidance: string[];
  gaps: string[];
  nextSteps: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface ExploreSummary {
  mission: string;
  activities: string;
  audience: string;
  footprint: string;
  governance: string;
  riskFlags: string[];
  strategicSteps: string[];
  gaps: string[];
}

export interface FormationRefinement {
  fieldName: string;
  original: string;
  refined: string;
  strategicContext: string;
  userChoice: 'original' | 'refined' | 'pending';
}

// S2S Language Rules and Transformations
const s2sTransformations = {
  // Remove filler words and fragments
  cleanup: [
    { pattern: /\b(idk|idc|tbh|imo|btw|etc)\b/gi, replacement: '' },
    { pattern: /\b(maybe|like|just|sort of|kind of)\b/gi, replacement: '' },
    { pattern: /\s*\.{3,}\s*/g, replacement: '. ' },
    { pattern: /\s*[—–-]{2,}\s*/g, replacement: ', ' },
    { pattern: /\s*[—–-]\s*/g, replacement: ', ' }
  ],
  
  // Transform fragments into declarative statements
  fragmentTransform: [
    { pattern: /^community space\b/i, replacement: 'This organization serves as a community space' },
    { pattern: /^maybe workshops\b/i, replacement: 'The organization offers workshops' },
    { pattern: /^not sure governance\b/i, replacement: 'Governance structure requires further definition' },
    { pattern: /^hope to help\b/i, replacement: 'The organization aims to support' },
    { pattern: /^like maybe\b/i, replacement: 'The organization focuses on' },
    { pattern: /^just starting out\b/i, replacement: 'The organization is in its initial development phase' },
    { pattern: /^not sure money side\b/i, replacement: 'Financial planning requires further development' },
    { pattern: /^serve the local community\b/i, replacement: 'The organization serves the local community' },
    { pattern: /^whoever wants to join\b/i, replacement: 'The organization welcomes broad participation' },
    { pattern: /^haven't thought about rules yet\b/i, replacement: 'Membership criteria require definition' }
  ],
  
  // Add strategic context and sovereignty framing
  sovereigntyFraming: [
    { pattern: /\b(community space)\b/gi, context: 'This community space reflects your vision for collective gathering and mutual support' },
    { pattern: /\b(workshops)\b/gi, context: 'Workshops provide structured opportunities for skill sharing and community learning' },
    { pattern: /\b(governance)\b/gi, context: 'Governance structures serve your mission by creating clear decision-making processes' },
    { pattern: /\b(help people)\b/gi, context: 'Supporting others aligns with your mission of community empowerment' },
    { pattern: /\b(education)\b/gi, context: 'Educational programs create pathways for knowledge sharing and capacity building' },
    { pattern: /\b(advocacy)\b/gi, context: 'Advocacy work amplifies community voices and drives systemic change' },
    { pattern: /\b(funding)\b/gi, context: 'Sustainable funding ensures your mission can thrive and grow' },
    { pattern: /\b(membership)\b/gi, context: 'Membership criteria define who shares your vision and values' }
  ]
};

// Core text normalization function
export function normalizeS2SText(input: string): string {
  let refined = input.trim();
  
  // Apply cleanup transformations
  s2sTransformations.cleanup.forEach(transform => {
    refined = refined.replace(transform.pattern, transform.replacement);
  });
  
  // Transform fragments into declarative statements
  s2sTransformations.fragmentTransform.forEach(transform => {
    if (refined.toLowerCase().includes(transform.pattern.source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase())) {
      refined = refined.replace(new RegExp(transform.pattern.source, 'gi'), transform.replacement);
    }
  });
  
  // Ensure proper sentence structure
  refined = refined.replace(/^[a-z]/, (match) => match.toUpperCase());
  if (!refined.endsWith('.') && !refined.endsWith('!') && !refined.endsWith('?')) {
    refined += '.';
  }
  
  // Remove multiple spaces and clean up punctuation
  refined = refined.replace(/\s+/g, ' ').replace(/\s*([.,!?])\s*/g, '$1 ').trim();
  
  return refined;
}

// Generate strategic guidance based on input analysis
export function generateStrategicGuidance(input: string): string[] {
  const guidance: string[] = [];
  const lowerInput = input.toLowerCase();
  
  // Mission clarity guidance
  if (lowerInput.includes('community') && lowerInput.includes('space')) {
    guidance.push('Define the specific types of activities and gatherings that will occur in your community space');
    guidance.push('Consider how the space will serve different community needs and demographics');
    guidance.push('Plan for space management and scheduling to ensure equitable access');
  }
  
  if (lowerInput.includes('workshop') || lowerInput.includes('education')) {
    guidance.push('Outline the core topics and skills your workshops will cover');
    guidance.push('Define your target audience and their learning needs');
    guidance.push('Consider how workshops will contribute to your broader mission');
  }
  
  // Governance guidance
  if (lowerInput.includes('governance') || lowerInput.includes('structure')) {
    guidance.push('Explore governance models that align with your values and mission');
    guidance.push('Consider how decisions will be made and who will be involved');
    guidance.push('Plan for how governance will evolve as your organization grows');
  }
  
  // Financial guidance
  if (lowerInput.includes('money') || lowerInput.includes('funding') || lowerInput.includes('financial')) {
    guidance.push('Develop a clear understanding of your funding needs and sources');
    guidance.push('Consider sustainable revenue models that align with your mission');
    guidance.push('Plan for financial transparency and accountability');
  }
  
  // Membership guidance
  if (lowerInput.includes('join') || lowerInput.includes('membership') || lowerInput.includes('rules')) {
    guidance.push('Define what makes someone a good fit for your organization');
    guidance.push('Consider different levels of involvement and commitment');
    guidance.push('Plan for how new members will be welcomed and oriented');
  }
  
  // Add sovereignty context
  guidance.push('Remember that your organization serves your mission, not the other way around');
  guidance.push('Structure should support your creativity and community impact');
  
  return guidance;
}

// Detect gaps in user input
export function detectGaps(input: string): string[] {
  const gaps: string[] = [];
  const lowerInput = input.toLowerCase();
  
  // Mission gaps
  if (!lowerInput.includes('mission') && !lowerInput.includes('purpose') && !lowerInput.includes('vision')) {
    gaps.push('Clear mission statement and organizational purpose');
  }
  
  // Governance gaps
  if (!lowerInput.includes('governance') && !lowerInput.includes('structure') && !lowerInput.includes('decision')) {
    gaps.push('Governance structure and decision-making processes');
  }
  
  // Financial gaps
  if (!lowerInput.includes('funding') && !lowerInput.includes('money') && !lowerInput.includes('financial')) {
    gaps.push('Financial planning and sustainability strategy');
  }
  
  // Membership gaps
  if (!lowerInput.includes('member') && !lowerInput.includes('join') && !lowerInput.includes('participation')) {
    gaps.push('Membership criteria and participation structure');
  }
  
  // Operational gaps
  if (!lowerInput.includes('activity') && !lowerInput.includes('program') && !lowerInput.includes('service')) {
    gaps.push('Specific programs and activities');
  }
  
  // Geographic gaps
  if (!lowerInput.includes('location') && !lowerInput.includes('area') && !lowerInput.includes('community')) {
    gaps.push('Geographic scope and community focus');
  }
  
  return gaps;
}

// Generate next steps based on gaps and context
export function generateNextSteps(gaps: string[]): string[] {
  const nextSteps: string[] = [];
  
  gaps.forEach(gap => {
    if (gap.includes('mission')) {
      nextSteps.push('Clarify your core mission and the specific change you want to create');
    } else if (gap.includes('governance')) {
      nextSteps.push('Explore governance models that reflect your values and support your mission');
    } else if (gap.includes('financial')) {
      nextSteps.push('Develop a financial sustainability plan that aligns with your mission');
    } else if (gap.includes('membership')) {
      nextSteps.push('Define who your organization serves and how they can participate');
    } else if (gap.includes('activity')) {
      nextSteps.push('Outline the specific programs and activities that will fulfill your mission');
    } else if (gap.includes('geographic')) {
      nextSteps.push('Define your community focus and geographic scope of operations');
    }
  });
  
  // Add sovereignty-focused next steps
  nextSteps.push('Consider how your organizational structure can best serve your creative vision');
  nextSteps.push('Reflect on what success looks like for your mission and community');
  
  return nextSteps;
}

// Main function to process and refine user input
export function processUserInput(input: string): S2SRefinement {
  const refined = normalizeS2SText(input);
  const gaps = detectGaps(input);
  const strategicGuidance = generateStrategicGuidance(input);
  const nextSteps = generateNextSteps(gaps);
  
  // Determine confidence level based on input completeness
  const confidence = input.length > 50 && gaps.length < 3 ? 'high' : 
                    input.length > 25 && gaps.length < 5 ? 'medium' : 'low';
  
  return {
    original: input,
    refined,
    strategicGuidance,
    gaps,
    nextSteps,
    confidence
  };
}

// Generate comprehensive Explore summary
export function generateExploreSummary(answers: any, freeTextDescriptions: any): ExploreSummary {
  const mission = answers.mission.length > 0 ? 
    `This organization focuses on ${answers.mission.join(', ')}` :
    'Mission focus requires further definition';
  
  const activities = freeTextDescriptions.missionDescription ? 
    normalizeS2SText(freeTextDescriptions.missionDescription) :
    'Specific activities and programs need development';
  
  const audience = answers.impact.length > 0 ? 
    `The organization serves ${answers.impact.join(', ')}` :
    'Target audience and impact focus require clarification';
  
  const footprint = answers.environments.length > 0 ? 
    `Operations occur in ${answers.environments.join(', ')} environments` :
    'Operational environment and geographic scope need definition';
  
  const governance = answers.currentForm ? 
    `The organization operates as a ${answers.currentForm} structure` :
    'Governance structure and organizational form require development';
  
  const riskFlags: string[] = [];
  if (!answers.mission.length) riskFlags.push('Unclear mission focus');
  if (!answers.currentForm) riskFlags.push('Undefined organizational structure');
  if (!answers.support.includes('Legal recognition')) riskFlags.push('Legal recognition needs not addressed');
  
  const strategicSteps = [
    'Clarify your core mission and the specific change you want to create',
    'Define your organizational structure and governance approach',
    'Develop your programs and activities to fulfill your mission',
    'Plan for sustainable funding and resource management',
    'Establish clear membership criteria and participation structure'
  ];
  
  const gaps = detectGaps(JSON.stringify(answers) + JSON.stringify(freeTextDescriptions));
  
  return {
    mission,
    activities,
    audience,
    footprint,
    governance,
    riskFlags,
    strategicSteps,
    gaps
  };
}

// Generate Formation field refinements
export function generateFormationRefinements(exploreData: any): FormationRefinement[] {
  const refinements: FormationRefinement[] = [];
  
  // Mission/Purpose refinement
  if (exploreData.mission && Array.isArray(exploreData.mission) && exploreData.mission.length > 0) {
    const original = exploreData.mission.join(', ');
    const refined = `This organization is dedicated to ${exploreData.mission.join(', ')}`;
    const strategicContext = 'Your mission defines the core purpose and direction of your organization';
    
    refinements.push({
      fieldName: 'entityPurpose',
      original,
      refined,
      strategicContext,
      userChoice: 'pending'
    });
  }
  
  // Activities refinement
  if (exploreData.freeTextDescriptions?.missionDescription && typeof exploreData.freeTextDescriptions.missionDescription === 'string') {
    const original = exploreData.freeTextDescriptions.missionDescription;
    const refined = normalizeS2SText(original);
    const strategicContext = 'Your activities are the practical expression of your mission in the community';
    
    refinements.push({
      fieldName: 'entityActivities',
      original,
      refined,
      strategicContext,
      userChoice: 'pending'
    });
  }
  
  // Leadership structure refinement
  if (exploreData.currentForm) {
    const original = exploreData.currentForm;
    const refined = `The organization operates as a ${exploreData.currentForm} with collaborative decision-making`;
    const strategicContext = 'Your leadership structure should support your mission while maintaining flexibility';
    
    refinements.push({
      fieldName: 'leadershipStructure',
      original,
      refined,
      strategicContext,
      userChoice: 'pending'
    });
  }
  
  return refinements;
}
