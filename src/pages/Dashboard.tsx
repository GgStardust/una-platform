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
import { GlassCard, GradientHeader, PremiumButton, SectionContainer } from '@/components/ui';

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
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] flex items-center justify-center">
        <GlassCard className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4 font-montserrat">No Data Found</h1>
          <p className="text-white/90 mb-6 font-lora">Please complete the intake form first.</p>
          <PremiumButton href="/intake" size="lg" fullWidth>
            Start Intake Process
          </PremiumButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Hero Header */}
      <GradientHeader
        title="UNA Formation Dashboard"
        subtitle="Track your progress and access all formation documents"
      />

      <SectionContainer padding="md">
        {/* Verification Alert */}
        {verificationFlags.length > 0 && (
          <GlassCard variant="bordered" className="mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-[#C49A6C] mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white font-montserrat">
                  Additional Guidance Available
                </h3>
                <p className="text-sm text-white/90 mt-1 font-lora">
                  Your UNA formation may require additional consideration.{' '}
                  <button
                    onClick={() => setShowVerificationModal(true)}
                    className="text-[#C49A6C] underline hover:text-[#A67C4A]"
                  >
                    Review details
                  </button>
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <PremiumButton href="/explore" variant="secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            Explore Your Path
          </PremiumButton>
          <PremiumButton href="/services">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Consultation
          </PremiumButton>
        </div>

        {/* Verification Banner Component */}
        <VerificationBanner
          flags={verificationFlags}
          entityId={entityId}
          onVerificationUpdate={handleVerificationUpdate}
        />

        {/* Exploration Result Card */}
        {explorationResult && (
          <GlassCard className={`mb-6 border-l-4 ${
            explorationResult.path === 'UNA'
              ? 'border-l-emerald-400'
              : 'border-l-[#C49A6C]'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-white font-montserrat">
                  {explorationResult.path === 'UNA'
                    ? 'UNA Pathway Active'
                    : 'Continue Exploring Your Path'
                  }
                </h3>
                <p className="text-sm mb-4 text-white/90 font-lora">
                  {explorationResult.path === 'UNA'
                    ? 'Your exploration showed readiness for UNA formation. Continue with intake to establish your legal structure.'
                    : 'Your exploration indicated you\'re still clarifying your direction. Consider scheduling a conversation for guidance.'
                  }
                </p>
                <p className="text-xs text-white/70">
                  Explored {new Date(explorationResult.at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                {explorationResult.path === 'UNA' ? (
                  <PremiumButton href="/intake" size="sm">
                    Continue to Intake
                  </PremiumButton>
                ) : (
                  <PremiumButton onClick={() => setIsScheduleDialogOpen(true)} size="sm">
                    Schedule Conversation
                  </PremiumButton>
                )}
                <PremiumButton href="/explore" variant="outline" size="sm">
                  Re-explore
                </PremiumButton>
              </div>
            </div>
          </GlassCard>
        )}
      </SectionContainer>

      {/* Progress Overview */}
      <SectionContainer padding="sm">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard variant="solid" padding="md">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[#1C1F3B]/70 font-montserrat">Formation Status</p>
                <p className="text-2xl font-bold text-[#1C1F3B]">
                  {verificationFlags.length === 0 ? 'Ready' : 'In Progress'}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-[#1C1F3B]/70 font-montserrat">Documents Generated</p>
                <p className="text-2xl font-bold text-[#1C1F3B]">
                  {intakeData ? '5' : '0'}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-[#C49A6C]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-[#1C1F3B]/70 font-montserrat">Flags</p>
                <p className="text-2xl font-bold text-[#1C1F3B]">
                  {verificationFlags.length}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#C49A6C]/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[#C49A6C] rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[#1C1F3B]/70 font-montserrat">Compliance</p>
                <p className="text-2xl font-bold text-[#1C1F3B]">
                  {verificationFlags.length === 0 ? 'Standard' : 'Enhanced'}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Ongoing Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">Ongoing Tasks</h2>
          <GlassCard variant="solid">
            <div className="p-6">
              {verificationFlags.length > 0 ? (
                <div className="space-y-4">
                  {verificationFlags.map((flag, index) => (
                    <div key={index} className="flex items-start p-6 bg-white/50 rounded-lg border border-white/20 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0 ${
                        flag.severity === 'high' ? 'bg-red-500' :
                        flag.severity === 'medium' ? 'bg-[#C49A6C]' : 'bg-emerald-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-[#1C1F3B] text-lg font-montserrat">{flag.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            flag.severity === 'high' ? 'bg-red-100 text-red-800' :
                            flag.severity === 'medium' ? 'bg-[#C49A6C]/20 text-[#C49A6C]' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {flag.severity === 'high' ? 'High Priority' :
                             flag.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}
                          </span>
                        </div>
                        <p className="text-[#1C1F3B]/80 mb-3 leading-relaxed font-lora">{flag.description}</p>
                        {flag.recommendation && (
                          <div className="bg-[#C49A6C]/10 border-l-4 border-[#C49A6C] p-4 rounded-r-lg mb-3">
                            <p className="text-sm text-[#1C1F3B]">
                              <span className="font-medium">Recommendation:</span> {flag.recommendation}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-[#1C1F3B]/70">
                          <span className="font-medium">Professional Type:</span>
                          <span className="ml-2 px-2 py-1 bg-[#1C1F3B]/10 rounded text-[#1C1F3B]">
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
                  <h3 className="text-lg font-medium text-[#1C1F3B] mb-2 font-montserrat">All Set!</h3>
                  <p className="text-[#1C1F3B]/70 font-lora">
                    Your UNA formation is proceeding smoothly with standard requirements.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Documents Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">UNA Agreement</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Your customized association agreement defining purpose, governance, and member rights.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </PremiumButton>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">EIN Registration Guide</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Step-by-step instructions to obtain your Employer Identification Number.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </PremiumButton>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">LP/UNA-128 Package</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Complete filing package for California LP/UNA-128 form.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </PremiumButton>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">DBA/FBN Registration Guide</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Step-by-step guide for registering your business name with your county.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </PremiumButton>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Financial Tracking Kit</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Templates and guidance for managing your UNA's finances and tracking.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </PremiumButton>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Client Agreement & Disclaimer</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Service agreement and important disclaimers for UNA formation services.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton
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
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </PremiumButton>
            </div>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Bank Account Opening Guide</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Mission-aligned banking recommendations and account setup guidance.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </PremiumButton>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Financial Templates Section */}
      <SectionContainer padding="md">
        <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">Financial Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Financial Tracking Template</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Excel/Google Sheets template for tracking income, expenses, and financial categories.
            </p>
            <PremiumButton size="sm" fullWidth className="opacity-50 cursor-not-allowed" disabled>
              <Download className="h-4 w-4 mr-2" />
              Coming Soon
            </PremiumButton>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Invoice Template</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Professional invoice template for client billing and payment tracking.
            </p>
            <PremiumButton size="sm" fullWidth className="opacity-50 cursor-not-allowed" disabled>
              <Download className="h-4 w-4 mr-2" />
              Coming Soon
            </PremiumButton>
          </GlassCard>

          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Notion Templates</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Advanced project management and financial tracking templates for Notion users.
            </p>
            <PremiumButton
              onClick={() => {
                // For now, just show a message about Notion templates
                alert('Notion templates coming soon! These will provide advanced project management and financial tracking capabilities.');
              }}
              variant="outline"
              size="sm"
              fullWidth
            >
              <Eye className="h-4 w-4 mr-2" />
              Coming Soon
            </PremiumButton>
          </GlassCard>

          {/* Emblem Designer Card */}
          <GlassCard variant="solid" padding="md">
            <div className="flex items-center mb-4">
              <Palette className="h-8 w-8 text-[#C49A6C]" />
              <h3 className="text-lg font-semibold ml-3 text-[#1C1F3B] font-montserrat">Emblem Upload</h3>
            </div>
            <p className="text-[#1C1F3B]/70 mb-4 font-lora">
              Upload and manage your organization's emblem for use in official documents and branding.
            </p>
            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </PremiumButton>
              <PremiumButton
                onClick={() => setShowEmblemDesigner(true)}
                size="sm"
              >
                <Palette className="h-4 w-4 mr-2" />
                {intakeData?.hasInsignia ? 'Manage Emblem' : 'Upload Emblem'}
              </PremiumButton>
            </div>
            {!intakeData?.hasInsignia && (
              <div className="mt-3 p-3 bg-[#C49A6C]/10 border border-[#C49A6C]/20 rounded-lg">
                <p className="text-sm text-[#1C1F3B]/70">
                  <strong>Tip:</strong> You can upload your emblem during intake, or upload one now using the emblem manager.
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Verification Status Section */}
      {verificationStatus && (
        <SectionContainer padding="md">
          <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">Verification Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard variant="solid" padding="md" className="text-center">
              <div className={`text-2xl font-bold mb-2 ${
                verificationStatus.documentsVerified ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {verificationStatus.documentsVerified ? '✓' : '✗'}
              </div>
              <div className="text-sm text-[#1C1F3B] font-montserrat">Documents Verified</div>
              <div className="text-xs text-[#1C1F3B]/70 mt-1 font-lora">
                {verificationStatus.documentsVerified ? 'All documents reviewed' : 'Pending review'}
              </div>
            </GlassCard>

            <GlassCard variant="solid" padding="md" className="text-center">
              <div className={`text-2xl font-bold mb-2 ${
                verificationStatus.referralVerified ? 'text-emerald-600' : 'text-[#C49A6C]'
              }`}>
                {verificationStatus.referralVerified ? 'Verified' : 'Pending'}
              </div>
              <div className="text-sm text-[#1C1F3B] font-montserrat">Referrals Verified</div>
              <div className="text-xs text-[#1C1F3B]/70 mt-1 font-lora">
                {verificationStatus.referralVerified ? 'No referrals needed' : 'Referrals pending'}
              </div>
            </GlassCard>

            <GlassCard variant="solid" padding="md" className="text-center">
              <div className={`text-2xl font-bold mb-2 ${
                verificationStatus.overallVerified ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {verificationStatus.overallVerified ? '✓' : '✗'}
              </div>
              <div className="text-sm text-[#1C1F3B] font-montserrat">Overall Status</div>
              <div className="text-xs text-[#1C1F3B]/70 mt-1 font-lora">
                {verificationStatus.overallVerified ? 'Verification complete' : 'Verification needed'}
              </div>
            </GlassCard>
          </div>

          {verificationStatus.verificationDate && (
            <div className="mt-6 text-center">
              <p className="text-sm text-white/90 font-lora">
                Last verified on {new Date(verificationStatus.verificationDate).toLocaleDateString()}
                {verificationStatus.verifiedBy && ` by ${verificationStatus.verifiedBy}`}
              </p>
            </div>
          )}
        </SectionContainer>
      )}

      {/* Next Steps */}
      <div className="bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] py-16">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6 font-montserrat">
              What's Next?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-white mb-3 font-montserrat">Immediate Actions:</h4>
                <ul className="text-white/90 space-y-2 font-lora">
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
                <h4 className="font-semibold text-white mb-3 font-montserrat">Ongoing Tasks:</h4>
                <ul className="text-white/90 space-y-2 font-lora">
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
              <GlassCard variant="solid" className="mt-8">
                <h4 className="font-semibold text-[#1C1F3B] mb-2 font-montserrat">State-Specific Note</h4>
                <p className="text-[#1C1F3B]/70 text-sm font-lora">
                  You've selected {intakeData.entityState}. While our platform is optimized for California UNAs,
                  the core documents and guidance apply to most states. You may need to check your state's
                  specific filing requirements and modify documents accordingly.
                </p>
              </GlassCard>
            )}
          </div>
        </SectionContainer>
      </div>
      
      {/* Schedule Dialog */}
      <ScheduleDialog
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
      />

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-[#1C1F3B]/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2">
            <GlassCard variant="solid">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-[#1C1F3B] font-montserrat">Verification Details</h3>
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="text-[#1C1F3B]/50 hover:text-[#1C1F3B]"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {verificationFlags.map((flag, index) => (
                    <div key={index} className="border border-[#1C1F3B]/20 rounded-lg p-4 bg-white/30">
                      <h4 className="font-medium text-[#1C1F3B] mb-2 font-montserrat">{flag.title}</h4>
                      <p className="text-[#1C1F3B]/80 mb-3 font-lora">{flag.description}</p>
                      {flag.recommendation && (
                        <div className="bg-[#C49A6C]/10 p-3 rounded">
                          <p className="text-sm text-[#1C1F3B]">
                            <strong>Recommendation:</strong> {flag.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="bg-gradient-to-r from-[#C49A6C]/20 to-[#C49A6C]/10 border border-[#C49A6C]/30 p-6 rounded-lg">
                    <h4 className="font-semibold text-[#1C1F3B] mb-4 text-lg font-montserrat">Next Steps</h4>
                    <div className="prose prose-sm max-w-none">
                      {getReferralGuidance(verificationFlags).split('\n').map((line, index) => {
                        if (line === 'Immediate Action Required' || line === 'Professional Guidance Recommended' || line === 'Strategic Considerations' || line === 'Ready for Next Steps?') {
                          return (
                            <h5 key={index} className="text-[#1C1F3B] font-semibold mt-4 mb-2 text-base font-montserrat">
                              {line}
                            </h5>
                          );
                        } else if (line.startsWith('•')) {
                          return (
                            <p key={index} className="text-[#1C1F3B]/80 mb-2 ml-4 font-lora">
                              {line}
                            </p>
                          );
                        } else if (line.trim() === '') {
                          return <div key={index} className="h-3"></div>;
                        } else {
                          return (
                            <p key={index} className="text-[#1C1F3B]/80 mb-2 font-lora">
                              {line}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <PremiumButton
                    href="/services"
                    variant="outline"
                  >
                    View Services
                  </PremiumButton>
                  <PremiumButton
                    onClick={() => setShowVerificationModal(false)}
                  >
                    Got It
                  </PremiumButton>
                </div>
              </div>
            </GlassCard>
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