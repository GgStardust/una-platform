import { useState, useEffect } from 'react';

import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { ExploreAnswers } from '@/lib/types';
import ScheduleDialog from '@/components/ScheduleDialog';
import { detectUserLocation, getStateSuggestionText, LocationHint } from '@/lib/geolocation';
import EnhancedExploreResults from '@/components/EnhancedExploreResults';
import { exploreFormationExportService } from '@/lib/explore-formation-export';

export default function Explore() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<ExploreAnswers>({
    entityState: '', // Initialize with empty state
    mission: [],
    currentForm: null,
    impact: [],
    environments: [],
    support: [],
    otherText: ''
  });
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [locationHint, setLocationHint] = useState<LocationHint | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);

  // California-only platform
  const stateOptions = ['CA'];
  
  // More flexible, open-ended options with "Other" options
  const missionOptions = ['Events', 'Education', 'Art', 'Community', 'Research', 'Healing', 'Other'];
  const currentFormOptions = [
    { value: 'solo', label: 'Solo practice' },
    { value: 'team', label: 'Small team' },
    { value: 'community', label: 'Community group' },
    { value: 'traveling', label: 'Traveling project' },
    { value: 'space', label: 'Physical space' },
    { value: 'other', label: 'Something else' }
  ];
  const impactOptions = ['Personal transformation', 'Community building', 'Economic empowerment', 'Creative culture', 'Teaching and learning', 'Other'];
  const environmentOptions = ['Nature', 'Studios', 'Classrooms', 'Digital spaces', 'Gatherings', 'One-on-one', 'Other'];
  const supportOptions = ['Legal recognition', 'Agreements & documents', 'Financial flows', 'Visibility', 'Community connection', 'Mentorship', 'Other'];

  // New state for free-text descriptions
  const [freeTextDescriptions, setFreeTextDescriptions] = useState({
    missionDescription: '',
    currentFormDescription: '',
    impactDescription: '',
    environmentDescription: '',
    supportDescription: '',
    overallVision: ''
  });

  const handleStateSelect = (state: string) => {
    setAnswers(prev => ({ ...prev, entityState: state }));
  };

  const handleMissionToggle = (mission: string) => {
    setAnswers(prev => ({
      ...prev,
      mission: prev.mission.includes(mission)
        ? prev.mission.filter(m => m !== mission)
        : [...prev.mission, mission]
    }));
  };

  const handleMissionKeyDown = (e: React.KeyboardEvent, mission: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMissionToggle(mission);
    }
  };

  const handleCurrentFormSelect = (form: ExploreAnswers['currentForm']) => {
    setAnswers(prev => ({ ...prev, currentForm: form }));
  };

  const handleImpactToggle = (impact: string) => {
    setAnswers(prev => ({
      ...prev,
      impact: prev.impact.includes(impact)
        ? prev.impact.filter(i => i !== impact)
        : [...prev.impact, impact]
    }));
  };

  const handleImpactKeyDown = (e: React.KeyboardEvent, impact: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImpactToggle(impact);
    }
  };

  const handleEnvironmentToggle = (environment: string) => {
    setAnswers(prev => ({
      ...prev,
      environments: prev.environments.includes(environment)
        ? prev.environments.filter(e => e !== environment)
        : [...prev.environments, environment]
    }));
  };

  const handleEnvironmentKeyDown = (e: React.KeyboardEvent, environment: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEnvironmentToggle(environment);
    }
  };

  const handleSupportToggle = (support: string) => {
    setAnswers(prev => ({
      ...prev,
      support: prev.support.includes(support)
        ? prev.support.filter(s => s !== support)
        : [...prev.support, support]
    }));
  };

  const handleSupportKeyDown = (e: React.KeyboardEvent, support: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSupportToggle(support);
    }
  };

  // Handle free-text descriptions
  const handleFreeTextChange = (field: keyof typeof freeTextDescriptions, value: string) => {
    setFreeTextDescriptions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOtherTextChange = (text: string) => {
    setAnswers(prev => ({ ...prev, otherText: text }));
  };

  // Detect user location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const hint = await detectUserLocation();
        setLocationHint(hint);
      } catch (error) {
        console.warn('Location detection failed:', error);
      } finally {
        setIsDetectingLocation(false);
      }
    };

    detectLocation();
  }, []);

  const nextStep = () => {
    if (currentStep < 4) { // Streamlined to 4 steps
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Get recommendation
    const recommendation = getRecommendation();
    
    // Combine structured answers with free-text descriptions
    const completeExploreData = {
      answers,
      freeTextDescriptions
    };
    
    // Save to localStorage
    localStorage.setItem('explore', JSON.stringify(completeExploreData));
    localStorage.setItem('explore_result', JSON.stringify({
      path: recommendation,
      at: Date.now()
    }));
    
    setShowRecommendation(true);
  };

  const handleContinueToFormation = () => {
    // Navigate to intake form
    window.location.href = '/intake';
  };

  const handleExportResults = () => {
    try {
      // Create export data
      const completeExploreData = {
        answers,
        freeTextDescriptions
      };
      
      // For now, create a basic export (will be enhanced when Formation is integrated)
      const exportData = exploreFormationExportService.createExport(
        completeExploreData,
        [], // Formation refinements will be added later
        {}, // User choices will be added later
        {}  // Final values will be added later
      );
      
      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `una-explore-assessment-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Assessment exported successfully!');
    } catch (error) {
      console.error('Error exporting assessment:', error);
      alert('Error exporting assessment. Please try again.');
    }
  };

  const getRecommendation = () => {
    const hasMission = answers.mission.length > 0;
    const hasCurrentForm = answers.currentForm !== null;
    const hasLegalSupport = answers.support.some(s => 
      ['Legal recognition', 'Agreements & documents', 'Financial flows'].includes(s)
    );
    const hasImpact = answers.impact.length > 0;
    const hasEnvironment = answers.environments.length > 0;
    const hasFreeText = Object.values(freeTextDescriptions).some(text => text && text.length > 10);

    // Sophisticated recommendation logic aligned with S2S vision
    if (hasMission && hasCurrentForm && hasLegalSupport && (hasImpact || hasEnvironment)) {
      return 'UNA_READY';
    } else if (hasMission && hasCurrentForm && hasLegalSupport) {
      return 'UNA_NEEDS_REFINEMENT';
    } else if (hasMission && hasCurrentForm) {
      return 'UNA_NEEDS_LEGAL';
    } else if (hasMission && hasFreeText) {
      return 'UNA_NEEDS_STRUCTURE';
    } else if (hasMission) {
      return 'UNA_NEEDS_CLARITY';
    }
    return 'EXPLORE_MORE';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Location Section */}
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Where are you located?</h3>
              <p className="text-navy-600 mb-6">Our platform is currently optimized for California-based organizations:</p>
              
              {/* Location hint */}
              {!isDetectingLocation && locationHint && getStateSuggestionText(locationHint) && (
                <div className="mb-4 p-3 bg-gold-50 border border-gold-200 rounded-lg">
                  <p className="text-navy-700 text-sm">
                    {getStateSuggestionText(locationHint)}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                {stateOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleStateSelect(option)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      answers.entityState === option
                        ? 'border-gold-500 bg-gold-50 font-semibold'
                        : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option === 'CA' ? 'California' : option}</span>
                      {answers.entityState === option && (
                        <CheckCircle className="h-5 w-5 text-gold-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Out-of-state notice */}
              <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                <h4 className="font-semibold text-gold-800 mb-2">Not in California?</h4>
                <p className="text-gold-700 text-sm mb-3">
                  Our platform is specifically designed for California UNA formation. If you're located elsewhere, 
                  we recommend scheduling a consultation to discuss your options.
                </p>
                <button
                  onClick={() => setIsScheduleDialogOpen(true)}
                  className="bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-700 transition-colors"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>

            {/* Mission Section */}
            <div>
                          <h3 className="text-xl font-semibold text-navy-900 mb-4">What is your mission focus?</h3>
            <p className="text-navy-600 mb-6">Select all that resonate with your work:</p>
              <div className="grid grid-cols-2 gap-3">
                {missionOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleMissionToggle(option)}
                    onKeyDown={(e) => handleMissionKeyDown(e, option)}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={answers.mission.includes(option)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      answers.mission.includes(option)
                        ? 'border-gold-500 bg-gold-50 font-semibold'
                        : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* Free-text mission description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your mission (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.missionDescription}
                  onChange={(e) => handleFreeTextChange('missionDescription', e.target.value)}
                  placeholder="Describe your mission in your own words... What drives you? What change do you want to create? What makes your approach unique?"
                  rows={4}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  This helps us provide more personalized guidance for your UNA formation.
                </p>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Other mission areas (describe):
                </label>
                <input
                  type="text"
                  value={answers.otherText}
                  onChange={(e) => handleOtherTextChange(e.target.value)}
                  placeholder="Describe your unique mission focus..."
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Current Form Section */}
            <div>
                          <h3 className="text-xl font-semibold text-navy-900 mb-4">What is your current form?</h3>
            <p className="text-navy-600 mb-6">Select the option that best describes your current structure:</p>
              <div className="space-y-3">
                {currentFormOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleCurrentFormSelect(option.value as ExploreAnswers['currentForm'])}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCurrentFormSelect(option.value as ExploreAnswers['currentForm']);
                      }
                    }}
                    tabIndex={0}
                    role="radio"
                    aria-checked={answers.currentForm === option.value}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      answers.currentForm === option.value
                        ? 'border-gold-500 bg-gold-50 font-semibold'
                        : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Free-text current form description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your current situation (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.currentFormDescription}
                  onChange={(e) => handleFreeTextChange('currentFormDescription', e.target.value)}
                  placeholder="Describe your current structure, challenges, or what you're trying to achieve... Are you working alone? With others? What's working? What's not?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  This helps us understand your starting point and what structure would serve you best.
                </p>
              </div>
            </div>

            {/* Impact Section */}
            <div>
                          <h3 className="text-xl font-semibold text-navy-900 mb-4">What impact do you want to create?</h3>
            <p className="text-navy-600 mb-6">Select all that align with your vision:</p>
              <div className="grid grid-cols-2 gap-3">
                {impactOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleImpactToggle(option)}
                    onKeyDown={(e) => handleImpactKeyDown(e, option)}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={answers.impact.includes(option)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      answers.impact.includes(option)
                        ? 'border-gold-500 bg-gold-50 font-semibold'
                        : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Free-text impact description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your vision (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.impactDescription}
                  onChange={(e) => handleFreeTextChange('impactDescription', e.target.value)}
                  placeholder="What change do you want to create in the world? Who will benefit? What does success look like to you?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  This helps us understand your deeper purpose and how a UNA structure could amplify your impact.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Environment Section */}
            <div>
                          <h3 className="text-xl font-semibold text-navy-900 mb-4">What environments do you prefer?</h3>
            <p className="text-navy-600 mb-6">Select all that feel right for your work:</p>
              <div className="grid grid-cols-2 gap-3">
                {environmentOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleEnvironmentToggle(option)}
                    onKeyDown={(e) => handleEnvironmentKeyDown(e, option)}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={answers.environments.includes(option)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      answers.environments.includes(option)
                        ? 'border-gold-500 bg-gold-50 font-semibold'
                        : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Free-text environment description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your preferred environments (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.environmentDescription}
                  onChange={(e) => handleFreeTextChange('environmentDescription', e.target.value)}
                  placeholder="Where do you do your best work? What spaces feel most supportive? Any specific requirements or preferences?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  This helps us understand your operational needs and how a UNA structure could support your preferred way of working.
                </p>
              </div>
            </div>

            {/* Support Section */}
            <div>
                          <h3 className="text-xl font-semibold text-navy-900 mb-4">What support do you need now?</h3>
            <p className="text-navy-600 mb-6">Select all that feel relevant to your current situation:</p>
              <div className="grid grid-cols-2 gap-3">
                {supportOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleSupportToggle(option)}
                    onKeyDown={(e) => handleSupportKeyDown(e, option)}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={answers.support.includes(option)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      answers.support.includes(option)
                        ? 'border-gold-500 bg-gold-50 font-semibold'
                        : 'border-navy-200 hover:border-navy-300'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Free-text support description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your support needs (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.supportDescription}
                  onChange={(e) => handleFreeTextChange('supportDescription', e.target.value)}
                  placeholder="What specific challenges are you facing? What would make the biggest difference right now? Any particular areas where you feel stuck?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  This helps us provide more targeted guidance and connect you with the right resources.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Ready to see your recommendation?</h3>
              <p className="text-navy-600 mb-6">Based on your answers, we'll provide a personalized recommendation for your UNA formation journey.</p>
              
              {/* Overall Vision Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-navy-700 mb-2 text-left">
                  Final question: What's your overall vision? (optional)
                </label>
                <textarea
                  value={freeTextDescriptions.overallVision}
                  onChange={(e) => handleFreeTextChange('overallVision', e.target.value)}
                  placeholder="In a few sentences, what's your big picture vision? What would you love to see happen? What would success look like for you and your community?"
                  rows={4}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-navy-500 mt-1 text-left">
                  This helps us understand your deeper purpose and how a UNA structure could amplify your vision.
                </p>
              </div>
              
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-navy-900 mb-3">Your Selections Summary:</h4>
                <div className="text-sm text-navy-800 space-y-2">
                  <p><strong>Location:</strong> {answers.entityState === 'CA' ? 'California' : answers.entityState || 'Not selected'}</p>
                  <p><strong>Mission:</strong> {answers.mission.length > 0 ? answers.mission.join(', ') : 'Not selected'}</p>
                  <p><strong>Current Form:</strong> {answers.currentForm ? currentFormOptions.find(opt => opt.value === answers.currentForm)?.label : 'Not selected'}</p>
                  <p><strong>Impact Goals:</strong> {answers.impact.length > 0 ? answers.impact.join(', ') : 'Not selected'}</p>
                  <p><strong>Preferred Environments:</strong> {answers.environments.length > 0 ? answers.environments.join(', ') : 'Not selected'}</p>
                  <p><strong>Support Needs:</strong> {answers.support.length > 0 ? answers.support.join(', ') : 'Not selected'}</p>
                </div>
                
                {/* Show free-text descriptions if provided */}
                {(freeTextDescriptions.missionDescription || freeTextDescriptions.currentFormDescription || freeTextDescriptions.impactDescription || freeTextDescriptions.overallVision) && (
                  <div className="mt-4 pt-4 border-t border-gold-200">
                    <h5 className="font-medium text-navy-900 mb-2">Your Additional Insights:</h5>
                    {freeTextDescriptions.missionDescription && (
                      <p className="text-xs text-navy-700 mb-1"><strong>Mission:</strong> {freeTextDescriptions.missionDescription.substring(0, 100)}...</p>
                    )}
                    {freeTextDescriptions.overallVision && (
                      <p className="text-xs text-navy-700 mb-1"><strong>Vision:</strong> {freeTextDescriptions.overallVision.substring(0, 100)}...</p>
                    )}
                  </div>
                )}
              </div>
              

            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showRecommendation) {
    return (
      <div className="min-h-screen bg-cream-50">
        <EnhancedExploreResults
          answers={answers}
          freeTextDescriptions={freeTextDescriptions}
          onContinueToFormation={handleContinueToFormation}
          onExportResults={handleExportResults}
        />
        
        <div className="max-w-3xl mx-auto p-6 text-center">
          <button
            onClick={() => {
              setShowRecommendation(false);
              setCurrentStep(1);
              setAnswers({
                entityState: '',
                mission: [],
                currentForm: null,
                impact: [],
                environments: [],
                support: [],
                otherText: ''
              });
              setFreeTextDescriptions({
                missionDescription: '',
                currentFormDescription: '',
                impactDescription: '',
                environmentDescription: '',
                supportDescription: '',
                overallVision: ''
              });
            }}
            className="text-gold-600 hover:text-gold-800 font-medium"
          >
            Start over with new answers
          </button>
        </div>
        
        <ScheduleDialog
          isOpen={isScheduleDialogOpen}
          onClose={() => setIsScheduleDialogOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Exploration Mode</h1>
          <p className="text-navy-600 text-lg">
            Exploration Mode helps you sense the form your work is ready to take. Answer a few prompts and receive a clear next step that aligns with your timing and capacity.
          </p>
        </div>

        {/* Enhanced Progress with Motivation */}
        <div className="bg-white rounded-lg p-4 border border-navy-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-navy-700">
              Your UNA Formation Journey
            </span>
            <span className="text-sm text-gold-600 font-semibold">
              Step {currentStep} of 4
            </span>
          </div>
          
          <div className="flex-1 mb-3">
            <div className="h-3 bg-navy-200 rounded-full overflow-hidden">
              <div 
                className="h-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-navy-500">
            <span className={currentStep >= 1 ? 'text-gold-600 font-medium' : ''}>Location</span>
            <span className={currentStep >= 2 ? 'text-gold-600 font-medium' : ''}>Mission</span>
            <span className={currentStep >= 3 ? 'text-gold-600 font-medium' : ''}>Structure</span>
            <span className={currentStep >= 4 ? 'text-gold-600 font-medium' : ''}>Support</span>
          </div>
          
          {/* Motivational Message */}
          <div className="mt-3 p-3 bg-gold-50 rounded-lg border border-gold-200">
            <p className="text-sm text-navy-800">
              {currentStep === 1 && "Let's start by understanding your location and legal requirements"}
              {currentStep === 2 && "Your mission is the heart of your organization - let's explore it together"}
              {currentStep === 3 && "Structure provides the foundation for your mission to thrive"}
              {currentStep === 4 && "Almost there! Let's identify what support you need to succeed"}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderStep()}
        </div>

        {/* Enhanced Navigation with Conversion Psychology */}
        <div className="flex justify-between items-center">
          <button
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

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="text-sm text-navy-600">
              {currentStep === 1 && "Location Selection"}
              {currentStep === 2 && "Mission Definition"}
              {currentStep === 3 && "Structure Planning"}
              {currentStep === 4 && "Support Needs"}
            </div>
          </div>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && !answers.entityState}
              className={`flex items-center px-8 py-3 rounded-lg transition-all duration-200 font-semibold ${
                currentStep === 1 && !answers.entityState
                  ? 'bg-navy-300 text-navy-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gold-600 to-gold-700 text-white hover:from-gold-700 hover:to-gold-800 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Your Personalized Recommendation
              <CheckCircle className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
