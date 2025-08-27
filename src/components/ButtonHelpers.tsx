import React from 'react';
import { ArrowRight } from 'lucide-react';
import { routeToCalendar, ROUTES } from '../lib/routes';
import Symbol from './Symbol';

// Button helper components with consistent styling
export function ScheduleBundleButton({ 
  className = "", 
  children = "Schedule Document Formation • Bundle and Save" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <button 
      onClick={() => routeToCalendar('bundle')}
      className={`btn-grad btn-primary ${className}`}
    >
      <Symbol name="orb" size={20} className="mr-2" />
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </button>
  );
}

export function ScheduleConsultationButton({ 
  className = "", 
  children = "Schedule Strategy Session" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <button 
      onClick={() => routeToCalendar('consultation')}
      className={`btn-grad btn-primary ${className}`}
    >
      <Symbol name="triangle" size={20} className="mr-2" />
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </button>
  );
}

export function ScheduleDocumentsButton({ 
  className = "", 
  children = "Schedule Document Creation" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <button 
      onClick={() => routeToCalendar('documents')}
      className={`btn-grad btn-primary ${className}`}
    >
      <Symbol name="hex-eye" size={20} className="mr-2" />
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </button>
  );
}

export function DiscussOngoingButton({ 
  className = "", 
  children = "Discuss Ongoing Support" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <button 
      onClick={() => routeToCalendar('ongoing')}
      className={`btn-grad btn-primary ${className}`}
    >
      <Symbol name="stack" size={20} className="mr-2" />
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </button>
  );
}

export function RequestReferralButton({ 
  className = "", 
  children = "Request Referral", 
  type = "general" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
  type?: "general" | "cpa" | "attorney"; 
}) {
  const referralUrl = type === "cpa" ? ROUTES.contactReferralCPA : 
                     type === "attorney" ? ROUTES.contactReferralAttorney : 
                     ROUTES.contactReferral;
  
  return (
    <a href={referralUrl} className={`btn-grad ${className}`}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );
}

// Link button variants
export function ExplorePathButton({ 
  className = "", 
  children = "Start Free Exploration" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <a href={ROUTES.explore} className={`btn-grad btn-primary ${className}`}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );
}

export function ViewResourcesButton({ 
  className = "", 
  children = "Explore Resources" 
}: { 
  className?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <a href={ROUTES.resources} className={`btn-grad btn-secondary ${className}`}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );
}
