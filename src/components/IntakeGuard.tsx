import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { checkPaymentAndBooking } from '@/lib/supabase/intake';

interface IntakeGuardProps {
  children: React.ReactNode;
}

export default function IntakeGuard({ children }: IntakeGuardProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentId = searchParams.get('payment_id');
  const bookingId = searchParams.get('booking_id');

  useEffect(() => {
    const validateAccess = async () => {
      if (!paymentId || !bookingId) {
        setError('Missing payment or booking information');
        setIsChecking(false);
        return;
      }

      try {
        const result = await checkPaymentAndBooking(paymentId, bookingId);
        
        if (result.valid) {
          setIsValid(true);
        } else {
          setError(result.reason || 'Access denied');
        }
      } catch (err) {
        console.error('Error validating access:', err);
        setError('Unable to verify access. Please try again.');
      } finally {
        setIsChecking(false);
      }
    };

    validateAccess();
  }, [paymentId, bookingId]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0] flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Verifying your access...</p>
        </div>
      </div>
    );
  }

  if (!isValid || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="una-card p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4 font-montserrat">
              Access Required
            </h1>
            <p className="text-white/90 mb-6 font-lora">
              {error || 'You need to complete payment and schedule a consultation before accessing the intake form.'}
            </p>
            <button
              onClick={() => navigate('/services')}
              className="btn-grad btn-primary px-6 py-3"
            >
              Complete Payment & Schedule
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
