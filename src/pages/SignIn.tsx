import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { authService } from '@/lib/auth';
import { GlassCard, PremiumButton } from '@/components/ui';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.signIn(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white font-montserrat">
            Sign in to your account
          </h2>
          <p className="mt-2 text-base text-white/90 font-lora">
            Or{' '}
            <Link
              to="/signup"
              className="font-medium text-[#C49A6C] hover:text-[#B8955A] transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <GlassCard variant="solid" padding="lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-white/95 backdrop-blur rounded-lg border-l-4 border-[#C49A6C] p-4">
                <p className="text-sm text-[#1C1F3B] font-lora">
                  <span className="text-white font-semibold">Error:</span> {error}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1C1F3B] font-montserrat">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#1C1F3B]/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border-2 border-[#1C1F3B]/20 rounded-lg placeholder-[#1C1F3B]/40 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1C1F3B] font-montserrat">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#1C1F3B]/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-12 py-3 border-2 border-[#1C1F3B]/20 rounded-lg placeholder-[#1C1F3B]/40 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#1C1F3B]/60 hover:text-[#1C1F3B] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#C49A6C] focus:ring-[#C49A6C] border-[#1C1F3B]/30 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#1C1F3B] font-lora">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#C49A6C] hover:text-[#B8955A] font-lora transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <PremiumButton
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="w-full"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </PremiumButton>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1C1F3B]/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/95 text-[#1C1F3B]/70 font-lora">New to UNA Platform?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center items-center py-3 px-4 border-2 border-[#C49A6C]/40 rounded-lg shadow-sm text-sm font-medium text-[#1C1F3B] bg-white/50 hover:bg-white/70 hover:border-[#C49A6C] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] font-montserrat transition-all"
              >
                Create new account
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
