// Analytics and Performance Monitoring System for UNA Platform
// Tracks user behavior, conversions, and platform performance

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
  page?: string;
  referrer?: string;
}

export interface ConversionGoal {
  id: string;
  name: string;
  type: 'page_view' | 'form_submit' | 'button_click' | 'time_on_page' | 'scroll_depth';
  target: string;
  value?: number;
  conditions?: Record<string, any>;
}

export interface UserJourney {
  userId?: string;
  sessionId: string;
  startTime: number;
  endTime?: number;
  pages: Array<{
    url: string;
    timestamp: number;
    timeOnPage?: number;
    interactions: string[];
  }>;
  conversions: string[];
  totalTime: number;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

// Analytics service for tracking user behavior and platform performance
class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  private userJourneys: Map<string, UserJourney> = new Map();
  private conversionGoals: ConversionGoal[] = [];
  private sessionId: string;
  private isInitialized: boolean = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeConversionGoals();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Initialize analytics service
  initialize(): void {
    if (this.isInitialized) return;

    try {
      // Set up performance monitoring
      this.setupPerformanceMonitoring();
      
      // Set up user interaction tracking
      this.setupInteractionTracking();
      
      // Set up conversion tracking
      this.setupConversionTracking();
      
      // Start session tracking
      this.startSession();
      
      this.isInitialized = true;
      console.log('Analytics service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics service:', error);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeConversionGoals(): void {
    this.conversionGoals = [
      {
        id: 'explore_started',
        name: 'Exploration Started',
        type: 'page_view',
        target: '/explore'
      },
      {
        id: 'explore_completed',
        name: 'Exploration Completed',
        type: 'form_submit',
        target: 'explore_form'
      },
      {
        id: 'intake_started',
        name: 'Intake Started',
        type: 'page_view',
        target: '/intake'
      },
      {
        id: 'intake_completed',
        name: 'Intake Completed',
        type: 'form_submit',
        target: 'intake_form'
      },
      {
        id: 'documents_generated',
        name: 'Documents Generated',
        type: 'button_click',
        target: 'generate_documents'
      },
      {
        id: 'payment_initiated',
        name: 'Payment Initiated',
        type: 'button_click',
        target: 'checkout_button'
      },
      {
        id: 'payment_completed',
        name: 'Payment Completed',
        type: 'form_submit',
        target: 'payment_form'
      }
    ];
  }

  private setupPerformanceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackPerformanceMetric(entry);
        }
      });

      try {
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }

  private setupInteractionTracking(): void {
    // Track button clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button') as HTMLButtonElement;
        this.trackEvent('button_click', {
          buttonText: button.textContent?.trim(),
          buttonId: button.id,
          buttonClass: button.className,
          page: window.location.pathname
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent('form_submit', {
        formId: form.id,
        formAction: form.action,
        formMethod: form.method,
        page: window.location.pathname
      });
    });

    // Track page views
    this.trackPageView();
  }

  private setupConversionTracking(): void {
    // Monitor for conversion goal completions
    this.events.forEach(event => {
      this.checkConversionGoals(event);
    });
  }

  private startSession(): void {
    const journey: UserJourney = {
      sessionId: this.sessionId,
      startTime: Date.now(),
      pages: [],
      conversions: [],
      totalTime: 0
    };

    this.userJourneys.set(this.sessionId, journey);
    
    // Track session start
    this.trackEvent('session_started', {
      sessionId: this.sessionId,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    });
  }

  // Track custom events
  trackEvent(name: string, properties?: Record<string, any>): void {
    try {
      const event: AnalyticsEvent = {
        name,
        properties,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        page: window.location.pathname,
        referrer: document.referrer
      };

      this.events.push(event);
      
      // Check if this event completes any conversion goals
      this.checkConversionGoals(event);
      
      // Log event for debugging
      console.log('Analytics event tracked:', event);
      
      // In production, this would send to analytics service
      this.sendToAnalyticsService(event);
      
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }

  // Track page views
  private trackPageView(): void {
    const currentPage = window.location.pathname;
    
    this.trackEvent('page_view', {
      url: currentPage,
      title: document.title,
      referrer: document.referrer
    });

    // Update user journey
    const journey = this.userJourneys.get(this.sessionId);
    if (journey) {
      journey.pages.push({
        url: currentPage,
        timestamp: Date.now(),
        interactions: []
      });
    }
  }

  // Track performance metrics
  private trackPerformanceMetric(entry: PerformanceEntry): void {
    const metrics: Partial<PerformanceMetrics> = {};

    if (entry.entryType === 'navigation') {
      const navEntry = entry as PerformanceNavigationTiming;
      metrics.pageLoadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
      metrics.timeToInteractive = navEntry.domInteractive - navEntry.fetchStart;
    } else if (entry.entryType === 'paint') {
      const paintEntry = entry as PerformancePaintTiming;
      if (paintEntry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = paintEntry.startTime;
      }
    } else if (entry.entryType === 'largest-contentful-paint') {
      const lcpEntry = entry as PerformanceEntry;
      metrics.largestContentfulPaint = lcpEntry.startTime;
    } else if (entry.entryType === 'layout-shift') {
      const lsEntry = entry as any;
      metrics.cumulativeLayoutShift = lsEntry.value;
    } else if (entry.entryType === 'first-input') {
      const fidEntry = entry as any;
      metrics.firstInputDelay = fidEntry.processingStart - fidEntry.startTime;
    }

    if (Object.keys(metrics).length > 0) {
      this.trackEvent('performance_metric', {
        entryType: entry.entryType,
        metrics
      });
    }
  }

  // Check if events complete conversion goals
  private checkConversionGoals(event: AnalyticsEvent): void {
    this.conversionGoals.forEach(goal => {
      if (this.isGoalCompleted(goal, event)) {
        this.trackConversion(goal, event);
      }
    });
  }

  private isGoalCompleted(goal: ConversionGoal, event: AnalyticsEvent): boolean {
    switch (goal.type) {
      case 'page_view':
        return event.name === 'page_view' && event.properties?.url === goal.target;
      case 'form_submit':
        return event.name === 'form_submit' && event.properties?.formId === goal.target;
      case 'button_click':
        return event.name === 'button_click' && event.properties?.buttonId === goal.target;
      default:
        return false;
    }
  }

  private trackConversion(goal: ConversionGoal, event: AnalyticsEvent): void {
    this.trackEvent('conversion_completed', {
      goalId: goal.id,
      goalName: goal.name,
      goalValue: goal.value,
      triggerEvent: event.name,
      triggerProperties: event.properties
    });

    // Update user journey
    const journey = this.userJourneys.get(this.sessionId);
    if (journey && !journey.conversions.includes(goal.id)) {
      journey.conversions.push(goal.id);
    }
  }

  // Send analytics data to service (mock implementation)
  private async sendToAnalyticsService(event: AnalyticsEvent): Promise<void> {
    try {
      // In production, this would send to Google Analytics, Mixpanel, etc.
      // For now, we'll just log it
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Log successful send
      console.log('Analytics event sent to service:', event.name);
      
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Get analytics summary
  getAnalyticsSummary(): {
    totalEvents: number;
    sessionDuration: number;
    pagesViewed: number;
    conversions: number;
    performanceScore: number;
  } {
    const journey = this.userJourneys.get(this.sessionId);
    const sessionDuration = journey ? Date.now() - journey.startTime : 0;
    const pagesViewed = journey?.pages.length || 0;
    const conversions = journey?.conversions.length || 0;

    // Calculate performance score based on Core Web Vitals
    const performanceScore = this.calculatePerformanceScore();

    return {
      totalEvents: this.events.length,
      sessionDuration,
      pagesViewed,
      conversions,
      performanceScore
    };
  }

  private calculatePerformanceScore(): number {
    // Mock performance score calculation
    // In production, this would be based on actual Core Web Vitals data
    return Math.floor(Math.random() * 40) + 60; // 60-100 range
  }

  // Get user journey data
  getUserJourney(sessionId?: string): UserJourney | undefined {
    const targetSessionId = sessionId || this.sessionId;
    return this.userJourneys.get(targetSessionId);
  }

  // Get conversion funnel data
  getConversionFunnel(): {
    exploreStarted: number;
    exploreCompleted: number;
    intakeStarted: number;
    intakeCompleted: number;
    documentsGenerated: number;
    paymentInitiated: number;
    paymentCompleted: number;
  } {
    const funnel = {
      exploreStarted: 0,
      exploreCompleted: 0,
      intakeStarted: 0,
      intakeCompleted: 0,
      documentsGenerated: 0,
      paymentInitiated: 0,
      paymentCompleted: 0
    };

    this.events.forEach(event => {
      if (event.name === 'conversion_completed') {
        const goalId = event.properties?.goalId;
        switch (goalId) {
          case 'explore_started':
            funnel.exploreStarted++;
            break;
          case 'explore_completed':
            funnel.exploreCompleted++;
            break;
          case 'intake_started':
            funnel.intakeStarted++;
            break;
          case 'intake_completed':
            funnel.intakeCompleted++;
            break;
          case 'documents_generated':
            funnel.documentsGenerated++;
            break;
          case 'payment_initiated':
            funnel.paymentInitiated++;
            break;
          case 'payment_completed':
            funnel.paymentCompleted++;
            break;
        }
      }
    });

    return funnel;
  }

  // Export analytics data
  exportAnalyticsData(): {
    events: AnalyticsEvent[];
    userJourneys: UserJourney[];
    conversionGoals: ConversionGoal[];
  } {
    return {
      events: [...this.events],
      userJourneys: Array.from(this.userJourneys.values()),
      conversionGoals: [...this.conversionGoals]
    };
  }

  // Clear analytics data (for testing/admin purposes)
  clearAnalyticsData(): void {
    this.events = [];
    this.userJourneys.clear();
    this.sessionId = this.generateSessionId();
    this.startSession();
  }
}

export const analyticsService = AnalyticsService.getInstance();

// Google Analytics Integration
class GoogleAnalyticsService {
  private static instance: GoogleAnalyticsService;
  private isInitialized: boolean = false;
  private trackingId: string | null = null;

  private constructor() {}

  static getInstance(): GoogleAnalyticsService {
    if (!GoogleAnalyticsService.instance) {
      GoogleAnalyticsService.instance = new GoogleAnalyticsService();
    }
    return GoogleAnalyticsService.instance;
  }

  // Initialize Google Analytics
  initialize(): void {
    if (this.isInitialized) return;

    const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
    this.trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

    if (!enableAnalytics || !this.trackingId) {
      console.log('Google Analytics disabled or no tracking ID provided');
      return;
    }

    try {
      this.loadGoogleAnalyticsScript();
      this.isInitialized = true;
      console.log('Google Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  // Load Google Analytics script
  private loadGoogleAnalyticsScript(): void {
    if (!this.trackingId) return;

    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', this.trackingId, {
      page_title: document.title,
      page_location: window.location.href
    });

    // Make gtag available globally
    (window as any).gtag = gtag;
  }

  // Track page view
  trackPageView(page: string, title?: string): void {
    if (!this.isInitialized || !this.trackingId) return;

    try {
      (window as any).gtag('config', this.trackingId, {
        page_title: title || document.title,
        page_location: page
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  // Track custom event
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized || !this.trackingId) return;

    try {
      (window as any).gtag('event', eventName, parameters);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track conversion
  trackConversion(goalId: string, value?: number): void {
    if (!this.isInitialized || !this.trackingId) return;

    try {
      (window as any).gtag('event', 'conversion', {
        send_to: `${this.trackingId}/${goalId}`,
        value: value
      });
    } catch (error) {
      console.error('Failed to track conversion:', error);
    }
  }
}

export const googleAnalyticsService = GoogleAnalyticsService.getInstance();

// Initialize analytics when the module is imported
if (typeof window !== 'undefined') {
  analyticsService.initialize();
  googleAnalyticsService.initialize();
}
