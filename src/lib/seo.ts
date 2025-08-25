// Advanced SEO and Content Optimization System for UNA Platform
// Implements schema markup, meta tag management, and content optimization

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface ContentOptimization {
  readabilityScore: number;
  keywordDensity: Record<string, number>;
  headingStructure: string[];
  internalLinks: Array<{
    text: string;
    url: string;
    anchorText: string;
  }>;
  suggestions: string[];
}

// SEO service for comprehensive optimization
class SEOService {
  private static instance: SEOService;
  private baseUrl: string = '';

  private constructor() {
    this.baseUrl = window.location.origin;
    this.initializeSEO();
  }

  static getInstance(): SEOService {
    if (!SEOService.instance) {
      SEOService.instance = new SEOService();
    }
    return SEOService.instance;
  }

  private initializeSEO(): void {
    // Set up meta tag management
    this.setupMetaTagManagement();
    
    // Initialize structured data
    this.initializeStructuredData();
    
    // Set up content optimization
    this.setupContentOptimization();
  }

  private setupMetaTagManagement(): void {
    // Create meta tag container if it doesn't exist
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }
  }

  private initializeStructuredData(): void {
    // Add JSON-LD script container
    if (!document.getElementById('structured-data')) {
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
  }

  private setupContentOptimization(): void {
    // Monitor content changes for optimization
    const observer = new MutationObserver(() => {
      this.optimizeCurrentContent();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Set comprehensive SEO metadata for a page
  setPageSEO(metadata: SEOMetadata): void {
    try {
      // Update document title
      document.title = metadata.title;

      // Update or create meta tags
      this.updateMetaTag('description', metadata.description);
      this.updateMetaTag('keywords', metadata.keywords.join(', '));
      this.updateMetaTag('canonical', metadata.canonicalUrl);

      // Open Graph tags
      this.updateMetaTag('og:title', metadata.ogTitle || metadata.title);
      this.updateMetaTag('og:description', metadata.ogDescription || metadata.description);
      this.updateMetaTag('og:url', metadata.canonicalUrl);
      this.updateMetaTag('og:type', metadata.ogType || 'website');
      if (metadata.ogImage) {
        this.updateMetaTag('og:image', metadata.ogImage);
      }

      // Twitter Card tags
      this.updateMetaTag('twitter:card', metadata.twitterCard || 'summary_large_image');
      this.updateMetaTag('twitter:title', metadata.twitterTitle || metadata.title);
      this.updateMetaTag('twitter:description', metadata.twitterDescription || metadata.description);
      if (metadata.twitterImage) {
        this.updateMetaTag('twitter:image', metadata.twitterImage);
      }

      // Update canonical link
      this.updateCanonicalLink(metadata.canonicalUrl);

      // Track current page for analytics
      console.log('SEO metadata updated for:', metadata.title);
    } catch (error) {
      console.error('Error setting SEO metadata:', error);
    }
  }

  private updateMetaTag(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    
    meta.content = content;
  }

  private updateCanonicalLink(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = url;
  }

  // Add structured data (schema markup)
  addStructuredData(schema: SchemaMarkup): void {
    try {
      const script = document.getElementById('structured-data') as HTMLScriptElement;
      if (script) {
        script.textContent = JSON.stringify(schema);
      }
    } catch (error) {
      console.error('Error adding structured data:', error);
    }
  }

  // Generate UNA-specific schema markup
  generateUNASchema(data: {
    entityName: string;
    entityPurpose: string;
    organizerName: string;
    location: string;
    url: string;
  }): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.entityName,
      description: data.entityPurpose,
      founder: {
        '@type': 'Person',
        name: data.organizerName
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.location,
        addressCountry: 'US'
      },
      url: data.url,
      sameAs: [
        `${this.baseUrl}/about`,
        `${this.baseUrl}/success`
      ]
    };
  }

  // Generate FAQ schema markup
  generateFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  // Generate breadcrumb schema
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${this.baseUrl}${crumb.url}`
      }))
    };
  }

  // Content optimization analysis
  analyzeContent(content: string): ContentOptimization {
    const analysis: ContentOptimization = {
      readabilityScore: this.calculateReadabilityScore(content),
      keywordDensity: this.analyzeKeywordDensity(content),
      headingStructure: this.extractHeadingStructure(),
      internalLinks: this.extractInternalLinks(),
      suggestions: this.generateOptimizationSuggestions(content)
    };

    return analysis;
  }

  private calculateReadabilityScore(content: string): number {
    // Simplified Flesch Reading Ease calculation
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const syllables = this.countSyllables(content);
    
    if (sentences === 0 || words === 0) return 0;
    
    const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return Math.max(0, Math.min(100, score));
  }

  private countSyllables(text: string): number {
    // Simplified syllable counting
    const words = text.toLowerCase().split(/\s+/);
    let syllableCount = 0;
    
    words.forEach(word => {
      if (word.length <= 3) {
        syllableCount += 1;
      } else {
        // Count vowel groups
        const vowelGroups = word.match(/[aeiouy]+/g);
        syllableCount += vowelGroups ? vowelGroups.length : 1;
      }
    });
    
    return syllableCount;
  }

  private analyzeKeywordDensity(content: string): Record<string, number> {
    const keywords = [
      'UNA', 'unincorporated nonprofit association', 'California', 'formation',
      'sovereignty', 'legal structure', 'nonprofit', 'organization', 'mission',
      'governance', 'compliance', 'documents', 'agreement', 'EIN', 'filing'
    ];
    
    const density: Record<string, number> = {};
    const words = content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    
    keywords.forEach(keyword => {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      let count = 0;
      
      for (let i = 0; i <= words.length - keywordWords.length; i++) {
        let match = true;
        for (let j = 0; j < keywordWords.length; j++) {
          if (words[i + j] !== keywordWords[j]) {
            match = false;
            break;
          }
        }
        if (match) count++;
      }
      
      density[keyword] = totalWords > 0 ? (count / totalWords) * 100 : 0;
    });
    
    return density;
  }

  private extractHeadingStructure(): string[] {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    return Array.from(headings).map(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent?.trim() || '';
      return `${'  '.repeat(level - 1)}${heading.tagName} ${text}`;
    });
  }

  private extractInternalLinks(): Array<{ text: string; url: string; anchorText: string }> {
    const links = document.querySelectorAll('a[href^="/"]');
    return Array.from(links).map(link => ({
      text: link.textContent?.trim() || '',
      url: (link as HTMLAnchorElement).href,
      anchorText: (link as HTMLAnchorElement).getAttribute('title') || ''
    }));
  }

  private generateOptimizationSuggestions(content: string): string[] {
    const suggestions: string[] = [];
    
    // Check content length
    if (content.length < 300) {
      suggestions.push('Content is too short. Aim for at least 300 words for better SEO.');
    }
    
    // Check keyword usage
    const keywordDensity = this.analyzeKeywordDensity(content);
    const mainKeywords = ['UNA', 'formation', 'California'];
    
    mainKeywords.forEach(keyword => {
      if (keywordDensity[keyword] < 0.5) {
        suggestions.push(`Consider using "${keyword}" more frequently in your content.`);
      }
    });
    
    // Check heading structure
    const headings = document.querySelectorAll('h1, h2, h3');
    if (headings.length < 2) {
      suggestions.push('Add more headings to improve content structure and readability.');
    }
    
    // Check internal links
    const internalLinks = this.extractInternalLinks();
    if (internalLinks.length < 2) {
      suggestions.push('Add more internal links to improve site navigation and SEO.');
    }
    
    return suggestions;
  }

  // Optimize current page content
  private optimizeCurrentContent(): void {
    const content = document.body.textContent || '';
    const analysis = this.analyzeContent(content);
    
    // Log optimization suggestions
    if (analysis.suggestions.length > 0) {
      console.log('Content optimization suggestions:', analysis.suggestions);
    }
    
    // Update meta description if it's too short
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription && metaDescription.content.length < 120) {
      const newDescription = this.generateMetaDescription(content);
      if (newDescription) {
        metaDescription.content = newDescription;
      }
    }
  }

  private generateMetaDescription(content: string): string {
    // Generate meta description from content
    const sentences = content.split(/[.!?]+/);
    const firstSentence = sentences[0]?.trim();
    
    if (firstSentence && firstSentence.length > 120) {
      return firstSentence.substring(0, 117) + '...';
    }
    
    return firstSentence || '';
  }

  // Get current page analytics
  getPageAnalytics(): {
    title: string;
    description: string;
    wordCount: number;
    headingCount: number;
    internalLinkCount: number;
    readabilityScore: number;
  } {
    const content = document.body.textContent || '';
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const internalLinks = document.querySelectorAll('a[href^="/"]');
    
    return {
      title: document.title,
      description: (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || '',
      wordCount: content.split(/\s+/).length,
      headingCount: headings.length,
      internalLinkCount: internalLinks.length,
      readabilityScore: this.calculateReadabilityScore(content)
    };
  }
}

export const seoService = SEOService.getInstance();

// Auto-initialize SEO service
if (typeof window !== 'undefined') {
  seoService;
}
