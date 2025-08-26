import { Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Explore from './pages/Explore';
import Success from './pages/Success';
import Intake from './pages/Intake';
import Dashboard from './pages/Dashboard';
import Referrals from './pages/Referrals';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Checkout from './pages/Checkout';
import Consultation from './pages/Consultation';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';
import FormationGuard from './components/FormationGuard';
import { IntakeData } from '@/lib/types';
import { googleAnalyticsService } from '@/lib/analytics';
import { FLAGS } from '@/lib/flags';

function App() {
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);

  // Load intake data from localStorage on app start
  useEffect(() => {
    const savedIntakeData = localStorage.getItem('intake');
    if (savedIntakeData) {
      try {
        const parsedData = JSON.parse(savedIntakeData);
        setIntakeData(parsedData);
      } catch (error) {
        console.error('Error parsing saved intake data:', error);
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
    } else if (currentPath === '/consultation') {
      googleAnalyticsService.trackEvent('page_view', { page: 'consultation', title: 'Strategy Session' });
    } else if (currentPath === '/resources') {
      googleAnalyticsService.trackEvent('page_view', { page: 'resources', title: 'Resources' });
    } else if (currentPath.startsWith('/blog')) {
      googleAnalyticsService.trackEvent('page_view', { page: 'blog', title: currentTitle });
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-navy-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink 
                to="/" 
                className="text-xl font-bold text-navy-500 hover:text-gold-500 transition-colors"
              >
                UNA Platform
              </NavLink>
            </div>
            <div className="flex items-center space-x-6">
              {/* Main Navigation */}
              <div className="flex items-center space-x-6">
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-gold-600 bg-gold-50 border-b-2 border-gold-500' 
                        : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
                    }`
                  }
                >
                  Home
                </NavLink>
                
                {/* Learn Dropdown */}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors">
                    Learn
                    <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-navy-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <NavLink 
                      to="/about" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-t-md"
                    >
                      About
                    </NavLink>
                    <NavLink 
                      to="/resources" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    >
                      Resources
                    </NavLink>
                    <NavLink 
                      to="/faq" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    >
                      FAQ
                    </NavLink>
                    <NavLink 
                      to="/blog" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    >
                      Blog
                    </NavLink>
                    <NavLink 
                      to="/success" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-b-md"
                    >
                      Success Stories
                    </NavLink>
                  </div>
                </div>
                
                {/* Start Dropdown */}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors">
                    Start
                    <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-navy-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <NavLink 
                      to="/explore" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-t-md"
                    >
                      Explore Path
                    </NavLink>
                    {FLAGS.ENABLE_FORMATION && (
                      <NavLink 
                        to="/intake" 
                        className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-b-md"
                      >
                        Start Formation
                      </NavLink>
                    )}
                  </div>
                </div>
                
                {/* Support Dropdown */}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors">
                    Support
                    <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-navy-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <NavLink 
                      to="/services" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-t-md"
                    >
                      Services
                    </NavLink>
                    <NavLink 
                      to="/consultation" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    >
                      Strategy Session
                    </NavLink>
                    <NavLink 
                      to="/referrals" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-b-md"
                    >
                      Referrals
                    </NavLink>
                  </div>
                </div>
                
                {/* Account Dropdown */}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors">
                    Account
                    <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l7-7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-navy-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {FLAGS.ENABLE_FORMATION && (
                      <NavLink 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-t-md"
                      >
                        Dashboard
                      </NavLink>
                    )}
                    <NavLink 
                      to="/pricing" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    >
                      Pricing
                    </NavLink>
                    <NavLink 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-b-md"
                    >
                      Admin
                    </NavLink>
                  </div>
                </div>
              </div>
              
              {/* Contact/Help Button */}
              <button
                onClick={() => {
                  // Open email directly for now
                  window.open(
                    'mailto:gigi@gigistardust.com?subject=UNA Formation Help&body=Hi Gigi,%0D%0A%0D%0AI need help with UNA formation.%0D%0A%0D%0APlease let me know when you might be available for a conversation.%0D%0A%0D%0AThank you!',
                    '_blank'
                  );
                }}
                className="px-4 py-2 bg-gradient-to-r from-gold-500 to-amber-500 text-white text-sm font-medium rounded-md hover:from-gold-600 hover:to-amber-600 transition-all duration-200 ml-4 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Get Help
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/success" element={<Success />} />
          <Route path="/intake" element={
            <FormationGuard feature="formation">
              <Intake setIntakeData={setIntakeData} />
            </FormationGuard>
          } />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard" element={
            <FormationGuard feature="formation">
              <Dashboard intakeData={intakeData} />
            </FormationGuard>
          } />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={
            <FormationGuard feature="formation">
              <Checkout />
            </FormationGuard>
          } />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={
            <AdminAuth>
              <AdminDashboard />
            </AdminAuth>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
