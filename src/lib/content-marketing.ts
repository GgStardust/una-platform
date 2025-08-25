// Advanced Content Marketing System for UNA Platform
// Manages content strategy, performance tracking, and optimization

export interface ContentPiece {
  id: string;
  title: string;
  type: 'blog' | 'case_study' | 'success_story' | 'faq' | 'guide' | 'newsletter';
  status: 'draft' | 'review' | 'published' | 'archived';
  publishDate: string;
  author: string;
  tags: string[];
  targetAudience: string[];
  seoKeywords: string[];
  content: string;
  excerpt: string;
  featuredImage?: string;
  metaDescription: string;
  canonicalUrl: string;
  performanceMetrics: ContentPerformance;
  createdAt: string;
  updatedAt: string;
}

export interface ContentPerformance {
  views: number;
  uniqueViews: number;
  timeOnPage: number;
  bounceRate: number;
  socialShares: number;
  conversions: number;
  seoScore: number;
  readabilityScore: number;
  keywordRankings: Record<string, number>;
  internalLinks: number;
  externalLinks: number;
}

export interface ContentCalendar {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  contentPieces: ContentPiece[];
  targetMetrics: {
    totalPieces: number;
    targetViews: number;
    targetConversions: number;
    targetSeoScore: number;
  };
  status: 'planning' | 'active' | 'completed' | 'paused';
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  contentPieceId: string;
  variantA: {
    title: string;
    content: string;
    metaDescription: string;
  };
  variantB: {
    title: string;
    content: string;
    metaDescription: string;
  };
  startDate: string;
  endDate: string;
  status: 'running' | 'completed' | 'paused';
  results: {
    variantA: ContentPerformance;
    variantB: ContentPerformance;
    winner?: 'A' | 'B' | 'tie';
    confidence: number;
  };
}

// Content marketing service for strategic content management
class ContentMarketingService {
  private static instance: ContentMarketingService;
  private contentPieces: ContentPiece[] = [];
  private contentCalendars: ContentCalendar[] = [];
  private abTests: ABTest[] = [];

  private constructor() {
    this.initializeContentMarketing();
  }

  static getInstance(): ContentMarketingService {
    if (!ContentMarketingService.instance) {
      ContentMarketingService.instance = new ContentMarketingService();
    }
    return ContentMarketingService.instance;
  }

  private initializeContentMarketing(): void {
    // Load existing content from localStorage
    this.loadContentFromStorage();
    
    // Initialize default content calendar
    this.initializeDefaultCalendar();
    
    // Set up performance tracking
    this.setupPerformanceTracking();
  }

  private loadContentFromStorage(): void {
    try {
      const storedContent = localStorage.getItem('una_content_marketing');
      if (storedContent) {
        const data = JSON.parse(storedContent);
        this.contentPieces = data.contentPieces || [];
        this.contentCalendars = data.contentCalendars || [];
        this.abTests = data.abTests || [];
      }
    } catch (error) {
      console.error('Error loading content marketing data:', error);
    }
  }

