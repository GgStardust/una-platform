import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Symbol from '../components/Symbol';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#F4F1E8]">
      {/* Header */}
      <div className="una-gradient-hero shadow-lg border-b border-[#C49A6C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
              UNA Formation Guidance
            </h1>
            <p className="text-xl text-[#2A2A28] max-w-3xl mx-auto font-lora">
              Start with free exploration and get personalized guidance through our strategy sessions. 
              Our expert guidance model focuses on clarity and understanding before commitment.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Free Guidance */}
        <div className="mb-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
              Start with Free Exploration
            </h2>
            <p className="text-[#2A2A28] mb-8 text-lg font-lora">
              Explore your UNA formation options with our guided assessment - no cost, no commitment
            </p>
            <Link
              to="/explore"
              className="btn-grad btn-primary px-8 py-3 text-lg inline-flex items-center"
            >
              Explore Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Main Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1C1F3B] text-center mb-12 font-montserrat">
            Choose Your Path
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Initial Consultation */}
            <div className="relative una-card rounded-2xl shadow-lg border-2 border-[#C49A6C]/30 hover:border-[#C49A6C]/50 transition-all duration-200">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Symbol name="orb" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1C1F3B] mb-2 font-montserrat">Initial Consultation</h3>
                  <p className="text-[#2A2A28] mb-6 font-lora">A focused session to review your goals and determine if a UNA is right for you</p>
                  <div className="text-4xl font-bold text-[#C49A6C] mb-2">$250</div>
                  <p className="text-[#2A2A28] text-sm">1 hour session</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Mission and vision clarity</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Strategic roadmap and next steps</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Personalized guidance</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Clear next steps</span>
                  </div>
                </div>
                
                <Link
                  to="/consultation?service=consultation"
                  className="w-full btn-grad btn-primary py-3 px-6 rounded-lg font-semibold text-center flex items-center justify-center"
                >
                  Schedule Consultation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Document Creation Package */}
            <div className="relative una-card rounded-2xl shadow-lg border-2 border-[#2F7E7E]/30 hover:border-[#2F7E7E]/50 transition-all duration-200">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Symbol name="triangle" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1C1F3B] mb-2 font-montserrat">Document Creation & Guidance</h3>
                  <p className="text-[#2A2A28] mb-6 font-lora">Complete UNA formation documents with step-by-step guidance</p>
                  <div className="text-4xl font-bold text-[#C49A6C] mb-2">$750</div>
                  <p className="text-[#2A2A28] text-sm">Complete package</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Complete UNA formation documents</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Step-by-step guidance materials</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Personalized attention to detail</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#C49A6C] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-[#2A2A28]">Clear instructions for your situation</span>
                  </div>
                </div>
                
                <Link
                  to="/consultation?service=document-creation"
                  className="w-full btn-grad btn-primary py-3 px-6 rounded-lg font-semibold text-center flex items-center justify-center"
                >
                  Get Document Package
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bundle Offer */}
          <div className="mt-12 bg-gradient-to-r from-[#C49A6C]/20 to-[#2F7E7E]/20 rounded-lg p-8 border border-[#C49A6C]/30 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1C1F3B] mb-4 font-montserrat">Bundle & Save</h3>
              <p className="text-[#2A2A28] mb-4 text-lg font-lora">
                Book both services together and save $100
              </p>
              <div className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
                Consultation + Documents Package: <span className="text-[#C49A6C]">$900</span>
              </div>
              <Link to="/consultation?service=bundle" className="btn-grad btn-primary px-8 py-3 text-lg">
                Get Bundle Package
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ongoing Support */}
        <div className="mt-12 bg-gradient-to-r from-[#2F7E7E]/20 to-[#7A4CA0]/20 rounded-lg p-8 border border-[#2F7E7E]/30 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#1C1F3B] mb-4 font-montserrat">Ongoing Support</h3>
            <p className="text-[#2A2A28] mb-4 text-lg font-lora">
              For clients who want continuing support beyond the initial setup
            </p>
            <div className="text-3xl font-bold text-[#1C1F3B] mb-6 font-montserrat">
              Ongoing Consultancy: <span className="text-[#C49A6C]">TBD</span>
            </div>
            <p className="text-[#2A2A28] mb-6 text-base font-lora">
              Regular check-ins, compliance reviews, strategic guidance, and responsive advisory support as your UNA grows. 
              Pricing determined based on level of support and access required.
            </p>
            <Link to="/consultation?service=ongoing-support" className="btn-grad btn-primary px-8 py-3 text-lg">
              Discuss Ongoing Support
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>

        {/* Why Choose Our Guidance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1C1F3B] text-center mb-12 font-montserrat">
            Why Choose Our Guidance?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Symbol name="orb" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">Personalized Approach</h3>
              <p className="text-[#2A2A28] font-lora">
                Every UNA is unique. We tailor our guidance to your specific mission, goals, and situation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Symbol name="stack" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">Complete Documentation</h3>
              <p className="text-[#2A2A28] font-lora">
                Get all the documents you need, prepared with attention to detail and your specific requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Symbol name="constellation" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1F3B] mb-3 font-montserrat">Ongoing Support</h3>
              <p className="text-[#2A2A28] font-lora">
                We're here to support you throughout your UNA formation journey and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#1C1F3B] text-center mb-12 font-montserrat">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="una-card p-6">
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">What if I need more than one session?</h3>
              <p className="text-[#2A2A28] font-lora">Many clients find that one session provides the clarity they need to move forward. If you need additional support, we can discuss ongoing consultation packages.</p>
            </div>
            
            <div className="una-card p-6">
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Do you provide ongoing support after the session?</h3>
              <p className="text-[#2A2A28] font-lora">Yes! We offer follow-up support and can provide continuing guidance as your UNA grows and evolves.</p>
            </div>
            
            <div className="una-card p-6">
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">What documents do you prepare?</h3>
              <p className="text-[#2A2A28] font-lora">We prepare all the essential UNA formation documents including agreements, governance structures, and compliance materials. Everything is personalized to your specific mission and needs.</p>
            </div>
            
            <div className="una-card p-6">
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Can you help with the actual formation process?</h3>
              <p className="text-[#2A2A28] font-lora">Absolutely! Our Document Creation & Guidance Package includes complete preparation of your UNA formation documents, plus step-by-step guidance materials tailored to your specific situation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
