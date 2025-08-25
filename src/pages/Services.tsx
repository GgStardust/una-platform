import { Link } from 'react-router-dom';
import { Check, ArrowRight, FileText, Shield, Users, Building } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Services() {
  return (
    <>
      <SEOHead
        title="Professional UNA Formation Services"
        description="Complete UNA formation services in California with legal guidance and compliance guaranteed. Get all documents, EIN registration, and ongoing support."
        keywords={[
          'UNA formation services California',
          'professional UNA formation',
          'UNA formation packages',
          'legal guidance UNA formation',
          'California UNA formation services',
          'UNA formation documents'
        ]}
        ogType="service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Complete UNA Formation Services",
          "description": "Everything you need to establish your Unincorporated Nonprofit Association, from legal documents to ongoing guidance.",
          "provider": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          },
          "serviceType": "UNA Formation",
          "areaServed": "California",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UNA Formation Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "UNA Agreement",
                  "description": "Customized association agreement that defines your collective's purpose, governance structure, and member rights."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "EIN Registration",
                  "description": "Step-by-step guide to obtain your Employer Identification Number for banking and tax purposes."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "LP/UNA-128 Filing",
                  "description": "Complete filing package for the LP/UNA-128 form required for California-based associations."
                }
              }
            ]
          }
        }}
      />
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            <strong>California UNA Formation</strong> Services
          </h1>
          <p className="text-xl text-navy-600">
            Everything you need to establish your <strong>Unincorporated Nonprofit Association</strong> 
            with <strong>legal guidance</strong> and compliance guaranteed. Our <strong>professional UNA formation</strong> 
            services ensure your organization is structured correctly from day one.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* UNA Agreement */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">UNA Agreement</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Customized association agreement that defines your collective's purpose, 
              governance structure, and member rights.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Mission and purpose definition
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Member rights and responsibilities
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Decision-making processes
              </li>
            </ul>
          </div>

          {/* EIN Registration */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">EIN Registration</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Step-by-step guide to obtain your Employer Identification Number 
              for banking and tax purposes.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                IRS application guidance
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Required documentation
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Follow-up procedures
              </li>
            </ul>
          </div>

          {/* LP/UNA-128 Filing */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">LP/UNA-128 Filing</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Complete filing package for the LP/UNA-128 form required for 
              California-based associations.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Form completion guide
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Filing instructions
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Compliance tracking
              </li>
            </ul>
          </div>

          {/* DBA Registration */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">DBA Registration</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Guide to register your "Doing Business As" name for 
              banking and public recognition.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Name availability check
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                County filing process
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Publication requirements
              </li>
            </ul>
          </div>

          {/* Financial Templates */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">Financial Templates</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Professional invoice templates and financial tracking systems 
              for your association's operations.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Invoice templates
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Expense tracking
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Budget planning tools
              </li>
            </ul>
          </div>

          {/* Ongoing Support */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-gold-500" />
              <h3 className="text-xl font-semibold ml-3">Ongoing Support</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Access to resources, updates, and guidance as your 
              association grows and evolves.
            </p>
            <ul className="text-sm text-navy-600 mb-4 space-y-1">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Compliance updates
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Best practices
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                Community resources
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            <strong>Professional UNA Formation</strong> Pricing
          </h2>
          <div className="bg-gold-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-4xl font-bold text-gold-600 mb-2">$1,000-$2,000</div>
            <div className="text-navy-600 mb-6">
              <strong>California UNA formation</strong> packages with <strong>legal guidance</strong> included
            </div>
            <ul className="text-left space-y-3 mb-8">
                              <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500 mr-3" />
                  Premium UNA formation packages
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500 mr-3" />
                  Customized legal documents and templates
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500 mr-3" />
                  Strategic consultation and guidance
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500 mr-3" />
                  Ongoing support and resources
                </li>
            </ul>
            <Link to="/intake" className="btn-primary text-lg px-8 py-3 w-full">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Form Your UNA?
          </h2>
          <p className="text-xl text-cream-100 mb-8">
            Join the growing community of collectives who have established their legal foundation.
          </p>
          <Link to="/intake" className="bg-white text-navy-600 hover:bg-cream-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
    </>
  );
} 