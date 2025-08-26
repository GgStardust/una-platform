import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { getFeatureFlags } from '@/lib/flags';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const flags = getFeatureFlags();

  useEffect(() => {
    // Check if admin auth is required
    if (!flags.REQUIRE_ADMIN_AUTH) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check for existing session
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        const now = Date.now();
        if (session.expiresAt > now && session.email) {
          // Check if email is still allowed
          const allowedEmails = import.meta.env.VITE_ADMIN_ALLOWED_EMAILS?.split(',') || [];
          if (allowedEmails.includes(session.email)) {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error parsing admin session:', error);
      }
    }

    setIsLoading(false);
  }, [flags.REQUIRE_ADMIN_AUTH]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Check if email is allowed
    const allowedEmails = import.meta.env.VITE_ADMIN_ALLOWED_EMAILS?.split(',') || [];
    const normalizedAllowedEmails = allowedEmails.map((email: string) => email.trim().toLowerCase());
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedAllowedEmails.includes(normalizedEmail)) {
      setError('Access denied. This email is not authorized for admin access.');
      return;
    }

    // Create session (24 hour expiry)
    const session = {
      email: normalizedEmail,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      createdAt: Date.now()
    };

    localStorage.setItem('admin_session', JSON.stringify(session));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
    setEmail('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-navy-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-navy-200">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-navy-900 mb-2">Admin Access Required</h1>
              <p className="text-navy-600">
                This area is restricted to authorized administrators only.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-red-800 text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="Enter your admin email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-navy-600 text-white py-2 px-4 rounded-lg hover:bg-navy-700 transition-colors font-medium"
              >
                Verify Access
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-navy-600 hover:text-navy-800 text-sm font-medium"
              >
                ← Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-navy-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <span className="font-medium">Admin Mode</span>
            <span className="text-navy-300">•</span>
            <span className="text-sm text-navy-300">{email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-navy-700 hover:bg-navy-600 rounded text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Admin Content */}
      {children}
    </div>
  );
}
