import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, ExternalLink, CheckCircle, Shield } from 'lucide-react';
import { VerificationFlag, VerificationStatus } from '@/lib/types';
import { VerificationManager } from '@/lib/verification';
import { calculateRiskAssessment } from '@/lib/verification';

interface VerificationBannerProps {
  flags: VerificationFlag[];
  entityId: string;
  onVerificationUpdate?: (status: VerificationStatus) => void;
}

const VerificationBanner: React.FC<VerificationBannerProps> = ({ 
  flags, 
  entityId, 
  onVerificationUpdate 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMarkingVerified, setIsMarkingVerified] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [verifiedBy, setVerifiedBy] = useState('');

  const currentStatus = VerificationManager.getVerificationStatus(entityId);
  const needsVerification = VerificationManager.isVerificationNeeded(entityId);
  const riskAssessment = calculateRiskAssessment(flags);

  if (!needsVerification) {
    return (
      <div className="mb-6">
        <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <div className="text-emerald-800">
              <h3 className="font-medium">Verification Complete</h3>
              <p className="text-sm">
                All verification requirements have been met. 
                {currentStatus?.verificationDate && (
                  <> Verified on {new Date(currentStatus.verificationDate).toLocaleDateString()}</>
                )}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 rounded"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (flags.length === 0) {
    return (
      <div className="mb-6">
        <div className="border border-gold-200 bg-gold-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Info className="h-5 w-5 text-gold-600" />
              <div className="text-gold-800">
                <h3 className="font-medium">Verification Recommended</h3>
                <p className="text-sm">
                  Your UNA formation appears straightforward, but verification is recommended for compliance.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-gold-700 hover:text-gold-800 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 rounded"
            >
              Mark Verified
            </button>
          </div>
        </div>
      </div>
    );
  }

  const highFlags = flags.filter(flag => flag.severity === 'high');
  const mediumFlags = flags.filter(flag => flag.severity === 'medium');
  const lowFlags = flags.filter(flag => flag.severity === 'low');

  const getFlagIcon = (severity: string) => {
    if (severity === 'high') return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (severity === 'medium') return <AlertCircle className="w-5 h-5 text-gold-500" />;
    return <Info className="w-5 h-5 text-navy-500" />;
  };

  const getFlagColor = (severity: string) => {
    if (severity === 'high') return 'border-red-200 bg-red-50 text-red-800';
    if (severity === 'medium') return 'border-gold-200 bg-gold-50 text-gold-800';
    return 'border-navy-200 bg-navy-50 text-navy-800';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'critical') return 'border-red-300 bg-red-100 text-red-900';
    if (risk === 'high') return 'border-gold-300 bg-gold-100 text-gold-900';
    if (risk === 'medium') return 'border-gold-300 bg-gold-100 text-gold-900';
    return 'border-emerald-300 bg-emerald-100 text-emerald-900';
  };

  const handleMarkVerified = async () => {
    if (!verifiedBy.trim()) {
      alert('Please enter your name to mark verification as complete.');
      return;
    }

    setIsMarkingVerified(true);
    try {
      const newStatus = VerificationManager.markVerified(entityId, verifiedBy, verificationNotes);
      
      if (onVerificationUpdate) {
        onVerificationUpdate(newStatus);
      }
      
      setIsModalOpen(false);
      setVerificationNotes('');
      setVerifiedBy('');
      
      // Force a re-render by updating localStorage
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error marking verification complete:', error);
      alert('Error updating verification status. Please try again.');
    } finally {
      setIsMarkingVerified(false);
    }
  };

  return (
    <>
      {/* Risk Assessment Summary */}
      <div className="mb-4">
        <div className={`border-2 rounded-lg p-4 ${getRiskColor(riskAssessment.overallRisk)}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-semibold">
                  Risk Assessment: {riskAssessment.overallRisk.charAt(0).toUpperCase() + riskAssessment.overallRisk.slice(1)} Risk
                </h3>
                <p className="text-sm opacity-90">
                  Risk Score: {riskAssessment.riskScore}/50 • {flags.length} verification items detected
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {riskAssessment.overallRisk === 'critical' && 'Critical Risk'}
                {riskAssessment.overallRisk === 'high' && 'High Risk'}
                {riskAssessment.overallRisk === 'medium' && 'Medium Risk'}
                {riskAssessment.overallRisk === 'low' && 'Low Risk'}
              </div>
            </div>
          </div>
          
          {/* Risk Factors */}
          {riskAssessment.riskFactors.length > 0 && (
            <div className="mt-3 p-3 bg-white bg-opacity-50 rounded-lg">
              <h4 className="font-semibold mb-2">Key Risk Factors:</h4>
              <div className="space-y-1">
                {riskAssessment.riskFactors.slice(0, 3).map((factor, index) => (
                  <div key={index} className="text-sm flex items-center space-x-2">
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    <span>{factor}</span>
                  </div>
                ))}
                {riskAssessment.riskFactors.length > 3 && (
                  <div className="text-sm text-navy-600 italic">
                    +{riskAssessment.riskFactors.length - 3} more factors
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verification Issues */}
      <div className="mb-6">
        <div className={`border rounded-lg p-4 ${getFlagColor(highFlags.length > 0 ? 'high' : 'medium')}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFlagIcon(highFlags.length > 0 ? 'high' : 'medium')}
              <div>
                <h3 className="font-medium">
                  {highFlags.length > 0 ? 'High Priority Issues Detected' : 'Medium Priority Items'}
                </h3>
                <p className="text-sm mt-1">
                  {highFlags.length > 0 
                    ? `${highFlags.length} high priority issue${highFlags.length > 1 ? 's' : ''} require${highFlags.length > 1 ? '' : 's'} professional review`
                    : `${mediumFlags.length} item${mediumFlags.length > 1 ? 's' : ''} may need attention`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                View Details
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Verified
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-navy-900">Verification Details</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-navy-400 hover:text-navy-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {highFlags.length > 0 && (
                  <div>
                    <h3 className="font-medium text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      High Priority Issues ({highFlags.length})
                    </h3>
                    <div className="space-y-3">
                      {highFlags.map((flag, index) => (
                        <div key={index} className="border border-red-200 rounded-lg p-3 bg-red-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-red-900">{flag.title}</h4>
                              <p className="text-sm text-red-700 mt-1">{flag.description}</p>
                              {flag.nextSteps && flag.nextSteps.length > 0 && (
                                <div className="text-sm text-red-600 mt-2">
                                  <strong>Next Steps:</strong>
                                  <ul className="mt-1 space-y-1">
                                    {flag.nextSteps.map((step, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div className="ml-4 text-right space-y-1">
                              <div className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                                {flag.severity.toUpperCase()} Risk
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mediumFlags.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gold-800 mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Medium Priority Items ({mediumFlags.length})
                    </h3>
                    <div className="space-y-3">
                      {mediumFlags.map((flag, index) => (
                        <div key={index} className="border border-gold-200 rounded-lg p-3 bg-gold-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gold-900">{flag.title}</h4>
                              <p className="text-sm text-gold-700 mt-1">{flag.description}</p>
                              {flag.nextSteps && flag.nextSteps.length > 0 && (
                                <div className="text-sm text-gold-600 mt-2">
                                  <strong>Next Steps:</strong>
                                  <ul className="mt-1 space-y-1">
                                    {flag.nextSteps.map((step, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-gold-500 mr-2">•</span>
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div className="ml-4 text-right space-y-1">
                              <div className="text-xs bg-gold-200 text-gold-800 px-2 py-1 rounded">
                                {flag.severity.toUpperCase()} Risk
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {lowFlags.length > 0 && (
                  <div>
                    <h3 className="font-medium text-navy-800 mb-2 flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Low Priority Items ({lowFlags.length})
                    </h3>
                    <div className="space-y-3">
                      {lowFlags.map((flag, index) => (
                        <div key={index} className="border border-navy-200 rounded-lg p-3 bg-navy-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-navy-900">{flag.title}</h4>
                              <p className="text-sm text-navy-700 mt-1">{flag.description}</p>
                              {flag.nextSteps && flag.nextSteps.length > 0 && (
                                <div className="text-sm text-navy-600 mt-2">
                                  <strong>Next Steps:</strong>
                                  <ul className="mt-1 space-y-1">
                                    {flag.nextSteps.map((step, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-navy-500 mr-2">•</span>
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div className="ml-4 text-right space-y-1">
                              <div className="text-xs bg-navy-100 text-navy-700 px-2 py-1 rounded">
                                {flag.severity.toUpperCase()} Risk
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mark Verified Section */}
                <div className="border-t pt-4">
                  <h3 className="font-medium text-navy-900 mb-3">Mark Verification Complete</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1">
                        Verified By *
                      </label>
                      <input
                        type="text"
                        value={verifiedBy}
                        onChange={(e) => setVerifiedBy(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={verificationNotes}
                        onChange={(e) => setVerificationNotes(e.target.value)}
                        placeholder="Add any notes about the verification process..."
                        rows={3}
                        className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleMarkVerified}
                      disabled={isMarkingVerified || !verifiedBy.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isMarkingVerified ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Verified
                        </>
                      )}
                    </button>
                    
                    <a
                      href="/referrals"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gold-600 bg-gold-100 hover:bg-gold-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                    >
                      View Referral Resources
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex items-center px-4 py-2 border border-navy-300 text-sm font-medium rounded-md text-navy-700 bg-white hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationBanner;
