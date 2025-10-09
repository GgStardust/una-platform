import { Users, BookOpen, Lightbulb, Heart, Target, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, GradientHeader, SectionContainer, ResponsiveText } from '@/components/ui';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Hero Section */}
      <GradientHeader
        title="About the UNA Platform"
        subtitle="Sovereign architecture for founders and creators, aligning structure, coherence, and lawful design."
      />

      {/* Creator Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            Created by Gigi Stardust
          </ResponsiveText>
          <GlassCard variant="solid" padding="lg">
            <ResponsiveText variant="bodyLarge" font="lora" className="text-[#1C1F3B]/90 leading-relaxed mb-6 block">
              Gigi Stardust is a systems architect, consultant, and creator of <em>Stardust to Sovereignty™</em>, a multidimensional Codex and living framework integrating science, consciousness, and creative design into coherent structures for evolution and collaboration.
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-[#1C1F3B]/90 leading-relaxed block">
              The UNA platform translates this system into practice, offering founders, educators, and community builders a clear path to form lawful Unincorporated Associations that embody integrity, resonance, and sovereignty in their organizational DNA.
            </ResponsiveText>
          </GlassCard>
        </div>

        {/* Founder Mission Callout */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-center">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
              Structure as Sovereign Design
            </ResponsiveText>
            <div className="max-w-3xl mx-auto space-y-4">
              <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed block">
                "The UNA platform is built on the principle that structure serves consciousness. By designing lawful containers that amplify coherence, creativity, and shared purpose, we create new systems that honor your vision."
              </ResponsiveText>
              <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed block">
                "Every UNA formed through this framework becomes a living node in a greater field of sovereign design, where law and consciousness move in rhythm, and governance becomes an act of creation."
              </ResponsiveText>
              <div className="mt-6">
                <span className="inline-block bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-3 rounded-lg font-bold font-montserrat">
                  Gigi Stardust, Founder
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Mission Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="text-center mb-12">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            The Mission
          </ResponsiveText>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed block">
              The UNA platform makes sovereignty operational. It simplifies formation, agreement generation, and governance, translating complex legal processes into accessible, elegant, and lawful design.
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed mt-4 block">
              Each structure created through this system reflects harmonic architecture, form aligned with resonance, purpose, and field coherence.
            </ResponsiveText>
          </div>
        </div>

        {/* Mission Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard className="text-center">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Mission-Aligned
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/90 block">
              Structures that amplify your signal and purpose, where governance aligns with creative intention.
            </ResponsiveText>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Legal Protection
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/90 block">
              Clear, lawful agreements that uphold collective integrity while preserving autonomy.
            </ResponsiveText>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Collective Integrity
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/90 block">
              Frameworks that strengthen collaboration, transparency, and coherence across all members.
            </ResponsiveText>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* S2S Integration Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="text-center mb-12">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            Rooted in Stardust to Sovereignty (S2S)
          </ResponsiveText>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed mb-6 block">
              The UNA platform arises directly from <em>Stardust to Sovereignty™</em>, a multidimensional resonance-based architecture that activates memory, restores coherence, and provides functional architecture for sovereign design. It bridges encoded memory, sovereign consciousness, and emergent human signal through a living system of 13 fundamental Orbs that govern consciousness, embodiment, and creation.
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed block">
              It extends beyond concept into embodiment, through art studios, gatherings, and consulting practice, modeling how coherence, creativity, and lawful structure unite as one living system.
            </ResponsiveText>
          </div>
        </div>

        {/* S2S Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Books
            </ResponsiveText>
            <ResponsiveText variant="caption" font="lora" className="text-white/90 block">
              Written works exploring the 13-Orb system and living fiction field reports from consciousness systems.
            </ResponsiveText>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Living Dashboard
            </ResponsiveText>
            <ResponsiveText variant="caption" font="lora" className="text-white/90 block">
              Digital interface that receives user input and returns field-aligned scrolls, essays, and tools.
            </ResponsiveText>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Field Tools
            </ResponsiveText>
            <ResponsiveText variant="caption" font="lora" className="text-white/90 block">
              Functional offerings including glyphs, calibration maps, and movement-based rituals.
            </ResponsiveText>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Scrollstream Archive
            </ResponsiveText>
            <ResponsiveText variant="caption" font="lora" className="text-white/90 block">
              Library of poetic, precise transmissions mapped to specific consciousness domains.
            </ResponsiveText>
          </div>
        </div>
      </SectionContainer>

      {/* Why It Matters Section */}
      <SectionContainer padding="lg" background="transparent">
        <div className="max-w-4xl mx-auto text-center">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            Why It Matters
          </ResponsiveText>
          <GlassCard>
            <div className="text-left">
              <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed mb-6 block">
                An Unincorporated Association is a lawful, flexible structure that provides banking access and collective recognition without corporate dependency.
              </ResponsiveText>
              <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed block">
                It restores agency to creators and communities, making lawful formation accessible, ethical, and aligned with natural order.
              </ResponsiveText>
              <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 leading-relaxed block">
                Sovereignty becomes the foundation of organization, not an afterthought.
              </ResponsiveText>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Essence Statement */}
      <SectionContainer padding="lg" background="transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#2F7E7E] via-[#7A4CA0] to-[#C49A6C] rounded-2xl p-12 text-center">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
              Essence Statement
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white leading-relaxed block">
              The UNA platform bridges the metaphysical and the material. Rooted in <em>Stardust to Sovereignty™</em>, it embodies a living blueprint for structural coherence, where energy, purpose, and law operate as one.
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white leading-relaxed block">
              Every association built through this system is an act of sovereign creation.
            </ResponsiveText>
          </div>
        </div>
      </SectionContainer>

      {/* Team Grid */}
      <SectionContainer padding="lg" background="transparent">
        <div className="text-center mb-12">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            Our Team
          </ResponsiveText>
          <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 max-w-2xl mx-auto block">
            Meet the visionary behind the UNA platform and the principles that guide our work.
          </ResponsiveText>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Gigi Stardust */}
          <GlassCard className="text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] mx-auto mb-4 flex items-center justify-center">
              <Users className="h-12 w-12 text-white" />
            </div>
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Gigi Stardust
            </ResponsiveText>
            <ResponsiveText variant="body" weight="medium" font="montserrat" className="text-white/70 mb-2 block">
              Founder & Systems Architect
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/90 mb-4 block">
              Creator of Stardust to Sovereignty™ and architect of sovereign frameworks integrating consciousness, design, and lawful formation.
            </ResponsiveText>
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
            <ResponsiveText variant="h4" weight="semibold" font="montserrat" className="text-white mb-2">
              Stardust to Sovereignty™
            </ResponsiveText>
            <ResponsiveText variant="body" weight="medium" font="montserrat" className="text-white/70 mb-2 block">
              Philosophical Foundation
            </ResponsiveText>
            <ResponsiveText variant="body" font="lora" className="text-white/90 mb-4 block">
              The Codex that informs all UNA design, where sovereignty is coherence, and structure becomes art in motion.
            </ResponsiveText>
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
            <ResponsiveText variant="body" font="lora" className="text-white/90 mb-4 block">
              Explore how the UNA platform translates the Stardust to Sovereignty™ system into practical, lawful coherence.
            </ResponsiveText>
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
