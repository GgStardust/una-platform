import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Symbol from '../components/Symbol';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Unincorporated Association Formation | Nonprofit Formation Legal Assistance"
        description="Expert unincorporated association formation services with legal assistance. Professional UNA formation for nonprofits nationwide. Get your nonprofit tax exemption with comprehensive legal guidance."
        keywords={[
          'unincorporated association formation',
          'nonprofit formation',
          'UNA formation',
          'nonprofit tax exemption',
          'legal assistance',
          'nonprofit legal assistance',
          '501(c)(3) application',
          'California UNA',
          'nonprofit formation legal assistance',
          'state-specific UNA requirements'
        ]}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Unincorporated Association Formation | UNA Platform",
          "description": "Professional unincorporated association formation services with legal assistance for nonprofits. Nationwide UNA formation with state-specific requirements and 501(c)(3) application support.",
          "mainEntity": {
            "@type": "Service",
            "name": "Unincorporated Association Formation Services",
            "description": "Professional UNA formation with legal assistance, nonprofit tax exemption support, and state-specific requirements guidance",
            "provider": {
              "@type": "Organization",
              "name": "UNA Platform"
            },
            "areaServed": "United States",
            "serviceType": "Legal Services"
          }
        }}
      />
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat">
            <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent">
              Unincorporated Association Formation
            </span>
            <br />
            Expert Legal Assistance for Nonprofit Formation
          </h1>
          <p className="text-xl text-white/90 mb-4 max-w-3xl mx-auto font-lora">
            Professional <strong>unincorporated association formation</strong> services with comprehensive legal assistance.
            Get expert guidance for <strong>nonprofit tax exemption</strong>, state-specific UNA requirements, and <strong>501(c)(3) applications</strong>.
            Nationwide support for your nonprofit formation journey.
          </p>
          <p className="text-sm text-white/70 mb-8 max-w-2xl mx-auto font-lora italic">
            This site provides educational information and document preparation services. For legal representation, consult a licensed attorney in your state.
          </p>
        </div>
      </div>

      {/* Primary CTAs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/explore" className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-center p-8 hover:bg-white/15 hover:scale-105 transition-all cursor-pointer">
            <div className="bg-gradient-to-r from-[#2F7E7E] to-[#246666] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Symbol name="orb" size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Explore Your Path</h3>
            <p className="text-white/90 font-lora">
              Begin with our 4-step assessment to clarify your goals and receive personalized insights for your UNA formation path.
            </p>
          </Link>

          <Link to="/services" className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-center p-8 hover:bg-white/15 hover:scale-105 transition-all cursor-pointer">
            <div className="bg-gradient-to-r from-[#7A4CA0] to-[#5A3875] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Symbol name="triangle" size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Professional Services</h3>
            <p className="text-white/90 font-lora">
              Access expert consulting, document preparation, and continuing support to establish your UNA with accuracy and ease.
            </p>
          </Link>
        </div>
        
        {/* Learn More Section */}
        <div className="text-center mt-12">
          <p className="text-white/80 mb-4 font-lora">Want to learn more first?</p>
          <Link to="/blog" className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors">
            Read our comprehensive guides
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Sovereign Principle Bridge */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <p className="text-lg text-white/90 text-center font-lora italic">
          Every UNA begins as a shared intention. The UNA Platform gives you structure, transparency, and lawful recognition while maintaining sovereignty.
        </p>
      </div>

      {/* What is a UNA Section */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 py-16 rounded-2xl mx-4 sm:mx-8 mb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">
            A Legal Framework for <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Sovereign Collaboration</span>
          </h2>
          <p className="text-lg text-white mb-8 font-lora">
            A <strong className="text-white font-semibold">UNA</strong> (Unincorporated Nonprofit Association) is a simple, lawful structure for collective governance. It allows groups to operate together with legal recognition while maintaining autonomy, authenticity, and shared purpose.
            Forming a UNA turns vision into structure, translating personal intention into collective action through cooperative intelligence.
            UNAs are recognized in many states as protected, member-driven entities that uphold sovereignty, flexibility, and continuity.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-white mb-2 font-montserrat">UNAs Empower:</h4>
              <ul className="text-white space-y-1 font-lora">
                <li>• Sovereign collective governance</li>
                <li>• Flexible, member-driven structure</li>
                <li>• Legal recognition and protection</li>
                <li>• Authentic grassroots operation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 font-montserrat">Ideal For:</h4>
              <ul className="text-white space-y-1 font-lora">
                <li>• Community organizations</li>
                <li>• Mutual aid networks</li>
                <li>• Activist groups</li>
                <li>• Cultural collectives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Teaser */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">Living Examples</h3>
          <p className="text-lg text-white/90 mb-6 font-lora">
            See how families, artists, and communities are using UNAs to preserve legacy homes, protect art collections, and sustain cultural projects.
          </p>
          <Link to="/success-stories" className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors">
            View Living Examples
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Why the UNA Platform */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 py-16 rounded-2xl mx-4 sm:mx-8 mb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">
            Simple, Secure, and <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Sovereign</span>
          </h2>
          <p className="text-lg text-white mb-8 font-lora">
            The UNA Platform offers the guidance, tools, and templates to help you form your association with clarity and confidence.
            Whether you are a small collective or a family managing shared property, we provide practical legal support aligned with purpose-driven principles.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#C49A6C] to-[#B8955A] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Symbol name="constellation" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 font-montserrat">Step-by-step Toolkit</h4>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#246666] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Symbol name="orb" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 font-montserrat">Affordable formation services</h4>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#5A3875] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Symbol name="triangle" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 font-montserrat">Access to expert consultants</h4>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#B8955A] to-[#C49A6C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Symbol name="constellation" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 font-montserrat">Ongoing compliance and support</h4>
            </div>
          </div>
          <Link to="/explore" className="inline-flex items-center bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-8 py-4 rounded-xl font-bold font-montserrat hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105">
            Start Now
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Closing Invitation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">
          Begin the Journey. Preserve the <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Legacy</span>.
        </h2>
        <p className="text-lg text-white/90 mb-8 font-lora">
          A UNA is a living container for what you value most.
          Form yours with structure, clarity, and sovereignty.
        </p>
        <Link to="/toolkit" className="inline-flex items-center bg-gradient-to-r from-[#2F7E7E] to-[#246666] text-white px-8 py-4 rounded-xl font-bold font-montserrat hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105">
          Start Your UNA Journey
          <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </div>
    </>
  );
} 