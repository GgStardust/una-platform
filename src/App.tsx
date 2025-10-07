import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Menu, X } from 'lucide-react';
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
const Confirmation = lazy(() => import('./pages/Confirmation'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const StatePage = lazy(() => import('./pages/StatePage'));
const Toolkit = lazy(() => import('./pages/Toolkit'));
const Contact = lazy(() => import('./pages/Contact'));
const Schedule = lazy(() => import('./pages/Schedule'));
const AffiliateHub = lazy(() => import('./pages/AffiliateHub'));
const UnaFormationGuide = lazy(() => import('./pages/UnaFormationGuide'));
const UnaFormationGuideLanding = lazy(() => import('./pages/UnaFormationGuideLanding'));

// Lazy load components
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const AdminAuth = lazy(() => import('./components/AdminAuth'));

function App() {
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if running with dummy credentials
  const isDummyMode = import.meta.env.VITE_SUPABASE_URL === 'http://localhost:9999';

  // Console warning for developers
  useEffect(() => {
    if (isDummyMode) {
      // UNA Platform is running with dummy credentials
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
          ⚠️ Running with dummy environment values - Not connected to real Supabase
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
                to="/toolkit"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                      : 'text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                  }`
                }
              >
                Toolkit
              </NavLink>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                      : 'text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                  }`
                }
              >
                Services
              </NavLink>

              <NavLink
                to="/success-stories"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                      : 'text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                  }`
                }
              >
                Living Examples
              </NavLink>

              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                      : 'text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                  }`
                }
              >
                Blog
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                      : 'text-[#F4F1E8] hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                  }`
                }
              >
                About
              </NavLink>


              {/* Primary CTA Button */}
              <Link
                to="/explore"
                className="ml-4 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 font-montserrat"
              >
                Start Your UNA
              </Link>

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
                  to="/toolkit"
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                        : 'text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Toolkit
                </NavLink>

                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                        : 'text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </NavLink>

                <NavLink
                  to="/success-stories"
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                        : 'text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Living Examples
                </NavLink>

                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                        : 'text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#C49A6C] bg-[#C49A6C]/20'
                        : 'text-navy-700 hover:text-[#3DB5B0] hover:bg-[#C49A6C]/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </NavLink>


                {/* Mobile CTA Button */}
                <div className="pt-2 border-t border-[#C49A6C]/20">
                  <Link
                    to="/explore"
                    className="block w-full bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white px-4 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200 font-montserrat"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Start Your UNA
                  </Link>
                </div>
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
          <Route path="/intake" element={<Intake setIntakeData={setIntakeData} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/states/:stateCode" element={<StatePage />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/affiliate-hub" element={<AffiliateHub />} />
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
      <footer className="bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold font-montserrat mb-4">UNA Platform</h3>
              <p className="text-white/80 font-lora mb-4 leading-relaxed">
                Expert guidance for Unincorporated Nonprofit Association formation. From assessment to complete formation with sovereignty-aligned expertise.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold font-montserrat mb-4">Resources</h4>
              <div className="space-y-2">
                <NavLink to="/blog" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  Blog
                </NavLink>
                <NavLink to="/success-stories" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  Living Examples
                </NavLink>
                <NavLink to="/toolkit" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  Toolkit
                </NavLink>
                <NavLink to="/faq" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  FAQ
                </NavLink>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold font-montserrat mb-4">Connect</h4>
              <div className="space-y-2">
                <NavLink to="/services" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  Services
                </NavLink>
                <NavLink to="/about" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  About
                </NavLink>
                <NavLink to="/contact" className="block text-white/70 hover:text-white transition-colors font-lora text-sm">
                  Contact
                </NavLink>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/60 font-lora mb-3 text-sm">
              © 2025 UNA Platform. All rights reserved.
            </p>
            <p className="text-white/50 text-xs font-lora italic max-w-3xl mx-auto">
              Educational information, document preparation, and administrative support services. Not legal advice or representation. Consult a licensed attorney for specific legal questions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
