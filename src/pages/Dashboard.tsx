import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Eye, 
  AlertTriangle, 
  Calendar,
  TrendingUp,
  Palette
} from 'lucide-react';
import { IntakeData, VerificationFlag } from '@/lib/types';
import { checkVerificationFlags, getReferralGuidance } from '@/lib/verification-docket';
import VerificationBanner from '@/components/VerificationBanner';
import ScheduleDialog from '@/components/ScheduleDialog';
import EmblemDesigner from '@/components/EmblemDesigner';

interface DashboardProps {
  intakeData: IntakeData | null;
}

export default function Dashboard({ intakeData }: DashboardProps) {
  const location = useLocation();
  const [verificationStatus, setVerificationStatus] = useState<{
    status: string;
    message: string;
    documentsVerified?: boolean;
    referralVerified?: boolean;
    overallVerified?: boolean;
    verificationDate?: string;
    verifiedBy?: string;
    details?: Record<string, unknown>;
  } | null>(null);
  const [verificationFlags, setVerificationFlags] = useState<VerificationFlag[]>([]);
  const [entityId, setEntityId] = useState<string>('');
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [explorationResult, setExplorationResult] = useState<{ path: string; at: number } | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEmblemDesigner, setShowEmblemDesigner] = useState(false);

  useEffect(() => {
    if (intakeData) {
      // Generate a unique entity ID from the intake data (only once)
      const newEntityId = `entity-${intakeData.entityName.replace(/\s+/g, '-').toLowerCase()}-${intakeData.createdAt}`;
      setEntityId(newEntityId);
      
      // Check verification flags
      const flags = checkVerificationFlags(intakeData);
      setVerificationFlags(flags);
      
      // Get or create verification status
      let status = null; // Placeholder, as VerificationManager is removed
      if (!status) {
        status = { // Create a dummy status for now
          documentsVerified: false,
          referralVerified: false,
          overallVerified: false,
          verificationDate: null,
          verifiedBy: null,
        };
      }
      setVerificationStatus({
        status: 'pending',
        message: 'Verification in progress',
        documentsVerified: status.documentsVerified,
        referralVerified: status.referralVerified,
        overallVerified: status.overallVerified,
        verificationDate: status.verificationDate || undefined,
        verifiedBy: status.verifiedBy || undefined,
        details: {}
      });
      
      // Check for exploration result
      const exploreResult = localStorage.getItem('explore_result');
      if (exploreResult) {
        try {
          const result = JSON.parse(exploreResult);
          setExplorationResult(result);
        } catch (error) {
          // Error parsing exploration result
        }
      }
    }
  }, [intakeData]);

  // Handle emblem designer opening from intake
  useEffect(() => {
    if (location.state?.openEmblemDesigner && intakeData?.hasInsignia) {
      setShowEmblemDesigner(true);
      // Clear the state to prevent reopening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, intakeData]);

  const handleVerificationUpdate = (newStatus: any) => {
    setVerificationStatus(newStatus);
  };

  if (!intakeData) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">No Data Found</h1>
          <p className="text-navy-600 mb-6">Please complete the intake form first.</p>
          <Link to="/intake" className="btn-primary">
            Start Intake Process
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Verification Banner */}
      {verificationFlags.length > 0 && (
        <div className="bg-gold-50 border-l-4 border-gold-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-gold-400 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gold-800">
                Additional Guidance Available
              </h3>
              <p className="text-sm text-gold-700 mt-1">
                Your UNA formation may require additional consideration. 
                <button 
                  onClick={() => setShowVerificationModal(true)}
                  className="text-gold-800 underline hover:text-gold-900 ml-1"
                >
                  Review details
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-navy-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy-900">
                UNA Formation Dashboard
              </h1>
              <p className="text-navy-600 mt-2">
                Track your progress and access all formation documents
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/explore"
                className="btn-secondary flex items-center"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Your Path
              </Link>
              <button className="btn-primary flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <VerificationBanner 
          flags={verificationFlags}
          entityId={entityId}
          onVerificationUpdate={handleVerificationUpdate}
        />
      </div>

      {/* Exploration Result Card */}
      {explorationResult && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`card border-l-4 ${
            explorationResult.path === 'UNA' 
              ? 'border-l-emerald-500 bg-emerald-50' 
              : 'border-l-gold-500 bg-gold-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${
                  explorationResult.path === 'UNA' ? 'text-emerald-800' : 'text-navy-800'
                }`}>
                  {explorationResult.path === 'UNA' 
                    ? 'UNA Pathway Active' 
                    : 'Continue Exploring Your Path'
                  }
                </h3>
                <p className={`text-sm mb-4 ${
                  explorationResult.path === 'UNA' ? 'text-emerald-700' : 'text-navy-700'
                }`}>
                  {explorationResult.path === 'UNA'
                    ? 'Your exploration showed readiness for UNA formation. Continue with intake to establish your legal structure.'
                    : 'Your exploration indicated you\'re still clarifying your direction. Consider scheduling a conversation for guidance.'
                  }
                </p>
                <p className="text-xs text-navy-500">
                  Explored {new Date(explorationResult.at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                {explorationResult.path === 'UNA' ? (
                  <Link
                    to="/intake"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    Continue to Intake
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsScheduleDialogOpen(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      'bg-gold-600 text-white hover:bg-gold-700'
                    }`}
                  >
                    Schedule Conversation
                  </button>
                )}
                <Link
                  to="/explore"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors border border-navy-300 hover:border-navy-400"
                >
                  Re-explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-navy-600">Formation Status</p>
                <p className="text-2xl font-bold text-navy-900">
                  {verificationFlags.length === 0 ? 'Ready' : 'In Progress'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-gold-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-navy-600">Documents Generated</p>
                <p className="text-2xl font-bold text-navy-900">
                  {intakeData ? '5' : '0'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-gold-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-navy-600">Flags</p>
                <p className="text-2xl font-bold text-navy-900">
                  {verificationFlags.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gold-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-navy-600">Compliance</p>
                <p className="text-2xl font-bold text-navy-900">
                  {verificationFlags.length === 0 ? 'Standard' : 'Enhanced'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Ongoing Tasks</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {verificationFlags.length > 0 ? (
                <div className="space-y-4">
                  {verificationFlags.map((flag, index) => (
                    <div key={index} className="flex items-start p-6 bg-white rounded-lg border border-navy-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0 ${
                        flag.severity === 'high' ? 'bg-red-500' : 
                        flag.severity === 'medium' ? 'bg-gold-500' : 'bg-emerald-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-navy-900 text-lg">{flag.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            flag.severity === 'high' ? 'bg-red-100 text-red-800' : 
                            flag.severity === 'medium' ? 'bg-gold-100 text-gold-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {flag.severity === 'high' ? 'High Priority' : 
                             flag.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}
                          </span>
                        </div>
                        <p className="text-navy-700 mb-3 leading-relaxed">{flag.description}</p>
                        {flag.recommendation && (
                          <div className="bg-gold-50 border-l-4 border-gold-400 p-4 rounded-r-lg mb-3">
                            <p className="text-sm text-navy-800">
                              <span className="font-medium">Recommendation:</span> {flag.recommendation}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-navy-600">
                          <span className="font-medium">Professional Type:</span>
                          <span className="ml-2 px-2 py-1 bg-navy-100 rounded text-navy-700">
                            {flag.referralType?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 mb-2">All Set!</h3>
                  <p className="text-navy-600">
                    Your UNA formation is proceeding smoothly with standard requirements.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">UNA Agreement</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Your customized association agreement defining purpose, governance, and member rights.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="btn-primary flex items-center text-sm opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">EIN Registration Guide</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Step-by-step instructions to obtain your Employer Identification Number.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-2" />
                Preview
              </button>
              <button className="btn-primary flex items-center text-sm opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">LP/UNA-128 Package</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Complete filing package for California LP/UNA-128 form.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="btn-primary flex items-center text-sm opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-semibold ml-3">DBA/FBN Registration Guide</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Step-by-step guide for registering your business name with your county.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="btn-primary flex items-center text-sm opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">Financial Tracking Kit</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Templates and guidance for managing your UNA's finances and tracking.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="btn-primary flex items-center text-sm opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-semibold ml-3">Client Agreement & Disclaimer</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Service agreement and important disclaimers for UNA formation services.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button 
                onClick={async () => {
                  if (!intakeData) return;
                  try {
                    const { generateClientAgreement } = await import('@/lib/generate');
                    const doc = await generateClientAgreement(intakeData);
                    const { downloadBlob } = await import('@/lib/generate');
                    downloadBlob(doc, `${intakeData.entityName} - Client Agreement.pdf`, 'application/pdf');
                  } catch (error) {
                    // Error generating Client Agreement
                    alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
                  }
                }}
                className="btn-primary flex items-center text-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">Bank Account Opening Guide</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Mission-aligned banking recommendations and account setup guidance.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="btn-primary flex items-center text-sm opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Templates Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-6">Financial Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-semibold ml-3">Financial Tracking Template</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Excel/Google Sheets template for tracking income, expenses, and financial categories.
            </p>
            <button className="btn-primary flex items-center text-sm w-full justify-center opacity-50 cursor-not-allowed" disabled>
              <Download className="h-4 w-4 mr-2" />
              Coming Soon
            </button>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">Invoice Template</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Professional invoice template for client billing and payment tracking.
            </p>
            <button className="btn-primary flex items-center text-sm w-full justify-center opacity-50 cursor-not-allowed" disabled>
              <Download className="h-4 w-4 mr-2" />
              Coming Soon
            </button>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-gold-600" />
              <h3 className="text-lg font-semibold ml-3">Notion Templates</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Advanced project management and financial tracking templates for Notion users.
            </p>
            <button 
              onClick={() => {
                // For now, just show a message about Notion templates
                alert('Notion templates coming soon! These will provide advanced project management and financial tracking capabilities.');
              }}
              className="btn-secondary flex items-center text-sm w-full justify-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              Coming Soon
            </button>
          </div>

          {/* Emblem Designer Card */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Palette className="h-8 w-8 text-gold-600" />
                              <h3 className="text-lg font-semibold ml-3">Emblem Upload</h3>
            </div>
            <p className="text-navy-600 mb-4">
              Upload and manage your organization's emblem for use in official documents and branding.
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button 
                onClick={() => setShowEmblemDesigner(true)}
                className="btn-primary flex items-center text-sm"
              >
                <Palette className="h-4 w-4 mr-2" />
                {intakeData?.hasInsignia ? 'Manage Emblem' : 'Upload Emblem'}
              </button>
            </div>
            {!intakeData?.hasInsignia && (
              <div className="mt-3 p-3 bg-gold-50 border border-gold-200 rounded-lg">
                <p className="text-sm text-navy-700">
                  <strong>Tip:</strong> You can upload your emblem during intake, or upload one now using the emblem manager.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verification Status Section */}
      {verificationStatus && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Verification Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className={`text-2xl font-bold mb-2 ${
                verificationStatus.documentsVerified ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {verificationStatus.documentsVerified ? '✓' : '✗'}
              </div>
              <div className="text-sm text-navy-600">Documents Verified</div>
              <div className="text-xs text-navy-500 mt-1">
                {verificationStatus.documentsVerified ? 'All documents reviewed' : 'Pending review'}
              </div>
            </div>
            
            <div className="card text-center">
              <div className={`text-2xl font-bold mb-2 ${
                                  verificationStatus.referralVerified ? 'text-emerald-600' : 'text-gold-600'
              }`}>
                {verificationStatus.referralVerified ? 'Verified' : 'Pending'}
              </div>
              <div className="text-sm text-navy-600">Referrals Verified</div>
              <div className="text-xs text-navy-500 mt-1">
                {verificationStatus.referralVerified ? 'No referrals needed' : 'Referrals pending'}
              </div>
            </div>
            
            <div className="card text-center">
              <div className={`text-2xl font-bold mb-2 ${
                verificationStatus.overallVerified ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {verificationStatus.overallVerified ? '✓' : '✗'}
              </div>
              <div className="text-sm text-navy-600">Overall Status</div>
              <div className="text-xs text-navy-500 mt-1">
                {verificationStatus.overallVerified ? 'Verification complete' : 'Verification needed'}
              </div>
            </div>
          </div>
          
          {verificationStatus.verificationDate && (
            <div className="mt-6 text-center">
              <p className="text-sm text-navy-600">
                Last verified on {new Date(verificationStatus.verificationDate).toLocaleDateString()}
                {verificationStatus.verifiedBy && ` by ${verificationStatus.verifiedBy}`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            What's Next?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-navy-900 mb-3">Immediate Actions:</h4>
              <ul className="text-navy-600 space-y-2">
                <li>• Review and sign your UNA Agreement</li>
                <li>• Apply for your EIN with the IRS</li>
                {intakeData?.entityState === 'CA' && (
                  <li>• File LP/UNA-128 with California Secretary of State</li>
                )}
                {intakeData?.entityState !== 'CA' && (
                  <li>• Check your state's UNA filing requirements</li>
                )}
                <li>• Register your DBA name</li>
                {intakeData?.needsEIN && (
                  <li>• Use your EIN to open a business bank account</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-navy-900 mb-3">Ongoing Tasks:</h4>
              <ul className="text-navy-600 space-y-2">
                <li>• Set up financial tracking and bookkeeping</li>
                {intakeData?.fiscalSponsorship && (
                  <li>• Establish fiscal sponsorship agreements</li>
                )}
                {intakeData?.taxExemptIntent && (
                  <li>• Begin 501(c)(3) application process</li>
                )}
                <li>• Plan and launch your first activities</li>
                <li>• Build your community and partnerships</li>
                <li>• Regular compliance and governance reviews</li>
              </ul>
            </div>
          </div>
          
          {/* State-Specific Guidance */}
          {intakeData?.entityState && intakeData.entityState !== 'CA' && (
                            <div className="mt-8 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                  <h4 className="font-semibold text-gold-800 mb-2">State-Specific Note</h4>
                  <p className="text-gold-700 text-sm">
                You've selected {intakeData.entityState}. While our platform is optimized for California UNAs, 
                the core documents and guidance apply to most states. You may need to check your state's 
                specific filing requirements and modify documents accordingly.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Schedule Dialog */}
      <ScheduleDialog
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
      />

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-navy-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-navy-200 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-navy-900">Verification Details</h3>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="text-navy-400 hover:text-navy-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {verificationFlags.map((flag, index) => (
                  <div key={index} className="border border-navy-200 rounded-lg p-4">
                    <h4 className="font-medium text-navy-900 mb-2">{flag.title}</h4>
                    <p className="text-navy-700 mb-3">{flag.description}</p>
                    {flag.recommendation && (
                      <div className="bg-gold-50 p-3 rounded">
                        <p className="text-sm text-navy-800">
                          <strong>Recommendation:</strong> {flag.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-gold-50 to-cream-50 border border-gold-200 p-6 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-4 text-lg">Next Steps</h4>
                                    <div className="prose prose-sm max-w-none">
                     {getReferralGuidance(verificationFlags).split('\n').map((line, index) => {
                       if (line === 'Immediate Action Required' || line === 'Professional Guidance Recommended' || line === 'Strategic Considerations' || line === 'Ready for Next Steps?') {
                         return (
                           <h5 key={index} className="text-navy-900 font-semibold mt-4 mb-2 text-base">
                             {line}
                           </h5>
                         );
                       } else if (line.startsWith('•')) {
                         return (
                           <p key={index} className="text-navy-700 mb-2 ml-4">
                             {line}
                           </p>
                         );
                       } else if (line.trim() === '') {
                         return <div key={index} className="h-3"></div>;
                       } else {
                         return (
                           <p key={index} className="text-navy-700 mb-2">
                             {line}
                           </p>
                         );
                       }
                     })}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Link
                  to="/services"
                  className="btn-secondary"
                >
                  View Services
                </Link>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="btn-primary"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emblem Designer Modal */}
      {showEmblemDesigner && intakeData && (
        <EmblemDesigner
          intakeData={intakeData}
          onClose={() => setShowEmblemDesigner(false)}
        />
      )}
    </div>
  );
} 