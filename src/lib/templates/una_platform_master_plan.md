# UNA Start-Up Consulting Platform – System Architecture, Build Plan & Messaging

## Context
A UNA (Unincorporated Nonprofit Association) is a decentralized, low-cost structure that allows mission-driven collectives to operate with clarity. This platform provides education, generates documents via a single intake flow, and integrates a verification layer for compliance and referrals.

## Sitemap
1. Home – What is a UNA? Who is this for? Why it matters
2. Services & Pricing – Start-Up Package, Add-ons, Pricing Table
3. Exploration Mode – Scenario builder
4. FAQ – Common UNA questions
5. Success Stories – Case studies, examples
6. About/Team – Story, expertise
7. Blog/Resources – SEO content
8. Trust Layer – Security badges, disclaimers
9. Intake/Login – Gateway to dashboard
10. Dashboard – Progress tracker, deliverables, resources, GPT agent access

## System Flow
Visitor → Services/Pricing → FAQ → Intake → GPT Agent → Deliverables (Agreement, EIN, LP/UNA-128, DBA, Invoices, Disclaimer, Insignia if chosen) → Dashboard → Ongoing Support

## Intake Structure
- Name, Email, Role
- Purpose/Mission
- Activities
- Property/land use
- Grant/fundraising plans
- IRS 501(c)(3) intent
- Family/community leadership
- Succession/legacy planning
- Officer Name, Officer Title (dropdown)
- Insignia selection (Yes/No/I don’t know, with upload + description + AI assist)
- Mailing Address
- Start Date

## Core Deliverables
- UNA Agreement
- EIN Registration Guide
- California Filing: LP/UNA-128
- DBA/FBN Registration Guide
- Invoice & Financial Tracking
- Client Agreement & Disclaimer
- Optional Insignia PDF & Description

## Verification Docket Integration
- Flags: landholding, tax-exempt, fiscal sponsorship, succession, conflict of interest, interstate activity
- Correct form: LP/UNA-128
- Officer + insignia captured in intake

## Implementation Notes
- Templates modular in Markdown → export to PDF/DOC/RTF
- Transpersonal, affirmative language
- Accessibility and mobile-first design

## Next Steps
- Draft FAQ template
- Build pricing table
- Draft first success story
- Prepare About/Team copy
- Finalize folder/file structure in Cursor
- Convert templates to Markdown logic
- Draft first blog post: "What is a UNA?"
