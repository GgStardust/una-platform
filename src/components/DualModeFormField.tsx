import { useState } from 'react';
import { Eye, EyeOff, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { FormationRefinement } from '@/lib/text/normalizeS2S';

interface DualModeFormFieldProps {
  refinement: FormationRefinement;
  onChoiceChange: (fieldName: string, choice: 'original' | 'refined') => void;
  isRequired?: boolean;
  label: string;
  placeholder?: string;
  rows?: number;
}

export default function DualModeFormField({
  refinement,
  onChoiceChange,
  isRequired = false,
  label,
  placeholder,

}: DualModeFormFieldProps) {
  const [showRefined, setShowRefined] = useState(true);
  const [showOriginal, setShowOriginal] = useState(true);

  const handleChoiceChange = (choice: 'original' | 'refined') => {
    onChoiceChange(refinement.fieldName, choice);
  };



  const getStrategicContext = (fieldName: string): string => {
    const contextMap: Record<string, string> = {
      'entityPurpose': 'Your mission defines the core purpose and direction of your organization. It guides all decisions and activities.',
      'entityActivities': 'Your activities are the practical expression of your mission in the community. They show how you fulfill your purpose.',
      'leadershipStructure': 'Your leadership structure should support your mission while maintaining flexibility and collaboration.',
      'entityName': 'Your organization name should reflect your mission and values while being memorable and professional.',
      'entityStartDate': 'Your start date marks the beginning of your organization\'s journey and may affect legal requirements.',
      'organizerName': 'As the organizer, you are taking responsibility for bringing this organization to life.',
      'organizerRole': 'Your role defines your relationship to the organization and your responsibilities.',
      'mailingAddress': 'Your mailing address establishes your organization\'s legal presence and contact information.',
      'propertyPlans': 'Property plans show how you envision using physical space to fulfill your mission.',
      'grantPlans': 'Grant plans demonstrate your understanding of funding opportunities and sustainability.',
      'fundraisingPlans': 'Fundraising plans show how you will support your mission financially.',
      'successionPlanning': 'Succession planning ensures your organization can continue beyond individual leaders.',
      'complianceNotes': 'Compliance notes help ensure your organization operates within legal requirements.'
    };
    
    return contextMap[fieldName] || 'This field helps define your organization\'s structure and operations.';
  };

  return (
    <div className="space-y-4">
      {/* Field Label and Strategic Context */}
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        
        <div className="bg-cream-50 border border-cream-200 rounded-lg p-3 mb-3">
          <div className="flex items-start">
            <Lightbulb className="h-4 w-4 text-gold-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-navy-700 leading-relaxed">
              {getStrategicContext(refinement.fieldName)}
            </p>
          </div>
        </div>
      </div>

      {/* Dual Mode Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Original Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-navy-700">Your Original Input</h4>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-navy-500 hover:text-navy-700 transition-colors"
            >
              {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          
          {showOriginal && (
            <div className="space-y-3">
              <div className="bg-navy-50 border border-navy-200 rounded-lg p-3">
                <p className="text-sm text-navy-800 leading-relaxed">
                  {refinement.original || placeholder || 'No input provided'}
                </p>
              </div>
              
              <button
                onClick={() => handleChoiceChange('original')}
                className={`w-full flex items-center justify-center px-3 py-2 rounded-lg border-2 transition-colors ${
                  refinement.userChoice === 'original'
                    ? 'border-gold-500 bg-gold-50 text-gold-700'
                    : 'border-navy-200 hover:border-navy-300 text-navy-700'
                }`}
              >
                {refinement.userChoice === 'original' && <CheckCircle className="h-4 w-4 mr-2" />}
                Use Original Input
              </button>
            </div>
          )}
        </div>

        {/* Refined Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-navy-700">S2S Refined Version</h4>
            <button
              onClick={() => setShowRefined(!showRefined)}
              className="text-navy-500 hover:text-navy-700 transition-colors"
            >
              {showRefined ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          
          {showRefined && (
            <div className="space-y-3">
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-3">
                <p className="text-sm text-navy-800 leading-relaxed">
                  {refinement.refined || 'Refinement not available'}
                </p>
              </div>
              
              <button
                onClick={() => handleChoiceChange('refined')}
                className={`w-full flex items-center justify-center px-3 py-2 rounded-lg border-2 transition-colors ${
                  refinement.userChoice === 'refined'
                    ? 'border-gold-500 bg-gold-50 text-gold-700'
                    : 'border-navy-200 hover:border-navy-300 text-navy-700'
                }`}
              >
                {refinement.userChoice === 'refined' && <CheckCircle className="h-4 w-4 mr-2" />}
                Use Refined Version
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Arrow */}
      <div className="flex justify-center">
        <div className="bg-navy-100 rounded-full p-2">
          <ArrowRight className="h-4 w-4 text-navy-600" />
        </div>
      </div>

      {/* Current Choice Display */}
      {refinement.userChoice !== 'pending' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
            <span className="text-sm font-medium text-emerald-800">
              You've chosen to use the {refinement.userChoice === 'original' ? 'original' : 'refined'} version
            </span>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-navy-500 leading-relaxed">
        <p>
          <strong>Original:</strong> Your input exactly as you provided it
        </p>
        <p>
          <strong>Refined:</strong> Your input transformed into professional, S2S-approved language that maintains your meaning while enhancing clarity and structure
        </p>
        <p>
          Choose the version that best represents your vision. You can always edit either version in the formation process.
        </p>
      </div>
    </div>
  );
}
