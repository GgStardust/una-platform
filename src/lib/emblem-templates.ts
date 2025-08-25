// No imports needed for this file

export interface EmblemTemplate {
  id: string;
  name: string;
  category: 'nature' | 'geometric' | 'abstract' | 'heritage' | 'modern';
  description: string;
  svgTemplate: string;
  colorSchemes: string[];
  bestFor: string[];
}

// Additional emblem templates for more variety
export const emblemTemplates: EmblemTemplate[] = [
  // Nature-inspired templates
  {
    id: 'tree-growth',
    name: 'Tree of Growth',
    category: 'nature',
    description: 'Symbolic tree representing growth, community, and sustainability',
    svgTemplate: `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tree-bg" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style="stop-color:{{primary}};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{{secondary}};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Tree trunk -->
        <rect x="140" y="180" width="20" height="80" fill="{{accent}}" rx="3"/>
        
        <!-- Tree branches -->
        <path d="M150,180 Q120,150 100,120 Q130,100 150,80 Q170,100 200,120 Q180,150 150,180" fill="url(#tree-bg)"/>
        
        <!-- Leaves -->
        <circle cx="120" cy="110" r="15" fill="{{primary}}" opacity="0.8"/>
        <circle cx="180" cy="110" r="15" fill="{{secondary}}" opacity="0.8"/>
        <circle cx="150" cy="90" r="20" fill="{{accent}}" opacity="0.9"/>
        
        <!-- Entity name -->
        <text x="150" y="220" text-anchor="middle" fill="{{accent}}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          {{entityName}}
        </text>
        <text x="150" y="240" text-anchor="middle" fill="{{accent}}" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
          UNA
        </text>
      </svg>
    `,
    colorSchemes: ['earth', 'ocean', 'sunset'],
    bestFor: ['environmental', 'community', 'sustainability', 'growth']
  },
  
  // Geometric templates
  {
    id: 'hexagon-network',
    name: 'Hexagon Network',
    category: 'geometric',
    description: 'Modern geometric design representing connection and strength',
    svgTemplate: `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hex-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:{{primary}};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{{secondary}};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Central hexagon -->
        <polygon points="150,50 200,75 200,125 150,150 100,125 100,75" fill="url(#hex-bg)" stroke="{{accent}" stroke-width="2"/>
        
        <!-- Surrounding hexagons -->
        <polygon points="250,100 275,125 275,175 250,200 225,175 225,125" fill="{{primary}}" opacity="0.6"/>
        <polygon points="50,100 75,125 75,175 50,200 25,175 25,125" fill="{{secondary}}" opacity="0.6"/>
        <polygon points="150,200 200,225 200,275 150,300 100,275 100,225" fill="{{accent}}" opacity="0.6"/>
        
        <!-- Connection lines -->
        <line x1="200" y1="100" x2="225" y2="150" stroke="{{accent}}" stroke-width="2" opacity="0.7"/>
        <line x1="100" y1="100" x2="75" y2="150" stroke="{{accent}}" stroke-width="2" opacity="0.7"/>
        <line x1="150" y1="150" x2="150" y2="200" stroke="{{accent}}" stroke-width="2" opacity="0.7"/>
        
        <!-- Entity name -->
        <text x="150" y="220" text-anchor="middle" fill="{{accent}}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          {{entityName}}
        </text>
        <text x="150" y="240" text-anchor="middle" fill="{{accent}}" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
          UNA
        </text>
      </svg>
    `,
    colorSchemes: ['monochrome', 'vibrant', 'ocean'],
    bestFor: ['technology', 'networking', 'innovation', 'connection']
  },
  
  // Abstract templates
  {
    id: 'flowing-waves',
    name: 'Flowing Waves',
    category: 'abstract',
    description: 'Dynamic flowing design representing movement and energy',
    svgTemplate: `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:{{primary}};stop-opacity:1" />
            <stop offset="50%" style="stop-color:{{secondary}};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{{accent}};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Flowing waves -->
        <path d="M0,150 Q50,100 100,150 Q150,200 200,150 Q250,100 300,150" stroke="url(#wave-bg)" stroke-width="8" fill="none"/>
        <path d="M0,180 Q50,130 100,180 Q150,230 200,180 Q250,130 300,180" stroke="url(#wave-bg)" stroke-width="6" fill="none" opacity="0.7"/>
        <path d="M0,210 Q50,160 100,210 Q150,260 200,210 Q250,160 300,210" stroke="url(#wave-bg)" stroke-width="4" fill="none" opacity="0.5"/>
        
        <!-- Central element -->
        <circle cx="150" cy="150" r="25" fill="{{accent}}" opacity="0.9"/>
        <circle cx="150" cy="150" r="15" fill="white" opacity="0.8"/>
        
        <!-- Entity name -->
        <text x="150" y="220" text-anchor="middle" fill="{{accent}}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          {{entityName}}
        </text>
        <text x="150" y="240" text-anchor="middle" fill="{{accent}}" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
          UNA
        </text>
      </svg>
    `,
    colorSchemes: ['ocean', 'sunset', 'vibrant'],
    bestFor: ['creative', 'artistic', 'dynamic', 'flowing']
  },
  
  // Heritage templates
  {
    id: 'classic-shield',
    name: 'Classic Shield',
    category: 'heritage',
    description: 'Traditional shield design representing strength and heritage',
    svgTemplate: `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shield-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:{{primary}};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{{secondary}};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Shield shape -->
        <path d="M150,50 L250,100 L250,200 L150,250 L50,200 L50,100 Z" fill="url(#shield-bg)" stroke="{{accent}}" stroke-width="3"/>
        
        <!-- Shield divisions -->
        <line x1="150" y1="50" x2="150" y2="250" stroke="{{accent}}" stroke-width="2" opacity="0.7"/>
        <line x1="50" y1="150" x2="250" y2="150" stroke="{{accent}}" stroke-width="2" opacity="0.7"/>
        
        <!-- Central symbol -->
        <circle cx="150" cy="150" r="30" fill="{{accent}}" opacity="0.8"/>
        <text x="150" y="160" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">U</text>
        
        <!-- Entity name -->
        <text x="150" y="220" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          {{entityName}}
        </text>
        <text x="150" y="240" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" opacity="0.9">
          UNA
        </text>
      </svg>
    `,
    colorSchemes: ['earth', 'monochrome', 'traditional'],
    bestFor: ['traditional', 'heritage', 'strength', 'authority']
  },
  
  // Modern templates
  {
    id: 'minimal-grid',
    name: 'Minimal Grid',
    category: 'modern',
    description: 'Clean, minimal design representing clarity and structure',
    svgTemplate: `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Background grid -->
        <rect x="50" y="50" width="200" height="200" fill="{{primary}}" rx="15"/>
        
        <!-- Grid lines -->
        <line x1="150" y1="50" x2="150" y2="250" stroke="{{accent}}" stroke-width="2" opacity="0.8"/>
        <line x1="50" y1="150" x2="250" y2="150" stroke="{{accent}}" stroke-width="2" opacity="0.8"/>
        
        <!-- Corner accents -->
        <rect x="60" y="60" width="20" height="20" fill="{{secondary}}" rx="3"/>
        <rect x="220" y="60" width="20" height="20" fill="{{secondary}}" rx="3"/>
        <rect x="60" y="220" width="20" height="20" fill="{{secondary}}" rx="3"/>
        <rect x="220" y="220" width="20" height="20" fill="{{secondary}}" rx="3"/>
        
        <!-- Central element -->
        <circle cx="150" cy="150" r="25" fill="{{accent}}" opacity="0.9"/>
        
        <!-- Entity name -->
        <text x="150" y="220" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          {{entityName}}
        </text>
        <text x="150" y="240" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
          UNA
        </text>
      </svg>
    `,
    colorSchemes: ['monochrome', 'vibrant', 'ocean'],
    bestFor: ['modern', 'minimal', 'clean', 'structured']
  }
];

