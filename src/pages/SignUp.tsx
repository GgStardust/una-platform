import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { authService } from '@/lib/auth';
import { GlassCard, PremiumButton } from '@/components/ui';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await authService.signUp(formData.email, formData.name, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError('An error occurred. Please try again.');
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

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white font-montserrat">
            Create your account
          </h2>
          <p className="mt-2 text-base text-white/90 font-lora">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-medium text-[#C49A6C] hover:text-[#B8955A] transition-colors"
            >
              Sign in here
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
              <label htmlFor="name" className="block text-sm font-medium text-[#1C1F3B] font-montserrat">
                Full name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#1C1F3B]/60" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border-2 border-[#1C1F3B]/20 rounded-lg placeholder-[#1C1F3B]/40 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-12 py-3 border-2 border-[#1C1F3B]/20 rounded-lg placeholder-[#1C1F3B]/40 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                  placeholder="Create a password"
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

              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <Check className={`h-3 w-3 mr-2 ${req.met ? 'text-emerald-500' : 'text-[#1C1F3B]/40'}`} />
                      <span className={req.met ? 'text-emerald-700 font-lora' : 'text-[#1C1F3B]/60 font-lora'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1C1F3B] font-montserrat">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#1C1F3B]/60" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-12 py-3 border-2 border-[#1C1F3B]/20 rounded-lg placeholder-[#1C1F3B]/40 focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-[#C49A6C] text-[#1C1F3B] font-lora transition-all"
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-[#1C1F3B]/60 hover:text-[#1C1F3B] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-white font-semibold font-lora">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-[#C49A6C] focus:ring-[#C49A6C] border-[#1C1F3B]/30 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-[#1C1F3B] font-lora">
                I agree to the{' '}
                <Link to="/terms" className="text-[#C49A6C] hover:text-[#B8955A] transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#C49A6C] hover:text-[#B8955A] transition-colors">
                  Privacy Policy
                </Link>
              </label>
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
                    Create account
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
                <span className="px-2 bg-white/95 text-[#1C1F3B]/70 font-lora">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signin"
                className="w-full flex justify-center items-center py-3 px-4 border-2 border-[#C49A6C]/40 rounded-lg shadow-sm text-sm font-medium text-[#1C1F3B] bg-white/50 hover:bg-white/70 hover:border-[#C49A6C] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] font-montserrat transition-all"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
