import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Star, ArrowRight, Shield, Users, FileText, Clock } from 'lucide-react';
import { pricingPackages, addOns } from '@/lib/pricing';
import { authService } from '@/lib/auth';

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isAuthenticated] = useState(authService.isAuthenticated());

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId);
      } else {
        return [...prev, packageId];
      }
    });
  };

  const totalPrice = selectedPackages.reduce((total, id) => {
    const pkg = [...pricingPackages, ...addOns].find(p => p.id === id);
    return total + (pkg?.price || 0);
  }, 0);

  const handlePurchase = () => {
    if (!isAuthenticated) {
      // Redirect to sign in with return path
      navigate('/signin', { 
        state: { 
          from: { pathname: '/checkout' },
          selectedPackages 
        }
      });
      return;
    }
    
    if (selectedPackages.length === 0) {
      alert('Please select at least one package');
      return;
    }
    
    // Proceed to checkout with selected packages
    navigate('/checkout', { 
      state: { 
        selectedPackages 
      }
    });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              UNA Formation Packages
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Choose the perfect package for your UNA formation journey. All packages include 
              comprehensive documentation and ongoing support to ensure your success.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Formation Packages
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 ${
                  pkg.popular 
                    ? 'border-gold-500 scale-105' 
                    : 'border-navy-200 hover:border-navy-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gold-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">{pkg.name}</h3>
                    <p className="text-navy-600 mb-6">{pkg.description}</p>
                    <div className="text-4xl font-bold text-navy-900 mb-2">
                      ${pkg.price.toLocaleString()}
                    </div>
                    <p className="text-navy-500">One-time payment</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-navy-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {pkg.consultation && (
                    <div className="bg-gold-50 border border-gold-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-gold-600 mr-2" />
                        <span className="font-semibold text-gold-900">
                          {pkg.consultation.duration} Consultation
                        </span>
                      </div>
                      <p className="text-gold-800 text-sm">{pkg.consultation.description}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      selectedPackages.includes(pkg.id)
                        ? 'bg-gold-600 text-white hover:bg-gold-700'
                        : 'bg-navy-100 text-navy-900 hover:bg-navy-200'
                    }`}
                  >
                    {selectedPackages.includes(pkg.id) ? 'Selected' : 'Select Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-Ons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Add-On Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon) => (
              <div 
                key={addon.id}
                className="bg-white rounded-xl shadow-md border border-navy-200 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{addon.name}</h3>
                  <p className="text-navy-600 text-sm mb-4">{addon.description}</p>
                  <div className="text-2xl font-bold text-navy-900 mb-4">
                    ${addon.price}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {addon.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-navy-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {addon.features.length > 3 && (
                      <p className="text-navy-500 text-sm">+{addon.features.length - 3} more features</p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handlePackageSelect(addon.id)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      selectedPackages.includes(addon.id)
                        ? 'bg-gold-600 text-white hover:bg-gold-700'
                        : 'bg-navy-100 text-navy-900 hover:bg-navy-200'
                    }`}
                  >
                    {selectedPackages.includes(addon.id) ? 'Selected' : 'Add to Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Summary */}
        {selectedPackages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-navy-200 p-8 mb-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Your Selection</h3>
            
            <div className="space-y-4 mb-6">
              {selectedPackages.map(pkgId => {
                const pkg = [...pricingPackages, ...addOns].find(p => p.id === pkgId);
                return pkg ? (
                  <div key={pkgId} className="flex items-center justify-between p-4 bg-navy-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-navy-900">{pkg.name}</h4>
                      <p className="text-navy-600 text-sm">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-navy-900">${pkg.price.toLocaleString()}</div>
                      <button
                        onClick={() => handlePackageSelect(pkgId)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            
            <div className="border-t border-navy-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-semibold text-navy-900">Total</span>
                <span className="text-3xl font-bold text-gold-600">${totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex space-x-4">
                {!isAuthenticated ? (
                  <Link
                    to="/signin"
                    className="flex-1 bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-gold-700 transition-colors"
                  >
                    Sign In to Purchase
                  </Link>
                ) : (
                  <button
                    onClick={handlePurchase}
                    className="flex-1 bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gold-700 transition-colors flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-navy-900 mb-8">Why Choose Our Platform?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-navy-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Trusted & Secure</h4>
              <p className="text-navy-600">Bank-level security for all transactions and document storage</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Expert Support</h4>
              <p className="text-navy-600">Access to UNA formation experts and ongoing guidance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gold-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Comprehensive Docs</h4>
              <p className="text-navy-600">Everything you need for successful UNA formation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
