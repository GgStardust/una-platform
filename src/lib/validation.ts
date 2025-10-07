import { z } from 'zod';

// Simplified intake schema - focused on essentials for document preparation
export const intakeFormSchema = z.object({
  // Entity Basics (3 required, 2 optional)
  entityName: z.string().min(2, 'Entity name must be at least 2 characters'),
  entityPurpose: z.string().min(20, 'Please describe your purpose in at least 20 characters'),
  entityState: z.string().min(2, 'State is required'),
  entityStartDate: z.string().optional(), // Optional - might not know when to start
  numberOfMembers: z.string().optional(), // Optional - might not know yet

  // Primary Contact (2 required, 2 optional)
  organizerName: z.string().min(2, 'Primary contact name is required'),
  organizerEmail: z.string().email('Valid email is required'),
  organizerPhone: z.string().optional(), // Optional - personal info
  organizerAddress: z.string().optional(), // Optional - personal info

  // Formation Details (2 required, 1 optional)
  needsEIN: z.boolean(),
  needsBanking: z.boolean(),
  leadershipStructure: z.string().optional(), // Optional - might not know yet

  // Optional Information (3 fields)
  additionalNotes: z.string().optional(),
  specialRequirements: z.string().optional(),
  taxExemptIntent: z.boolean().optional(),
});

// Legacy schema for backward compatibility (can be removed after migration)
export const intakeFormSchemaLegacy = z.object({
  // Entity Information
  entityName: z.string().min(2, 'Entity name must be at least 2 characters'),
  entityPurpose: z.string().min(10, 'Entity purpose must be at least 10 characters'),
  entityActivities: z.string().min(10, 'Entity activities must be at least 10 characters'),
  entityStartDate: z.string().min(1, 'Start date is required'),
  entityState: z.string().min(2, 'State is required'),

  // Organizer Information
  organizerName: z.string().min(2, 'Organizer name must be at least 2 characters'),
  organizerEmail: z.string().email('Valid email is required'),
  organizerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  organizerRole: z.string().min(2, 'Role is required'),
  organizerAddress: z.string().min(5, 'Address must be at least 5 characters'),
  organizerCity: z.string().min(2, 'City is required'),
  organizerState: z.string().min(2, 'State is required'),
  organizerZip: z.string().min(5, 'ZIP code must be at least 5 characters'),

  // Mailing Address
  mailingAddress: z.string().min(5, 'Mailing address must be at least 5 characters'),
  mailingCity: z.string().min(2, 'Mailing city is required'),
  mailingState: z.string().min(2, 'Mailing state is required'),
  mailingZip: z.string().min(5, 'Mailing ZIP code must be at least 5 characters'),
  mailingCountry: z.string().min(2, 'Country is required'),

  // EIN & Tax Information
  needsEIN: z.boolean(),
  einPurpose: z.string().optional(),
  taxExemptIntent: z.boolean(),
  fiscalSponsorship: z.boolean(),

  // Property & Financial Plans
  propertyPlans: z.string().optional(),
  grantPlans: z.string().optional(),
  fundraisingPlans: z.string().optional(),

  // Governance & Leadership
  leadershipStructure: z.string().min(5, 'Leadership structure must be at least 5 characters'),
  familyLeadership: z.boolean(),
  successionPlanning: z.string().optional(),
  conflictOfInterest: z.boolean(),

  // Insignia
  hasInsignia: z.boolean(),
  insigniaDescription: z.string().optional(),
  emblemStyle: z.string().optional(),
  emblemColors: z.string().optional(),

  // Compliance & Legal
  interstateActivity: z.boolean(),
  statesOfOperation: z.string().optional(),
  complianceNotes: z.string().optional(),

  // Signatures
  organizerSignature: z.string().min(1, 'Organizer signature is required'),
  organizerSignatureDate: z.string().min(1, 'Signature date is required'),
  witnessSignature: z.string().min(1, 'Witness signature is required'),
  witnessSignatureDate: z.string().min(1, 'Witness signature date is required'),
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;

// Conditional validation for EIN purpose
export const conditionalEINValidation = z.object({
  needsEIN: z.boolean(),
  einPurpose: z.string().refine((val) => {
    return !val || val.length >= 5;
  }, 'EIN purpose must be at least 5 characters if EIN is needed'),
});

// Conditional validation for property plans
export const conditionalPropertyValidation = z.object({
  propertyPlans: z.string().refine((val) => {
    return !val || val.length >= 10;
  }, 'Property plans must be at least 10 characters if provided'),
});

// Conditional validation for interstate activity
export const conditionalInterstateValidation = z.object({
  interstateActivity: z.boolean(),
  statesOfOperation: z.string().refine((val) => {
    return !val || val.length > 0;
  }, 'States of operation must be specified if interstate activity is planned'),
});
