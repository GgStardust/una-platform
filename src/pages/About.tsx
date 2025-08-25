import { Users, BookOpen, Lightbulb, Heart, Target, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-600 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About the UNA Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-navy-100 max-w-4xl mx-auto">
              Empowering mission-driven founders to align structure with purpose through sovereign, accessible legal frameworks.
            </p>
          </div>
        </div>
      </div>

      {/* Creator Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Created by Gigi Stardust</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-navy-700 leading-relaxed mb-6">
                Gigi Stardust is a systems architect, consultant, and creator of <em>Stardust to Sovereignty™</em>, 
                a multidimensional book and interactive system that integrates science, metaphysics, creativity, and community practice into a living journey of sovereignty.
              </p>
              <p className="text-lg text-navy-700 leading-relaxed">
                With decades of experience in building purpose-driven organizations, she designed this UNA platform 
                to give visionaries, educators, artists, and community builders a clear and sovereign pathway to 
                establish their own Unincorporated Nonprofit Association (UNA).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">The Mission</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-navy-700 leading-relaxed">
                The UNA platform exists to make mission-aligned structuring accessible, simple, and powerful. 
                It guides clients through intake, generates professional agreements and filings, and provides 
                a dashboard that tracks progress while signaling when outside legal or financial review may be helpful.
              </p>
              <p className="text-lg text-navy-700 leading-relaxed mt-4">
                At its core, the platform creates structures that serve creativity, purpose, and collective integrity.
              </p>
            </div>
          </div>

          {/* Mission Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <Target className="h-12 w-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mission-Aligned</h3>
              <p className="text-navy-600">
                Structures that serve your creative vision and collective purpose, not bureaucratic requirements.
              </p>
            </div>
            
            <div className="card text-center">
              <Shield className="h-12 w-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Protection</h3>
              <p className="text-navy-600">
                Professional agreements and filings that establish clear governance and protect collective interests.
              </p>
            </div>
            
            <div className="card text-center">
              <Users className="h-12 w-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collective Integrity</h3>
              <p className="text-navy-600">
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
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              How it Ties into Stardust to Sovereignty (S2S)
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-navy-700 leading-relaxed mb-6">
                This platform is both a consulting service and a lived example of sovereignty in action. 
                <em>Stardust to Sovereignty™</em> is a multidimensional book and interactive system that integrates science, metaphysics, creativity, and community practice into a living journey of sovereignty.
              </p>
              <p className="text-lg text-navy-700 leading-relaxed">
                It extends beyond the page into physical portals: an art studio, meditation and event spaces, and a creative property that blends living, teaching, and collaboration. Structured as a UNA, it embodies decentralization, parallel economies, and coherence, showing how vision-driven projects can hold both creative expression and community impact in one sovereign container.
              </p>
            </div>
          </div>

          {/* S2S Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <BookOpen className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-semibold text-navy-800 mb-2">Book</h4>
              <p className="text-sm text-navy-600">Multidimensional exploration of sovereignty and consciousness</p>
            </div>
            
            <div className="text-center">
              <Lightbulb className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-semibold text-navy-800 mb-2">Digital Portal</h4>
              <p className="text-sm text-navy-600">Interactive systems and tools for transformation</p>
            </div>
            
            <div className="text-center">
              <Heart className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-semibold text-navy-800 mb-2">Physical Spaces</h4>
              <p className="text-sm text-navy-600">Art studios, meditation spaces, and gathering environments</p>
            </div>
            
            <div className="text-center">
              <Users className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-semibold text-navy-800 mb-2">Field Gatherings</h4>
              <p className="text-sm text-navy-600">Community events and embodied creative projects</p>
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
            <div className="card text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-gold-500 to-emerald-500 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gigi Stardust</h3>
              <p className="text-gold-600 font-medium mb-2">Founder & Systems Architect</p>
              <p className="text-navy-600 mb-4">
                Creator of Stardust to Sovereignty™ and architect of purpose-driven organizational structures.
              </p>
              <div className="text-sm text-navy-500">
                <p>Systems Architecture</p>
                <p>Organizational Design</p>
                <p>Consciousness Studies</p>
              </div>
            </div>

            {/* Stardust to Sovereignty */}
            <div className="card text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-gold-500 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stardust to Sovereignty™</h3>
              <p className="text-emerald-600 font-medium mb-2">Philosophical Foundation</p>
              <p className="text-navy-600 mb-4">
                Sovereign design system expressed through writing, art, and community portals.
              </p>
              <div className="text-sm text-navy-500">
                <p>Metaphysics & Neuroscience</p>
                <p>Cosmology & Creative Practice</p>
                <p>Interspecies Intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-navy-600 to-navy-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Begin Your Sovereign Journey?
          </h2>
          <p className="text-xl text-cream-100 mb-8">
            Join the growing community of mission-driven founders who have found their legal foundation through the UNA platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/intake"
              className="bg-white text-navy-600 hover:bg-cream-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Start Your UNA Formation
            </Link>
            <Link
              to="/success"
              className="border-2 border-white text-white hover:bg-white hover:text-navy-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              See Success Stories
            </Link>
            <button
              onClick={() => {
                window.open(
                  'mailto:gigi@gigistardust.com?subject=UNA Platform Questions&body=Hi Gigi,%0D%0A%0D%0AI have questions about the UNA platform and would like to learn more.%0D%0A%0D%0APlease let me know when you might be available for a conversation.%0D%0A%0D%0AThank you!',
                  '_blank'
                );
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-navy-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Contact Gigi
            </button>
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
