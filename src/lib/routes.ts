// Centralized routing for UNA Platform
export const ROUTES = {
  // Core service routes
  scheduleBundle: "/schedule?package=document-bundle",
  scheduleConsultation: "/schedule?package=consultation",
  scheduleDocuments: "/schedule?package=documents",
  scheduleOngoing: "/schedule?package=ongoing-support",
  
  // Content routes
  intake: "/intake",
  consult: "/consult",
  contact: "/contact",
  blog: "/blog",
  
  // Specific referral routes
  contactReferral: "/contact?subject=Referral",
  contactReferralCPA: "/contact?subject=Referral&type=cpa",
  contactReferralAttorney: "/contact?subject=Referral&type=attorney",
  
  // Resource routes
  resources: "/resources",
  explore: "/explore",
  faq: "/faq",
  
  // Admin routes
  admin: "/admin",
};

// Google Calendar integration
export const CALENDAR_CONFIG = {
  baseUrl: "https://calendar.google.com/calendar/render",
  // Different event types for different services
  events: {
    consultation: {
      action: "TEMPLATE",
      text: "UNA Strategy Session",
      dates: "", // Will be filled dynamically
      details: "60-minute UNA formation strategy session. We'll discuss your mission, structure options, and create a roadmap for your UNA formation journey.",
      location: "Video Call (link provided after booking)",
      ctz: "America/Los_Angeles"
    },
    documents: {
      action: "TEMPLATE", 
      text: "UNA Document Creation Session",
      dates: "",
      details: "UNA document creation and guidance session. We'll review your formation needs and begin preparing your personalized UNA formation documents.",
      location: "Video Call (link provided after booking)",
      ctz: "America/Los_Angeles"
    },
    bundle: {
      action: "TEMPLATE",
      text: "UNA Formation Bundle Session",
      dates: "",
      details: "Complete UNA formation package: consultation + document creation. We'll cover strategy, structure, and begin document preparation in one comprehensive session.",
      location: "Video Call (link provided after booking)", 
      ctz: "America/Los_Angeles"
    },
    ongoing: {
      action: "TEMPLATE",
      text: "UNA Ongoing Support Discussion",
      dates: "",
      details: "Discussion about ongoing UNA support and consultancy needs. We'll assess your current situation and design a support package that fits your ongoing requirements.",
      location: "Video Call (link provided after booking)",
      ctz: "America/Los_Angeles"
    }
  }
};

// Generate Google Calendar URLs
export function generateCalendarUrl(eventType: keyof typeof CALENDAR_CONFIG.events, date?: string): string {
  const event = CALENDAR_CONFIG.events[eventType];
  const baseUrl = CALENDAR_CONFIG.baseUrl;
  
  const params = new URLSearchParams({
    action: event.action,
    text: event.text,
    details: event.details,
    location: event.location,
    ctz: event.ctz
  });
  
  if (date) {
    params.set("dates", date);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

// Route to Google Calendar with proper parameters
export function routeToCalendar(eventType: keyof typeof CALENDAR_CONFIG.events, date?: string): void {
  const calendarUrl = generateCalendarUrl(eventType, date);
  window.open(calendarUrl, '_blank', 'noopener,noreferrer');
}

// Utility functions for route handling
export function isActiveRoute(currentPath: string, route: string): boolean {
  return currentPath === route || currentPath.startsWith(route + '?');
}

export function getRouteParams(searchParams: URLSearchParams) {
  return {
    package: searchParams.get('package'),
    subject: searchParams.get('subject'),
    type: searchParams.get('type'),
    topic: searchParams.get('topic')
  };
}
