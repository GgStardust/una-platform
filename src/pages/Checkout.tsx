import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { authService, User } from '@/lib/auth';
import { paymentService, createPurchaseFromOrder } from '@/lib/payment';
import { getPackageById, calculateTotalPrice } from '@/lib/pricing';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [packageIds, setPackageIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/signin', { state: { from: location } });
      return;
    }
    setUser(currentUser);

    // Get selected packages from location state or redirect
    const selectedPackages = location.state?.selectedPackages;
    if (!selectedPackages || selectedPackages.length === 0) {
      navigate('/pricing');
      return;
    }
    setPackageIds(selectedPackages);
  }, [navigate, location]);

  const totalAmount = calculateTotalPrice(packageIds);
  const packages = packageIds.map(id => getPackageById(id)).filter(Boolean);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('billing.')) {
      const field = name.split('.')[1];
      setPaymentData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2, 4);
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setPaymentData(prev => ({ ...prev, cardNumber: formatted }));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setPaymentData(prev => ({ ...prev, expiryDate: formatted }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsProcessing(true);
    setError('');

    try {
      setProcessingStep('Creating order...');
      const order = await paymentService.createOrder(user.id, packageIds);

      setProcessingStep('Processing payment...');
      const paymentIntent = await paymentService.createPaymentIntent(totalAmount);

      setProcessingStep('Confirming payment...');
      const paymentSuccess = await paymentService.confirmPayment(
        paymentIntent.id,
        paymentData.cardNumber.replace(/\s/g, '')
      );

      if (paymentSuccess) {
        setProcessingStep('Finalizing order...');
        await paymentService.processOrder(order.id, paymentIntent.id);
        
        setProcessingStep('Creating your documents...');
        await createPurchaseFromOrder(user, order);

        // Redirect to success page
        navigate('/dashboard', { 
          state: { 
            purchaseSuccess: true,
            packages: packageIds 
          }
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  if (!user || packageIds.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center text-gold-600 hover:text-gold-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to pricing
          </button>
          <h1 className="text-3xl font-bold text-navy-900">Checkout</h1>
          <p className="text-navy-600 mt-2">Complete your UNA formation package purchase</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {packages.map((pkg) => (
                <div key={pkg!.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-navy-900">{pkg!.name}</h3>
                    <p className="text-sm text-navy-600">{pkg!.description}</p>
                  </div>
                  <div className="text-lg font-semibold text-navy-900">
                    ${pkg!.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-navy-200 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-gold-600">${totalAmount.toLocaleString()}</span>
              </div>
              <p className="text-sm text-navy-500 mt-1">One-time payment</p>
            </div>

            {/* Security badges */}
            <div className="mt-6 pt-6 border-t border-navy-200">
              <div className="flex items-center text-sm text-navy-600">
                <Lock className="h-4 w-4 mr-2" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-6">Payment Information</h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nameOnCard" className="block text-sm font-medium text-navy-700">
                  Name on card
                </label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  required
                  value={paymentData.nameOnCard}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-navy-700">
                  Card number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    className="block w-full border border-navy-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="1234 5678 9012 3456"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-navy-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-navy-700">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    required
                    value={paymentData.expiryDate}
                    onChange={handleExpiryChange}
                    className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-navy-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    required
                    maxLength={4}
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="123"
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-navy-900">Billing Address</h3>
                
                <div>
                  <label htmlFor="billing.street" className="block text-sm font-medium text-navy-700">
                    Street address
                  </label>
                  <input
                    type="text"
                    id="billing.street"
                    name="billing.street"
                    required
                    value={paymentData.billingAddress.street}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="billing.city" className="block text-sm font-medium text-navy-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="billing.city"
                      name="billing.city"
                      required
                      value={paymentData.billingAddress.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                      placeholder="San Francisco"
                    />
                  </div>
                  <div>
                    <label htmlFor="billing.state" className="block text-sm font-medium text-navy-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="billing.state"
                      name="billing.state"
                      required
                      value={paymentData.billingAddress.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                      placeholder="CA"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="billing.zipCode" className="block text-sm font-medium text-navy-700">
                    ZIP code
                  </label>
                  <input
                    type="text"
                    id="billing.zipCode"
                    name="billing.zipCode"
                    required
                    value={paymentData.billingAddress.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-navy-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="94102"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {processingStep || 'Processing...'}
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Complete Purchase - ${totalAmount.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-8 text-sm text-navy-500">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
