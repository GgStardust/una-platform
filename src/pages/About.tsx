import { Users, BookOpen, Lightbulb, Heart, Target, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, GradientHeader, SectionContainer } from '@/components/ui';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Hero Section */}
      <GradientHeader
        title="About the UNA Platform"
        subtitle="Empowering purpose-driven founders to align structure with sovereignty through accessible, lawful frameworks."
      />

      {/* Creator Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">Created by Gigi Stardust</h2>
          <GlassCard variant="solid" padding="lg">
            <p className="text-lg text-[#1C1F3B]/90 leading-relaxed mb-6 font-lora">
              Gigi Stardust is a systems architect, consultant, and creator of <em>Stardust to Sovereignty™</em>,
              a multidimensional book and interactive system that integrates science, metaphysics, creativity, and community practice into a living journey of sovereignty.
            </p>
            <p className="text-lg text-[#1C1F3B]/90 leading-relaxed font-lora">
              With decades of experience in building purpose-driven organizations, she designed this UNA platform
              to give visionaries, educators, artists, and community builders a clear and sovereign pathway to
              establish their own Unincorporated Nonprofit Association (UNA).
            </p>
          </GlassCard>
        </div>

        {/* Founder Mission Callout */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">A Vision for Sovereignty</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-white/90 leading-relaxed font-lora">
                "My mission is to help visionaries, educators, artists, and community builders create organizations
                that truly reflect their values and purpose. Many are guided to fit their dreams into
                structures that no longer serve their evolving purpose."
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-lora">
                "The UNA platform represents a different path—one where structure serves sovereignty, where
                legal frameworks support rather than constrain our collective vision. This is about creating
                the world we want to live in, one organization at a time."
              </p>
              <div className="mt-6">
                <span className="inline-block bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-lg font-bold font-montserrat">
                  — Gigi Stardust, Founder
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Mission Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">The Mission</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-white/90 leading-relaxed font-lora">
              The UNA platform exists to make mission-aligned structuring accessible, simple, and powerful.
              It guides clients through intake, generates professional agreements and filings, and provides
              a dashboard that tracks progress and indicates when additional legal or financial review could strengthen alignment.
            </p>
            <p className="text-lg text-white/90 leading-relaxed mt-4 font-lora">
              At its core, the platform creates structures that serve creativity, purpose, and collective integrity.
            </p>
          </div>
        </div>

        {/* Mission Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard className="text-center">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Mission-Aligned</h3>
            <p className="text-white/90 font-lora">
              Structures that serve your creative vision and collective purpose, not bureaucratic requirements.
            </p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Legal Protection</h3>
            <p className="text-white/90 font-lora">
              Professional agreements and filings that establish clear governance and protect collective interests.
            </p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Collective Integrity</h3>
            <p className="text-white/90 font-lora">
              Frameworks that honor collaboration, sovereignty, and the unique needs of mission-driven groups.
            </p>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* S2S Integration Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">
            Rooted in Stardust to Sovereignty (S2S)
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-white/90 leading-relaxed mb-6 font-lora">
              This platform is both a consulting service and a lived example of sovereignty in action.
              <em>Stardust to Sovereignty™</em> is a multidimensional book and interactive system that integrates science, metaphysics, creativity, and community practice into a living journey of sovereignty.
            </p>
            <p className="text-lg text-white/90 leading-relaxed font-lora">
              It extends beyond the page into physical portals: an art studio, meditation and event spaces, and a creative property that blends living, teaching, and collaboration. Structured as a UNA, it embodies decentralization, parallel economies, and coherence, showing how vision-driven projects can hold both creative expression and community impact in one sovereign container.
            </p>
          </div>
        </div>

        {/* S2S Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2 font-montserrat">Book</h4>
            <p className="text-sm text-white/90 font-lora">Multidimensional exploration of sovereignty and consciousness</p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2 font-montserrat">Digital Portal</h4>
            <p className="text-sm text-white/90 font-lora">Interactive systems and tools for transformation</p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2 font-montserrat">Physical Spaces</h4>
            <p className="text-sm text-white/90 font-lora">Art studios, meditation spaces, and gathering environments</p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2 font-montserrat">Field Gatherings</h4>
            <p className="text-sm text-white/90 font-lora">Community events and embodied creative projects</p>
          </div>
        </div>
      </SectionContainer>

      {/* Why It Matters Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">Why It Matters</h2>
          <GlassCard>
            <div className="text-left">
              <p className="text-lg text-white/90 leading-relaxed mb-6 font-lora">
                UNAs are flexible, cost-effective, and underutilized legal structures that provide lawful standing and banking access without the weight of incorporation. For creatives, healers,
                educators, and organizers, they create a foundation that honors sovereignty and collaboration.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-lora">
                This platform gives you the tools and guidance to step into that foundation with clarity and confidence.
              </p>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Essence Statement */}
      <SectionContainer padding="lg" background="transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#2F7E7E] via-[#7A4CA0] to-[#C49A6C] rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold mb-6 text-white font-montserrat">Essence Statement</h2>
            <p className="text-lg text-white leading-relaxed font-lora">
              Created by Gigi Stardust, the UNA platform empowers mission-driven founders to align structure with purpose.
              It is rooted in the sovereignty-centered framework of <em>Stardust to Sovereignty™</em>, a sovereign design system expressed through writing, art, and community portals: a multidimensional map of creativity, consciousness, and coherence held in its own UNA.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Team Grid */}
      <SectionContainer padding="lg" background="transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">Our Team</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-lora">
            Meet the visionary behind the UNA platform and the principles that guide our work.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Gigi Stardust */}
          <GlassCard className="text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] mx-auto mb-4 flex items-center justify-center">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Gigi Stardust</h3>
            <p className="text-white/70 font-medium mb-2 font-montserrat">Founder & Systems Architect</p>
            <p className="text-white/90 mb-4 font-lora">
              Creator of Stardust to Sovereignty™ and architect of purpose-driven organizational structures.
            </p>
            <div className="text-sm text-white/90">
              <p>Systems Architecture</p>
              <p>Organizational Design</p>
              <p>Consciousness Studies</p>
            </div>
          </GlassCard>

          {/* Stardust to Sovereignty */}
          <GlassCard className="text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] mx-auto mb-4 flex items-center justify-center">
              <Lightbulb className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Stardust to Sovereignty™</h3>
            <p className="text-white/70 font-medium mb-2 font-montserrat">Philosophical Foundation</p>
            <p className="text-white/90 mb-4 font-lora">
              Sovereign design system expressed through writing, art, and community portals.
            </p>
            <div className="text-sm text-white/90">
              <p>Metaphysics & Neuroscience</p>
              <p>Cosmology & Creative Practice</p>
              <p>Interspecies Intelligence</p>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>


      {/* Footer Navigation */}
      <SectionContainer padding="md" background="transparent">
        <div className="border-t border-white/20 pt-8">
          <div className="text-center">
            <p className="text-white/90 mb-4 font-lora">
              Explore more about the UNA platform and our approach to sovereign structuring.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors"
              >
                Services
              </Link>
              <Link
                to="/success-stories"
                className="text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors"
              >
                Success Stories
              </Link>
              <Link
                to="/faq"
                className="text-[#C49A6C] hover:text-[#B8955A] font-medium font-montserrat transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
