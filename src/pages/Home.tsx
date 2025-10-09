import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Symbol from '../components/Symbol';
import { ResponsiveContainer, ResponsiveText, ResponsiveCard, ResponsiveButton } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Unincorporated Association Formation | Professional UNA Formation Services"
        description="Professional unincorporated association formation services. Expert UNA formation support with comprehensive administrative guidance. State-specific UNA requirements and tax exemption guidance."
        keywords={[
          'unincorporated association formation',
          'UNA formation',
          'UNA formation services',
          'unincorporated association',
          'UNA requirements',
          'UNA structure',
          'California UNA',
          'state-specific UNA requirements',
          'UNA tax exemption'
        ]}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Unincorporated Association Formation | UNA Platform",
          "description": "Professional unincorporated association formation services. Nationwide UNA formation with state-specific requirements guidance.",
          "mainEntity": {
            "@type": "Service",
            "name": "Unincorporated Association Formation Services",
            "description": "Professional UNA formation with administrative support, tax exemption guidance, and state-specific requirements",
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
      <ResponsiveContainer size="spacious" maxWidth="xl" className="pt-24 pb-12">
        <div className="text-center">
          <ResponsiveText variant="h1" weight="bold" font="montserrat" className="text-white mb-6">
            <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent">
              Unincorporated Association Formation
            </span>
            <br />
            Expert UNA Formation Services Done Right
          </ResponsiveText>

          <ResponsiveText variant="h4" font="lora" className="text-white/90 mb-4 max-w-3xl mx-auto">
            Professional <strong>unincorporated association formation</strong> services with comprehensive administrative support.
            Get expert guidance for <strong>UNA structure</strong>, state-specific requirements, and <strong>tax exemption</strong>.
            Nationwide UNA formation done right the first time.
          </ResponsiveText>

          <ResponsiveText variant="caption" font="lora" className="text-white/70 mb-8 max-w-2xl mx-auto block italic">
            This site provides educational information and document preparation services. For legal representation, consult a licensed attorney in your state.
          </ResponsiveText>
        </div>
      </ResponsiveContainer>

      {/* Primary CTAs Section */}
      <ResponsiveContainer size="default" maxWidth="xl" className="pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/explore">
            <ResponsiveCard variant="default" className="text-center hover:bg-white/15 hover:scale-105 transition-all cursor-pointer">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#246666] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Symbol name="orb" size={40} className="text-white" />
              </div>
              <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
                Explore Your Path
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/90">
                Begin with our 4-step assessment to clarify your goals and receive personalized insights for your UNA formation path.
              </ResponsiveText>
            </ResponsiveCard>
          </Link>

          <Link to="/services">
            <ResponsiveCard variant="default" className="text-center hover:bg-white/15 hover:scale-105 transition-all cursor-pointer">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#5A3875] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Symbol name="triangle" size={40} className="text-white" />
              </div>
              <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
                Professional Services
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/90">
                Access expert consulting, document preparation, and continuing support to establish your UNA with accuracy and ease.
              </ResponsiveText>
            </ResponsiveCard>
          </Link>
        </div>

        {/* Learn More Section */}
        <div className="text-center mt-12">
          <ResponsiveText variant="body" font="lora" className="text-white/80 mb-4">
            Want to learn more first?
          </ResponsiveText>
          <Link to="/blog" className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors">
            Read our comprehensive guides
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </ResponsiveContainer>

      {/* Sovereign Principle Bridge */}
      <ResponsiveContainer size="default" maxWidth="lg" className="mb-16">
        <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 text-center italic">
          Every UNA begins as a shared intention. The UNA Platform gives you structure, transparency, and lawful recognition while maintaining sovereignty.
        </ResponsiveText>
      </ResponsiveContainer>

      {/* What is a UNA Section */}
      <div className="mx-4 sm:mx-8 mb-24">
        <ResponsiveCard variant="spacious" className="py-16">
          <ResponsiveContainer size="default" maxWidth="lg" className="text-center">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
              A Legal Framework for <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Sovereign Collaboration</span>
            </ResponsiveText>

            <ResponsiveText variant="bodyLarge" font="lora" className="text-white mb-8">
              A <strong className="text-white font-semibold">UNA</strong> (Unincorporated Association) is a simple, lawful structure for collective governance. It allows groups to operate together with legal recognition while maintaining autonomy, authenticity, and shared purpose.
              Forming a UNA turns vision into structure, translating personal intention into collective action through cooperative intelligence.
              UNAs are recognized in many states as protected, member-driven entities that uphold sovereignty, flexibility, and continuity.
            </ResponsiveText>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white mb-2">
                  UNAs Empower:
                </ResponsiveText>
                <ul className="text-white space-y-1 font-lora text-base">
                  <li>• Sovereign collective governance</li>
                  <li>• Flexible, member-driven structure</li>
                  <li>• Legal recognition and protection</li>
                  <li>• Authentic grassroots operation</li>
                </ul>
              </div>
              <div>
                <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white mb-2">
                  Ideal For:
                </ResponsiveText>
                <ul className="text-white space-y-1 font-lora text-base">
                  <li>• Community organizations</li>
                  <li>• Mutual aid networks</li>
                  <li>• Activist groups</li>
                  <li>• Cultural collectives</li>
                </ul>
              </div>
            </div>
          </ResponsiveContainer>
        </ResponsiveCard>
      </div>

      {/* Case Study Teaser */}
      <ResponsiveContainer size="default" maxWidth="lg" className="mb-16">
        <ResponsiveCard variant="default" className="bg-white/5 border-white/10 text-center">
          <ResponsiveText variant="h3" weight="bold" font="montserrat" className="text-white mb-4">
            Living Examples
          </ResponsiveText>
          <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 mb-6">
            See how families, artists, and communities are using UNAs to preserve legacy homes, protect art collections, and sustain cultural projects.
          </ResponsiveText>
          <Link to="/success-stories" className="inline-flex items-center text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors">
            View Living Examples
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </ResponsiveCard>
      </ResponsiveContainer>

      {/* Why the UNA Platform */}
      <div className="mx-4 sm:mx-8 mb-24">
        <ResponsiveCard variant="spacious" className="py-16">
          <ResponsiveContainer size="default" maxWidth="lg" className="text-center">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
              Simple, Secure, and <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Sovereign</span>
            </ResponsiveText>

            <ResponsiveText variant="bodyLarge" font="lora" className="text-white mb-8">
              The UNA Platform offers the guidance, tools, and templates to help you form your association with clarity and confidence.
              Whether you are a small collective or a family managing shared property, we provide practical legal support aligned with purpose-driven principles.
            </ResponsiveText>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#C49A6C] to-[#B8955A] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Symbol name="constellation" size={24} className="text-white" />
                </div>
                <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white">
                  Step-by-step Toolkit
                </ResponsiveText>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#2F7E7E] to-[#246666] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Symbol name="orb" size={24} className="text-white" />
                </div>
                <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white">
                  Affordable formation services
                </ResponsiveText>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#7A4CA0] to-[#5A3875] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Symbol name="triangle" size={24} className="text-white" />
                </div>
                <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white">
                  Access to expert consultants
                </ResponsiveText>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#B8955A] to-[#C49A6C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Symbol name="constellation" size={24} className="text-white" />
                </div>
                <ResponsiveText variant="body" weight="semibold" font="montserrat" className="text-white">
                  Ongoing compliance and support
                </ResponsiveText>
              </div>
            </div>

            <div className="flex justify-center">
              <Link to="/explore">
                <ResponsiveButton variant="primary" size="lg">
                  Start Now
                  <ArrowRight className="h-5 w-5" />
                </ResponsiveButton>
              </Link>
            </div>
          </ResponsiveContainer>
        </ResponsiveCard>
      </div>

      {/* Closing Invitation */}
      <ResponsiveContainer size="default" maxWidth="lg" className="mb-16 text-center">
        <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
          Begin the Journey. Preserve the <span className="bg-gradient-to-r from-[#C49A6C] via-[#B8955A] to-[#2F7E7E] bg-clip-text text-transparent font-bold">Legacy</span>.
        </ResponsiveText>
        <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 mb-8">
          A UNA is a living container for what you value most.
          Form yours with structure, clarity, and sovereignty.
        </ResponsiveText>
        <div className="flex justify-center">
          <Link to="/explore">
            <ResponsiveButton variant="secondary" size="lg">
              Start Your UNA Journey
              <ArrowRight className="h-5 w-5" />
            </ResponsiveButton>
          </Link>
        </div>
      </ResponsiveContainer>

    </div>
    </>
  );
}
