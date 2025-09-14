import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Symbol from '../components/Symbol';

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
    <div className="min-h-screen una-gradient-hero" style={{background: 'linear-gradient(135deg, #F4F1E8 0%, #E8E0D0 100%)'}}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
            <span className="text-[#C49A6C]">UNA Formation Guidance</span>
            <br />
            <span className="text-[#1C1F3B]">Clarity-First Strategy & Resources</span>
          </h1>
          <p className="text-xl text-[#1C1F3B] mb-8 max-w-3xl mx-auto font-lora">
            Get clear guidance for your UNA formation journey with 
            <strong className="text-[#C49A6C]"> sovereignty-aligned expertise</strong>. Explore your path, access curated resources, 
            and get personalized strategy sessions to establish your 
            <strong className="text-[#C49A6C]"> Unincorporated Nonprofit Association</strong> with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="btn-grad btn-primary text-lg px-8 py-4">
              <Symbol name="orb" size={24} className="mr-2" />
              Explore Your Path
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link to="/services" className="btn-grad btn-secondary text-lg px-8 py-4">
              <Symbol name="triangle" size={24} className="mr-2" />
              Schedule Strategy Session
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/explore" className="una-card text-center p-8 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Symbol name="orb" size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Explore Your Path</h3>
            <p className="text-white/90 font-lora">
              Take our guided assessment to understand your UNA formation options and
              get personalized strategic insights for your mission.
            </p>
          </Link>
          
          <Link to="/toolkit" className="una-card text-center p-8 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Symbol name="hex-eye" size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">UNA Formation Toolkit</h3>
            <p className="text-white/90 font-lora">
              Access our comprehensive toolkit with services, resources, and essential tools 
              for your UNA formation journey.
            </p>
          </Link>
          
          <Link to="/blog" className="una-card text-center p-8 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Symbol name="triangle" size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Learn More</h3>
            <p className="text-white/90 font-lora">
              Read our blog for UNA formation insights, state-specific guidance, 
              and expert advice for all 50 states.
            </p>
          </Link>
        </div>
      </div>

      {/* What is a UNA Section */}
      <div className="bg-[#F4F1E8] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
            What is a <strong>UNA (Unincorporated Nonprofit Association)</strong>?
          </h2>
          <p className="text-lg text-[#2A2A28] mb-8 font-lora">
            A <strong>UNA</strong> is a flexible legal structure that allows mission-driven groups to operate 
            collectively without the formal requirements of incorporation. <strong>UNA formation</strong> 
            provides unique advantages for community organizations, activist groups, 
            mutual aid networks, and other collectives that want legal recognition while maintaining their 
            grassroots nature. Our <strong>UNA formation</strong> expertise ensures you get the 
            <strong>legal guidance</strong> needed for proper structure.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Benefits:</h4>
              <ul className="text-[#2A2A28] space-y-1 font-lora">
                <li>• No filing fees or annual reports</li>
                <li>• Flexible governance structure</li>
                <li>• Can open bank accounts</li>
                <li>• Legal entity recognition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Perfect For:</h4>
              <ul className="text-[#2A2A28] space-y-1 font-lora">
                <li>• Community organizations</li>
                <li>• Mutual aid networks</li>
                <li>• Activist groups</li>
                <li>• Cultural collectives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
            Ready to Explore Your UNA Path?
          </h2>
          <p className="text-xl text-white/90 mb-8 font-lora">
            Get clarity on your formation journey with our guidance-first approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation" className="btn-grad btn-primary px-8 py-3">
              <Symbol name="triangle" size={20} className="mr-2" />
              Book Strategy Session
            </Link>
            <Link to="/explore" className="btn-grad btn-secondary px-8 py-3">
              <Symbol name="orb" size={20} className="mr-2" />
              Explore Your Path
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 