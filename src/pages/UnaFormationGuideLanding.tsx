import React, { useState } from 'react';
import { ExternalLink, Download } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { saveLead } from '../lib/supabase/leads';

const UnaFormationGuideLanding: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await saveLead({
        name: formData.name,
        email: formData.email,
        source: 'explore'
      });

      if (result.success) {
        // Redirect to PDF download
        window.location.href = '/files/una-formation-guide.pdf';
      } else {
        setError(result.error || 'Failed to save your information. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEOHead
        title="UNA Formation Guide - Free Download | UNA Platform"
        description="Download your free UNA Formation Guide — a step-by-step resource to start your UNA confidently. Get comprehensive guidance for Unincorporated Nonprofit Association formation."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#3DB5B0] to-[#2C2C2C]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white font-montserrat mb-6">
                UNA Formation Guide
              </h1>
              <p className="text-2xl text-white/90 font-lora mb-8">
                Download your free UNA Formation Guide — a step-by-step resource to start your UNA confidently.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white font-montserrat mb-6">
                  Get Your Free Guide
                </h2>
                <p className="text-white/90 font-lora mb-6">
                  Enter your details below to instantly download our comprehensive UNA Formation Guide.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium font-montserrat mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent font-lora"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium font-montserrat mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent font-lora"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                      <p className="text-red-200 font-lora text-sm">{error}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] text-white px-8 py-4 rounded-xl font-bold font-montserrat shadow-lg hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download Free Guide
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column - Guide Preview */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-xl font-bold text-white font-montserrat mb-4">
                    What's Inside the Guide
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/90 font-lora">
                      <span className="text-[#C49A6C] font-bold">✓</span>
                      <span>7 essential steps to UNA formation</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 font-lora">
                      <span className="text-[#C49A6C] font-bold">✓</span>
                      <span>State-specific requirements and filing instructions</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 font-lora">
                      <span className="text-[#C49A6C] font-bold">✓</span>
                      <span>Sample UNA agreements and bylaws</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 font-lora">
                      <span className="text-[#C49A6C] font-bold">✓</span>
                      <span>EIN application guidance</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 font-lora">
                      <span className="text-[#C49A6C] font-bold">✓</span>
                      <span>Banking and financial management tips</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 font-lora">
                      <span className="text-[#C49A6C] font-bold">✓</span>
                      <span>Recordkeeping best practices</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#2F7E7E]/20 to-[#7A4CA0]/20 rounded-xl p-6 border border-[#2F7E7E]/30">
                  <h4 className="text-lg font-semibold text-white font-montserrat mb-3">
                    Need More Help?
                  </h4>
                  <p className="text-white/90 font-lora mb-4">
                    Our Strategy Sessions provide personalized guidance for your specific UNA formation needs.
                  </p>
                  <a
                    href="/consultation"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] text-white px-6 py-3 rounded-lg font-bold font-montserrat hover:shadow-lg transition-all duration-200"
                  >
                    Book Strategy Session
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12 pt-8 border-t border-white/20">
              <p className="text-white/70 font-lora">
                Prepared by UNA Guide | <a href="https://unaguide.com" className="text-[#C49A6C] hover:text-[#B8955A] transition-colors">unaguide.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnaFormationGuideLanding;
