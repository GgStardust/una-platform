/**
 * Blog Migration Script
 *
 * This script migrates all blog posts from mdx-loader.ts to Supabase
 * Run with: npx tsx scripts/migrate-blogs-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Blog posts from mdx-loader.ts
const blogPosts = [
  {
    slug: 'complete-una-formation-guide',
    title: 'The Complete UNA Formation Guide: From Concept to Compliance',
    content: `# The Complete UNA Formation Guide: From Concept to Compliance

Forming an Unincorporated Nonprofit Association (UNA) is one of the most accessible ways to start a mission-driven organization. Unlike corporations or LLCs, UNAs don't require formal state registration in most jurisdictions, making them ideal for community groups, grassroots movements, and early-stage nonprofits.

This comprehensive guide walks you through the complete UNA formation process, from initial concept through ongoing compliance.

## What is a UNA?

An Unincorporated Nonprofit Association (UNA) is a group of two or more people who voluntarily associate for a common nonprofit purpose. Key characteristics:

- **No formal state registration required** (in most states)
- **Members share governance and decision-making**
- **Mission-driven, not profit-driven**
- **Flexible structure and minimal bureaucracy**

## Phase 1: Conceptual Foundation

### Define Your Mission

Your mission statement is the foundation of your UNA. It should clearly articulate:

- **Purpose**: What problem are you solving?
- **Beneficiaries**: Who does your work help?
- **Approach**: How will you achieve your goals?

### Identify Core Members

UNAs require at least two members. Your founding team should:

- Share commitment to the mission
- Bring diverse skills and perspectives
- Have capacity to contribute time and resources

### Choose Your State

While UNAs don't require registration, state law still governs them. Consider:

- **Member locations**: Where are your core members?
- **Activity location**: Where will you operate?
- **Legal framework**: Which state has favorable UNA laws?

## Phase 2: Governance Documents

### Create Founding Documents

Essential documents for your UNA:

**Articles of Association**
- Organization name and purpose
- Member rights and responsibilities
- Dissolution provisions

**Bylaws**
- Governance structure
- Meeting procedures
- Decision-making processes
- Amendment procedures

**Operating Agreement**
- Day-to-day operations
- Member roles
- Financial management

### Establish Governance Structure

Define how decisions are made:

- **Member meetings**: Frequency and format
- **Voting procedures**: Quorum requirements and majority rules
- **Leadership roles**: If any (optional for UNAs)
- **Committees**: Standing and ad-hoc

## Phase 3: Legal and Financial Setup

### Obtain EIN

Even without state registration, you need an Employer Identification Number (EIN) from the IRS:

1. Visit IRS.gov
2. Complete Form SS-4 online
3. Receive EIN immediately
4. Use for banking and tax purposes

### Open Bank Account

Separate your personal and organizational finances:

- Research banks offering nonprofit accounts
- Gather required documents (Articles, EIN letter, bylaws)
- Set up dual-signature requirements for accountability
- Establish financial controls

### Insurance Considerations

Protect your organization and members:

- **General liability**: Coverage for accidents and injuries
- **D&O insurance**: Protection for decision-makers
- **Property insurance**: If you have physical assets

## Phase 4: Tax Compliance

### Understand Tax Status

UNAs can operate under several tax frameworks:

**501(c)(3) Recognition**
- Apply for federal tax exemption
- Enables tax-deductible donations
- Requires IRS Form 1023 or 1023-EZ

**Fiscal Sponsorship**
- Partner with existing 501(c)(3)
- Immediate tax-exempt status
- Lower administrative burden

**Operating Without Exemption**
- Accept non-deductible donations
- File appropriate tax returns
- Simpler initial setup

### Annual Reporting

Depending on revenue and structure:

- **Form 990-N**: For organizations under $50,000
- **Form 990-EZ**: For organizations under $200,000
- **Form 990**: For larger organizations
- **State reporting**: Varies by state

## Phase 5: Operations and Growth

### Financial Management

Establish sound financial practices:

- **Bookkeeping**: Track all income and expenses
- **Budgeting**: Plan for sustainability
- **Reporting**: Regular financial statements
- **Auditing**: Consider annual reviews

### Member Management

Build and maintain your community:

- **Onboarding**: Welcome new members effectively
- **Communication**: Regular updates and engagement
- **Meetings**: Structured and productive gatherings
- **Recognition**: Celebrate contributions

### Program Delivery

Execute your mission:

- **Planning**: Set clear goals and milestones
- **Evaluation**: Measure impact and outcomes
- **Adaptation**: Respond to feedback and results
- **Documentation**: Record activities and achievements

## Phase 6: Long-Term Sustainability

### Strategic Planning

Think beyond daily operations:

- **Vision**: Where do you want to be in 3-5 years?
- **Strategies**: How will you get there?
- **Resources**: What do you need?
- **Metrics**: How will you measure success?

### Capacity Building

Strengthen organizational capabilities:

- **Leadership development**: Cultivate member skills
- **Systems**: Implement efficient processes
- **Technology**: Leverage appropriate tools
- **Partnerships**: Collaborate with aligned organizations

### Consider Evolution

As you grow, you may need to evolve:

**When to Incorporate**
- Seeking significant funding
- Need limited liability protection
- Expanding operations substantially
- Hiring employees

**When to Seek 501(c)(3)**
- Require tax-deductible donations
- Applying for grants requiring tax-exempt status
- Building donor base

## State-Specific Considerations

UNA laws vary by state. Key differences:

### California
- Recognized under Corporations Code §18035
- No registration required
- Can hold property and sue/be sued
- Strong member protections

### Texas
- Governed by Texas Business Organizations Code
- Can register voluntarily
- Member liability protections
- Clear operating procedures

### New York
- Not-for-profit associations statute
- May need to register for solicitation
- Banking documentation requirements

### Pennsylvania
- Association registration optional
- Solicitation registration may be required
- Local permits for activities

## Common Challenges and Solutions

### Challenge: Member Conflicts

**Solution**:
- Clear bylaws with dispute resolution procedures
- Regular communication and transparency
- Documented decision-making processes

### Challenge: Funding Limitations

**Solution**:
- Diversify revenue streams
- Consider fiscal sponsorship
- Build toward 501(c)(3) status
- Leverage member contributions

### Challenge: Liability Concerns

**Solution**:
- Obtain appropriate insurance
- Follow bylaws consistently
- Document decisions carefully
- Consider incorporation if risk increases

### Challenge: Administrative Burden

**Solution**:
- Use technology and automation
- Distribute responsibilities among members
- Establish clear procedures
- Start simple and grow gradually

## Resources and Tools

### Essential Tools
- **Document templates**: Articles, bylaws, agreements
- **Accounting software**: QuickBooks, Wave, Xero
- **Communication**: Slack, Discord, email lists
- **Project management**: Trello, Asana, Monday

### Educational Resources
- IRS Publication 557 (Tax-Exempt Status)
- State nonprofit associations
- Legal aid clinics
- Online courses and webinars

### Professional Support
- **Legal**: Nonprofit attorneys for complex issues
- **Accounting**: CPAs familiar with nonprofits
- **Consulting**: Management support
- **Insurance**: Nonprofit insurance specialists

## Conclusion

Forming a UNA is an accessible entry point to nonprofit work, offering flexibility and minimal bureaucracy while enabling meaningful community impact. Success requires:

- Clear mission and purpose
- Strong governance documents
- Proper financial management
- Ongoing compliance
- Member engagement
- Strategic thinking

Start with a solid foundation, remain committed to your mission, and be prepared to evolve as your organization grows.

**Ready to form your UNA? Book a Strategy Session for tailored support in your state.**`,
    tags: ['UNA Formation', 'Legal Guide', 'Nonprofit Law', 'Formation Process', 'Compliance'],
    created_at: '2025-01-15',
    updated_at: '2025-01-15'
  },
  {
    slug: 'una-banking-guide',
    title: 'Banking for UNAs: Complete Setup Guide',
    content: `# Banking for UNAs: Complete Setup Guide

Setting up banking for your Unincorporated Nonprofit Association can be challenging. This guide walks through options, requirements, and best practices.

## Why Separate Banking Matters

**Financial Integrity**
- Clear separation from personal finances
- Professional accounting and reporting
- Member and donor confidence
- IRS compliance

**Legal Protection**
- Demonstrates organizational legitimacy
- Supports liability separation
- Facilitates auditing and transparency

## Banking Challenges for UNAs

Unlike corporations, UNAs face unique banking challenges:

- Not all banks recognize UNAs
- Documentation requirements vary
- May need workarounds
- State-specific rules apply

## Documents You'll Need

### Essential Documents
- **Articles of Association**: Your founding document
- **EIN Letter**: From IRS
- **Bylaws**: Governance procedures
- **Member Resolution**: Authorizing bank account

### Supporting Documents
- Member identification
- Physical address proof
- Initial deposit
- State-specific registrations (if any)

## Bank Options

### Traditional Banks

**Best For**: Established UNAs with complete documentation

**Pros**:
- Full banking services
- Physical branches
- Relationship banking
- Check processing

**Cons**:
- Strict documentation requirements
- May not understand UNAs
- Monthly fees common
- Minimum balance requirements

**Top Choices**:
- Bank of America (Nonprofit Programs)
- Wells Fargo (Nonprofit Banking)
- Local credit unions
- Community banks

### Online Banks

**Best For**: Smaller UNAs, remote teams

**Pros**:
- Lower fees
- Easier account opening
- Digital-first features
- Higher interest rates

**Cons**:
- No physical branches
- Limited cash handling
- May have UNA restrictions

**Top Choices**:
- Novo (small business focus)
- Bluevine (nonprofit-friendly)
- NBKC Bank
- Axos Bank

### Fiscal Sponsorship Alternative

**Best For**: Early-stage UNAs, funding needs

**How it Works**:
- Partner with 501(c)(3) organization
- Use their tax-exempt status
- They handle banking and compliance
- You focus on programs

**Pros**:
- Immediate tax-exempt status
- Established banking
- Reduced administrative burden
- Grant eligibility

**Cons**:
- Fee sharing (typically 5-15%)
- Less autonomy
- Dependent on sponsor
- Not building own capacity

## Account Setup Process

### Step 1: Choose Your Bank

Research banks that:
- Accept nonprofit associations
- Offer appropriate services
- Have reasonable fees
- Provide good support

### Step 2: Prepare Documents

Compile complete documentation:
- Certified Articles of Association
- Bylaws with banking provisions
- EIN confirmation letter
- Member authorization resolution
- Identification for signers

### Step 3: Contact Bank

Before visiting:
- Call nonprofit banking department
- Explain your UNA structure
- Confirm documentation requirements
- Schedule appointment if needed

### Step 4: Open Account

At appointment:
- Bring all documents
- Have 2+ authorized signers present
- Make initial deposit
- Set up online banking

### Step 5: Establish Controls

After opening:
- Set dual-signature requirements
- Establish spending limits
- Enable online access for transparency
- Set up accounting software integration

## Account Management Best Practices

### Financial Controls

**Dual Signatures**
- Require two signers for checks over $X
- Prevents unauthorized spending
- Builds accountability
- Common nonprofit practice

**Monthly Reconciliation**
- Review all transactions
- Match to accounting records
- Identify discrepancies quickly
- Present to members

**Budget Monitoring**
- Track against approved budget
- Report variances
- Adjust as needed
- Plan for sustainability

### Transparency

**Member Access**
- Regular financial reports
- Online banking view (read-only)
- Annual reviews
- Open books policy

**Documentation**
- Receipt for every expense
- Invoice for all income
- Clear transaction descriptions
- Organized records

## Common Banking Issues

### Issue: Bank Won't Open Account

**Solutions**:
- Try another bank
- Consider fiscal sponsorship
- Register UNA formally (if state allows)
- Use business account initially (then transition)

### Issue: Fees Too High

**Solutions**:
- Negotiate fee waivers
- Maintain minimum balance
- Switch to online bank
- Consolidate accounts

### Issue: Limited Services

**Solutions**:
- Supplement with payment processors (Stripe, PayPal)
- Use accounting software (QuickBooks, Wave)
- Online tools for invoicing
- Digital record keeping

### Issue: Signer Changes

**Solutions**:
- Maintain 3+ authorized signers
- Update bank immediately when signers change
- Keep documentation current
- Plan for transitions

## Payment Processing

Beyond basic banking, you may need:

### Online Donations

**Options**:
- Stripe
- PayPal
- Donorbox
- GiveWP (if you have a website)

**Considerations**:
- Transaction fees (2-3%)
- Recurring donation support
- Tax receipt generation
- Integration with accounting

### In-Person Payments

**Options**:
- Square
- Clover
- Cash (requires strong controls)
- Checks

**Best Practices**:
- Always provide receipt
- Two people count cash
- Daily deposits
- Clear documentation

## Tax Considerations

### Form 1099-K

If you process >$600 annually:
- Banks report to IRS
- You receive Form 1099-K
- Report on tax return
- Keep careful records

### Interest Income

Interest earned is typically:
- Taxable (unless 501(c)(3))
- Reported on Form 990
- Include in financial statements

## State-Specific Banking Notes

### California
- Banks generally familiar with UNAs
- Strong legal recognition helps
- May accept Association Code §18035 citation

### Texas
- Business Organizations Code reference helpful
- Some banks require registration
- Banking resolutions important

### New York
- More challenging for UNAs
- May need attorney assistance
- Strong documentation critical

### Pennsylvania
- Varies by bank
- Local banks more flexible
- Consider credit unions

## Building Banking Relationships

### Start Strong

- Be professional and prepared
- Educate banker about UNAs
- Provide complete documentation
- Follow through on commitments

### Maintain Well

- Keep information current
- Respond to bank requests promptly
- Maintain minimum balances
- Use services appropriately

### Grow Together

- Inform bank of major changes
- Seek advice on financial tools
- Consider expanded services as you grow
- Build referral relationships

## Conclusion

UNA banking requires patience and preparation, but is entirely achievable. Key success factors:

- Complete, professional documentation
- Clear financial controls
- Ongoing transparency
- Bank relationship management
- Flexibility and persistence

With proper setup, your UNA can have professional banking that supports your mission and builds member confidence.

**Need help setting up banking? Book a Strategy Session for personalized guidance.**`,
    tags: ['Banking', 'Financial Management', 'UNA Operations', 'Nonprofit Finance'],
    created_at: '2025-01-10',
    updated_at: '2025-01-10'
  },
  {
    slug: 'una-philosophy-legacy-stewardship',
    title: 'The Philosophy of UNAs: Legacy and Stewardship',
    content: `# The Philosophy of UNAs: Legacy and Stewardship

The Unincorporated Nonprofit Association represents more than just a legal structure—it embodies a philosophy of community-driven change, democratic governance, and collective stewardship.

## Historical Context

UNAs have deep roots in American civil society:

**Early Examples**
- Colonial town meetings and civic groups
- 19th-century mutual aid societies
- Labor unions and professional associations
- Civil rights organizations

**Legal Recognition**
- Common law tradition of association
- First Amendment right to assemble
- Uniform Unincorporated Nonprofit Association Act (1996, 2008)
- State-by-state recognition

## Core Philosophical Principles

### Democratic Governance

**Member Equality**
- One person, one vote (typically)
- Shared decision-making authority
- Collective wisdom over hierarchical control
- Distributed leadership

**Participatory Process**
- Active engagement expected
- Transparent operations
- Open communication
- Collaborative problem-solving

### Collective Stewardship

**Shared Responsibility**
- No single "owner" or controller
- Mission belongs to members
- Accountability to community
- Long-term thinking

**Asset Management**
- Resources serve mission
- Sustainable practices
- Intergenerational thinking
- Legacy building

### Mission Primacy

**Purpose-Driven**
- Mission guides all decisions
- Impact over profit
- Community benefit focus
- Values-based operations

**Adaptive Capacity**
- Mission remains constant
- Methods can evolve
- Learning organization
- Responsive to community needs

## UNA vs. Corporate Nonprofit Models

### Structural Differences

**UNA Model**
- Flat or minimal hierarchy
- Member-centric governance
- Informal authority
- Grassroots orientation

**Corporate Nonprofit Model**
- Board-staff hierarchy
- Representative governance
- Formal authority
- Institutional orientation

### Philosophical Differences

**UNA Approach**
- Process and participation valued
- Consensus-seeking
- Community organizing roots
- Emphasis on empowerment

**Corporate Approach**
- Efficiency and scale valued
- Efficiency in decision-making
- Philanthropic roots
- Emphasis on service delivery

### When Each Makes Sense

**UNA Best For**:
- Community organizing
- Member-driven work
- Grassroots movements
- Democratic values central

**Corporate Better For**:
- Professional service delivery
- Large-scale operations
- Significant funding needs
- Complex liability issues

## Building UNA Culture

### Foundational Values

**Transparency**
- Open books and records
- Public decision-making
- Accessible information
- Clear communication

**Accountability**
- Members to mission
- Leaders to members
- Organization to community
- Everyone to values

**Inclusivity**
- Diverse participation
- Equitable access
- Multiple perspectives
- Welcoming environment

### Operational Practices

**Meetings**
- Regular and well-facilitated
- Structured yet accessible
- Decision-focused
- Relationship-building

**Communication**
- Multi-channel approaches
- Frequent updates
- Two-way dialogue
- Accessible formats

**Leadership**
- Rotational or shared
- Skill-building for all
- Mentorship culture
- Succession planning

## Challenges and Tensions

### Efficiency vs. Democracy

**The Tension**:
- Democratic process takes time
- Some decisions need speed
- Member engagement varies
- Meetings can be burdensome

**Finding Balance**:
- Delegate routine decisions
- Reserve major decisions for members
- Use technology for efficiency
- Trust and empower leaders

### Flexibility vs. Structure

**The Tension**:
- Too much structure feels bureaucratic
- Too little creates confusion
- Members want both freedom and clarity
- Growth requires more structure

**Finding Balance**:
- Start simple, add as needed
- Document what works
- Review regularly
- Right-size for your stage

### Growth vs. Mission

**The Tension**:
- Growth brings opportunity
- Can dilute focus and culture
- Resources and attention stretched
- May require structural change

**Finding Balance**:
- Define success beyond size
- Grow intentionally
- Maintain cultural practices
- Consider evolution timing

## Legacy and Impact

### Defining Your Legacy

**Mission Achievement**
- What change are you making?
- How will impact be measured?
- What's your theory of change?
- How will you know you've succeeded?

**Cultural Contribution**
- What values are you modeling?
- How are you building community?
- What are you teaching?
- Who are you empowering?

**Institutional Building**
- What will outlast current members?
- How are you documenting learning?
- What infrastructure are you creating?
- How sustainable is your model?

### Intergenerational Planning

**Knowledge Transfer**
- Document processes and history
- Mentor new members
- Capture institutional memory
- Share lessons learned

**Leadership Development**
- Identify emerging leaders
- Provide growth opportunities
- Support skill-building
- Plan for succession

**Asset Management**
- Build reserves responsibly
- Maintain infrastructure
- Think long-term
- Plan for dissolution (eventually)

## The Future of UNAs

### Emerging Trends

**Digital Organizing**
- Virtual and hybrid models
- Expanded geographic reach
- New engagement tools
- Digital advocacy

**Network Models**
- Federated UNA structures
- Cross-organization collaboration
- Shared resources and learning
- Collective impact

**Social Entrepreneurship**
- Earned revenue strategies
- Market-based solutions
- Financial sustainability
- Innovation culture

### Ongoing Relevance

**Why UNAs Matter More Than Ever**:
- Democratic participation needed
- Community solutions emerging
- Institutional distrust growing
- Grassroots power increasing

**Challenges Ahead**:
- Legal recognition varying
- Banking and funding access
- Scaling impact
- Maintaining culture

## Conclusion

The UNA model offers a powerful alternative to traditional nonprofit structures, embodying values of democracy, stewardship, and community empowerment. Success requires:

- Clear philosophical commitment
- Consistent operational practices
- Patient culture-building
- Adaptive capacity
- Long-term perspective

Whether your UNA remains unincorporated indefinitely or eventually evolves into another structure, the values and practices developed will shape your impact and legacy.

**Exploring UNA philosophy for your organization? Let's discuss how these principles apply to your mission.**`,
    tags: ['Philosophy', 'Governance', 'Mission', 'Community Organizing', 'Leadership'],
    created_at: '2025-01-08',
    updated_at: '2025-01-08'
  },
  {
    slug: 'financial-management-una',
    title: 'Financial Management for UNAs: Best Practices',
    content: `# Financial Management for UNAs: Best Practices

Sound financial management is critical for any nonprofit, but UNAs face unique challenges given their informal structure and member-driven governance. This guide covers essential practices for maintaining financial health and integrity.

## Financial Management Fundamentals

### Why Financial Management Matters

**Organizational Sustainability**
- Ensures resources for mission work
- Builds member confidence
- Enables planning and growth
- Demonstrates stewardship

**Legal Compliance**
- IRS reporting requirements
- State regulations
- Grant requirements
- Audit readiness

**Stakeholder Trust**
- Members need transparency
- Donors require accountability
- Partners assess capability
- Community expects integrity

## Setting Up Financial Systems

### Chart of Accounts

Create categories that reflect your activities:

**Revenue Categories**
- Member dues
- Donations (individual, corporate, foundation)
- Earned revenue (services, products)
- Grants
- Interest income
- In-kind contributions

**Expense Categories**
- Program expenses (mission-direct costs)
- Administrative (governance, management)
- Fundraising
- Facilities
- Professional services

### Accounting Method

**Cash Basis**
- Records when money changes hands
- Simpler to maintain
- Acceptable for smaller UNAs
- Better for cash flow management

**Accrual Basis**
- Records when obligation created
- More complex
- Required for audits
- Better for larger organizations

**Recommendation**: Start with cash basis, move to accrual as you grow.

### Accounting Software

**Options by Size**:

*Small (under $50K revenue)*
- Wave (free)
- Spreadsheets with discipline
- GnuCash (free, open-source)

*Medium ($50K-$500K)*
- QuickBooks Online Nonprofit
- Xero
- FreshBooks

*Large (over $500K)*
- QuickBooks Enterprise
- Sage Intacct
- Blackbaud Financial Edge

### Financial Policies

Document your approach to:

**Expense Approval**
- Who can authorize spending?
- What amounts require multiple approvals?
- Required documentation
- Reimbursement procedures

**Revenue Handling**
- Who can accept funds?
- Deposit procedures
- Receipt issuance
- Gift acknowledgment

**Reporting**
- Monthly financial statements
- Budget variance reports
- Annual reports
- Tax filings

## Budgeting

### Creating an Annual Budget

**Process**:
1. Review previous year actual results
2. Project revenue conservatively
3. Estimate expenses realistically
4. Align with strategic priorities
5. Build in contingency (10-20%)
6. Get member approval

**Budget Categories**:
- Programs (mission work)
- Administration (operations)
- Fundraising (if applicable)
- Capital (equipment, reserves)

### Budget Management

**Monthly Review**
- Compare actual to budget
- Investigate variances (>10%)
- Adjust projections
- Report to members

**Budget Amendments**
- Process for major changes
- Member approval for significant shifts
- Documentation of rationale
- Updated projections

## Revenue Management

### Diversification Strategy

Don't rely on single source:

**Revenue Mix Example**:
- 40% Member dues
- 30% Individual donations
- 20% Earned revenue
- 10% Grants

**Benefits**:
- Reduces risk
- Increases stability
- Demonstrates viability
- Expands engagement

### Donation Management

**Acceptance Policy**
- What sources are acceptable?
- Any restrictions on donors?
- How to handle restricted gifts?
- Anonymous donation handling?

**Acknowledgment Process**
- Thank within 48 hours
- Tax receipt within 15 days
- Specify tax-deductibility status
- Track for year-end reporting

### Grant Management

**Pre-Award**
- Alignment with mission
- Capacity to deliver
- Reporting requirements
- True cost (including indirect)

**Post-Award**
- Separate accounting
- Compliance with restrictions
- Regular reporting
- Relationship management

## Expense Management

### Approval Process

**Tiered Authority**:
- Under $100: Any authorized member
- $100-$500: Treasurer approval
- $500-$5,000: Treasurer + President
- Over $5,000: Member vote

### Documentation Requirements

**Every Expense Needs**:
- Invoice or receipt
- Purpose/description
- Budget category
- Approval signature(s)
- Payment date and method

### Reimbursement

**Clear Policy**:
- Pre-approval for expenses over $X
- Submit within 30 days
- Include receipts
- Complete reimbursement form
- Payment within 15 days

## Financial Controls

### Segregation of Duties

Separate these functions:

**Money Handling**:
- Authorization (approval)
- Custody (holding funds)
- Recording (bookkeeping)
- Reconciliation (review)

**Example Split**:
- Person A: Approves expenses
- Person B: Writes checks
- Person C: Records in books
- Person D: Reconciles statements

### Banking Controls

**Check Signing**:
- Dual signatures required over $X
- Pre-numbered checks
- Voided checks retained
- Bank statements reviewed by non-signer

**Online Banking**:
- Dual authorization for transfers
- Transaction limits
- Regular access review
- Security best practices

### Cash Handling

**If You Handle Cash**:
- Two people always
- Count and document immediately
- Daily deposits
- Receipts issued
- Locked storage if delay

## Financial Reporting

### Monthly Financial Statements

**Statement of Financial Position** (Balance Sheet)
- Assets (what you own)
- Liabilities (what you owe)
- Net Assets (the difference)

**Statement of Activities** (Income Statement)
- Revenue by source
- Expenses by category
- Net income/loss
- Comparison to budget

**Cash Flow Statement**
- Cash receipts
- Cash disbursements
- Net change in cash
- Ending cash balance

### Management Reports

**Budget Variance Report**
- Budget vs. actual by category
- Variance amount and percentage
- Explanation of major variances
- Revised projections if needed

**Program Cost Report**
- Expenses by program
- Direct and allocated costs
- Cost per participant/outcome
- Efficiency metrics

### Annual Reporting

**Form 990 Series**
- 990-N: Under $50,000 revenue
- 990-EZ: $50,000-$200,000
- 990: Over $200,000
- Due by 15th day of 5th month after fiscal year end

**State Reports**
- Varies by state
- Charitable solicitation registration
- Annual registration renewal
- Compliance reports

## Reserve Policy

### Why Reserves Matter

**Financial Stability**
- Weather revenue fluctuations
- Handle unexpected expenses
- Enable opportunistic investments
- Reduce financial stress

**Stakeholder Confidence**
- Donors trust sustainability
- Partners see stability
- Members feel secure
- Creditors assess strength

### Building Reserves

**Target Level**:
- 3-6 months operating expenses
- Higher for seasonal revenue
- Build gradually (5-10% annually)
- Invest conservatively

**Reserve Policy Should Specify**:
- Target amount and timeframe
- Funding sources
- Conditions for use
- Replenishment plan
- Investment approach

## Tax Compliance

### Federal Requirements

**Employer Identification Number (EIN)**
- Required for banking
- Required for tax filings
- Free from IRS
- Apply online

**Form 990 Series**
- Annual information return
- Due even if no tax owed
- Public document
- Late filing penalties

**Unrelated Business Income Tax (UBIT)**
- Tax on certain business activities
- Form 990-T if over $1,000
- Complex rules
- Consult professional if applicable

### State Requirements

**Income Tax**
- Most states follow federal exemption
- Some require separate application
- Annual returns may be required

**Sales Tax**
- Varies by state
- May exempt mission-related sales
- Registration may be required
- Compliance with use tax

**Property Tax**
- Real property may be exempt
- Application often required
- Annual renewals in some states

## Audits and Reviews

### When to Get an Audit

**Consider if**:
- Over $500,000 revenue
- Grant requirements
- Significant risk factors
- Poor internal controls
- Member concerns

### Audit Preparation

**Get Ready**:
- Clean books year-round
- Organize documentation
- Compile requested items promptly
- Designate point person
- Learn from findings

### Less Formal Options

**Review** (less scope than audit)
- Analytical procedures
- Inquiries
- Limited assurance
- Lower cost

**Compilation** (no assurance)
- Format financial statements
- No testing
- Lowest cost
- Basic professionalism

## Common Financial Challenges

### Challenge: Limited Resources

**Solutions**:
- Use free/low-cost software
- Volunteer with financial skills
- Online training resources
- Peer learning and collaboration

### Challenge: Member Turnover

**Solutions**:
- Document all procedures
- Cross-train multiple people
- Standard templates and tools
- Smooth transition plans

### Challenge: Restricted Funds

**Solutions**:
- Clear tracking system
- Separate accounts if needed
- Detailed reporting
- Careful compliance

### Challenge: Financial Conflicts

**Solutions**:
- Transparent processes
- Multiple reviewers
- Regular reporting
- Conflict of interest policy

## Financial Sustainability Strategies

### Earned Revenue

**Options**:
- Fee-for-service programs
- Product sales
- Membership dues
- Consulting/training

**Considerations**:
- Alignment with mission
- True cost assessment
- Market research
- UBIT implications

### Individual Giving

**Building Donor Base**:
- Member recruitment
- Community engagement
- Online presence
- Storytelling and impact

**Retention Strategies**:
- Thank promptly and genuinely
- Report on impact
- Engage beyond donations
- Recognize appropriately

### Institutional Funding

**Foundation Grants**:
- Research alignment
- Build relationships
- Strong proposals
- Excellent reporting

**Corporate Support**:
- Local businesses
- Mission alignment
- Multiple engagement types
- Mutual benefit

## Conclusion

Strong financial management is essential for UNA success and sustainability. Key practices:

- Professional systems and controls
- Regular monitoring and reporting
- Member transparency and engagement
- Compliance with legal requirements
- Strategic resource development
- Long-term sustainability focus

Start with basics and build sophistication as you grow. Seek help when needed, but maintain member understanding and oversight.

**Need help building financial systems? Schedule a Strategy Session for customized guidance.**`,
    tags: ['Financial Management', 'Budgeting', 'Accounting', 'Compliance', 'Sustainability'],
    created_at: '2025-01-12',
    updated_at: '2025-01-12'
  },
  {
    slug: 'una-governance-best-practices',
    title: 'UNA Governance: Structure and Best Practices',
    content: `# UNA Governance: Structure and Best Practices

Effective governance is the foundation of a successful Unincorporated Nonprofit Association. This comprehensive guide covers governance structures, decision-making processes, and best practices for member-driven organizations.

## Understanding UNA Governance

### What Makes UNA Governance Unique

**Member-Centric Model**
- Members are both owners and participants
- Democratic decision-making
- Shared responsibility and authority
- Flexible, adaptable structure

**Minimal Hierarchy**
- Flat or minimal organizational structure
- Leadership serves rather than rules
- Authority comes from members
- Emphasis on participation over delegation

### Legal Governance Framework

**State Law Governs UNAs**
- Uniform Unincorporated Nonprofit Association Act (adopted by many states)
- State-specific statutes
- Common law principles
- Your bylaws fill in details

**Default Rules (if bylaws are silent)**
- Usually one member, one vote
- Majority rule for decisions
- All members have equal rights
- No personal liability for members

## Foundational Governance Documents

### Articles of Association

**Essential Elements**:
- Organization name
- Purpose and mission
- Member rights and responsibilities
- Governance structure
- Dissolution provisions
- Amendment procedures

**Best Practices**:
- Keep it concise
- Focus on fundamentals
- Allow flexibility through bylaws
- Review every 3-5 years

### Bylaws

**Core Provisions**:

*Membership*
- Qualification criteria
- Rights and privileges
- Dues and obligations
- Termination procedures

*Meetings*
- Frequency (monthly, quarterly, annual)
- Notice requirements
- Quorum (typically majority of members)
- Voting procedures

*Decision-Making*
- Matters requiring member vote
- Voting thresholds (majority, supermajority)
- Proxy voting (if allowed)
- Electronic participation

*Leadership*
- If you have officers/coordinators
- Selection and terms
- Duties and authority
- Removal and succession

*Committees*
- Standing committees
- Ad hoc committees
- Authority and reporting

*Amendments*
- How bylaws can be changed
- Notice requirements
- Voting threshold (often 2/3)

### Operating Agreements

**Day-to-Day Operations**:
- Routine decision authority
- Expense approval limits
- Communication protocols
- Meeting management
- Conflict resolution

## Governance Structures

### Fully Democratic (All-Member Model)

**How It Works**:
- All members vote on all decisions
- May have rotating meeting facilitators
- No permanent leadership positions
- Pure consensus or majority rule

**Best For**:
- Small groups (under 15 members)
- Strong ideological commitment to democracy
- Highly engaged membership
- Simple operations

**Challenges**:
- Decision-making can be slow
- Requires high attendance
- Not scalable
- May lack accountability

### Modified Democratic (Coordinator Model)

**How It Works**:
- Members elect coordinators
- Coordinators handle routine decisions
- Major decisions go to membership
- Coordinators serve limited terms

**Best For**:
- Medium groups (15-50 members)
- Balance efficiency and democracy
- Some operational complexity
- Growing organizations

**Key Roles**:
- Overall Coordinator
- Finance Coordinator
- Communications Coordinator
- Program Coordinator(s)

### Committee-Based Model

**How It Works**:
- Standing committees for key functions
- Committee members elected or volunteer
- Committees have delegated authority
- Report to full membership

**Common Committees**:
- Finance/Audit
- Programs/Services
- Governance/Nominating
- Development/Fundraising
- Communications/Outreach

**Best For**:
- Larger groups (50+ members)
- Diverse program areas
- Want member engagement
- Need specialized expertise

### Hybrid Models

**Combine Elements**:
- Elected officers for accountability
- Committees for specialization
- Full member votes on major decisions
- Flexible based on needs

## Effective Decision-Making

### Decision-Making Methods

**Consensus**
- Everyone must agree (or "stand aside")
- Thorough discussion and refinement
- Strong buy-in and commitment
- Can be time-consuming

*When to Use*:
- Major policy decisions
- Values and mission
- Member rights and responsibilities
- When unity is critical

**Majority Vote**
- Simple majority (50% + 1)
- Faster decision-making
- Some members may disagree
- Standard for most decisions

*When to Use*:
- Routine operational decisions
- Budget approval
- Program priorities
- Committee assignments

**Supermajority Vote**
- 2/3 or 3/4 required
- Higher bar for agreement
- Important decisions
- Protects minority concerns

*When to Use*:
- Bylaws amendments
- Dissolution
- Major financial commitments
- Strategic direction changes

**Delegation**
- Authorize leaders/committees
- Clear boundaries and reporting
- Efficiency for routine matters
- Maintains ultimate member control

*When to Use*:
- Day-to-day operations
- Routine expenditures
- Program implementation
- Emergency decisions

### Decision-Making Process

**Effective Process Steps**:

1. **Identify Issue**
   - Clear problem statement
   - Background information
   - Why decision is needed

2. **Gather Input**
   - Member perspectives
   - Expert advice if needed
   - Research and analysis
   - Stakeholder views

3. **Develop Options**
   - Multiple alternatives
   - Pros and cons of each
   - Cost and resource implications
   - Risk assessment

4. **Deliberate**
   - Structured discussion
   - Clarifying questions
   - Refinement of options
   - Building understanding

5. **Decide**
   - Use appropriate method
   - Clear motion and vote
   - Document decision
   - Record dissent if significant

6. **Implement**
   - Assign responsibility
   - Set timeline
   - Allocate resources
   - Monitor progress

7. **Evaluate**
   - Assess outcomes
   - Learn and adjust
   - Report back to members
   - Inform future decisions

## Member Meetings

### Types of Meetings

**Regular Meetings**
- Scheduled consistently (monthly, etc.)
- Routine business
- Reports and updates
- Ongoing decisions

**Annual Meetings**
- Review year's work
- Financial reports
- Leadership elections
- Strategic planning

**Special Meetings**
- Called as needed
- Specific purpose
- Limited agenda
- Proper notice required

### Running Effective Meetings

**Preparation**:
- Clear agenda distributed in advance
- Supporting materials provided
- Meeting space arranged
- Technology tested (if hybrid/virtual)

**Facilitation**:
- Start and end on time
- Follow agenda
- Encourage participation
- Manage conflict constructively
- Make decisions efficiently

**Documentation**:
- Attendance recorded
- Minutes taken
- Decisions documented
- Action items assigned
- Files maintained

### Meeting Policies

**Attendance**:
- Expectations for participation
- Remote participation options
- Quorum requirements
- Consequences of absence

**Participation**:
- Speaking opportunities
- Respectful discourse
- Confidentiality when appropriate
- Use of technology

**Voting**:
- Methods (voice, show of hands, ballot, electronic)
- When secret ballot is required
- Proxy voting (if allowed)
- Recording results

## Leadership and Accountability

### Leadership Roles

**If You Have Officers**:

*President/Chair*
- Presides at meetings
- Represents organization
- Ensures governance compliance
- Liaison to external parties

*Vice President*
- Supports president
- Fills in as needed
- May lead specific initiatives
- Succession planning

*Secretary*
- Meeting minutes
- Document maintenance
- Official correspondence
- Records management

*Treasurer*
- Financial oversight
- Budget development
- Financial reporting
- Banking liaison

### Leadership Development

**Building Capacity**:
- Identify emerging leaders
- Provide training and mentorship
- Rotate responsibilities
- Support skill development

**Succession Planning**:
- Document roles and processes
- Cross-train members
- Plan transitions
- Maintain institutional memory

### Accountability Mechanisms

**To Members**:
- Regular reporting
- Financial transparency
- Open books
- Annual evaluations

**To Mission**:
- Measure impact
- Strategic alignment
- Community accountability
- Outcome reporting

**To Legal Requirements**:
- Compliance monitoring
- Timely filings
- Proper documentation
- Risk management

## Conflict Resolution

### Common Sources of Conflict

- Personality clashes
- Disagreements on priorities
- Resource allocation
- Leadership disputes
- Mission/values tensions

### Resolution Strategies

**Prevention**:
- Clear bylaws and policies
- Regular communication
- Transparent processes
- Expectation setting

**Early Intervention**:
- Address issues promptly
- Private conversations
- Mediation by neutral party
- Focus on mission and values

**Formal Process**:
- Written grievance procedures
- Investigation if needed
- Fair hearing
- Member vote if necessary
- Appeal process

### Removing Members

**When Necessary**:
- Serious misconduct
- Violations of bylaws
- Harm to organization
- Consistent non-participation

**Due Process**:
- Written notice and charges
- Opportunity to respond
- Fair hearing
- Member vote (usually supermajority)
- Appeal rights

## Risk Management and Liability

### Member Liability

**General Rule**:
- Members not personally liable for UNA obligations
- Protection under state UNA statutes
- Exceptions for direct participation in wrongdoing

**Best Practices**:
- Follow bylaws consistently
- Maintain good faith
- Document decisions
- Obtain insurance

### Insurance

**Types to Consider**:
- General liability
- Directors and Officers (D&O)
- Property insurance
- Event insurance
- Professional liability (if applicable)

### Conflict of Interest

**Policy Should Cover**:
- Disclosure requirements
- Decision-making process
- Recusal procedures
- Annual attestation

**Common Conflicts**:
- Financial interests
- Family relationships
- Outside business
- Dual loyalties

## Governance Best Practices

### Transparency

- Open meetings (unless sensitive matters)
- Financial reports available to all members
- Decision-making process clear
- Minutes and records accessible

### Documentation

- Maintain complete records
- Organize systematically
- Digital and physical copies
- Retention policy

### Regular Review

- Annual governance evaluation
- Bylaws review every 3-5 years
- Policy updates as needed
- Learning from challenges

### Member Engagement

- Orientation for new members
- Ongoing education
- Multiple participation pathways
- Recognition and appreciation

### Strategic Thinking

- Annual strategic planning
- Environmental scanning
- Measurable goals
- Regular assessment

## Governance Evolution

### When to Reassess Structure

- Growth in size
- Increased complexity
- New funding sources
- Operational challenges
- Member feedback

### Transitioning to Incorporation

**Consider When**:
- Significant liability risk
- Large budget and staff
- Major funding requirements
- Need greater legal recognition

**Process**:
- Member discussion and vote
- Legal consultation
- File articles of incorporation
- Adopt corporate bylaws
- Transfer assets
- Maintain mission and values

## Conclusion

Effective UNA governance requires:

- Clear, well-crafted governing documents
- Appropriate structure for your size and mission
- Member-centric decision-making processes
- Strong leadership and accountability
- Transparent, ethical operations
- Regular review and improvement

Start with solid fundamentals and evolve as your organization grows. Invest in governance as mission-critical work.

**Need help designing governance for your UNA? Schedule a Strategy Session for tailored guidance.**`,
    tags: ['Governance', 'Leadership', 'Decision Making', 'Bylaws', 'Member Management'],
    created_at: '2025-01-14',
    updated_at: '2025-01-14'
  }
];

async function migrateBlog() {
  console.log('🚀 Starting blog migration to Supabase...\n');

  for (const post of blogPosts) {
    try {
      console.log(`📝 Migrating: ${post.title}`);

      const { data, error } = await supabase
        .from('blogs')
        .upsert({
          slug: post.slug,
          title: post.title,
          content: post.content,
          tags: post.tags,
          created_at: new Date(post.created_at).toISOString(),
          updated_at: new Date(post.updated_at).toISOString()
        }, {
          onConflict: 'slug'
        });

      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
      } else {
        console.log(`   ✅ Success`);
      }
    } catch (err) {
      console.error(`   ❌ Unexpected error:`, err);
    }
  }

  console.log('\n✨ Migration complete!');
  console.log(`📊 Migrated ${blogPosts.length} blog posts to Supabase`);
}

migrateBlog();
