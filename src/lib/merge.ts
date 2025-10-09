import { IntakeData } from './types';

export function mergeTemplate(template: string, data: IntakeData): string {
  let merged = template;
  
  // Entity Information
  merged = merged.replace(/\{\{entityName\}\}/g, data.entityName || '');
  merged = merged.replace(/\{\{entityPurpose\}\}/g, data.entityPurpose || '');
  merged = merged.replace(/\{\{entityActivities\}\}/g, data.entityActivities || '');
  merged = merged.replace(/\{\{entityStartDate\}\}/g, data.entityStartDate || '');
  merged = merged.replace(/\{\{entityState\}\}/g, data.entityState || '');
  
  // Organizer Information
  merged = merged.replace(/\{\{organizerName\}\}/g, data.organizerName || '');
  merged = merged.replace(/\{\{organizerEmail\}\}/g, data.organizerEmail || '');
  merged = merged.replace(/\{\{organizerPhone\}\}/g, data.organizerPhone || '');
  merged = merged.replace(/\{\{organizerRole\}\}/g, data.organizerRole || '');
  merged = merged.replace(/\{\{organizerAddress\}\}/g, data.organizerAddress || '');
  merged = merged.replace(/\{\{organizerCity\}\}/g, data.organizerCity || '');
  merged = merged.replace(/\{\{organizerState\}\}/g, data.organizerState || '');
  merged = merged.replace(/\{\{organizerZip\}\}/g, data.organizerZip || '');
  
  // Mailing Address
  merged = merged.replace(/\{\{mailingAddress\}\}/g, data.mailingAddress || '');
  merged = merged.replace(/\{\{mailingCity\}\}/g, data.mailingCity || '');
  merged = merged.replace(/\{\{mailingState\}\}/g, data.mailingState || '');
  merged = merged.replace(/\{\{mailingZip\}\}/g, data.mailingZip || '');
  merged = merged.replace(/\{\{mailingCountry\}\}/g, data.mailingCountry || '');
  
  // EIN & Tax Information
  merged = merged.replace(/\{\{needsEIN\}\}/g, data.needsEIN ? 'Yes' : 'No');
  merged = merged.replace(/\{\{einPurpose\}\}/g, data.einPurpose || '');
  merged = merged.replace(/\{\{taxExemptIntent\}\}/g, data.taxExemptIntent ? 'Yes' : 'No');
  merged = merged.replace(/\{\{fiscalSponsorship\}\}/g, data.fiscalSponsorship ? 'Yes' : 'No');
  
  // Property & Financial Plans
  merged = merged.replace(/\{\{propertyPlans\}\}/g, data.propertyPlans || '');
  merged = merged.replace(/\{\{grantPlans\}\}/g, data.grantPlans || '');
  merged = merged.replace(/\{\{fundraisingPlans\}\}/g, data.fundraisingPlans || '');
  
  // Governance & Leadership
  merged = merged.replace(/\{\{leadershipStructure\}\}/g, data.leadershipStructure || '');
  merged = merged.replace(/\{\{familyLeadership\}\}/g, data.familyLeadership ? 'Yes' : 'No');
  merged = merged.replace(/\{\{successionPlanning\}\}/g, data.successionPlanning || '');
  merged = merged.replace(/\{\{conflictOfInterest\}\}/g, data.conflictOfInterest ? 'Yes' : 'No');
  
  // Insignia
  merged = merged.replace(/\{\{hasInsignia\}\}/g, data.hasInsignia ? 'Yes' : 'No');
  merged = merged.replace(/\{\{insigniaDescription\}\}/g, data.insigniaDescription || '');
  
  // Compliance & Legal
  merged = merged.replace(/\{\{interstateActivity\}\}/g, data.interstateActivity ? 'Yes' : 'No');
  merged = merged.replace(/\{\{statesOfOperation\}\}/g, 
    data.statesOfOperation ? 
      (Array.isArray(data.statesOfOperation) ? data.statesOfOperation.join(', ') : data.statesOfOperation) 
      : ''
  );
  merged = merged.replace(/\{\{complianceNotes\}\}/g, data.complianceNotes || '');
  
  // Signatures
  merged = merged.replace(/\{\{organizerSignature\}\}/g, data.organizerSignature || '');
  merged = merged.replace(/\{\{organizerSignatureDate\}\}/g, data.organizerSignatureDate || '');
  merged = merged.replace(/\{\{witnessSignature\}\}/g, data.witnessSignature || '');
  merged = merged.replace(/\{\{witnessSignatureDate\}\}/g, data.witnessSignatureDate || '');
  
  // Additional fields for comprehensive guide
  merged = merged.replace(/\{\{createdAt\}\}/g, new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
  
  return merged;
}

export function generateUNAAgreement(data: IntakeData): string {
  const template = `# UNA Agreement

**Organization Name:** {{name}}
**Purpose:** {{mission}}
**Address:** {{mailingAddress}}
**Contact:** {{email}}
**Officer:** {{officerName}} ({{officerTitle}})

## Agreement Terms

This Unincorporated Association (UNA) Agreement is entered into on {{currentDate}} by the members of the organization.

### Purpose
This organization is organized exclusively for {{mission}}.

### Activities
{{activities}}

### Governance
This UNA shall be governed by its members through consensus decision-making.

### Duration
This agreement shall remain in effect until dissolved by unanimous consent of all members.

**Date:** {{currentDate}}
**Signature:** _________________________`;

  return mergeTemplate(template, data);
}

export function generateEINGuide(data: IntakeData): string {
  const template = `# EIN Application Guide

## Organization Information
- **Name:** {{name}}
- **Address:** {{mailingAddress}}
- **Purpose:** {{mission}}

## EIN Application Steps

### 1. Complete Form SS-4
Download Form SS-4 from the IRS website or call 1-800-829-4933.

### 2. Required Information
- Legal name of organization
- Address
- Responsible party information
- Type of organization (Unincorporated Association)

### 3. Submit Application
- **Online:** Use the IRS EIN Assistant (recommended)
- **Fax:** 855-641-6935
- **Mail:** Internal Revenue Service, Cincinnati, OH 45999

### 4. Processing Time
- Online: Immediate
- Fax: 4-5 business days
- Mail: 4-6 weeks

## Important Notes
- UNAs are eligible for EINs
- No filing fee required
- Keep your EIN confirmation letter in a safe place

**Prepared for:** {{name}}
**Date:** {{currentDate}}`;

  return mergeTemplate(template, data);
}

export function generateLPUNA128(data: IntakeData): string {
  const template = `# LP UNA 128 Filing Package

## Organization Details
- **Name:** {{name}}
- **Address:** {{mailingAddress}}
- **Purpose:** {{mission}}

## Required Documents

### 1. Statement of Association
Complete the Statement of Association form with:
- Organization name and address
- Purpose statement
- Member information
- Contact details

### 2. Filing Fee
Submit the required filing fee (varies by state).

### 3. Additional Requirements
- Proof of organization purpose
- Member list
- Contact information

## Filing Instructions

### Submit to:
Secretary of State
California

### Processing Time:
Typically 2-4 weeks

### Benefits of Filing:
- Legal recognition
- Ability to open bank accounts
- Contract signing authority
- Tax-exempt status eligibility

**Prepared for:** {{name}}
**Date:** {{currentDate}}`;

  return mergeTemplate(template, data);
}
