import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowRight, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { getRouteParams } from '../lib/routes';

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
      
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
              Contact Us
            </h1>
            <p className="text-xl text-[#2A2A28] max-w-2xl mx-auto font-lora">
              Have questions about UNA formation? Need a referral? Want to discuss ongoing support? 
              We're here to help you succeed.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Email</h3>
              <p className="text-[#2A2A28] text-sm font-lora">gigi@gigistardust.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-[#2F7E7E]" />
              </div>
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Contact Form</h3>
              <p className="text-[#2A2A28] text-sm font-lora">Fill out the form below</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">Schedule Call</h3>
              <p className="text-[#2A2A28] text-sm font-lora">Book a consultation</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-8">
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
                    className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
                    className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
                    className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                  placeholder={getSubjectPlaceholder()}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-grad btn-primary btn-lg"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
                <p className="text-sm text-[#2A2A28] mt-3 font-lora">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </form>
          </div>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-[#2A2A28] mb-4 font-lora">
              Prefer to schedule a consultation instead?
            </p>
            <a 
              href="/services"
              className="btn-grad btn-secondary"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
