import { Users, BookOpen, Lightbulb, Heart, Target, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-[#F4F1E8]">
      {/* Hero Section */}
      <div className="una-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat text-[#F4F1E8]">
              About the UNA Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#F4F1E8] max-w-4xl mx-auto font-lora">
              Empowering mission-driven founders to align structure with purpose through sovereign, accessible legal frameworks.
            </p>
          </div>
        </div>
      </div>

      {/* Creator Section */}
      <div className="py-16 bg-[#F4F1E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">Created by Gigi Stardust</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-[#2A2A28] leading-relaxed mb-6 font-lora">
                Gigi Stardust is a systems architect, consultant, and creator of <em>Stardust to Sovereignty™</em>, 
                a multidimensional book and interactive system that integrates science, metaphysics, creativity, and community practice into a living journey of sovereignty.
              </p>
              <p className="text-lg text-[#2A2A28] leading-relaxed font-lora">
                With decades of experience in building purpose-driven organizations, she designed this UNA platform 
                to give visionaries, educators, artists, and community builders a clear and sovereign pathway to 
                establish their own Unincorporated Nonprofit Association (UNA).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Mission Callout */}
      <div className="py-16 bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">A Vision for Sovereignty</h3>
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-lg text-white/90 leading-relaxed font-lora">
                  "My mission is to help visionaries, educators, artists, and community builders create organizations 
                  that truly reflect their values and purpose. Too often, we're forced to fit our dreams into 
                  structures that don't serve us or our communities."
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
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">The Mission</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-[#2A2A28] leading-relaxed font-lora">
                The UNA platform exists to make mission-aligned structuring accessible, simple, and powerful. 
                It guides clients through intake, generates professional agreements and filings, and provides 
                a dashboard that tracks progress while signaling when outside legal or financial review may be helpful.
              </p>
              <p className="text-lg text-[#2A2A28] leading-relaxed mt-4 font-lora">
                At its core, the platform creates structures that serve creativity, purpose, and collective integrity.
              </p>
            </div>
          </div>

          {/* Mission Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="una-card text-center p-6">
              <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Mission-Aligned</h3>
              <p className="text-white/90 font-lora">
                Structures that serve your creative vision and collective purpose, not bureaucratic requirements.
              </p>
            </div>
            
            <div className="una-card text-center p-6">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Legal Protection</h3>
              <p className="text-white/90 font-lora">
                Professional agreements and filings that establish clear governance and protect collective interests.
              </p>
            </div>
            
            <div className="una-card text-center p-6">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Collective Integrity</h3>
              <p className="text-white/90 font-lora">
                Frameworks that honor collaboration, sovereignty, and the unique needs of mission-driven groups.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* S2S Integration Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
              How it Ties into Stardust to Sovereignty (S2S)
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-[#2A2A28] leading-relaxed mb-6 font-lora">
                This platform is both a consulting service and a lived example of sovereignty in action. 
                <em>Stardust to Sovereignty™</em> is a multidimensional book and interactive system that integrates science, metaphysics, creativity, and community practice into a living journey of sovereignty.
              </p>
              <p className="text-lg text-[#2A2A28] leading-relaxed font-lora">
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
              <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Book</h4>
              <p className="text-sm text-[#2A2A28] font-lora">Multidimensional exploration of sovereignty and consciousness</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Digital Portal</h4>
              <p className="text-sm text-[#2A2A28] font-lora">Interactive systems and tools for transformation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Physical Spaces</h4>
              <p className="text-sm text-[#2A2A28] font-lora">Art studios, meditation spaces, and gathering environments</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Field Gatherings</h4>
              <p className="text-sm text-[#2A2A28] font-lora">Community events and embodied creative projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="py-16 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">Why It Matters</h2>
          <div className="text-left">
            <p className="text-lg text-navy-700 leading-relaxed mb-6">
              UNAs are flexible, cost-effective, and underutilized legal structures. They provide legal standing 
              and banking access without the weight of incorporation or IRS oversight. For creatives, healers, 
              educators, and organizers, they create a foundation that honors sovereignty and collaboration.
            </p>
            <p className="text-lg text-navy-700 leading-relaxed">
              This platform gives you the tools and guidance to step into that foundation with clarity and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Essence Statement */}
      <div className="py-16 bg-navy-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Essence Statement</h2>
          <p className="text-lg text-cream-100 leading-relaxed">
            Created by Gigi Stardust, the UNA platform empowers mission-driven founders to align structure with purpose. 
            It is rooted in the sovereignty-first framework of <em>Stardust to Sovereignty™</em>, a sovereign design system expressed through writing, art, and community portals: a multidimensional map of creativity, consciousness, and coherence held in its own UNA.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Team</h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              Meet the visionary behind the UNA platform and the principles that guide our work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Gigi Stardust */}
            <div className="una-card text-center p-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Gigi Stardust</h3>
              <p className="text-[#C49A6C] font-medium mb-2">Founder & Systems Architect</p>
              <p className="text-white/90 mb-4 font-lora">
                Creator of Stardust to Sovereignty™ and architect of purpose-driven organizational structures.
              </p>
              <div className="text-sm text-white/90">
                <p>Systems Architecture</p>
                <p>Organizational Design</p>
                <p>Consciousness Studies</p>
              </div>
            </div>

            {/* Stardust to Sovereignty */}
            <div className="una-card text-center p-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white font-montserrat">Stardust to Sovereignty™</h3>
              <p className="text-[#C49A6C] font-medium mb-2">Philosophical Foundation</p>
              <p className="text-white/90 mb-4 font-lora">
                Sovereign design system expressed through writing, art, and community portals.
              </p>
              <div className="text-sm text-white/90">
                <p>Metaphysics & Neuroscience</p>
                <p>Cosmology & Creative Practice</p>
                <p>Interspecies Intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer Navigation */}
      <div className="bg-white border-t border-navy-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-navy-600 mb-4">
              Explore more about the UNA platform and our approach to sovereign structuring.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="text-gold-600 hover:text-gold-800 font-medium"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gold-600 hover:text-gold-800 font-medium"
              >
                Services
              </Link>
              <Link
                to="/success"
                className="text-gold-600 hover:text-gold-800 font-medium"
              >
                Success Stories
              </Link>
              <Link
                to="/faq"
                className="text-gold-600 hover:text-gold-800 font-medium"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
