import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IntakeData } from '@/lib/types';
import { intakeFormSchemaLegacy } from '@/lib/validation';
import { saveIntake, loadIntake, mapFormDataToIntake, mapIntakeToFormData } from '@/lib/supabase/intake';
import { z } from 'zod';

type IntakeFormData = z.infer<typeof intakeFormSchemaLegacy>;
import IntakeGuard from '@/components/IntakeGuard';
import OriginalIntake from './Intake';

interface IntakeWithSupabaseProps {
  setIntakeData: (data: IntakeData | null) => void;
}

export default function IntakeWithSupabase({ setIntakeData }: IntakeWithSupabaseProps) {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const paymentId = searchParams.get('payment_id');
  const bookingId = searchParams.get('booking_id');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchemaLegacy),
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

  // Load existing intake data on mount
  useEffect(() => {
    const loadExistingData = async () => {
      if (!paymentId || !bookingId) return;

      try {
        setIsLoading(true);
        const existingData = await loadIntake(paymentId, bookingId);
        
        if (existingData) {
          const formData = mapIntakeToFormData(existingData);
          
          // Reset form with loaded data
          reset(formData);
          // Loaded existing intake data from Supabase
        }
      } catch (error) {
        console.error('Error loading intake data:', error);
        setSaveError('Failed to load existing data');
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, [paymentId, bookingId, reset]);

  // Auto-save on form changes
  useEffect(() => {
    if (!paymentId || !bookingId || isLoading) return;

    const autoSave = async () => {
      try {
        setIsSaving(true);
        setSaveError(null);
        
        const intakeData = mapFormDataToIntake(watchedValues, paymentId, bookingId);
        await saveIntake(intakeData);
        
        // Auto-saved intake data to Supabase
      } catch (error) {
        console.error('Error auto-saving intake data:', error);
        setSaveError('Failed to save data');
      } finally {
        setIsSaving(false);
      }
    };

    // Debounce auto-save
    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, paymentId, bookingId, isLoading]);

  // Enhanced onSubmit that saves to Supabase
  const onSubmit = async (data: IntakeFormData) => {
    if (!paymentId || !bookingId) {
      setSaveError('Missing payment or booking information');
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      // Parse states of operation from comma-separated string
      const statesArray = data.statesOfOperation ? 
        data.statesOfOperation.split(',').map(s => s.trim()).filter(s => s.length > 0) : 
        undefined;

      const completeData: IntakeData = {
        ...data,
        statesOfOperation: statesArray,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to Supabase
      const intakeRecord = mapFormDataToIntake(completeData, paymentId, bookingId);
      await saveIntake(intakeRecord);

      // Also save to localStorage for backward compatibility
      setIntakeData(completeData);
      
      // Successfully saved intake data to Supabase
    } catch (error) {
      console.error('Error saving intake data:', error);
      setSaveError('Failed to save data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1F3B] via-[#2F7E7E] to-[#7A4CA0] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading your intake form...</p>
        </div>
      </div>
    );
  }

  return (
    <IntakeGuard>
      <div className="min-h-screen bg-cream-50">
        {/* Save Status Indicator */}
        <div className="bg-white border-b border-navy-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy-600"></div>
                    <span className="text-sm text-navy-600">Saving...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">All changes saved</span>
                  </>
                )}
              </div>
              
              {saveError && (
                <div className="text-sm text-red-600">
                  {saveError}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render the original Intake component with enhanced props */}
        <OriginalIntake 
          setIntakeData={setIntakeData}
          // Pass the enhanced form methods
          formMethods={{
            register: register as (name: string, options?: Record<string, unknown>) => Record<string, unknown>,
            handleSubmit: handleSubmit as (onSubmit: (data: IntakeFormData) => void) => (e?: React.FormEvent) => void,
            watch: watch as (name?: string) => any,
            setValue: setValue as (name: string, value: unknown) => void,
            reset: reset as (values?: Partial<IntakeFormData>) => void,
            formState: { errors, isValid }
          }}
          onSubmit={onSubmit}
          isSaving={isSaving}
          saveError={saveError}
        />
      </div>
    </IntakeGuard>
  );
}


