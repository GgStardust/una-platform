import React, { useState, useEffect } from 'react';
import { FLAGS } from '@/lib/flags';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if admin auth is required
    if (!FLAGS.REQUIRE_ADMIN_AUTH) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check for existing session
    const session = localStorage.getItem('admin_session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        // Check if session is still valid (24 hours)
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
          const allowedEmails = FLAGS.ADMIN_ALLOWED_EMAILS;
          if (allowedEmails.includes(sessionData.email)) {
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
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    const allowedEmails = FLAGS.ADMIN_ALLOWED_EMAILS;
    const normalizedEmail = email.trim().toLowerCase();
    
    if (allowedEmails.includes(normalizedEmail)) {
      // Create session
      const sessionData = {
        email: normalizedEmail,
        timestamp: Date.now()
      };
      localStorage.setItem('admin_session', JSON.stringify(sessionData));
      setIsAuthenticated(true);
    } else {
      setError('Access denied. This email is not authorized for admin access.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-navy-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-2">Admin Access Required</h1>
          <p className="text-navy-600">Please enter your authorized email to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-navy-600 text-white py-2 px-4 rounded-md hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 transition-colors"
          >
            Access Admin
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-navy-500">
            Need access? Contact the platform administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
