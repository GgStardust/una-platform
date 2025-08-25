import { ArrowLeft, ArrowRight, Save, AlertCircle, CheckCircle, Lightbulb, Users, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { IntakeData } from '@/lib/types';
import { intakeFormSchema, IntakeFormData } from '@/lib/validation';
import { saveIntakeData } from '@/lib/storage';
import { downloadBlob } from '@/lib/generate';
import { mapExploreToIntake } from '@/lib/prefill';
import InsigniaUpload from '@/components/InsigniaUpload';
import { getSmartSuggestions, validateCaliforniaRequirements } from '@/lib/ai-engine';

interface IntakeProps {
  setIntakeData: (data: IntakeData | null) => void;
}

// California-only platform
const CA_ONLY = ['CA'];

export default function Intake({ setIntakeData }: IntakeProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [insigniaFile, setInsigniaFile] = useState<File | null>(null);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [generationMessage, setGenerationMessage] = useState<string | null>(null);
  const [isPrefilledFromExplore, setIsPrefilledFromExplore] = useState(false);
  const [intakeData, setLocalIntakeData] = useState<IntakeData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
    mode: 'onChange',
    defaultValues: {
      entityName: '',
      entityPurpose: '',
      entityActivities: '',
      entityStartDate: '',
      entityState: '',
      organizerName: '',
      organizerEmail: '',
      organizerPhone: '',
      organizerRole: '',
      organizerAddress: '',
      organizerCity: '',
      organizerState: '',
      organizerZip: '',
      mailingAddress: '',
      mailingCity: '',
      mailingState: '',
      mailingZip: '',
      mailingCountry: 'USA',
      needsEIN: false,
      einPurpose: '',
      taxExemptIntent: false,
      fiscalSponsorship: false,
    propertyPlans: '',
    grantPlans: '',
      fundraisingPlans: '',
      leadershipStructure: '',
      familyLeadership: false,
    successionPlanning: '',
      conflictOfInterest: false,
      hasInsignia: false,
      insigniaDescription: '',
      emblemStyle: '',
      emblemColors: '',
      interstateActivity: false,
      statesOfOperation: '',
      complianceNotes: '',
      organizerSignature: '',
      organizerSignatureDate: '',
      witnessSignature: '',
      witnessSignatureDate: ''
    }
  });

  const watchedValues = watch();

  // Prefill form with exploration data if available
  useEffect(() => {
    const exploreData = localStorage.getItem('explore');
    if (exploreData) {
      try {
        const explore = JSON.parse(exploreData);
        const intakePrefill = mapExploreToIntake(explore);
        
        // Only prefill if no existing intake data
        const existingIntake = localStorage.getItem('intake');
        if (!existingIntake) {
          let prefilledCount = 0;
          
          // Prefill form fields only if they don't already have values
          Object.entries(intakePrefill).forEach(([key, value]) => {
            if (value !== undefined) {
              const formKey = key as keyof IntakeFormData;
              const currentValue = watchedValues[formKey];
              
              // Only prefill if current field is empty/default
              const shouldPrefill = 
                currentValue === undefined || 
                currentValue === '' || 
                (Array.isArray(currentValue) && currentValue.length === 0) ||
                (typeof currentValue === 'boolean' && watchedValues[formKey] === false);
              
              if (shouldPrefill) {
                setValue(formKey, value);
                prefilledCount++;
              }
            }
          });
          
          // Show notice if any fields were prefilled
          if (prefilledCount > 0) {
            setIsPrefilledFromExplore(true);
          }
        }
      } catch (error) {
        console.error('Error parsing exploration data:', error);
      }
    }
  }, [setValue, watchedValues]);

  // Load existing intake data on mount
  useEffect(() => {
    const existingIntake = localStorage.getItem('intake');
    if (existingIntake) {
      try {
        const savedData = JSON.parse(existingIntake);
        // Restore form values from saved data
        Object.entries(savedData).forEach(([key, value]) => {
          if (key !== 'createdAt' && key !== 'updatedAt' && key !== 'insigniaFile') {
            const formKey = key as keyof IntakeFormData;
            setValue(formKey, value as any);
          }
        });
      } catch (error) {
        console.error('Error loading saved intake data:', error);
      }
    }
  }, [setValue]);

  // Save form progress as user types
  useEffect(() => {
    const formData = watchedValues;
    if (Object.keys(formData).some(key => formData[key as keyof IntakeFormData] !== '')) {
      // Only save if there's actual data
      const dataToSave = {
        ...formData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('intake_draft', JSON.stringify(dataToSave));
    }
  }, [watchedValues]);

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    try {
      // California-specific validation
      if (data.entityState === 'CA') {
        const californiaErrors = validateCaliforniaRequirements(data);
        if (californiaErrors.length > 0) {
          setGenerationStatus('error');
          setGenerationMessage(`California requirements not met: ${californiaErrors.join(', ')}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Emblem upload validation
      if (data.hasInsignia && !insigniaFile) {
        setGenerationStatus('error');
        setGenerationMessage('You indicated you have an organization emblem but no file was uploaded. Please upload your emblem file or uncheck the emblem option.');
        setIsSubmitting(false);
        return;
      }
      
      // Parse states of operation from comma-separated string
      const statesArray = data.statesOfOperation ? 
        data.statesOfOperation.split(',').map(s => s.trim()).filter(s => s.length > 0) : 
        undefined;

    const completeData: IntakeData = {
        ...data,
        statesOfOperation: statesArray,
        insigniaFile: insigniaFile || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
      // Save data and go to summary page (no PDF generation yet)
    saveIntakeData(completeData);
    setIntakeData(completeData);
      setLocalIntakeData(completeData);
      
      // Move to summary step
      setCurrentStep(8);

    } catch (error) {
      console.error('Error processing form data:', error);
      setGenerationStatus('error');
      setGenerationMessage(error instanceof Error ? error.message : 'Failed to process form data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Separate function for PDF generation
  const generateDocuments = async () => {
    console.log('generateDocuments called with intakeData:', intakeData);
    
    if (!intakeData) {
      console.error('No intake data available for document generation');
      setGenerationStatus('error');
      setGenerationMessage('No intake data available. Please complete the form first.');
      return;
    }
    
    setGenerationStatus('generating');
    setGenerationMessage('Generating documents...');
    
    try {
      // Generate documents based on state
      if (intakeData.entityState === 'CA') {
        // California users get ALL available documents
        const { 
          generateUnaAgreement,
          generateEinGuide,
          generateLpUna128,
          generateDbaGuide,
          generateFinancialTrackingKit,
          generateClientAgreement,
          generateBankAccountGuide
        } = await import('@/lib/generate');
        
        // Generate all documents in sequence
        const [
          unaAgreement,
          einGuide,
          lpUna128,
          dbaGuide,
          financialKit,
          clientAgreement,
          bankGuide
        ] = await Promise.all([
          generateUnaAgreement(intakeData),
          generateEinGuide(intakeData),
          generateLpUna128(intakeData),
          generateDbaGuide(intakeData),
          generateFinancialTrackingKit(intakeData),
          generateClientAgreement(intakeData),
          generateBankAccountGuide(intakeData)
        ]);
        
        // Download all documents
        downloadBlob(unaAgreement, `${intakeData.entityName} - UNA Agreement.pdf`, 'application/pdf');
        downloadBlob(einGuide, `${intakeData.entityName} - EIN Registration Guide.pdf`, 'application/pdf');
        downloadBlob(lpUna128, `${intakeData.entityName} - LP-UNA-128 Filing Package.pdf`, 'application/pdf');
        downloadBlob(dbaGuide, `${intakeData.entityName} - DBA Registration Guide.pdf`, 'application/pdf');
        downloadBlob(financialKit, `${intakeData.entityName} - Financial Tracking Kit.pdf`, 'application/pdf');
        downloadBlob(clientAgreement, `${intakeData.entityName} - Client Agreement & Disclaimer.pdf`, 'application/pdf');
        downloadBlob(bankGuide, `${intakeData.entityName} - Bank Account Opening Guide.pdf`, 'application/pdf');
      } else {
        // Out-of-state users get comprehensive guide
        const { generateOutOfStateGuide } = await import('@/lib/generate');
        const outOfStateGuide = await generateOutOfStateGuide(intakeData);
        
        downloadBlob(outOfStateGuide, `${intakeData.entityName} - Out-of-State UNA Formation Guide.pdf`, 'application/pdf');
      }
      
      setGenerationStatus('success');
      if (intakeData.entityState === 'CA') {
        setGenerationMessage('Complete UNA formation package generated and downloaded successfully!');
      } else {
        setGenerationMessage('Out-of-State Guide generated and downloaded successfully!');
      }

    } catch (error) {
      console.error('Error generating documents:', error);
      setGenerationStatus('error');
      setGenerationMessage(error instanceof Error ? error.message : 'Failed to generate documents. Please try again.');
    } finally {
      // Always reset loading state
      if (generationStatus === 'generating') {
        setGenerationStatus('idle');
      }
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Reset form function
  const resetForm = () => {
    // Clear localStorage
    localStorage.removeItem('intake');
    localStorage.removeItem('intake_draft');
    
    // Reset form values to defaults
    Object.keys(watch()).forEach(key => {
      const formKey = key as keyof IntakeFormData;
      if (typeof watch()[formKey] === 'boolean') {
        setValue(formKey, false as any);
      } else if (typeof watch()[formKey] === 'string') {
        setValue(formKey, '' as any);
      }
    });
    
    // Reset component state
    setCurrentStep(1);
    setInsigniaFile(null);
    setGenerationStatus('idle');
    setGenerationMessage(null);
    setIsPrefilledFromExplore(false);
    setLocalIntakeData(null);
    setIntakeData(null);
    
    console.log('Form reset completed');
  };

  // Get step label for progress bar
  const getStepLabel = (step: number): string => {
    switch (step) {
      case 1: return 'Entity';
      case 2: return 'Organizer';
      case 3: return 'Address';
      case 4: return 'Purpose';
      case 5: return 'Emblem';
      case 6: return 'Compliance';
      case 7: return 'Review';
      case 8: return 'Summary';
      default: return `Step ${step}`;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* UNA Philosophy Banner */}
            <div className="bg-gradient-to-r from-gold-50 to-cream-50 border border-gold-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-6 w-6 text-gold-600" />
                <h3 className="text-lg font-semibold text-navy-900">UNA Philosophy & Sovereignty</h3>
              </div>
              <div className="text-sm text-navy-800 space-y-2">
                <p><strong>Remember:</strong> A UNA is not just a legal container, it is a sovereignty practice. It affirms that structure should serve mission and creativity rather than constrain them.</p>
                <p>Your UNA governance is built for alignment, collaboration, and adaptability - not corporate compliance.</p>
                <div className="mt-3 pt-3 border-t border-gold-200">
                  <p className="text-xs text-navy-600">
                    <strong>Key Principles:</strong> Mission-first design • Flexible governance • Community-centered structure • Sovereignty practice
                  </p>
                </div>
              </div>
            </div>
            
            {/* Help Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-navy-900">Entity Information</h2>
              <div className="group relative">
                <button type="button" className="text-navy-400 hover:text-navy-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="w-64">
                    <p className="font-semibold mb-2">About Your UNA Organization</p>
                    <p className="mb-2">A Unincorporated Nonprofit Association (UNA) is a flexible legal structure that allows groups to operate collectively without formal incorporation while maintaining legal recognition.</p>
                    <p className="font-semibold mb-1">Key benefits:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>Simple formation process</li>
                      <li>Flexible governance structure</li>
                      <li>Legal recognition for contracts and property</li>
                      <li>Tax-exempt eligibility</li>
                      <li>Minimal ongoing compliance requirements</li>
                    </ul>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                </div>
              </div>
              <div className="text-xs text-navy-500">
                <Link to="/faq" className="text-gold-600 hover:text-gold-800 underline">
                  View full FAQ →
                </Link>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Entity Name *
              </label>
              <input
                {...register('entityName')}
                className={`input-field ${errors.entityName ? 'border-red-500' : ''}`}
                placeholder="Enter your organization's name"
              />
              {errors.entityName && (
                <p className="mt-1 text-sm text-red-600">{errors.entityName.message}</p>
              )}
              <p className="text-navy-500 text-xs mt-1">
                Choose a name that reflects your mission and is easy to remember. This will be used on all legal documents.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Entity Purpose *
              </label>
              <textarea
                {...register('entityPurpose')}
                className={`input-field h-24 ${errors.entityPurpose ? 'border-red-500' : ''}`}
                placeholder="Describe your organization's mission and purpose..."
              />
              {errors.entityPurpose && (
                <p className="mt-1 text-sm text-red-600">{errors.entityPurpose.message}</p>
              )}
              
              {/* Smart Suggestions */}
              {watchedValues.entityPurpose && watchedValues.entityPurpose.length > 10 && (
                <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-gold-600" />
                    <span className="text-sm font-medium text-navy-900">Smart Suggestions</span>
                  </div>
                  <div className="text-sm text-navy-800 space-y-2">
                    {(() => {
                      // Get explore data from localStorage for context
                      const exploreData = localStorage.getItem('explore');
                      let suggestions: any = {};
                      
                      if (exploreData) {
                        try {
                          const explore = JSON.parse(exploreData);
                          suggestions = getSmartSuggestions(
                            explore.mission || [], 
                            explore.currentForm || 'none',
                            explore.impact || []
                          );
                        } catch (e) {
                          console.log('Error parsing explore data:', e);
                        }
                      }
                      
                      return (
                        <>
                          {suggestions.entityPurpose && (
                            <p><strong>Purpose:</strong> {suggestions.entityPurpose}</p>
                          )}
                          {suggestions.governanceNotes && (
                            <p><strong>Governance:</strong> {suggestions.governanceNotes}</p>
                          )}
                          {suggestions.fundingApproach && (
                            <p><strong>Funding:</strong> {suggestions.fundingApproach}</p>
                          )}
                          {!suggestions.entityPurpose && (
                            <p><strong>Tip:</strong> Focus on your mission and how it serves the community. Be specific about what makes your organization unique.</p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Primary Activities *
              </label>
              <textarea
                {...register('entityActivities')}
                className={`input-field h-24 ${errors.entityActivities ? 'border-red-500' : ''}`}
                placeholder="What activities will your association engage in?"
              />
              {errors.entityActivities && (
                <p className="mt-1 text-sm text-red-600">{errors.entityActivities.message}</p>
              )}
              
              {/* Smart Activity Suggestions */}
              {watchedValues.entityActivities && watchedValues.entityActivities.length > 10 && (
                <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-900">Activity Suggestions</span>
                  </div>
                  <div className="text-sm text-emerald-800 space-y-2">
                    {(() => {
                      const exploreData = localStorage.getItem('explore');
                      let suggestions: any = {};
                      
                      if (exploreData) {
                        try {
                          const explore = JSON.parse(exploreData);
                          suggestions = getSmartSuggestions(
                            explore.mission || [], 
                            explore.currentForm || 'none',
                            explore.impact || []
                          );
                        } catch (e) {
                          console.log('Error parsing explore data:', e);
                        }
                      }
                      
                      return (
                        <>
                          {suggestions.entityActivities && (
                            <p><strong>Activities:</strong> {suggestions.entityActivities}</p>
                          )}
                          {suggestions.commonPitfalls && suggestions.commonPitfalls.length > 0 && (
                            <div>
                              <p className="font-medium mb-1">Common Pitfalls to Avoid:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {suggestions.commonPitfalls.map((pitfall: string, index: number) => (
                                  <li key={index}>{pitfall}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {!suggestions.entityActivities && (
                            <p><strong>Tip:</strong> List specific programs, services, or initiatives. Be concrete about what you'll actually do to fulfill your mission.</p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  {...register('entityStartDate')}
                  className={`input-field ${errors.entityStartDate ? 'border-red-500' : ''}`}
                />
                {errors.entityStartDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.entityStartDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  State of Formation *
                </label>
                <select
                  {...register('entityState')}
                  className={`input-field ${errors.entityState ? 'border-red-500' : ''}`}
                >
                  <option value="">Select State</option>
                  {CA_ONLY.map(state => (
                    <option key={state} value={state}>{state === 'CA' ? 'California' : state}</option>
                  ))}
                </select>
                {errors.entityState && (
                  <p className="mt-1 text-sm text-red-600">{errors.entityState.message}</p>
                )}
                
                {/* CA-only notice */}
                <p className="mt-2 text-sm text-gold-600">
                  Our platform is currently optimized for California-based organizations.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            {/* Help Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-navy-900">Organizer Information</h2>
              <div className="group relative">
                <button type="button" className="text-navy-400 hover:text-navy-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="w-64">
                    <p className="font-semibold mb-2">About the Organizer</p>
                    <p className="mb-2">The Organizer is the person responsible for forming and initially managing the UNA. This person will be listed on all legal documents and filings.</p>
                    <p className="font-semibold mb-1">Organizer responsibilities include:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>Filing the LP/UNA-128 form with California Secretary of State</li>
                      <li>Applying for the EIN with the IRS</li>
                      <li>Opening the business bank account</li>
                      <li>Managing initial compliance requirements</li>
                      <li>Coordinating with other members</li>
                    </ul>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Organizer Name *
              </label>
              <input
                {...register('organizerName')}
                className={`input-field ${errors.organizerName ? 'border-red-500' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.organizerName && (
                <p className="mt-1 text-sm text-red-600">{errors.organizerName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Email Address *
                </label>
              <input
                type="email"
                  {...register('organizerEmail')}
                  className={`input-field ${errors.organizerEmail ? 'border-red-500' : ''}`}
                placeholder="Enter your email address"
              />
                {errors.organizerEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerEmail.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Phone Number *
                </label>
              <input
                  type="tel"
                  {...register('organizerPhone')}
                  className={`input-field ${errors.organizerPhone ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.organizerPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerPhone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Role in Organization *
              </label>
              <input
                {...register('organizerRole')}
                className={`input-field ${errors.organizerRole ? 'border-red-500' : ''}`}
                placeholder="e.g., Founder, Organizer, Member"
              />
              {errors.organizerRole && (
                <p className="mt-1 text-sm text-red-600">{errors.organizerRole.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Address *
              </label>
              <input
                {...register('organizerAddress')}
                className={`input-field ${errors.organizerAddress ? 'border-red-500' : ''}`}
                placeholder="Enter your street address"
              />
              {errors.organizerAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.organizerAddress.message}</p>
              )}
          </div>
      
            <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  City *
                </label>
                <input
                  {...register('organizerCity')}
                  className={`input-field ${errors.organizerCity ? 'border-red-500' : ''}`}
                  placeholder="City"
                />
                {errors.organizerCity && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerCity.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  State *
                </label>
                <select
                  {...register('organizerState')}
                  className={`input-field ${errors.organizerState ? 'border-red-500' : ''}`}
                >
                  <option value="">Select State</option>
                  {CA_ONLY.map(state => (
                    <option key={state} value={state}>{state === 'CA' ? 'California' : state}</option>
                  ))}
                </select>
                {errors.organizerState && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerState.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  {...register('organizerZip')}
                  className={`input-field ${errors.organizerZip ? 'border-red-500' : ''}`}
                  placeholder="ZIP Code"
                />
                {errors.organizerZip && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerZip.message}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            {/* Help Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-navy-900">Mailing Address & EIN Needs</h2>
              <div className="group relative">
                <button type="button" className="text-navy-400 hover:text-navy-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="w-64">
                    <p className="font-semibold mb-2">About Your Mailing Address</p>
                    <p className="mb-2">Your Mailing Address is where official correspondence, legal documents, and government notices will be sent. This address will appear on all public filings and legal documents.</p>
                    <p className="font-semibold mb-1">This address will be used for:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>LP/UNA-128 filing with California Secretary of State</li>
                      <li>EIN application with the IRS</li>
                      <li>Bank account opening</li>
                      <li>Tax filings and compliance notices</li>
                      <li>Legal and regulatory correspondence</li>
                    </ul>
                    <p className="mt-2 text-xs">Note: This should be a physical address where you can receive mail, not a P.O. box.</p>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Mailing Address *
              </label>
              <input
                {...register('mailingAddress')}
                className={`input-field ${errors.mailingAddress ? 'border-red-500' : ''}`}
                placeholder="Enter your organization's mailing address"
              />
              {errors.mailingAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.mailingAddress.message}</p>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  City *
                </label>
                <input
                  {...register('mailingCity')}
                  className={`input-field ${errors.mailingCity ? 'border-red-500' : ''}`}
                  placeholder="City"
                />
                {errors.mailingCity && (
                  <p className="mt-1 text-sm text-red-600">{errors.mailingCity.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  State *
                </label>
              <select
                  {...register('mailingState')}
                  className={`input-field ${errors.mailingState ? 'border-red-500' : ''}`}
                >
                  <option value="">Select State</option>
                  {CA_ONLY.map(state => (
                    <option key={state} value={state}>{state === 'CA' ? 'California' : state}</option>
                  ))}
              </select>
                {errors.mailingState && (
                  <p className="mt-1 text-sm text-red-600">{errors.mailingState.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  {...register('mailingZip')}
                  className={`input-field ${errors.mailingZip ? 'border-red-500' : ''}`}
                  placeholder="ZIP Code"
                />
                {errors.mailingZip && (
                  <p className="mt-1 text-sm text-red-600">{errors.mailingZip.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Country *
                </label>
                <input
                  {...register('mailingCountry')}
                  className={`input-field ${errors.mailingCountry ? 'border-red-500' : ''}`}
                  placeholder="Country"
                />
                {errors.mailingCountry && (
                  <p className="mt-1 text-sm text-red-600">{errors.mailingCountry.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-navy-900">EIN & Tax Information</h3>
              
              {/* Help Icon */}
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-medium text-navy-900">EIN & Tax Information</h3>
                <div className="group relative">
                  <button type="button" className="text-navy-400 hover:text-navy-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    <div className="w-64">
                      <p className="font-semibold mb-2">Why You Need an EIN</p>
                      <p className="mb-2">An Employer Identification Number (EIN) is required for all UNA organizations in California. This is your organization's "social security number" for business purposes.</p>
                      <p className="font-semibold mb-1">You need an EIN to:</p>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>Open a business bank account</li>
                        <li>File tax returns</li>
                        <li>Apply for grants and funding</li>
                        <li>Hire employees or contractors</li>
                        <li>Establish credit for your organization</li>
                      </ul>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* EIN is required - not optional */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-800 font-medium">EIN Required for UNA Formation</span>
                  </div>
                  <p className="text-emerald-700 text-sm mt-1">
                    All California UNA organizations must obtain an EIN from the IRS.
                  </p>
                </div>
                


                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('taxExemptIntent')}
                    className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300 rounded"
                  />
                  <span className="ml-2 text-sm text-navy-700">We intend to apply for 501(c)(3) tax-exempt status</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('fiscalSponsorship')}
                    className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300 rounded"
                  />
                  <span className="ml-2 text-sm text-navy-700">We will operate under fiscal sponsorship</span>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-navy-900">Plans & Governance</h2>
            
            {/* Help Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-navy-900">Plans & Governance</h2>
              <div className="group relative">
                <button type="button" className="text-navy-400 hover:text-navy-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="w-64">
                    <p className="font-semibold mb-2">Planning for Your UNA's Future</p>
                    <p className="mb-2">While these plans are optional, thinking ahead helps establish a solid foundation for your organization's growth and ensures you're prepared for future opportunities and challenges.</p>
                    <p className="font-semibold mb-1">Why planning matters:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>Helps attract funding and support</li>
                      <li>Guides decision-making and resource allocation</li>
                      <li>Demonstrates organizational maturity to stakeholders</li>
                      <li>Prepares you for compliance and reporting requirements</li>
                      <li>Makes your UNA more attractive to potential partners</li>
                    </ul>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-navy-900">Financial & Property Plans</h3>
              
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Property Plans (Optional)
                </label>
                <textarea
                  {...register('propertyPlans')}
                  className={`input-field h-20 ${errors.propertyPlans ? 'border-red-500' : ''}`}
                  placeholder="Describe any plans for property ownership or management..."
                />
                {errors.propertyPlans && (
                  <p className="mt-1 text-sm text-red-600">{errors.propertyPlans.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Grant Plans (Optional)
                </label>
                <textarea
                  {...register('grantPlans')}
                  className={`input-field h-20 ${errors.grantPlans ? 'border-red-500' : ''}`}
                  placeholder="Describe any plans for grant funding..."
                />
                {errors.grantPlans && (
                  <p className="mt-1 text-sm text-red-600">{errors.grantPlans.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Fundraising Plans (Optional)
                </label>
                <textarea
                  {...register('fundraisingPlans')}
                  className={`input-field h-20 ${errors.fundraisingPlans ? 'border-red-500' : ''}`}
                  placeholder="Describe any fundraising activities..."
                />
                {errors.fundraisingPlans && (
                  <p className="mt-1 text-sm text-red-600">{errors.fundraisingPlans.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-navy-900">Leadership & Governance</h3>
              
              {/* Help Icon */}
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-medium text-navy-900">Leadership & Governance</h3>
                <div className="group relative">
                  <button type="button" className="text-navy-400 hover:text-navy-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    <div className="w-64">
                      <p className="font-semibold mb-2">Building Your UNA's Leadership</p>
                      <p className="mb-2">UNA organizations thrive with clear leadership structures that balance flexibility with accountability. Good governance helps ensure your organization can grow sustainably.</p>
                      <p className="font-semibold mb-1">Leadership considerations:</p>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>How decisions are made (consensus, voting, designated leaders)</li>
                        <li>Who has authority for different types of decisions</li>
                        <li>How new leaders are selected or appointed</li>
                        <li>Process for resolving conflicts or disagreements</li>
                        <li>Accountability and transparency measures</li>
                      </ul>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Leadership Structure *
                </label>
                <textarea
                  {...register('leadershipStructure')}
                  className={`input-field h-20 ${errors.leadershipStructure ? 'border-red-500' : ''}`}
                  placeholder="Describe how decisions are made and who leads the organization..."
                />
                {errors.leadershipStructure && (
                  <p className="mt-1 text-sm text-red-600">{errors.leadershipStructure.message}</p>
                )}
                
                {/* Leadership Guidance */}
                {watchedValues.leadershipStructure && watchedValues.leadershipStructure.length > 10 && (
                  <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-gold-600" />
                      <span className="text-sm font-medium text-navy-900">Leadership Guidance</span>
                    </div>
                    <div className="text-sm text-navy-800 space-y-2">
                      {(() => {
                        const exploreData = localStorage.getItem('explore');
                        let suggestions: any = {};
                        
                        if (exploreData) {
                          try {
                            const explore = JSON.parse(exploreData);
                            suggestions = getSmartSuggestions(
                              explore.mission || [], 
                              explore.currentForm || 'none',
                              explore.impact || []
                            );
                          } catch (e) {
                            console.log('Error parsing explore data:', e);
                          }
                        }
                        
                        return (
                          <>
                            {suggestions.leadershipStructure && (
                              <p><strong>Structure:</strong> {suggestions.leadershipStructure}</p>
                            )}
                            <div className="mt-2">
                              <p className="font-medium mb-1">UNA Best Practices:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Start with small member councils (3-5 people)</li>
                                <li>Consider rotating leadership roles to build capacity</li>
                                <li>Define clear decision-making processes</li>
                                <li>Balance autonomy with collective responsibility</li>
                              </ul>
                            </div>
                            {!suggestions.leadershipStructure && (
                              <p className="mt-2"><strong>Tip:</strong> Focus on how decisions are made collectively, not just who's in charge. UNA governance is built for alignment and collaboration.</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('familyLeadership')}
                    className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300 rounded"
                  />
                  <span className="ml-2 text-sm text-navy-700">Family members will be in leadership roles</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('conflictOfInterest')}
                    className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300 rounded"
                  />
                  <span className="ml-2 text-sm text-navy-700">Potential conflicts of interest exist</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Succession Planning (Optional)
                </label>
                <textarea
                  {...register('successionPlanning')}
                  className={`input-field h-20 ${errors.successionPlanning ? 'border-red-500' : ''}`}
                  placeholder="Describe any succession planning considerations..."
                />
                {errors.successionPlanning && (
                  <p className="mt-1 text-sm text-red-600">{errors.successionPlanning.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-navy-900">Insignia & Compliance</h2>
            
            {/* Help Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-navy-900">Insignia & Compliance</h2>
              <div className="group relative">
                <button type="button" className="text-navy-400 hover:text-navy-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="w-64">
                    <p className="font-semibold mb-2">Branding & Legal Identity</p>
                    <p className="mb-2">Your organization's insignia and compliance setup help establish your professional identity and ensure you operate within legal boundaries. This information helps with branding and legal protection.</p>
                    <p className="font-semibold mb-1">Insignia benefits:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>Professional appearance and recognition</li>
                      <li>Brand consistency across materials</li>
                      <li>Legal protection for your visual identity</li>
                      <li>Enhanced credibility with stakeholders</li>
                      <li>Marketing and outreach effectiveness</li>
                    </ul>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-navy-900">Organization Emblem & Branding</h3>
              <p className="text-sm text-navy-600 mb-4">
                If you have an organization emblem, you can upload it here. It will be included in your UNA documentation.
              </p>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('hasInsignia')}
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300 rounded"
                />
                <span className="ml-2 text-sm text-navy-700">We have an organization emblem to upload</span>
              </label>

              {watchedValues.hasInsignia && (
                <div className="space-y-4">
                  {/* Emblem Upload */}
                  <div>
                    <h4 className="font-medium text-navy-900 mb-3">Upload Your Organization Emblem</h4>
                    <p className="text-sm text-navy-600 mb-3">
                      Upload your emblem file. This will be included in your UNA documentation and SoS filing.
                    </p>
                    <InsigniaUpload
                      onFileSelect={(file) => setInsigniaFile(file)}
                      onFileRemove={() => setInsigniaFile(null)}
                      selectedFile={insigniaFile || undefined}
                      description=""
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-navy-900">Compliance & Legal</h3>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('interstateActivity')}
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300 rounded"
                />
                <span className="ml-2 text-sm text-navy-700">We will operate in multiple states</span>
              </label>

              {watchedValues.interstateActivity && (
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    States of Operation
                  </label>
                  <input
                    {...register('statesOfOperation')}
                    className={`input-field ${errors.statesOfOperation ? 'border-red-500' : ''}`}
                    placeholder="e.g., CA, NY, TX (comma separated)"
                  />
                  {errors.statesOfOperation && (
                    <p className="mt-1 text-sm text-red-600">{errors.statesOfOperation.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Compliance Notes (Optional)
                </label>
                <textarea
                  {...register('complianceNotes')}
                  className={`input-field h-20 ${errors.complianceNotes ? 'border-red-500' : ''}`}
                  placeholder="Any additional compliance considerations..."
                />
                {errors.statesOfOperation && (
                  <p className="mt-1 text-sm text-red-600">{errors.statesOfOperation.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-navy-900">Signatures & Review</h2>
            
            {/* Help Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-navy-900">Signatures & Review</h2>
              <div className="group relative">
                <button type="button" className="text-navy-400 hover:text-navy-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="w-64">
                    <p className="font-semibold mb-2">Finalizing Your UNA Formation</p>
                    <p className="mb-2">This is the final step in your UNA formation process. Your signatures make this agreement legally binding and establish the foundation for your organization's operations.</p>
                    <p className="font-semibold mb-1">What happens after you sign:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>Your UNA Agreement becomes legally binding</li>
                      <li>You can proceed with LP/UNA-128 filing</li>
                      <li>EIN application can be submitted</li>
                      <li>Bank account opening process can begin</li>
                      <li>Your organization is officially recognized</li>
                    </ul>
                    <p className="mt-2 text-xs">Note: Digital signatures are legally valid for UNA formation in California.</p>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-900"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-cream-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-medium text-navy-900">Form Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                  <span className="font-medium text-navy-700">Entity Name:</span> {watchedValues.entityName}
              </div>
              <div>
                  <span className="font-medium text-navy-700">Organizer:</span> {watchedValues.organizerName}
              </div>
              <div>
                  <span className="font-medium text-navy-700">State:</span> {watchedValues.entityState}
              </div>
              <div>
                  <span className="font-medium text-navy-700">EIN Needed:</span> {watchedValues.needsEIN ? 'Yes' : 'No'}
              </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-navy-900">Digital Signatures</h3>
              
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Organizer Signature *
                </label>
                <input
                  {...register('organizerSignature')}
                  className={`input-field ${errors.organizerSignature ? 'border-red-500' : ''}`}
                  placeholder="Type your full name as signature"
                />
                {errors.organizerSignature && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerSignature.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Organizer Signature Date *
                </label>
                <input
                  type="date"
                  {...register('organizerSignatureDate')}
                  className={`input-field ${errors.organizerSignatureDate ? 'border-red-500' : ''}`}
                />
                {errors.organizerSignatureDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerSignatureDate.message}</p>
                )}
            </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Witness Signature *
                </label>
                <input
                  {...register('witnessSignature')}
                  className={`input-field ${errors.witnessSignature ? 'border-red-500' : ''}`}
                  placeholder="Type witness full name as signature"
                />
                {errors.witnessSignature && (
                  <p className="mt-1 text-sm text-red-600">{errors.witnessSignature.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Witness Signature Date *
                </label>
                <input
                  type="date"
                  {...register('witnessSignatureDate')}
                  className={`input-field ${errors.witnessSignatureDate ? 'border-red-500' : ''}`}
                />
                {errors.witnessSignatureDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.witnessSignatureDate.message}</p>
                )}
              </div>
            </div>

            <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
              <p className="text-sm text-navy-800">
                <strong>Important:</strong> By submitting this form, you certify that all information provided is true and accurate to the best of your knowledge. 
                This information will be used to generate your UNA formation documents.
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-navy-900">Review & Generate Documents</h2>
            
            <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Ready to Generate Your UNA Documents</h3>
              <p className="text-navy-800 mb-4">
                Review your information below, then click "Generate Documents" to create your complete UNA formation package.
              </p>
              
              {/* Emblem Section */}
              {watchedValues.hasInsignia && (
                <div className="bg-white border border-gold-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-navy-900 mb-2">📁 Emblem Upload</h4>
                  <p className="text-navy-700 text-sm">
                    You've uploaded an organization emblem. This will be included in your UNA documentation.
                  </p>
                </div>
              )}
              
              <div className="text-sm text-navy-700">
                <strong>Your package will include:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>UNA Agreement (customized for your organization)</li>
                  <li>EIN Registration Guide</li>
                  <li>LP/UNA-128 Filing Package</li>
                  <li>DBA/FBN Registration Guide</li>
                  <li>Financial Tracking Kit</li>
                  <li>Client Agreement & Disclaimer</li>
                  <li>Bank Account Opening Guide</li>
                </ul>
              </div>
            </div>

            {/* Summary Information */}
            <div className="bg-cream-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-navy-900 mb-4">Application Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-navy-700">Entity Name:</span>
                    <p className="text-navy-900">{watchedValues.entityName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-700">Organizer:</span>
                    <p className="text-navy-900">{watchedValues.organizerName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-700">State:</span>
                    <p className="text-navy-900">{watchedValues.entityState}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-700">EIN Required:</span>
                    <p className="text-navy-900">Yes (Required for all UNAs)</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-navy-700">Tax-Exempt Intent:</span>
                    <p className="text-navy-900">{watchedValues.taxExemptIntent ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-700">Fiscal Sponsorship:</span>
                    <p className="text-navy-900">{watchedValues.fiscalSponsorship ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-700">Family Leadership:</span>
                    <p className="text-navy-900">{watchedValues.familyLeadership ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-700">Emblem Upload:</span>
                    <p className="text-navy-900">{watchedValues.hasInsignia ? 'File uploaded' : 'No emblem'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm text-emerald-800">
                <strong>Next Steps:</strong> After document generation, you'll see a summary of what was created and can then go to your dashboard to review and download all documents.
              </p>
            </div>

            {/* Generate Documents Button */}
            <div className="text-center space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-gold-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Documents...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Generate Documents
                  </>
                )}
              </button>
              
              {/* Manual Next Button (for users who want to skip generation) */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={nextStep}
                  className="text-gold-600 hover:text-gold-800 text-sm font-medium underline"
                >
                  Skip to Summary →
                </button>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
                generationStatus === 'success' ? 'bg-emerald-100' : 'bg-gold-100'
              }`}>
                {generationStatus === 'success' ? (
                  <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">
                {generationStatus === 'success' ? 'Documents Generated Successfully!' : 'Review Complete!'}
              </h2>
              <p className="text-lg text-navy-600 mb-8">
                {generationStatus === 'success' 
                  ? 'Your UNA formation package has been created and downloaded. Here\'s what you received:'
                  : 'Your information has been saved. Generate your UNA formation documents below:'
                }
              </p>
            </div>

            {/* Documents Generated Summary */}
            <div className="bg-white border border-navy-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Your Complete UNA Formation Package</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-navy-900 text-lg">Core Legal Documents</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      UNA Agreement
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      EIN Registration Guide
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      LP/UNA-128 Filing Package
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-navy-900 text-lg">Supporting Materials</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-gold-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      DBA Registration Guide
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-gold-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Financial Tracking Kit
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-gold-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Client Agreement & Disclaimer
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-gold-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Bank Account Opening Guide
                    </li>
                  </ul>
                </div>
              </div>
              

            </div>

            {/* Next Steps */}
            <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-navy-900">Review Your Documents</h4>
                    <p className="text-sm text-navy-700">Go to your dashboard to review and download all documents</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-navy-900">Complete EIN Registration</h4>
                    <p className="text-sm text-navy-700">Use the EIN guide to register with the IRS</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-navy-900">File LP/UNA-128</h4>
                    <p className="text-sm text-navy-700">Submit your formation documents to the Secretary of State</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-navy-900">Set Up Financial Systems</h4>
                    <p className="text-sm text-navy-700">Use the financial tracking kit to organize your bookkeeping</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Documents Section */}
            <div className="text-center space-y-4">
              {/* Debug info */}
              <div className="text-sm text-navy-600 bg-cream-50 p-3 rounded-lg">
                <p><strong>Debug Info:</strong></p>
                <p>Intake data available: {intakeData ? 'Yes' : 'No'}</p>
                <p>Generation status: {generationStatus}</p>
                {intakeData && (
                  <p>Entity: {intakeData.entityName} | State: {intakeData.entityState}</p>
                )}
              </div>
              
              {generationStatus === 'idle' && (
                <button
                  type="button"
                  onClick={generateDocuments}
                  className="bg-emerald-600 text-white px-12 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center mx-auto text-lg"
                >
                  <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate & Download Documents
                </button>
              )}
              
              {generationStatus === 'generating' && (
                <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold-600"></div>
                    <div className="text-navy-800">
                      <p className="font-medium">Generating Documents...</p>
                      <p className="text-sm">{generationMessage}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {generationStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-red-800">
                      <p className="font-medium">Error</p>
                      <p className="text-sm">{generationMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={prevStep}
                className="bg-navy-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-600 transition-colors flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Review
              </button>
              
              {generationStatus === 'success' && (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="bg-gold-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gold-700 transition-colors flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go to Dashboard
                </button>
              )}
              
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-navy-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-navy-700 transition-colors flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4a2 2 0 002 2h6a2 2 0 002 2z" />
                </svg>
                Print Summary
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Progress Bar with Clickable Steps */}
      <div className="bg-white border-b border-navy-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-navy-900">Your UNA Formation Journey</span>
              <span className="text-sm font-medium text-gold-600 bg-gold-50 px-3 py-1 rounded-full">
                Step {currentStep} of 8
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-navy-500">
                {Math.round((currentStep / 8) * 100)}% Complete
              </span>
              <div className="text-xs text-navy-400 mt-1">
                {currentStep === 1 && "Getting Started"}
                {currentStep === 2 && "Mission & Purpose"}
                {currentStep === 3 && "Organizer Details"}
                {currentStep === 4 && "Mailing Address"}
                {currentStep === 5 && "Legal Requirements"}
                {currentStep === 6 && "Governance Structure"}
                {currentStep === 7 && "Signatures"}
                {currentStep === 8 && "Document Generation"}
              </div>
            </div>
          </div>
          
          {/* Clickable Step Indicators */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => {
              const isCompleted = step < currentStep;
              const isCurrent = step === currentStep;
              const isAccessible = step <= currentStep || isCompleted;
              
              return (
                <button
                  key={step}
                  onClick={() => isAccessible && setCurrentStep(step)}
                  disabled={!isAccessible}
                  className={`flex flex-col items-center space-y-2 transition-all duration-200 ${
                    isAccessible ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  {/* Step Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-gold-600 text-white ring-4 ring-gold-200' 
                      : isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-navy-200 text-navy-600'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
            </div>
                  
                  {/* Step Label */}
                  <span className={`text-xs font-medium transition-colors duration-200 ${
                    isCurrent 
                      ? 'text-gold-600' 
                      : isCompleted 
                        ? 'text-emerald-600' 
                        : 'text-navy-500'
                  }`}>
                    {getStepLabel(step)}
                  </span>
                  
                  {/* Motivational Message for Current Step */}
                  {isCurrent && (
                    <div className="absolute top-full mt-2 w-32 text-center">
                      <div className="bg-gold-600 text-white text-xs px-2 py-1 rounded-lg">
                        {step === 1 && "Let's begin!"}
                        {step === 2 && "Define your mission"}
                        {step === 3 && "Tell us about you"}
                        {step === 4 && "Set your address"}
                        {step === 5 && "Legal compliance"}
                        {step === 6 && "Build structure"}
                        {step === 7 && "Almost there!"}
                        {step === 8 && "Generate docs"}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-4">
            <div className="bg-navy-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-gold-500 to-gold-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              ></div>
            </div>
            
            {/* Motivational Progress Message */}
            <div className="mt-3 p-3 bg-gradient-to-r from-gold-50 to-cream-50 rounded-lg border border-gold-200">
              <p className="text-sm text-navy-800 text-center">
                {currentStep <= 2 && "You're defining the foundation of your organization"}
                {currentStep > 2 && currentStep <= 4 && "Building your organizational identity"}
                {currentStep > 4 && currentStep <= 6 && "Ensuring legal compliance and structure"}
                {currentStep > 6 && currentStep <= 7 && "Finalizing your formation"}
                {currentStep === 8 && "Ready to generate your documents!"}
              </p>
            </div>
          </div>
            </div>
          </div>

      {/* Form Content */}
                  <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                                        {/* CA-Only Notice */}
                    <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-navy-800 mb-2">California-Only Platform</h3>
                          <p className="text-navy-700 text-sm">
                            This platform is specifically designed for California UNA formation. All documents and guidance 
                            are optimized for California requirements and regulations.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="ml-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center"
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Reset Form
                        </button>
        </div>
      </div>

                    {/* Status Banner */}
                    {generationStatus !== 'idle' && (
          <div className="mb-6">
            {generationStatus === 'generating' && (
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold-600"></div>
                  <div className="text-navy-800">
                    <p className="font-medium">Generating Documents</p>
                    <p className="text-sm">{generationMessage}</p>
      </div>
                </div>
              </div>
            )}
            
            {generationStatus === 'success' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div className="text-emerald-800">
                    <p className="font-medium">Success!</p>
                    <p className="text-sm">{generationMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            {generationStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div className="text-red-800">
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{generationMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prefill Notice */}
        {isPrefilledFromExplore && (
          <div className="mb-6">
            <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-gold-600" />
                <div className="text-navy-800">
                  <p className="font-medium">Prefilled from Exploration Mode</p>
                  <p className="text-sm">Some fields have been filled based on your exploration responses. You can modify any of these values.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-navy-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-navy-100 text-navy-400 cursor-not-allowed'
                  : 'bg-navy-200 text-navy-700 hover:bg-navy-300'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            
            {currentStep < 7 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : currentStep === 7 ? (
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`btn-primary flex items-center ${
                  !isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Save className="h-4 w-4 mr-2 animate-spin" />
                    Moving to Summary...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Review Complete
                  </>
                )}
              </button>
            ) : (
              // Step 8 - no submit button needed here, use buttons in the step content
              <div></div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
} 