// Get templates by category
export function getTemplatesByCategory(category: string): EmblemTemplate[] {
  return emblemTemplates.filter(template => template.category === category);
}

// Get templates suitable for specific UNA types
export function getTemplatesForUNAType(unaType: string): EmblemTemplate[] {
  return emblemTemplates.filter(template => 
    template.bestFor.some(type => 
      unaType.toLowerCase().includes(type.toLowerCase())
    )
  );
}

// Get random template for variety
export function getRandomTemplate(): EmblemTemplate {
  const randomIndex = Math.floor(Math.random() * emblemTemplates.length);
  return emblemTemplates[randomIndex];
}

// Apply template with custom colors and entity name
export function applyTemplate(
  template: EmblemTemplate, 
  entityName: string, 
  colorScheme: string
): string {
  const colors = getColorPalette(colorScheme);
  const primary = colors[0];
  const secondary = colors[1];
  const accent = colors[2];
  
  return template.svgTemplate
    .replace(/{{primary}}/g, primary)
    .replace(/{{secondary}}/g, secondary)
    .replace(/{{accent}}/g, accent)
    .replace(/{{entityName}}/g, entityName);
}

// Get color palette based on selection
function getColorPalette(colorScheme: string): string[] {
  switch (colorScheme) {
    case 'earth':
      return ['#8B4513', '#228B22', '#D2691E'];
    case 'ocean':
      return ['#1E90FF', '#20B2AA', '#4169E1'];
    case 'sunset':
      return ['#FF6347', '#FF8C00', '#FFD700'];
    case 'monochrome':
      return ['#2F4F4F', '#696969', '#A9A9A9'];
    case 'vibrant':
      return ['#FF1493', '#00FF00', '#FFD700'];
    case 'traditional':
      return ['#8B0000', '#006400', '#FFD700'];
    default:
      return ['#2F4F4F', '#696969', '#A9A9A9'];
  }
}
