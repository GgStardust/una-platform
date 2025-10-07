import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { IntakeData } from '@/lib/types';
import { googleAnalyticsService } from '@/lib/analytics';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all page components for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const FAQ = lazy(() => import('./pages/FAQ'));
const About = lazy(() => import('./pages/About'));
const Explore = lazy(() => import('./pages/Explore'));
const Success = lazy(() => import('./pages/Success'));
const Intake = lazy(() => import('./pages/Intake'));
const IntakeWithSupabase = lazy(() => import('./pages/IntakeWithSupabase'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const StatePage = lazy(() => import('./pages/StatePage'));
const Toolkit = lazy(() => import('./pages/Toolkit'));
const Contact = lazy(() => import('./pages/Contact'));
const Schedule = lazy(() => import('./pages/Schedule'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const UnaFormationGuide = lazy(() => import('./pages/UnaFormationGuide'));
const UnaFormationGuideLanding = lazy(() => import('./pages/UnaFormationGuideLanding'));

// Lazy load components
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const AdminAuth = lazy(() => import('./components/AdminAuth'));
const FormationGuard = lazy(() => import('./components/FormationGuard'));

function App() {
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if running with dummy credentials
  const isDummyMode = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'dummy-publishable-key' || 
                     import.meta.env.VITE_SUPABASE_URL === 'http://localhost:9999';

  // Console warning for developers
  useEffect(() => {
    if (isDummyMode) {
      // UNA Platform is running with dummy credentials
      // - Stripe: Using dummy publishable key
      // - Supabase: Using dummy URL (localhost:9999)
      // - Replace .env values with real credentials for production
    }
  }, [isDummyMode]);

  // Load intake data from localStorage on app start
  useEffect(() => {
    const savedIntakeData = localStorage.getItem('intake');
    if (savedIntakeData) {
      try {
        const parsedData = JSON.parse(savedIntakeData);
        setIntakeData(parsedData);
      } catch (error) {
        // Error parsing saved intake data
      }
    }
  }, []);

  // Update localStorage when intakeData changes
  useEffect(() => {
    if (intakeData) {
      localStorage.setItem('intake', JSON.stringify(intakeData));
    }
  }, [intakeData]);

  // Track page views with Google Analytics
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentTitle = document.title;
    
    // Track page view
    googleAnalyticsService.trackPageView(currentPath, currentTitle);
    
    // Track specific page events
    if (currentPath === '/explore') {
      googleAnalyticsService.trackEvent('page_view', { page: 'explore', title: 'Explore Your Path' });
    } else if (currentPath === '/services') {
      googleAnalyticsService.trackEvent('page_view', { page: 'consultation', title: 'Strategy Session' });
    } else if (currentPath === '/resources') {
      googleAnalyticsService.trackEvent('page_view', { page: 'resources', title: 'Resources' });
    } else if (currentPath.startsWith('/blog')) {
      googleAnalyticsService.trackEvent('page_view', { page: 'blog', title: currentTitle });
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Dummy Credentials Warning Banner */}
      {isDummyMode && (
        <div className="bg-yellow-500 text-black text-center py-2 px-4 font-semibold">
          ⚠️ Running with dummy environment values - Not connected to real Stripe/Supabase
        </div>
      )}
      
      {/* Navigation */}
      <nav className="una-gradient-nav shadow-lg border-b border-[#C49A6C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink 
                to="/" 
                className="text-xl font-bold text-[#F4F1E8] hover:text-[#3DB5B0] transition-colors font-montserrat"
              >
                UNA Platform
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-[#C49A6C] bg-[#C49A6C]/20 border-b-2 border-[#C49A6C]' 
                      : 'text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                  }`
                }
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/explore" 
                className="px-3 py-2 rounded-md text-sm font-medium text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
              >
                Start
              </NavLink>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors">
                  Services
                  <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-navy-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <NavLink 
                    to="/toolkit" 
                    className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-t-md"
                  >
                    UNA Formation Toolkit
                  </NavLink>
                  <NavLink 
                    to="/services" 
                    className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-b-md"
                  >
                    Consulting Services
                  </NavLink>
                </div>
              </div>
              
              {/* Learn Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors">
                  Learn
                  <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-navy-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <NavLink 
                    to="/blog" 
                    className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-t-md"
                  >
                    Blog
                  </NavLink>
                  <NavLink 
                    to="/faq" 
                    className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                  >
                    FAQ
                  </NavLink>
                  <NavLink
                    to="/success-stories"
                    className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                  >
                    Success Stories
                  </NavLink>
                  <NavLink 
                    to="/about" 
                    className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-b-md"
                  >
                    About
                  </NavLink>
                </div>
              </div>
              
              <NavLink 
                to="/admin" 
                className="px-3 py-2 rounded-md text-sm font-medium text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
              >
                Admin
              </NavLink>
              
              {/* Desktop Help Button */}
              <button
                onClick={() => {
                  window.open(
                    'mailto:gigi@gigistardust.com?subject=UNA Formation Help&body=Hi Gigi,%0D%0A%0D%0AI need help with UNA formation.%0D%0A%0D%0APlease let me know when you might be available for a conversation.%0D%0A%0D%0AThank you!',
                    '_blank'
                  );
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#C49A6C] to-[#A67C4A] text-white text-sm font-medium rounded-md hover:from-[#A67C4A] hover:to-[#8B6B3A] transition-all duration-200 ml-4 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Get Help
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg border border-[#C49A6C]/20">
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive 
                        ? 'text-[#C49A6C] bg-[#C49A6C]/20' 
                        : 'text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                
                <NavLink 
                  to="/explore" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start
                </NavLink>
                
                <NavLink 
                  to="/toolkit" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  UNA Formation Toolkit
                </NavLink>
                
                <NavLink 
                  to="/services" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Consulting Services
                </NavLink>
                
                <NavLink 
                  to="/blog" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </NavLink>
                
                <NavLink 
                  to="/faq" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </NavLink>
                
                <NavLink
                  to="/success-stories"
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Success Stories
                </NavLink>
                
                <NavLink 
                  to="/about" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </NavLink>
                
                <NavLink 
                  to="/admin" 
                  className="block px-3 py-3 rounded-md text-base font-medium text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </NavLink>
                
                {/* Mobile Help Button */}
                <button
                  onClick={() => {
                    window.open(
                      'mailto:gigi@gigistardust.com?subject=UNA Formation Help&body=Hi Gigi,%0D%0A%0D%0AI need help with UNA formation.%0D%0A%0D%0APlease let me know when you might be available for a conversation.%0D%0A%0D%0AThank you!',
                      '_blank'
                    );
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#C49A6C] to-[#A67C4A] text-white text-base font-medium rounded-md hover:from-[#A67C4A] hover:to-[#8B6B3A] transition-all duration-200 shadow-md"
                >
                  Get Help
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/success-stories" element={<Success />} />
          <Route path="/intake" element={
            <FormationGuard feature="formation">
              <Intake setIntakeData={setIntakeData} />
            </FormationGuard>
          } />
          <Route path="/intake-form" element={
            <IntakeWithSupabase setIntakeData={setIntakeData} />
          } />
          <Route path="/dashboard" element={
            <FormationGuard feature="formation">
              <Dashboard intakeData={intakeData} />
            </FormationGuard>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={
            <FormationGuard feature="formation">
              <Checkout />
            </FormationGuard>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/states/:stateCode" element={<StatePage />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/una-formation-guide" element={<UnaFormationGuideLanding />} />
            <Route path="/una-formation-guide-full" element={<UnaFormationGuide />} />
          <Route path="/admin" element={
            <AdminAuth>
              <AdminDashboard />
            </AdminAuth>
          } />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-h2 font-bold font-montserrat mb-4">UNA Platform</h3>
              <p className="text-white/90 font-lora mb-4">
                Professional guidance for Unincorporated Nonprofit Association formation with sovereignty-aligned expertise.
              </p>
            </div>
            <div>
              <h4 className="text-body-lg font-semibold font-montserrat mb-4">Quick Links</h4>
              <div className="space-y-2">
                <NavLink to="/explore" className="block text-white/90 hover:text-[#3DB5B0] transition-colors font-lora">
                  Explore Your Path
                </NavLink>
                <NavLink to="/toolkit" className="block text-white/90 hover:text-[#3DB5B0] transition-colors font-lora">
                  UNA Formation Toolkit
                </NavLink>
                <NavLink to="/services" className="block text-white/90 hover:text-[#3DB5B0] transition-colors font-lora">
                  Strategy Sessions
                </NavLink>
                <NavLink to="/blog" className="block text-white/90 hover:text-[#3DB5B0] transition-colors font-lora">
                  Blog & Resources
                </NavLink>
              </div>
            </div>
            <div>
              <h4 className="text-body-lg font-semibold font-montserrat mb-4">Get Help</h4>
              <p className="text-white/90 font-lora mb-4">
                Need personalized guidance for your UNA formation?
              </p>
              <Link
                to="/contact"
                className="btn-grad btn-primary px-6 py-3 text-sm font-montserrat"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Unified CTA Section */}
          <div className="border-t border-white/20 pt-8 mb-8">
            <div className="text-center">
              <h3 className="text-h2 font-semibold font-montserrat mb-4">Ready for Professional UNA Formation?</h3>
              <p className="text-white/90 font-lora mb-6 max-w-2xl mx-auto">
                Get expert guidance and comprehensive support for your California UNA formation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/explore" className="btn-grad btn-secondary px-8 py-3 font-bold">
                  Take Free Assessment
                </Link>
                <Link to="/services" className="btn-grad btn-primary px-8 py-3 font-bold">
                  View Formation Packages
                </Link>
              </div>
            </div>
          </div>
          
          {/* Copyright & Disclaimer */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/70 font-lora mb-3">
              © 2024 UNA Platform. All rights reserved. | Prepared by UNA Guide | unaguide.com
            </p>
            <p className="text-white/60 text-sm font-lora italic max-w-3xl mx-auto">
              We provide educational information, document preparation, and administrative support services.
              This is not legal advice or representation. For specific legal questions, consult a licensed attorney in your state.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
