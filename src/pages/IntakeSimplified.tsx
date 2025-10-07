import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intakeFormSchema, type IntakeFormData } from '@/lib/validation';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface IntakeSimplifiedProps {
  setIntakeData: (data: Partial<IntakeFormData>) => void;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function IntakeSimplified({ setIntakeData }: IntakeSimplifiedProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      needsEIN: false,
      needsBanking: false,
      taxExemptIntent: false,
    },
  });

  const onSubmit = async (data: IntakeFormData) => {
    try {
      setIntakeData(data);
      setIsSubmitted(true);

      // TODO: Save to Supabase
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error submitting intake:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20 max-w-2xl text-center">
          <CheckCircle className="h-16 w-16 text-[#C49A6C] mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
            Intake Complete!
          </h1>
          <p className="text-lg text-white/90 font-lora mb-8">
            Thank you for providing your information. We'll use this to prepare your UNA formation documents.
          </p>
          <p className="text-white/80 font-lora mb-6">
            Next step: We'll reach out within 1-2 business days to schedule your document review session.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C49A6C] text-white font-bold rounded-lg hover:bg-[#A67C4A] transition-all"
          >
            Return to Home
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
            UNA Formation Intake
          </h1>
          <p className="text-lg text-white/90 font-lora">
            Provide the essential information we need to prepare your formation documents
          </p>
          <p className="text-sm text-white/70 font-lora italic mt-2">
            Takes about 5-10 minutes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/20">

          {/* Section 1: Entity Basics */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-white/20 pb-3">
              1. Your Organization
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Organization Name <span className="text-[#C49A6C]">*</span>
                </label>
                <input
                  {...register('entityName')}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="e.g., Community Wellness Collective"
                />
                {errors.entityName && (
                  <p className="text-red-300 text-sm mt-1">{errors.entityName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Mission & Purpose <span className="text-[#C49A6C]">*</span>
                </label>
                <textarea
                  {...register('entityPurpose')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="Describe what your organization does and why it exists..."
                />
                {errors.entityPurpose && (
                  <p className="text-red-300 text-sm mt-1">{errors.entityPurpose.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Primary State of Operation <span className="text-[#C49A6C]">*</span>
                </label>
                <select
                  {...register('entityState')}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                >
                  <option value="">Select state...</option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state} className="bg-[#1E2A38]">
                      {state}
                    </option>
                  ))}
                </select>
                {errors.entityState && (
                  <p className="text-red-300 text-sm mt-1">{errors.entityState.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Intended Start Date <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('entityStartDate')}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  />
                  {errors.entityStartDate && (
                    <p className="text-red-300 text-sm mt-1">{errors.entityStartDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Number of Founding Members <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    type="number"
                    min="2"
                    {...register('numberOfMembers')}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                    placeholder="Minimum 2"
                  />
                  {errors.numberOfMembers && (
                    <p className="text-red-300 text-sm mt-1">{errors.numberOfMembers.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Primary Contact */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-white/20 pb-3">
              2. Primary Contact
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Full Name <span className="text-[#C49A6C]">*</span>
                </label>
                <input
                  {...register('organizerName')}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="Your full name"
                />
                {errors.organizerName && (
                  <p className="text-red-300 text-sm mt-1">{errors.organizerName.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('organizerEmail')}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                    placeholder="email@example.com"
                  />
                  {errors.organizerEmail && (
                    <p className="text-red-300 text-sm mt-1">{errors.organizerEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Phone <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('organizerPhone')}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                    placeholder="(555) 123-4567"
                  />
                  {errors.organizerPhone && (
                    <p className="text-red-300 text-sm mt-1">{errors.organizerPhone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Primary Address <span className="text-[#C49A6C]">*</span>
                </label>
                <input
                  {...register('organizerAddress')}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="Street address, City, State, ZIP"
                />
                {errors.organizerAddress && (
                  <p className="text-red-300 text-sm mt-1">{errors.organizerAddress.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Formation Details */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-white/20 pb-3">
              3. Formation Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Leadership Structure <span className="text-[#C49A6C]">*</span>
                </label>
                <textarea
                  {...register('leadershipStructure')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="e.g., Co-op with rotating leadership, Board of Directors, Consensus-based, etc."
                />
                {errors.leadershipStructure && (
                  <p className="text-red-300 text-sm mt-1">{errors.leadershipStructure.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/20 cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    {...register('needsEIN')}
                    className="h-5 w-5 text-[#C49A6C] focus:ring-[#C49A6C] border-gray-300 rounded"
                  />
                  <span className="text-white font-lora">
                    We need help applying for an EIN (Employer Identification Number)
                  </span>
                </label>

                <label className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/20 cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    {...register('needsBanking')}
                    className="h-5 w-5 text-[#C49A6C] focus:ring-[#C49A6C] border-gray-300 rounded"
                  />
                  <span className="text-white font-lora">
                    We plan to open a bank account in the organization's name
                  </span>
                </label>

                <label className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/20 cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    {...register('taxExemptIntent')}
                    className="h-5 w-5 text-[#C49A6C] focus:ring-[#C49A6C] border-gray-300 rounded"
                  />
                  <span className="text-white font-lora">
                    We intend to pursue tax-exempt status (501c3 or similar)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Additional Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-white/20 pb-3">
              4. Additional Information (Optional)
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Special Requirements or Questions
                </label>
                <textarea
                  {...register('specialRequirements')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="Any specific needs, questions, or concerns we should know about..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Additional Notes
                </label>
                <textarea
                  {...register('additionalNotes')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/50 transition-all"
                  placeholder="Anything else you'd like us to know..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-[#C49A6C] text-white text-lg font-bold rounded-lg hover:bg-[#A67C4A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Intake Form'}
            </button>
            <p className="text-white/70 text-sm mt-4 font-lora">
              We'll review your information and reach out within 1-2 business days
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
