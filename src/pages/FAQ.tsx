import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Target, Building2, Calculator, Shield, Users, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
  {
    id: 'basics',
    title: 'UNA Basics',
    icon: Target,
    color: 'from-gold-500 to-amber-500',
    questions: [
      {
        question: "What is a UNA?",
        answer: "An Unincorporated Nonprofit Association (UNA) is a flexible legal structure that allows mission-driven groups to operate collectively without the formal requirements of incorporation. It's perfect for community organizations, activist groups, mutual aid networks, and other collectives."
      },
      {
        question: "What are the key benefits of UNA structure?",
        answer: "UNAs offer simple formation process, flexible governance structure, legal recognition for contracts and property, tax-exempt eligibility, and minimal ongoing compliance requirements."
      },
      {
        question: "What's the difference between a UNA and other business structures?",
        answer: "UNAs are simpler and more flexible than most business structures. They don't require state filing fees, annual reports, or formal operating agreements like LLCs. They're ideal for nonprofit purposes and grassroots organizations."
      }
    ]
  },
  {
    id: 'formation',
    title: 'Formation & Setup',
    icon: Building2,
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        question: "How much does it cost to form a UNA?",
        answer: "Our UNA formation services include: Consultation ($250), Document Creation & Guidance ($750), or both together for $1000. There are no ongoing fees or annual reports required."
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
        question: "How should I choose my organization's name?",
        answer: "Choose a name that reflects your mission and is easy to remember. This will be used on all legal documents, so consider how it will appear on official filings, bank accounts, and public materials."
      }
    ]
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    icon: Shield,
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        question: "What should I include in my entity purpose?",
        answer: "Describe your organization's mission and purpose clearly. Include what you aim to accomplish, who you serve, and how you plan to make a difference. This helps establish your organization's legal identity and can be useful for funding applications."
      },
      {
        question: "What are primary activities?",
        answer: "List the main activities your association will engage in. This could include community organizing, educational programs, mutual aid, advocacy work, cultural events, or any other activities that support your mission."
      },
      {
        question: "Why do I need an EIN?",
        answer: "An Employer Identification Number (EIN) is required for all UNA organizations in California. It's your organization's 'social security number' for business purposes, needed to open bank accounts, file tax returns, apply for grants, hire employees, and establish credit."
      },
      {
        question: "Can I use a P.O. box as my mailing address?",
        answer: "No, you should use a physical address where you can receive mail. Government agencies and banks typically require a physical address for verification and compliance purposes."
      }
    ]
  },
  {
    id: 'governance',
    title: 'Governance & Operations',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        question: "What is the Organizer's role?",
        answer: "The Organizer is the person responsible for forming and initially managing the UNA. This person will be listed on all legal documents and filings, and is responsible for filing the LP/UNA-128 form, applying for the EIN, opening the business bank account, and managing initial compliance requirements."
      },
      {
        question: "Can I change the Organizer later?",
        answer: "Yes, the Organizer role can be transferred to another person or shared among multiple people. This is typically done through an amendment to your UNA Agreement or through your governance structure."
      },
      {
        question: "Why should I plan ahead for my UNA?",
        answer: "Planning ahead helps establish a solid foundation for your organization's growth and ensures you're prepared for future opportunities and challenges. It helps attract funding, guides decision-making, demonstrates organizational maturity, and prepares you for compliance requirements."
      },
      {
        question: "What property plans should I consider?",
        answer: "Consider whether you'll own, rent, or lease property, what types of property you might need (office space, meeting rooms, storage), and how property will be managed and maintained."
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial & Funding',
    icon: Calculator,
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        question: "What are grant plans?",
        answer: "Grant plans outline how you'll seek and manage funding from foundations, government agencies, and other grant-making organizations. This includes identifying potential funders, preparing applications, and managing grant requirements."
      },
      {
        question: "What fundraising plans should I develop?",
        answer: "Consider individual donations, membership fees, events, merchandise sales, and other revenue streams that align with your mission and values."
      },
      {
        question: "How do I open a bank account for my UNA?",
        answer: "You'll need your EIN, UNA Agreement, and LP/UNA-128 filing confirmation. Many banks offer business checking accounts specifically designed for nonprofits and small organizations."
      }
    ]
  },
  {
    id: 'support',
    title: 'Support & Services',
    icon: HelpCircle,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: "What services do you provide?",
        answer: "We offer UNA consultation ($250), complete document creation and guidance ($750), and ongoing consultancy (pricing varies by engagement). We also provide direct referrals to CPAs and attorneys when needed."
      },
      {
        question: "Do you provide ongoing support after formation?",
        answer: "Yes! We offer ongoing consultancy packages that include regular check-ins, compliance reviews, strategic guidance, and responsive advisory support as your UNA grows."
      },
      {
        question: "Can you help with specific legal questions?",
        answer: "While we provide comprehensive guidance, for specific legal questions we can provide direct referrals to attorneys who specialize in nonprofit law and UNA formation."
      }
    ]
  }
];

export default function FAQ() {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (questionId: string) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(questionId)) {
      newOpenQuestions.delete(questionId);
    } else {
      newOpenQuestions.add(questionId);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-[#2A2A28] max-w-3xl mx-auto font-lora">
              Get answers to common questions about UNA formation, legal requirements, 
              and ongoing operations. Can't find what you're looking for? 
              <Link to="/consultation" className="text-[#C49A6C] hover:text-[#A67C4A] font-medium ml-1">
                Schedule a consultation
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8">
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-navy-200 overflow-hidden">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white font-montserrat">{category.title}</h2>
                  </div>
                </div>
                
                {/* Questions */}
                <div className="p-6">
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const questionId = `${category.id}-${index}`;
                      const isOpen = openQuestions.has(questionId);
                      
                      return (
                        <div key={questionId} className="border border-navy-200 rounded-lg">
                          <button
                            onClick={() => toggleQuestion(questionId)}
                            className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-navy-50 transition-colors"
                          >
                            <span className="font-medium text-[#1C1F3B] font-montserrat">{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-[#2F7E7E]" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-[#2F7E7E]" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <div className="border-t border-[#2F7E7E]/20 pt-4">
                                <p className="text-[#2A2A28] leading-relaxed font-lora">{faq.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Help */}
        <div className="mt-12 bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-montserrat">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-lora">
            Start your UNA formation journey and get personalized guidance every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="btn-grad btn-secondary px-6 py-3 rounded-lg font-semibold text-[#1C1F3B] bg-white hover:bg-gray-50 transition-colors">
              Explore Your Path
            </Link>
            <Link to="/consultation" className="btn-grad btn-primary px-6 py-3 rounded-lg font-semibold text-white transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 