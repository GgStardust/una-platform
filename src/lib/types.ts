export interface IntakeData {
  // Entity Information
  entityName: string;
  entityPurpose: string;
  entityActivities: string;
  entityStartDate: string;
  entityState: string;
  
  // Organizer Information
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  organizerRole: string;
  organizerAddress: string;
  organizerCity: string;
  organizerState: string;
  organizerZip: string;
  
  // Mailing Address
  mailingAddress: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
  mailingCountry: string;
  
  // EIN & Tax Information
  needsEIN: boolean;
  einPurpose?: string;
  taxExemptIntent: boolean;
  fiscalSponsorship: boolean;
  
  // Property & Financial Plans
  propertyPlans?: string;
  grantPlans?: string;
  fundraisingPlans?: string;
  
  // Governance & Leadership
  leadershipStructure: string;
  familyLeadership: boolean;
  successionPlanning?: string;
  conflictOfInterest: boolean;
  
  // Insignia
  hasInsignia: boolean;
  insigniaFile?: File;
  insigniaDescription?: string;
  emblemStyle?: string;
  emblemColors?: string;
  
  // Compliance & Legal
  interstateActivity: boolean;
  statesOfOperation?: string[];
  complianceNotes?: string;
  
  // Signatures
  organizerSignature: string;
  organizerSignatureDate: string;
  witnessSignature: string;
  witnessSignatureDate: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  content: string;
  type: 'agreement' | 'ein-guide' | 'lp-una-128' | 'dba-guide' | 'invoice-templates' | 'client-agreement' | 'faq' | 'pricing' | 'onboarding' | 'insignia';
  status: 'pending' | 'generated' | 'downloaded';
  createdAt: string;
  updatedAt: string;
}

export interface VerificationFlag {
  id: string;
  type: 'warning' | 'referral' | 'legal' | 'cpa';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  requiresAction: boolean;
  referralType?: 'attorney' | 'cpa' | 'specialist';
  referralReason: string;
  recommendation?: string;
  nextSteps: string[];
  faqLink?: string;
  blogLink?: string;
  status: 'active' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}

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

export interface DashboardTask {
  id: string;
  title: string;
  description: string;
  type: 'insignia-revisit' | 'ein-upload' | 'dba-filing' | 'compliance-check';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  createdAt: string;
}

export interface StorageMetadata {
  lastActivity: string;
  dataVersion: string;
  totalRecords: number;
} 

export interface ExploreAnswers {
  entityState: string; // Added state field as first requirement
  mission: string[];
  currentForm: "solo" | "team" | "community" | "traveling" | "space" | null;
  impact: string[];
  environments: string[];
  support: string[];
  otherText?: string;
}

export interface IntakeDraft {
  entityPurpose?: string;
  entityActivities?: string;
  leadershipStructure?: string;
  needsEIN?: boolean;
  taxExemptIntent?: boolean;
  fiscalSponsorship?: boolean;
  propertyPlans?: string;
  grantPlans?: string;
  fundraisingPlans?: string;
  successionPlanning?: string;
  complianceNotes?: string;
} 