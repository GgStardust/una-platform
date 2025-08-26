import { ExploreAnswers } from './types';
import { financialTools } from './affiliate-system';

export interface StrategyInsight {
  type: 'tool' | 'strategy' | 'consideration';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  relatedTools?: string[];
  action?: string;
}

export interface ToolkitRecommendation {
  category: string;
  tools: Array<{
    id: string;
    name: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

// Keyword mapping for intelligent tool recommendations
const keywordMappings = {
  // Mission-based mappings
  'education': {
    tools: ['thinkific', 'learnworlds', 'podia', 'ghost'],
    category: 'Education & Learning',
    strategy: 'Focus on building educational infrastructure and content delivery systems'
  },
  'art': {
    tools: ['patreon', 'buymeacoffee', 'ghost', 'mighty-networks'],
    category: 'Creative & Artistic',
    strategy: 'Leverage creative platforms for community building and monetization'
  },
  'community': {
    tools: ['mighty-networks', 'ghost', 'patreon', 'wefunder'],
    category: 'Community Building',
    strategy: 'Build strong community infrastructure and engagement systems'
  },
  'research': {
    tools: ['digitalocean', 'fastmail', 'proton', 'ghost'],
    category: 'Research & Development',
    strategy: 'Prioritize privacy and robust technical infrastructure'
  },
  'healing': {
    tools: ['mighty-networks', 'patreon', 'ghost', 'zion-healthshare'],
    category: 'Health & Wellness',
    strategy: 'Focus on community support and health-related services'
  },
  'events': {
    tools: ['mighty-networks', 'podia', 'patreon', 'wefunder'],
    category: 'Event Management',
    strategy: 'Build event infrastructure and community engagement'
  },

  // Impact-based mappings
  'international': {
    tools: ['wise', 'proton', 'mullvad', 'digitalocean'],
    category: 'International Operations',
    strategy: 'Prioritize global accessibility and privacy protection'
  },
  'privacy': {
    tools: ['proton', 'tutanota', 'mullvad', 'ledger', 'trezor'],
    category: 'Privacy & Security',
    strategy: 'Build robust privacy infrastructure from the ground up'
  },
  'financial': {
    tools: ['bluevine', 'novo', 'freshbooks', 'xero', 'bench'],
    category: 'Financial Management',
    strategy: 'Establish solid financial foundations and tracking systems'
  },
  'technology': {
    tools: ['digitalocean', 'fastmail', 'proton', 'ledger'],
    category: 'Technology Infrastructure',
    strategy: 'Build scalable and secure technical foundations'
  },
  'health': {
    tools: ['zion-healthshare', 'sedera', 'next-insurance'],
    category: 'Health & Protection',
    strategy: 'Ensure comprehensive protection for your community'
  }
};

// Strategic insights based on combinations
const strategicInsights = [
  {
    triggers: ['education', 'community'],
    insight: {
      type: 'strategy' as const,
      title: 'Educational Community Model',
      description: 'Your focus on education and community building suggests a learning ecosystem approach. Consider how your UNA can serve as both an educational provider and community hub.',
      priority: 'high' as const,
      category: 'Strategic Direction',
      action: 'Focus on building both educational content and community engagement systems'
    }
  },
  {
    triggers: ['art', 'community'],
    insight: {
      type: 'strategy' as const,
      title: 'Creative Community Hub',
      description: 'Combining artistic focus with community building creates opportunities for collaborative creation, shared resources, and collective artistic projects.',
      priority: 'high' as const,
      category: 'Strategic Direction',
      action: 'Develop platforms for collaborative art projects and community creative spaces'
    }
  },
  {
    triggers: ['research', 'privacy'],
    insight: {
      type: 'strategy' as const,
      title: 'Privacy-First Research',
      description: 'Your research focus combined with privacy concerns suggests a need for secure, private research infrastructure that protects participant data.',
      priority: 'high' as const,
      category: 'Strategic Direction',
      action: 'Prioritize privacy tools and secure communication systems'
    }
  },
  {
    triggers: ['healing', 'community'],
    insight: {
      type: 'strategy' as const,
      title: 'Community Healing Model',
      description: 'Your healing focus with community building suggests a peer-support model where community members support each other\'s healing journeys.',
      priority: 'high' as const,
      category: 'Strategic Direction',
      action: 'Build community support systems and health-sharing infrastructure'
    }
  }
];

export function generateStrategyInsights(answers: ExploreAnswers, freeTextDescriptions: any): StrategyInsight[] {
  const insights: StrategyInsight[] = [];
  const allText = [
    ...answers.mission,
    ...answers.impact,
    freeTextDescriptions.missionDescription,
    freeTextDescriptions.impactDescription,
    freeTextDescriptions.overallVision
  ].join(' ').toLowerCase();

  // Generate insights based on keywords
  Object.entries(keywordMappings).forEach(([keyword, mapping]) => {
    if (allText.includes(keyword.toLowerCase())) {
      insights.push({
        type: 'strategy',
        title: `${mapping.category} Strategy`,
        description: mapping.strategy,
        priority: 'medium',
        category: mapping.category,
        relatedTools: mapping.tools
      });
    }
  });

  // Generate strategic insights based on combinations
  strategicInsights.forEach(({ triggers, insight }) => {
    const hasAllTriggers = triggers.every(trigger => 
      allText.includes(trigger.toLowerCase())
    );
    
    if (hasAllTriggers) {
      insights.push(insight);
    }
  });

  // Add location-based insights
  if (answers.entityState && answers.entityState !== 'CA') {
    insights.push({
      type: 'consideration',
      title: 'Multi-State Operations',
      description: `Operating in ${answers.entityState} may have different legal requirements than California. Consider consulting with local legal professionals familiar with UNA formation in your state.`,
      priority: 'medium',
      category: 'Legal & Compliance'
    });
  }

  // Add formation readiness insight
  if (answers.mission.length >= 3 && answers.impact.length >= 2) {
    insights.push({
      type: 'strategy',
      title: 'Strong Formation Foundation',
      description: 'Your detailed mission and impact planning shows excellent preparation for UNA formation. You\'re ready to move forward with confidence.',
      priority: 'high',
      category: 'Formation Readiness',
      action: 'Proceed with consultation and document preparation'
    });
  }

  // Add community building insight
  if (allText.includes('community') || allText.includes('building')) {
    insights.push({
      type: 'strategy',
      title: 'Community-First Approach',
      description: 'Your focus on community building suggests prioritizing tools that facilitate member engagement, communication, and collaboration.',
      priority: 'high',
      category: 'Community Strategy',
      action: 'Focus on community platform tools and engagement systems'
    });
  }

  return insights.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

export function generateToolkitRecommendations(answers: ExploreAnswers, freeTextDescriptions: any): ToolkitRecommendation[] {
  const allText = [
    ...answers.mission,
    ...answers.impact,
    freeTextDescriptions.missionDescription,
    freeTextDescriptions.impactDescription,
    freeTextDescriptions.overallVision
  ].join(' ').toLowerCase();

  const recommendations: { [category: string]: any[] } = {};

  // Map keywords to tool categories
  Object.entries(keywordMappings).forEach(([keyword, mapping]) => {
    if (allText.includes(keyword.toLowerCase())) {
      if (!recommendations[mapping.category]) {
        recommendations[mapping.category] = [];
      }
      
      mapping.tools.forEach(toolId => {
        const tool = financialTools.find(t => t.id === toolId);
        if (tool) {
          recommendations[mapping.category].push({
            id: tool.id,
            name: tool.name,
            reason: `Relevant to your ${keyword} focus`,
            priority: 'high' as const
          });
        }
      });
    }
  });

  // Add essential tools for all UNAs
  if (!recommendations['Essential Foundation']) {
    recommendations['Essential Foundation'] = [];
  }
  
  const essentialTools = ['bluevine', 'proton', 'freshbooks'];
  essentialTools.forEach(toolId => {
    const tool = financialTools.find(t => t.id === toolId);
    if (tool) {
      recommendations['Essential Foundation'].push({
        id: tool.id,
        name: tool.name,
        reason: 'Essential for UNA operations',
        priority: 'high' as const
      });
    }
  });

  // Convert to array format
  return Object.entries(recommendations).map(([category, tools]) => ({
    category,
    tools: tools.slice(0, 4) // Limit to top 4 tools per category
  }));
}

export function generateExecutiveSummary(answers: ExploreAnswers, freeTextDescriptions: any): string {
  const missionFocus = answers.mission.length > 0 ? answers.mission.join(', ') : 'General purpose';
  const impactFocus = answers.impact.length > 0 ? answers.impact.join(', ') : 'Community building';
  const location = answers.entityState || 'Location not specified';
  
  let summary = `Based on your exploration, you're forming a UNA focused on ${missionFocus.toLowerCase()} with the goal of creating ${impactFocus.toLowerCase()}. `;
  
  if (answers.mission.length >= 3) {
    summary += `Your multi-faceted mission shows strong strategic thinking and diverse impact potential. `;
  }
  
  if (answers.impact.length >= 2) {
    summary += `Your clear impact goals demonstrate readiness for focused implementation. `;
  }
  
  summary += `Operating in ${location}, your UNA is well-positioned to serve your community effectively. `;
  
  if (freeTextDescriptions.missionDescription || freeTextDescriptions.impactDescription) {
    summary += `Your detailed vision and mission planning indicates excellent preparation for successful UNA formation.`;
  }
  
  return summary;
}
