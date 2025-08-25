import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Phone, 
  Mail, 
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { IntakeData } from '@/lib/types';
import { checkVerificationFlags, VerificationFlag } from '@/lib/verification-docket';

export default function Referrals() {
  const [, setIntakeData] = useState<IntakeData | null>(null);
  const [verificationFlags, setVerificationFlags] = useState<VerificationFlag[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('intake');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setIntakeData(data);
        
        // Run verification checks
        const flags = checkVerificationFlags(data);
        setVerificationFlags(flags);
      } catch (error) {
        console.error('Error parsing intake data:', error);
      }
    }
  }, []);

  const professionalReferrals = {
    attorney: {
      title: "Legal Professionals",
      description: "Attorneys specializing in nonprofit and UNA law",
      contacts: [
        {
          name: "UNA Legal Specialists",
          phone: "(555) 123-4567",
          email: "contact@unalegal.com",
          specialty: "UNA Formation & Compliance"
        },
        {
          name: "Nonprofit Law Group",
          phone: "(555) 234-5678", 
          email: "help@nonprofitlaw.com",
          specialty: "Tax-Exempt Organizations"
        }
      ]
    },
    cpa: {
      title: "Tax Professionals",
      description: "CPAs with nonprofit and tax-exempt expertise",
      contacts: [
        {
          name: "Nonprofit Tax Advisors",
          phone: "(555) 345-6789",
          email: "info@nonprofittax.com", 
          specialty: "501(c)(3) Applications"
        },
        {
          name: "Community CPA Services",
          phone: "(555) 456-7890",
          email: "team@communitycpa.com",
          specialty: "Financial Planning & Compliance"
        }
      ]
    },
    specialist: {
      title: "Specialized Consultants",
      description: "Grant writers, family business experts, and strategic advisors",
      contacts: [
        {
          name: "Grant Writing Pros",
          phone: "(555) 567-8901",
          email: "grants@grantpros.com",
          specialty: "Grant Applications & Strategy"
        },
        {
          name: "Family Business Institute",
          phone: "(555) 678-9012",
          email: "consult@familybiz.org",
          specialty: "Family Leadership & Succession"
        }
      ]
    }
  };

  const getIconForSeverity = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Info className="h-5 w-5 text-gold-600" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      default:
        return <Info className="h-5 w-5 text-navy-600" />;
    }
  };

  const getColorForSeverity = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-gold-200 bg-gold-50';
      case 'low':
        return 'border-emerald-200 bg-emerald-50';
      default:
        return 'border-navy-200 bg-navy-50';
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/dashboard" 
                className="mr-4 p-2 text-navy-600 hover:text-navy-900 rounded-lg hover:bg-navy-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-navy-900">Professional Referrals</h1>
                <p className="text-navy-600 mt-2">
                  Connect with specialists for your UNA's unique needs
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/faq" className="btn-secondary">
                <FileText className="h-4 w-4 mr-2" />
                View FAQ
              </Link>
              <button className="btn-primary flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Your Specific Flags */}
        {verificationFlags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Your Specific Needs</h2>
            <div className="grid gap-6">
              {verificationFlags.map((flag, index) => (
                <div key={index} className={`border rounded-lg p-6 ${getColorForSeverity(flag.severity)}`}>
                  <div className="flex items-start">
                    {getIconForSeverity(flag.severity)}
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">
                        {flag.title}
                      </h3>
                      <p className="text-navy-700 mb-4">{flag.description}</p>
                      
                      {flag.recommendation && (
                        <div className="bg-white p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-navy-900 mb-2">Our Recommendation:</h4>
                          <p className="text-navy-700 text-sm">{flag.recommendation}</p>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-navy-900 mb-2">Next Steps:</h4>
                          <ul className="text-sm text-navy-700 space-y-1">
                            {flag.nextSteps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start">
                                <span className="text-navy-400 mr-2">•</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="bg-white p-3 rounded">
                            <p className="text-sm text-navy-600">Professional Type:</p>
                            <p className="font-medium text-navy-900">{flag.referralType?.toUpperCase()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4 mt-4">
                        {flag.faqLink && (
                          <Link 
                            to={flag.faqLink} 
                            className="text-gold-600 hover:text-gold-800 text-sm flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Learn More in FAQ
                          </Link>
                        )}
                        {flag.blogLink && (
                          <Link 
                            to={flag.blogLink} 
                            className="text-emerald-600 hover:text-emerald-800 text-sm flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Read Blog Article
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Directory */}
        <div>
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Professional Directory</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            
            {Object.entries(professionalReferrals).map(([key, category]) => (
              <div key={key} className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-navy-600 mb-6">{category.description}</p>
                  
                  <div className="space-y-4">
                    {category.contacts.map((contact, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-navy-50">
                        <h4 className="font-medium text-navy-900 mb-2">{contact.name}</h4>
                        <p className="text-sm text-navy-600 mb-3">{contact.specialty}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-navy-700">
                            <Phone className="h-4 w-4 mr-2 text-navy-400" />
                            <a href={`tel:${contact.phone}`} className="hover:text-gold-600">
                              {contact.phone}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-navy-700">
                            <Mail className="h-4 w-4 mr-2 text-navy-400" />
                            <a href={`mailto:${contact.email}`} className="hover:text-gold-600">
                              {contact.email}
                            </a>
                          </div>

                        </div>
                        
                        <button className="mt-3 w-full btn-secondary text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Request Introduction
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gold-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-navy-900 mb-4">
            Need Help Choosing the Right Professional?
          </h3>
          <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
            Schedule a consultation with our team to discuss your specific needs and get personalized 
            recommendations for the best professionals for your UNA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Strategy Session
            </button>
            <Link to="/faq" className="btn-secondary">
              <FileText className="h-5 w-5 mr-2" />
              Browse Common Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}