  private saveContentToStorage(): void {
    try {
      const data = {
        contentPieces: this.contentPieces,
        contentCalendars: this.contentCalendars,
        abTests: this.abTests
      };
      localStorage.setItem('una_content_marketing', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving content marketing data:', error);
    }
  }

  private initializeDefaultCalendar(): void {
    if (this.contentCalendars.length === 0) {
      const defaultCalendar: ContentCalendar = {
        id: 'default-calendar',
        name: 'UNA Platform Launch Content',
        description: 'Strategic content plan for UNA Platform launch and growth',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
        contentPieces: [],
        targetMetrics: {
          totalPieces: 20,
          targetViews: 10000,
          targetConversions: 100,
          targetSeoScore: 85
        },
        status: 'active'
      };
      
      this.contentCalendars.push(defaultCalendar);
    }
  }

  private setupPerformanceTracking(): void {
    // Track content performance automatically
    setInterval(() => {
      this.updateContentPerformance();
    }, 300000); // Every 5 minutes
  }

  // Create new content piece
  createContentPiece(content: Omit<ContentPiece, 'id' | 'createdAt' | 'updatedAt' | 'performanceMetrics'>): ContentPiece {
    const newContent: ContentPiece = {
      ...content,
      id: `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      performanceMetrics: {
        views: 0,
        uniqueViews: 0,
        timeOnPage: 0,
        bounceRate: 0,
        socialShares: 0,
        conversions: 0,
        seoScore: 0,
        readabilityScore: 0,
        keywordRankings: {},
        internalLinks: 0,
        externalLinks: 0
      }
    };

    this.contentPieces.push(newContent);
    this.saveContentToStorage();
    
    // Add to default calendar
    const defaultCalendar = this.contentCalendars.find(c => c.id === 'default-calendar');
    if (defaultCalendar) {
      defaultCalendar.contentPieces.push(newContent);
    }

    return newContent;
  }

  // Update content piece
  updateContentPiece(id: string, updates: Partial<ContentPiece>): ContentPiece | null {
    const contentIndex = this.contentPieces.findIndex(c => c.id === id);
    if (contentIndex === -1) return null;

    this.contentPieces[contentIndex] = {
      ...this.contentPieces[contentIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveContentToStorage();
    return this.contentPieces[contentIndex];
  }

  // Delete content piece
  deleteContentPiece(id: string): boolean {
    const contentIndex = this.contentPieces.findIndex(c => c.id === id);
    if (contentIndex === -1) return false;

    this.contentPieces.splice(contentIndex, 1);
    
    // Remove from calendars
    this.contentCalendars.forEach(calendar => {
      calendar.contentPieces = calendar.contentPieces.filter(c => c.id !== id);
    });

    this.saveContentToStorage();
    return true;
  }

  // Get content by type
  getContentByType(type: ContentPiece['type']): ContentPiece[] {
    return this.contentPieces.filter(c => c.type === type);
  }

  // Get content by status
  getContentByStatus(status: ContentPiece['status']): ContentPiece[] {
    return this.contentPieces.filter(c => c.status === status);
  }

  // Get published content
  getPublishedContent(): ContentPiece[] {
    return this.contentPieces.filter(c => c.status === 'published');
  }

  // Search content
  searchContent(query: string): ContentPiece[] {
    const lowerQuery = query.toLowerCase();
    return this.contentPieces.filter(content =>
      content.title.toLowerCase().includes(lowerQuery) ||
      content.content.toLowerCase().includes(lowerQuery) ||
      content.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      content.seoKeywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  }

  // Create content calendar
  createContentCalendar(calendar: Omit<ContentCalendar, 'id'>): ContentCalendar {
    const newCalendar: ContentCalendar = {
      ...calendar,
      id: `calendar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    this.contentCalendars.push(newCalendar);
    this.saveContentToStorage();
    return newCalendar;
  }

  // Get content calendar
  getContentCalendar(id: string): ContentCalendar | undefined {
    return this.contentCalendars.find(c => c.id === id);
  }

  // Add content to calendar
  addContentToCalendar(calendarId: string, contentId: string): boolean {
    const calendar = this.contentCalendars.find(c => c.id === calendarId);
    const content = this.contentPieces.find(c => c.id === contentId);
    
    if (!calendar || !content) return false;

    if (!calendar.contentPieces.find(c => c.id === contentId)) {
      calendar.contentPieces.push(content);
      this.saveContentToStorage();
    }

    return true;
  }

  // Create A/B test
  createABTest(test: Omit<ABTest, 'id' | 'results'>): ABTest {
    const newTest: ABTest = {
      ...test,
      id: `abtest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      results: {
        variantA: {
          views: 0,
          uniqueViews: 0,
          timeOnPage: 0,
          bounceRate: 0,
          socialShares: 0,
          conversions: 0,
          seoScore: 0,
          readabilityScore: 0,
          keywordRankings: {},
          internalLinks: 0,
          externalLinks: 0
        },
        variantB: {
          views: 0,
          uniqueViews: 0,
          timeOnPage: 0,
          bounceRate: 0,
          socialShares: 0,
          conversions: 0,
          seoScore: 0,
          readabilityScore: 0,
          keywordRankings: {},
          internalLinks: 0,
          externalLinks: 0
        },
        winner: undefined,
        confidence: 0
      }
    };

    this.abTests.push(newTest);
    this.saveContentToStorage();
    return newTest;
  }

  // Update A/B test results
  updateABTestResults(testId: string, variant: 'A' | 'B', metrics: Partial<ContentPerformance>): boolean {
    const test = this.abTests.find(t => t.id === testId);
    if (!test) return false;

    if (variant === 'A') {
      test.results.variantA = { ...test.results.variantA, ...metrics };
    } else {
      test.results.variantB = { ...test.results.variantB, ...metrics };
    }

    // Calculate winner and confidence
    this.calculateABTestWinner(test);
    
    this.saveContentToStorage();
    return true;
  }

  private calculateABTestWinner(test: ABTest): void {
    const { variantA, variantB } = test.results;
    
    // Simple conversion rate comparison
    const conversionRateA = variantA.views > 0 ? variantA.conversions / variantA.views : 0;
    const conversionRateB = variantB.views > 0 ? variantB.conversions / variantB.views : 0;
    
    if (variantA.views < 100 || variantB.views < 100) {
      // Not enough data
      test.results.winner = undefined;
      test.results.confidence = 0;
      return;
    }

    if (conversionRateA > conversionRateB) {
      test.results.winner = 'A';
      test.results.confidence = this.calculateConfidence(variantA, variantB);
    } else if (conversionRateB > conversionRateA) {
      test.results.winner = 'B';
      test.results.confidence = this.calculateConfidence(variantB, variantA);
    } else {
      test.results.winner = 'tie';
      test.results.confidence = 0;
    }
  }

  private calculateConfidence(winner: ContentPerformance, loser: ContentPerformance): number {
    // Simplified confidence calculation
    const winnerRate = winner.views > 0 ? winner.conversions / winner.views : 0;
    const loserRate = loser.views > 0 ? loser.conversions / loser.views : 0;
    
    if (winnerRate === 0 || loserRate === 0) return 0;
    
    const difference = Math.abs(winnerRate - loserRate);
    const totalRate = winnerRate + loserRate;
    
    return Math.min(95, Math.round((difference / totalRate) * 100));
  }

  // Get content performance analytics
  getContentAnalytics(): {
    totalPieces: number;
    publishedPieces: number;
    averageViews: number;
    averageSeoScore: number;
    topPerformingContent: ContentPiece[];
    contentByType: Record<string, number>;
    contentByStatus: Record<string, number>;
  } {
    const totalPieces = this.contentPieces.length;
    const publishedPieces = this.contentPieces.filter(c => c.status === 'published').length;
    
    const totalViews = this.contentPieces.reduce((sum, c) => sum + c.performanceMetrics.views, 0);
    const averageViews = totalPieces > 0 ? totalViews / totalPieces : 0;
    
    const totalSeoScore = this.contentPieces.reduce((sum, c) => sum + c.performanceMetrics.seoScore, 0);
    const averageSeoScore = totalPieces > 0 ? totalSeoScore / totalPieces : 0;
    
    const topPerformingContent = [...this.contentPieces]
      .sort((a, b) => b.performanceMetrics.views - a.performanceMetrics.views)
      .slice(0, 5);
    
    const contentByType: Record<string, number> = {};
    const contentByStatus: Record<string, number> = {};
    
    this.contentPieces.forEach(content => {
      contentByType[content.type] = (contentByType[content.type] || 0) + 1;
      contentByStatus[content.status] = (contentByStatus[content.status] || 0) + 1;
    });

    return {
      totalPieces,
      publishedPieces,
      averageViews,
      averageSeoScore,
      topPerformingContent,
      contentByType,
      contentByStatus
    };
  }

  // Update content performance
  private updateContentPerformance(): void {
    // Simulate performance updates
    this.contentPieces.forEach(content => {
      if (content.status === 'published') {
        // Simulate view increases
        content.performanceMetrics.views += Math.floor(Math.random() * 5);
        content.performanceMetrics.uniqueViews += Math.floor(Math.random() * 3);
        
        // Simulate social shares
        if (Math.random() > 0.95) {
          content.performanceMetrics.socialShares += 1;
        }
        
        // Simulate conversions
        if (Math.random() > 0.98) {
          content.performanceMetrics.conversions += 1;
        }
      }
    });
    
    this.saveContentToStorage();
  }

  // Get content recommendations
  getContentRecommendations(): {
    seoOptimization: ContentPiece[];
    readabilityImprovement: ContentPiece[];
    engagementBoost: ContentPiece[];
    conversionOptimization: ContentPiece[];
  } {
    const seoOptimization = this.contentPieces
      .filter(c => c.performanceMetrics.seoScore < 70)
      .sort((a, b) => a.performanceMetrics.seoScore - b.performanceMetrics.seoScore)
      .slice(0, 3);
    
    const readabilityImprovement = this.contentPieces
      .filter(c => c.performanceMetrics.readabilityScore < 60)
      .sort((a, b) => a.performanceMetrics.readabilityScore - b.performanceMetrics.readabilityScore)
      .slice(0, 3);
    
    const engagementBoost = this.contentPieces
      .filter(c => c.performanceMetrics.bounceRate > 70)
      .sort((a, b) => b.performanceMetrics.bounceRate - a.performanceMetrics.bounceRate)
      .slice(0, 3);
    
    const conversionOptimization = this.contentPieces
      .filter(c => c.performanceMetrics.conversions === 0 && c.performanceMetrics.views > 100)
      .sort((a, b) => b.performanceMetrics.views - a.performanceMetrics.views)
      .slice(0, 3);

    return {
      seoOptimization,
      readabilityImprovement,
      engagementBoost,
      conversionOptimization
    };
  }

  // Export content marketing data
  exportContentMarketingData(): {
    contentPieces: ContentPiece[];
    contentCalendars: ContentCalendar[];
    abTests: ABTest[];
    analytics: any;
  } {
    return {
      contentPieces: [...this.contentPieces],
      contentCalendars: [...this.contentCalendars],
      abTests: [...this.abTests],
      analytics: this.getContentAnalytics()
    };
  }

  // Clear content marketing data (for testing/admin purposes)
  clearContentMarketingData(): void {
    this.contentPieces = [];
    this.contentCalendars = [];
    this.abTests = [];
    this.saveContentToStorage();
  }
}

export const contentMarketingService = ContentMarketingService.getInstance();
