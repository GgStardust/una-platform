import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Redirect to schedule page after payment success
    if (sessionId) {
      navigate(`/schedule?session_id=${sessionId}`);
    } else {
      navigate('/services');
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Processing payment...</p>
      </div>
    </div>
  );
}


