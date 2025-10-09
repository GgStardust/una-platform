// @ts-nocheck
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Target, Building2, Calculator, Shield, Users, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { GlassCard, GradientHeader, PremiumButton, SectionContainer, ResponsiveText } from '@/components/ui';

const faqCategories = [
  {
    id: 'basics',
    title: 'UNA Basics',
    icon: Target,
    color: 'from-[#3DB5B0] to-[#1E2A38]',
    questions: [
      {
        question: "What is a UNA?",
        answer: "An Unincorporated Association (UNA) is a flexible legal structure that allows groups to operate collectively without the formal requirements of incorporation. It's perfect for community organizations, activist groups, mutual aid networks, and other collectives."
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
    color: 'from-[#1E2A38] to-[#3DB5B0]',
    questions: [
      {
        question: "How much does it cost to form a UNA?",
        answer: "Our UNA formation services include: Strategy Session ($1,000) and Formation Package ($5,000). We also offer Formation + Annual Partnership with annual advisory support (contact for pricing). There are no ongoing fees or annual reports required for the UNA itself."
      },
      {
        question: "Do I need an attorney to form a UNA?",
        answer: "While you can form a UNA without an attorney, our platform provides comprehensive formation support and administrative guidance. For complex legal matters (landholding, 501(c)(3) status, etc.), we can connect you with qualified legal professionals."
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
    color: 'from-[#E57373] to-[#3DB5B0]',
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
    color: 'from-[#3DB5B0] to-[#1E2A38]',
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
    color: 'from-[#E57373] to-[#1E2A38]',
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
    color: 'from-[#1E2A38] to-[#E57373]',
    questions: [
      {
        question: "What services do you provide?",
        answer: "We offer Strategy Sessions ($1,000), Formation Package ($5,000), and Formation + Annual Partnership with annual advisory support (contact for pricing). We also provide direct referrals to CPAs and attorneys when needed for specialized legal matters."
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
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Header */}
      <GradientHeader
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about UNA formation, legal requirements, and ongoing operations."
        primaryCta={{
          text: "Explore Your Path",
          href: "/explore"
        }}
        secondaryCta={{
          text: "Schedule Consultation",
          href: "/services"
        }}
      />

      {/* FAQ Categories */}
      <SectionContainer>
        <div className="grid gap-8">
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <GlassCard key={category.id} className="overflow-hidden">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white">
                      {category.title}
                    </ResponsiveText>
                  </div>
                </div>

                {/* Questions */}
                <div className="p-6">
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const questionId = `${category.id}-${index}`;
                      const isOpen = openQuestions.has(questionId);

                      return (
                        <div key={questionId} className="border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm">
                          <button
                            onClick={() => toggleQuestion(questionId)}
                            className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                          >
                            <ResponsiveText variant="body" weight="medium" font="montserrat" className="text-white">
                              {faq.question}
                            </ResponsiveText>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-[#3DB5B0] flex-shrink-0 ml-2" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-[#3DB5B0] flex-shrink-0 ml-2" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-4">
                              <div className="border-t border-white/20 pt-4">
                                <ResponsiveText variant="body" font="lora" className="text-white/90 leading-relaxed block">
                                  {faq.answer}
                                </ResponsiveText>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Additional Help */}
        <GlassCard className="mt-12 p-8 text-center bg-gradient-to-r from-[#1C1F3B]/80 to-[#2F7E7E]/80">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-4">
            Still Have Questions?
          </ResponsiveText>
          <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 mb-8 block">
            Start your UNA formation journey and get personalized guidance every step of the way.
          </ResponsiveText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <PremiumButton variant="secondary">
                Explore Your Path
              </PremiumButton>
            </Link>
            <Link to="/services">
              <PremiumButton variant="primary">
                Schedule Consultation
              </PremiumButton>
            </Link>
          </div>
        </GlassCard>
      </SectionContainer>
    </div>
  );
} 