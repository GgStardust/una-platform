import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  // Basic UNA Information
  {
    question: "What is a UNA?",
    answer: "An Unincorporated Nonprofit Association (UNA) is a flexible legal structure that allows mission-driven groups to operate collectively without the formal requirements of incorporation. It's perfect for community organizations, activist groups, mutual aid networks, and other collectives."
  },
  {
    question: "What are the key benefits of UNA structure?",
    answer: "UNAs offer simple formation process, flexible governance structure, legal recognition for contracts and property, tax-exempt eligibility, and minimal ongoing compliance requirements."
  },
  {
    question: "How much does it cost to form a UNA?",
    answer: "Our premium UNA formation packages range from $1,000-$2,000, which includes customized legal documents, strategic consultation, step-by-step guidance, and ongoing support. There are no ongoing fees or annual reports required."
  },
  {
    question: "Do I need an attorney to form a UNA?",
    answer: "While you can form a UNA without an attorney, our platform provides comprehensive legal guidance. However, if you have complex legal needs (landholding, 501(c)(3) status, etc.), we recommend consulting with legal professionals."
  },
  {
    question: "How long does it take to form a UNA?",
    answer: "The actual formation can be completed in as little as a few hours using our platform. However, obtaining an EIN and completing other registrations may take 1-2 weeks depending on government processing times."
  },
  {
    question: "What's the difference between a UNA and other business structures?",
    answer: "UNAs are simpler and more flexible than most business structures. Here's how they compare:\n\n• UNA vs LLC: UNAs don't require state filing fees, annual reports, or formal operating agreements. They're ideal for nonprofit purposes.\n\n• UNA vs S-Corp: UNAs don't require shareholder restrictions, formal board meetings, or complex tax elections. They're simpler to manage.\n\n• UNA vs C-Corp: UNAs don't require formal bylaws, annual shareholder meetings, or complex corporate governance. They're more flexible.\n\n• UNA vs Sole Proprietorship: UNAs provide liability protection and can have multiple members, unlike sole proprietorships which are single-person businesses.\n\n• UNA vs Benefit Corp: UNAs don't require annual benefit reports or formal stakeholder consideration. They're simpler while still serving social purposes.\n\nUNAs are perfect for grassroots organizations, community groups, and mission-driven collectives that want legal recognition without corporate complexity."
  },

  // Entity Information
  {
    question: "How should I choose my organization's name?",
    answer: "Choose a name that reflects your mission and is easy to remember. This will be used on all legal documents, so consider how it will appear on official filings, bank accounts, and public materials."
  },
  {
    question: "What should I include in my entity purpose?",
    answer: "Describe your organization's mission and purpose clearly. Include what you aim to accomplish, who you serve, and how you plan to make a difference. This helps establish your organization's legal identity and can be useful for funding applications."
  },
  {
    question: "What are primary activities?",
    answer: "List the main activities your association will engage in. This could include community organizing, educational programs, mutual aid, advocacy work, cultural events, or any other activities that support your mission."
  },
  {
    question: "When should I set as my start date?",
    answer: "Set the date when you want your UNA to officially begin operations. This can be today's date or a future date when you plan to start activities. This date will appear on legal documents and filings."
  },
  {
    question: "Why is California the only state option?",
    answer: "Our platform is specifically designed for California UNA formation. California has specific laws and requirements for UNAs, and our documents and guidance are tailored to meet these requirements. If you're in another state, we can provide general guidance but recommend consulting local resources."
  },

  // Organizer Information
  {
    question: "What is the Organizer's role?",
    answer: "The Organizer is the person responsible for forming and initially managing the UNA. This person will be listed on all legal documents and filings, and is responsible for filing the LP/UNA-128 form, applying for the EIN, opening the business bank account, and managing initial compliance requirements."
  },
  {
    question: "Can I change the Organizer later?",
    answer: "Yes, the Organizer role can be transferred to another person or shared among multiple people. This is typically done through an amendment to your UNA Agreement or through your governance structure."
  },
  {
    question: "What contact information do I need to provide?",
    answer: "You'll need to provide your full name, email address, phone number, and complete address. This information will be used for legal filings, government correspondence, and may appear in public records."
  },

  // Mailing Address & EIN
  {
    question: "Why do I need a mailing address?",
    answer: "Your mailing address is where official correspondence, legal documents, and government notices will be sent. This address will appear on all public filings and legal documents, including LP/UNA-128 filings, EIN applications, and bank account documents."
  },
  {
    question: "Can I use a P.O. box as my mailing address?",
    answer: "No, you should use a physical address where you can receive mail. Government agencies and banks typically require a physical address for verification and compliance purposes."
  },
  {
    question: "Why do I need an EIN?",
    answer: "An Employer Identification Number (EIN) is required for all UNA organizations in California. It's your organization's 'social security number' for business purposes, needed to open bank accounts, file tax returns, apply for grants, hire employees, and establish credit."
  },
  {
    question: "How do I get an EIN?",
    answer: "You can apply for an EIN online through the IRS website (recommended), by fax, or by mail. The online application is immediate, while fax takes 4-7 business days and mail takes 4-6 weeks."
  },

  // Plans & Governance
  {
    question: "Why should I plan ahead for my UNA?",
    answer: "Planning ahead helps establish a solid foundation for your organization's growth and ensures you're prepared for future opportunities and challenges. It helps attract funding, guides decision-making, demonstrates organizational maturity, and prepares you for compliance requirements."
  },
  {
    question: "What property plans should I consider?",
    answer: "Consider whether you'll own, rent, or lease property, what types of property you might need (office space, meeting rooms, storage), and how property will be managed and maintained."
  },
  {
    question: "What are grant plans?",
    answer: "Grant plans outline how you'll seek and manage funding from foundations, government agencies, and other grant-making organizations. This includes identifying potential funders, preparing applications, and managing grant requirements."
  },
  {
    question: "What fundraising plans should I develop?",
    answer: "Fundraising plans cover how you'll raise money from individuals, businesses, and other sources. This could include events, online campaigns, membership dues, merchandise sales, or other fundraising activities."
  },

  // Leadership & Governance
  {
    question: "How should I structure leadership in my UNA?",
    answer: "UNA organizations thrive with clear leadership structures that balance flexibility with accountability. Consider how decisions are made (consensus, voting, designated leaders), who has authority for different types of decisions, how new leaders are selected, and processes for resolving conflicts."
  },
  {
    question: "Do UNAs need bylaws?",
    answer: "UNAs do not legally require formal bylaws like corporations do. However, creating bylaws can be beneficial for establishing clear governance procedures, decision-making processes, membership rules, and operational guidelines. Bylaws help ensure consistency and provide a framework for growth."
  },
  {
    question: "What is a Board of Directors (BOD) and do UNAs need one?",
    answer: "A Board of Directors is a group of individuals who oversee the organization's activities and make strategic decisions. While UNAs don't legally require a formal BOD, many choose to establish one for governance purposes. You can have a simple advisory board, a decision-making board, or operate through consensus without a formal board structure."
  },
  {
    question: "What is family leadership?",
    answer: "Family leadership refers to how leadership roles are passed down or shared within family groups. This is common in family foundations, cultural organizations, or community groups with strong family ties."
  },
  {
    question: "How do I handle conflicts of interest?",
    answer: "Establish clear processes for identifying and managing conflicts of interest. This might include disclosure requirements, recusal from certain decisions, or establishing independent oversight for sensitive matters."
  },
  {
    question: "What is succession planning?",
    answer: "Succession planning ensures your organization can continue operating if key leaders are unavailable. This includes identifying potential successors, documenting processes, and ensuring knowledge transfer."
  },

  // Insignia & Compliance
  {
    question: "What is an insignia?",
    answer: "An insignia is a symbol, logo, or visual identifier that represents your organization. It helps establish your professional identity and can include logos, emblems, or other visual elements that make your organization recognizable."
  },
  {
    question: "Why should I register an insignia?",
    answer: "Registering an insignia provides legal protection for your visual identity, ensures professional appearance and recognition, maintains brand consistency across materials, enhances credibility with stakeholders, and improves marketing effectiveness."
  },
  {
    question: "What compliance requirements do UNAs have?",
    answer: "UNAs have minimal ongoing compliance requirements compared to corporations. You'll need to file your initial LP/UNA-128 form, maintain basic records, and comply with any specific requirements related to your activities (tax filings, permits, etc.)."
  },
  {
    question: "Do I need to file annual reports?",
    answer: "No, UNAs in California do not require annual reports to the Secretary of State. However, you may need to file tax returns with the IRS depending on your income and activities."
  },

  // Signatures & Legal
  {
    question: "What happens after I sign the UNA Agreement?",
    answer: "After signing, your UNA Agreement becomes legally binding, you can proceed with LP/UNA-128 filing, submit your EIN application, begin the bank account opening process, and your organization is officially recognized."
  },
  {
    question: "Are digital signatures valid?",
    answer: "Yes, digital signatures are legally valid for UNA formation in California. You can sign electronically through our platform, and this will be accepted by government agencies and financial institutions."
  },
  {
    question: "Do I need witnesses to sign?",
    answer: "While not legally required, having witnesses can strengthen the validity of your agreement. Witnesses can be any adults who are not parties to the agreement."
  },

  // Banking & Financial
  {
    question: "Can a UNA open a bank account?",
    answer: "Yes! Once you have your UNA Agreement and EIN, most banks will allow you to open a business account in your association's name. You'll need to bring your formation documents, EIN confirmation, and personal identification."
  },
  {
    question: "What documents do I need to open a bank account?",
    answer: "You'll need your completed and signed UNA Agreement, LP/UNA-128 filing confirmation from the Secretary of State, EIN confirmation letter from the IRS, government ID, and proof of address."
  },
  {
    question: "What types of bank accounts should I consider?",
    answer: "Consider a business checking account for daily transactions, business savings for reserve funds, and potentially merchant services if you'll be accepting credit cards. Look for accounts with reasonable fees and good online banking features."
  },

  // Tax & Legal
  {
    question: "What tax forms do UNAs file?",
    answer: "UNAs typically file Form 990-N if gross receipts are under $50,000, Form 990-EZ if receipts are $50,000-$200,000, or Form 990 if receipts exceed $200,000. You may also need to file state tax returns depending on your location and activities."
  },
  {
    question: "Can UNAs get 501(c)(3) status?",
    answer: "Yes, UNAs can absolutely apply for and receive 501(c)(3) tax-exempt status from the IRS! This is one of the major advantages of the UNA structure. To qualify, your UNA must be organized and operated exclusively for charitable, educational, religious, scientific, literary, testing for public safety, fostering national or international amateur sports competition, or preventing cruelty to children or animals. The application process involves filing Form 1023 or Form 1023-EZ with the IRS and demonstrating that your activities meet the exempt purpose requirements."
  },
  {
    question: "What are the benefits of 501(c)(3) status?",
    answer: "501(c)(3) status provides several key benefits: donors can deduct contributions from their taxes, you're exempt from federal income tax on related income, you may qualify for grants and funding that require tax-exempt status, and you can apply for certain government contracts and programs. Additionally, it enhances your credibility with donors and partners."
  },
  {
    question: "What is fiscal sponsorship?",
    answer: "Fiscal sponsorship allows your UNA to receive tax-deductible donations through another tax-exempt organization. This can be useful while you're applying for your own tax-exempt status or if you don't meet the requirements for 501(c)(3) status."
  },

  // Operations & Growth
  {
    question: "How do I add new members to my UNA?",
    answer: "You can add new members by updating your UNA Agreement or creating a membership policy. Consider how new members are admitted, what rights and responsibilities they have, and how membership is managed."
  },
  {
    question: "Can UNAs own property?",
    answer: "Yes, UNAs can own property in their own name. This includes real estate, equipment, vehicles, and other assets. Property ownership should be documented in your UNA Agreement and managed according to your governance structure."
  },
  {
    question: "How do UNAs handle liability?",
    answer: "UNAs provide some liability protection for members, but the level of protection depends on your specific circumstances and how your organization is structured. Consider obtaining appropriate insurance coverage for your activities."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = [
    { id: 'all', name: 'All Questions', count: faqs.length },
    { id: 'basic', name: 'Basic UNA Information', count: 6 },
    { id: 'entity', name: 'Entity Information', count: 5 },
    { id: 'organizer', name: 'Organizer Information', count: 3 },
    { id: 'mailing', name: 'Mailing Address & EIN', count: 4 },
    { id: 'plans', name: 'Plans & Governance', count: 4 },
    { id: 'leadership', name: 'Leadership & Governance', count: 6 },
    { id: 'insignia', name: 'Insignia & Compliance', count: 4 },
    { id: 'signatures', name: 'Signatures & Legal', count: 3 },
    { id: 'banking', name: 'Banking & Financial', count: 3 },
    { id: 'tax', name: 'Tax & Legal', count: 4 },
    { id: 'operations', name: 'Operations & Growth', count: 3 }
  ];

  const getCategoryForIndex = (index: number) => {
    if (index < 6) return 'basic';
    if (index < 11) return 'entity';
    if (index < 14) return 'organizer';
    if (index < 18) return 'mailing';
    if (index < 22) return 'plans';
    if (index < 28) return 'leadership';
    if (index < 32) return 'insignia';
    if (index < 35) return 'signatures';
    if (index < 38) return 'banking';
    if (index < 42) return 'tax';
    return 'operations';
  };

  const filteredFaqs = faqs.filter((faq, index) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getCategoryForIndex(index) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-navy-600">
            Everything you need to know about forming and managing your UNA
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gold-600 text-white'
                    : 'bg-navy-200 text-navy-700 hover:bg-navy-300'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-navy-600">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-navy-900">{faq.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-navy-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-navy-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="mt-4 pt-4 border-t border-navy-200">
                  <p className="text-navy-600 whitespace-pre-line">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-navy-100 mb-8">
            Start your UNA formation journey and get personalized guidance every step of the way.
          </p>
          <Link to="/intake" className="bg-white text-navy-600 hover:bg-navy-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
} 