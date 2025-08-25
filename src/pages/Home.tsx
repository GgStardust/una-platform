import { Link } from 'react-router-dom';
import { Users, FileText, Shield, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Home() {
  return (
    <>
      <SEOHead
        title="UNA Formation Done Right"
        description="California UNA formation with legal guidance. Do it right the first time with our comprehensive formation platform. Professional UNA formation services in California with legal compliance guaranteed."
        keywords={[
          'UNA formation California',
          'Unincorporated Nonprofit Association formation',
          'California UNA formation services',
          'professional UNA formation',
          'legal guidance UNA formation',
          'UNA formation requirements California'
        ]}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "UNA Formation Done Right",
          "description": "California UNA formation with legal guidance. Do it right the first time with our comprehensive formation platform.",
          "mainEntity": {
            "@type": "Service",
            "name": "UNA Formation Services",
            "description": "Professional UNA formation in California with legal guidance and compliance guaranteed",
            "provider": {
              "@type": "Organization",
              "name": "UNA Formation Platform"
            },
            "areaServed": "California",
            "serviceType": "Legal Services"
          }
        }}
      />
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
            <span className="text-gold-600">UNA Formation Done Right</span>
            <br />
            California-Specific Legal Guidance
          </h1>
          <p className="text-xl text-navy-700 mb-8 max-w-3xl mx-auto">
            Transform your mission-driven collective into a recognized legal entity with 
            <strong> California UNA formation</strong> expertise. Get all the documents, 
            <strong> legal guidance</strong>, and support you need to establish your 
            <strong> Unincorporated Nonprofit Association</strong> correctly from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/intake" className="bg-gold-500 hover:bg-gold-600 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link to="/explore" className="bg-white hover:bg-navy-50 text-navy-700 text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-200 border-2 border-navy-200 hover:border-navy-300 shadow-md hover:shadow-lg">
              Explore Your Path
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <Users className="h-12 w-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-navy-800">Collective Formation</h3>
            <p className="text-navy-600">
              Bring your community together under a recognized legal structure that protects 
              your mission and enables collective action.
            </p>
          </div>
          
          <div className="card text-center">
            <FileText className="h-12 w-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-navy-800">Complete Documentation</h3>
            <p className="text-navy-600">
              Get all the legal documents you need: UNA Agreement, EIN registration, 
              DBA filing, and financial tracking templates.
            </p>
          </div>
          
          <div className="card text-center">
            <Shield className="h-12 w-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-navy-800">Legal Protection</h3>
            <p className="text-navy-600">
              Establish clear governance, protect your collective's interests, and 
              create a foundation for sustainable growth.
            </p>
          </div>
        </div>
      </div>

      {/* What is a UNA Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            What is a <strong>UNA (Unincorporated Nonprofit Association)</strong>?
          </h2>
          <p className="text-lg text-navy-700 mb-8">
            A <strong>UNA</strong> is a flexible legal structure that allows mission-driven groups to operate 
            collectively without the formal requirements of incorporation. In <strong>California</strong>, 
            <strong>UNA formation</strong> provides unique advantages for community organizations, activist groups, 
            mutual aid networks, and other collectives that want legal recognition while maintaining their 
            grassroots nature. Our <strong>California UNA formation</strong> expertise ensures you get the 
            <strong>legal guidance</strong> needed for proper structure.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-navy-800 mb-2">Benefits:</h4>
              <ul className="text-navy-600 space-y-1">
                <li>• No filing fees or annual reports</li>
                <li>• Flexible governance structure</li>
                <li>• Can open bank accounts</li>
                <li>• Legal entity recognition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-navy-800 mb-2">Perfect For:</h4>
              <ul className="text-navy-600 space-y-1">
                <li>• Community organizations</li>
                <li>• Mutual aid networks</li>
                <li>• Activist groups</li>
                <li>• Cultural collectives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Section - SEO & Navigation */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Your Complete UNA Formation Journey
            </h2>
            <p className="text-lg text-navy-700 max-w-2xl mx-auto">
              From exploration to formation, we provide every resource you need to establish your UNA correctly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Start Your Formation
              </h3>
              <div className="space-y-4">
                <Link 
                  to="/explore" 
                  className="block p-4 bg-white rounded-lg border border-navy-200 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-gold-600 hover:text-gold-800">
                    Explore Your Path
                  </div>
                  <div className="text-sm text-navy-600 mt-1">
                    Take our 4-step assessment to find your ideal formation approach
                  </div>
                </Link>
                <Link 
                  to="/intake" 
                  className="block p-4 bg-white rounded-lg border border-navy-200 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-gold-600 hover:text-gold-800">
                    Begin Formation Process
                  </div>
                  <div className="text-sm text-navy-600 mt-1">
                    Start your UNA formation with our comprehensive intake form
                  </div>
                </Link>
                <Link 
                  to="/services" 
                  className="block p-4 bg-white rounded-lg border border-navy-200 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-gold-600 hover:text-gold-800">
                    View Our Services
                  </div>
                  <div className="text-sm text-navy-600 mt-1">
                    See all the professional formation services we offer
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Expert Guidance & Resources
              </h3>
              <div className="space-y-4">
                <Link 
                  to="/blog" 
                  className="block p-4 bg-white rounded-lg border border-navy-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-emerald-600 hover:text-emerald-800">
                    Formation Insights
                  </div>
                  <div className="text-sm text-navy-600 mt-1">
                    Read expert guidance on UNA formation and compliance
                  </div>
                </Link>
                <Link 
                  to="/faq" 
                  className="block p-4 bg-white rounded-lg border border-navy-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-emerald-600 hover:text-emerald-800">
                    Frequently Asked Questions
                  </div>
                  <div className="text-sm text-navy-600 mt-1">
                    Get answers to common UNA formation questions
                  </div>
                </Link>
                <Link 
                  to="/success" 
                  className="block p-4 bg-white rounded-lg border border-navy-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-emerald-600 hover:text-emerald-800">
                    Success Stories
                  </div>
                  <div className="text-sm text-navy-600 mt-1">
                    Learn from real UNA formation experiences
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Form Your UNA?
          </h2>
          <p className="text-xl text-navy-100 mb-8">
            Join hundreds of collectives who have used our platform to establish their legal foundation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/intake" className="bg-white text-navy-600 hover:bg-navy-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Get Started Now
            </Link>
            <Link to="/success" className="border-2 border-white text-white hover:bg-white hover:text-navy-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              See Success Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 