// @ts-nocheck
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowRight, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { getRouteParams } from '../lib/routes';
import { GlassCard, GradientHeader, PremiumButton, SectionContainer } from '@/components/ui';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    referralType: '',
    service: ''
  });

  // Parse URL parameters to pre-fill form
  useEffect(() => {
    const params = getRouteParams(searchParams);
    
    if (params.subject) {
      setFormData(prev => ({
        ...prev,
        subject: params.subject || '',
        referralType: params.type || ''
      }));
    }
    
    if (params.package) {
      setFormData(prev => ({
        ...prev,
        service: params.package || ''
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, just log the form data
    // In production, this would send to your backend/email service
    console.log('Contact form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      referralType: '',
      service: ''
    });
  };

  const getSubjectPlaceholder = () => {
    if (formData.subject === 'Referral') {
      if (formData.referralType === 'cpa') {
        return 'I need a referral to a CPA who understands UNA formation...';
      } else if (formData.referralType === 'attorney') {
        return 'I need a referral to an attorney who specializes in UNA formation...';
      }
      return 'I need a referral for UNA formation support...';
    }
    return 'Tell us about your inquiry...';
  };

  return (
    <>
      <SEOHead
        title="Contact Us - UNA Formation Support"
        description="Get in touch for UNA formation guidance, referrals, or general questions. We're here to help you succeed."
        keywords={['contact', 'UNA formation support', 'referrals', 'guidance']
        }
        ogType="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <GradientHeader
          title="Contact Us"
          subtitle="Have questions about UNA formation? Need a referral? Want to discuss ongoing support? We're here to help you succeed."
        />

        <SectionContainer padding="lg" background="transparent">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <GlassCard className="text-center">
              <div className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2 font-montserrat">Email</h3>
              <p className="text-white/90 text-sm font-lora">gigi@gigistardust.com</p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="bg-gradient-to-r from-[#2F7E7E] to-[#7A4CA0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2 font-montserrat">Contact Form</h3>
              <p className="text-white/90 text-sm font-lora">Fill out the form below</p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="bg-gradient-to-r from-[#7A4CA0] to-[#C49A6C] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2 font-montserrat">Schedule Call</h3>
              <p className="text-white/90 text-sm font-lora">Book a consultation</p>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <GlassCard variant="solid" padding="lg">
              <h2 className="text-2xl font-semibold text-[#1C1F3B] mb-6 font-montserrat">
                {formData.subject === 'Referral' ? 'Request a Referral' : 'Send Us a Message'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1C1F3B] mb-2 font-montserrat">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-2 border-[#1C1F3B]/20 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1C1F3B] mb-2 font-montserrat">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-2 border-[#1C1F3B]/20 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#1C1F3B] mb-2 font-montserrat">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border-2 border-[#1C1F3B]/20 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                    placeholder="What can we help you with?"
                  />
                </div>

                {formData.subject === 'Referral' && (
                  <div>
                    <label htmlFor="referralType" className="block text-sm font-medium text-[#1C1F3B] mb-2 font-montserrat">
                      Referral Type
                    </label>
                    <select
                      id="referralType"
                      name="referralType"
                      value={formData.referralType}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-[#1C1F3B]/20 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                    >
                      <option value="">Select referral type</option>
                      <option value="cpa">CPA / Accountant</option>
                      <option value="attorney">Attorney / Legal</option>
                      <option value="banking">Banking / Financial</option>
                      <option value="other">Other Professional</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1C1F3B] mb-2 font-montserrat">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border-2 border-[#1C1F3B]/20 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all resize-none"
                    placeholder={getSubjectPlaceholder()}
                  />
                </div>

                <div className="text-center">
                  <PremiumButton type="submit" variant="primary">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </PremiumButton>
                  <p className="text-sm text-[#1C1F3B]/70 mt-3 font-lora">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </div>
              </form>
            </GlassCard>
          </div>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-white/90 mb-4 font-lora text-lg">
              Prefer to schedule a consultation instead?
            </p>
            <PremiumButton
              as="a"
              href="/services"
              variant="secondary"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </PremiumButton>
          </div>
        </SectionContainer>
      </div>
    </>
  );
}
