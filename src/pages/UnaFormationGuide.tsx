import React from 'react';
import { CheckCircle, Users, FileText, Building2, CreditCard, Scale, Handshake, ArrowRight, Download } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const UnaFormationGuide: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Gather Members",
      description: "A UNA requires at least two people. Choose members who are committed, trustworthy, and aligned with your group's values.",
      icon: Users,
      tip: "Write down names, roles, and contact info for at least 2–3 people."
    },
    {
      number: 2,
      title: "Define Your Purpose",
      description: "Your purpose is the anchor for everything your UNA does. Keep it clear, simple, and actionable.",
      icon: FileText,
      tip: "Start with: \"Our UNA exists to…\" and keep it to 1–2 sentences."
    },
    {
      number: 3,
      title: "Write a UNA Agreement",
      description: "This is your governing document. It should include members and roles, purpose, decision-making process, meeting schedule, and how funds will be handled.",
      icon: Building2,
      tip: "This agreement will be required when applying for an EIN and opening a bank account. You can find sample UNA Agreements by searching online or by visiting our FAQ and blog at unaguide.com.",
      details: [
        "Members and roles",
        "Purpose",
        "Decision-making process", 
        "Meeting schedule",
        "How funds will be handled"
      ]
    },
    {
      number: 4,
      title: "Apply for an EIN (Federal Tax ID)",
      description: "An EIN allows you to open a bank account and manage funds collectively.",
      icon: CreditCard,
      action: "Apply online at the IRS EIN website. It's free and approval is immediate.",
      link: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
    },
    {
      number: 5,
      title: "Check State Requirements",
      description: "Some states require UNA registration; others do not. Filing usually involves a short form and small fee ($25–$100).",
      icon: Scale,
      action: "Visit your Secretary of State's website and search for \"Unincorporated Nonprofit Association\" or \"Nonprofit filings.\""
    },
    {
      number: 6,
      title: "Open a Bank Account",
      description: "A dedicated UNA bank account protects members and ensures transparency.",
      icon: Handshake,
      tip: "Bring your EIN and UNA Agreement. Compare local credit unions (community focus) and online banks (convenience, lower fees)."
    },
    {
      number: 7,
      title: "Maintain Written Records",
      description: "Good records strengthen leadership and accountability. Keep track of member roster, meeting notes, and financial activity.",
      icon: ArrowRight,
      tip: "Create folders for \"Members,\" \"Meetings,\" and \"Finances.\" Tools like Google Drive, Airtable, or bookkeeping software can help.",
      details: [
        "Member roster",
        "Meeting notes", 
        "Financial activity"
      ]
    }
  ];

  const quickChecklist = [
    "2+ Members",
    "Purpose Statement", 
    "UNA Agreement",
    "EIN",
    "State Registration (if required)",
    "Bank Account",
    "Records of Members, Meetings, Finances"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#1C1F3B]">
      <SEOHead 
        title="UNA Formation Guide - Complete Step-by-Step Instructions"
        description="Everything you need to know to form your Unincorporated Nonprofit Association. Free comprehensive guide with state-specific requirements and legal templates."
        keywords={[
          'UNA formation',
          'nonprofit association',
          'bylaws',
          'EIN',
          'state registration',
          'legal guide'
        ]}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              UNA Formation Guide
            </h1>
            <p className="text-xl md:text-2xl font-lora text-[#C49A6C] mb-8 max-w-4xl mx-auto">
              Complete Step-by-Step Instructions for Forming Your Unincorporated Nonprofit Association
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/files/una-formation-guide.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-8 py-4 rounded-xl font-bold font-montserrat shadow-lg hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Download PDF Guide
              </a>
              <a
                href="/consultation"
                className="inline-flex items-center gap-2 border-2 border-[#C49A6C] text-[#C49A6C] px-8 py-4 rounded-xl font-bold font-montserrat hover:bg-[#C49A6C] hover:text-white transition-all duration-200"
              >
                Get Professional Help
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Introduction */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
              <h2 className="text-3xl font-bold font-montserrat text-white mb-6">
                Introduction
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white font-lora leading-relaxed mb-4">
                  Forming an <strong className="text-[#C49A6C]">Unincorporated Nonprofit Association (UNA)</strong> is a decisive act of collective creation. It is a way of creating organizations that reflect their members and their shared vision. A UNA offers a parallel path: it is legally recognized, yet flexible enough to let your group define how it values people, resources, and purpose.
                </p>
                <p className="text-white font-lora leading-relaxed mb-4">
                  At its heart, UNA formation is about <strong className="text-[#C49A6C]">sovereignty in community</strong>. It allows groups to come together, organize around shared goals, and make choices that align with their values, whether that includes pursuing profit to reinvest in the mission, cultivating cultural expression, or sustaining collective wellbeing.
                </p>
                <p className="text-white font-lora leading-relaxed">
                  This guide walks you through the essential steps of UNA formation. It is both a practical roadmap and an invitation to imagine what becomes possible when we organize in ways that mirror who we truly are.
                </p>
              </div>
            </div>

            {/* 7 Steps */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold font-montserrat text-white text-center mb-8">
                The 7 Steps to UNA Formation
              </h2>
              
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-2xl font-bold font-montserrat text-[#C49A6C]">
                            Step {step.number}
                          </span>
                          <h3 className="text-2xl font-bold font-montserrat text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white font-lora text-lg mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Details list */}
                        {step.details && (
                          <ul className="space-y-2 mb-4">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-[#C49A6C] mt-0.5 flex-shrink-0" />
                                <span className="text-white font-lora">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {/* Tip callout */}
                        {step.tip && (
                          <div className="bg-gradient-to-r from-[#C49A6C]/20 to-[#B8955A]/20 border-l-4 border-[#C49A6C] p-4 rounded-r-lg mb-4">
                            <div className="flex items-start gap-3">
                              <div className="text-[#C49A6C] font-bold text-sm font-montserrat mt-0.5">TIP:</div>
                              <p className="text-white font-lora text-sm leading-relaxed">{step.tip}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Action callout */}
                        {step.action && (
                          <div className="bg-gradient-to-r from-[#2F7E7E]/20 to-[#7A4CA0]/20 border-l-4 border-[#2F7E7E] p-4 rounded-r-lg mb-4">
                            <div className="flex items-start gap-3">
                              <div className="text-[#2F7E7E] font-bold text-sm font-montserrat mt-0.5">ACTION:</div>
                              <div className="text-white font-lora text-sm leading-relaxed">
                                {step.link ? (
                                  <a 
                                    href={step.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#C49A6C] hover:text-[#B8955A] underline"
                                  >
                                    {step.action}
                                  </a>
                                ) : (
                                  step.action
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ongoing Guidance Callout */}
            <div className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-sm rounded-2xl p-8 mt-8 shadow-2xl border border-gray-500/30">
              <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                Ongoing Guidance
              </h3>
              <p className="text-white font-lora leading-relaxed mb-4">
                Forming a UNA is the beginning. Ongoing leadership includes updating your agreement, keeping accurate records, and making decisions that reflect your group's evolving purpose.
              </p>
              <div className="bg-gradient-to-r from-[#C49A6C]/20 to-[#B8955A]/20 border-l-4 border-[#C49A6C] p-4 rounded-r-lg mb-6">
                <p className="text-white font-lora text-sm leading-relaxed">
                  <strong className="text-[#C49A6C]">If your UNA plans to fundraise, hire staff, or apply for grants, additional steps may be required.</strong> Consider booking a Strategy Session for tailored guidance.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-lg font-bold font-montserrat hover:shadow-lg transition-all duration-200"
                >
                  Book Strategy Session ($250)
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/toolkit"
                  className="inline-flex items-center gap-2 border border-[#C49A6C] text-[#C49A6C] px-6 py-3 rounded-lg font-bold font-montserrat hover:bg-[#C49A6C] hover:text-white transition-all duration-200"
                >
                  Explore DIY Toolkit
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#C49A6C] to-[#B8955A] rounded-2xl p-6 shadow-2xl sticky top-8">
              <h3 className="text-xl font-bold font-montserrat text-white mb-6">
                Quick Checklist
              </h3>
              <ul className="space-y-3">
                {quickChecklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white font-lora text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-lg font-bold font-montserrat text-white mb-4">
                  Need Help?
                </h4>
                <p className="text-white font-lora text-sm mb-4">
                  Our team can guide you through the entire UNA formation process.
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 bg-white text-[#C49A6C] px-4 py-2 rounded-lg font-bold font-montserrat text-sm hover:bg-gray-100 transition-all duration-200 w-full justify-center"
                >
                  Book Strategy Session
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-lora text-[#C49A6C]">
            Prepared by UNA Guide | unaguide.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnaFormationGuide;
