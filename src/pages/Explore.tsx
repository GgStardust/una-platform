import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { ExploreAnswers } from '@/lib/types';
import { detectUserLocation, getStateSuggestionText, LocationHint } from '@/lib/geolocation';

import { processUserInput } from '@/lib/text/normalizeS2S';

export default function Explore() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<ExploreAnswers>({
    entityState: '',
    mission: [],
    currentForm: null,
    impact: [],
    environments: [],
    support: [],
    otherText: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [locationHint, setLocationHint] = useState<LocationHint | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [freeTextDescriptions, setFreeTextDescriptions] = useState({
    missionDescription: '',
    impactDescription: '',
    overallVision: ''
  });



  // California-only platform
  const stateOptions = ['CA'];
  
  // Simplified options for lite flow
  const missionOptions = ['Events', 'Education', 'Art', 'Community', 'Research', 'Healing', 'Other'];
  const impactOptions = ['Personal transformation', 'Community building', 'Economic empowerment', 'Creative culture', 'Teaching and learning', 'Other'];

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

  const handleImpactToggle = (impact: string) => {
    setAnswers(prev => ({
      ...prev,
      impact: prev.impact.includes(impact)
        ? prev.impact.filter(i => i !== impact)
        : [...prev.impact, impact]
    }));
  };

  const handleFreeTextChange = (field: keyof typeof freeTextDescriptions, value: string) => {
    setFreeTextDescriptions(prev => ({
      ...prev,
      [field]: value
    }));
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
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Save to localStorage
    const completeExploreData = {
      answers,
      freeTextDescriptions
    };
    localStorage.setItem('explore', JSON.stringify(completeExploreData));
    localStorage.setItem('explore_result', JSON.stringify({
      path: 'LITE_MODE',
      at: Date.now()
    }));
    
    setShowResults(true);
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
              
              <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                <h4 className="font-semibold text-gold-800 mb-2">Not in California?</h4>
                <p className="text-gold-700 text-sm mb-3">
                  Our platform is specifically designed for California UNA formation. If you're located elsewhere, 
                  we recommend scheduling a consultation to discuss your options.
                </p>
                <a
                  href="/consultation"
                  className="bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-700 transition-colors inline-flex items-center"
                >
                  Schedule Consultation
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
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
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your mission (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.missionDescription}
                  onChange={(e) => handleFreeTextChange('missionDescription', e.target.value)}
                  placeholder="Describe your mission in your own words... What drives you? What change do you want to create?"
                  rows={4}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Impact Section */}
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">What impact do you want to create?</h3>
              <p className="text-navy-600 mb-6">Select all that align with your vision:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {impactOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleImpactToggle(option)}
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
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Tell us more about your vision (optional):
                </label>
                <textarea
                  value={freeTextDescriptions.impactDescription}
                  onChange={(e) => handleFreeTextChange('impactDescription', e.target.value)}
                  placeholder="What change do you want to create in the world? Who will benefit? What does success look like?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Ready to see your insights?</h3>
              <p className="text-navy-600 mb-6">Based on your answers, we'll provide strategic insights and next steps for your UNA journey.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-navy-700 mb-2 text-left">
                  Final question: What's your overall vision? (optional)
                </label>
                <textarea
                  value={freeTextDescriptions.overallVision}
                  onChange={(e) => handleFreeTextChange('overallVision', e.target.value)}
                  placeholder="In a few sentences, what's your big picture vision? What would you love to see happen?"
                  rows={4}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-navy-900 mb-3">Your Selections Summary:</h4>
                <div className="text-sm text-navy-800 space-y-2">
                  <p><strong>Location:</strong> {answers.entityState === 'CA' ? 'California' : answers.entityState || 'Not selected'}</p>
                  <p><strong>Mission:</strong> {answers.mission.length > 0 ? answers.mission.join(', ') : 'Not selected'}</p>
                  <p><strong>Impact Goals:</strong> {answers.impact.length > 0 ? answers.impact.join(', ') : 'Not selected'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return <ExploreLiteResults answers={answers} freeTextDescriptions={freeTextDescriptions} />;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">UNA Exploration</h1>
          <p className="text-navy-600 text-lg">
            Answer 3 simple questions to get strategic insights and next steps for your UNA formation journey.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg p-4 border border-navy-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-navy-700">
              Your UNA Journey
            </span>
            <span className="text-sm text-gold-600 font-semibold">
              Step {currentStep} of 3
            </span>
          </div>
          
          <div className="flex-1 mb-3">
            <div className="h-3 bg-navy-200 rounded-full overflow-hidden">
              <div 
                className="h-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-navy-500">
            <span className={currentStep >= 1 ? 'text-gold-600 font-medium' : ''}>Location</span>
            <span className={currentStep >= 2 ? 'text-gold-600 font-medium' : ''}>Mission</span>
            <span className={currentStep >= 3 ? 'text-gold-600 font-medium' : ''}>Impact</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
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

          {currentStep < 3 ? (
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
              Get Your Insights
              <CheckCircle className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Lite Results Component
function ExploreLiteResults({ answers, freeTextDescriptions }: { answers: any; freeTextDescriptions: any }) {
  const summary = processUserInput(freeTextDescriptions.missionDescription || answers.mission.join(', '));
  const impactSummary = processUserInput(freeTextDescriptions.impactDescription || answers.impact.join(', '));
  
  const strategicInsights = [
    summary.strategicGuidance[0] || 'Your mission shows clear direction and purpose',
    impactSummary.strategicGuidance[0] || 'Your impact goals align with community needs',
    'A UNA structure can provide the legal foundation to amplify your work'
  ].slice(0, 2);

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">
            Your UNA Strategy Insights
          </h1>
          <p className="text-lg text-navy-600">
            Based on your exploration, here's what we've discovered and your next steps
          </p>
        </div>

        {/* Mission Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Mission & Purpose</h2>
          <p className="text-navy-700 leading-relaxed">
            {answers.mission.length > 0 ? 
              `Your organization focuses on ${answers.mission.join(', ')}. ${freeTextDescriptions.missionDescription ? 
                summary.refined : 
                'Your mission provides a clear direction for your work in the community.'
              }` :
              'Your mission focus shows potential for community impact and creative expression.'
            }
          </p>
        </div>

        {/* Strategic Insights */}
        <div className="bg-gold-50 rounded-lg border border-gold-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Strategic Insights</h2>
          <div className="space-y-3">
            {strategicInsights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gold-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-gold-800 text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-navy-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Recommended Resources</h2>
          <p className="text-navy-700 mb-4">
            Based on your mission and impact goals, we recommend exploring these resources to support your UNA journey:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-navy-200 rounded-lg">
              <h3 className="font-medium text-navy-800 mb-2">Legal & Formation</h3>
              <p className="text-sm text-navy-600 mb-3">Expert guidance for your UNA formation process</p>
              <a href="/resources" className="text-gold-600 hover:text-gold-800 text-sm font-medium">
                Explore Resources →
              </a>
            </div>
            <div className="p-4 border border-navy-200 rounded-lg">
              <h3 className="font-medium text-navy-800 mb-2">Community Support</h3>
              <p className="text-sm text-navy-600 mb-3">Connect with other UNA organizations</p>
              <a href="/resources" className="text-gold-600 hover:text-gold-800 text-sm font-medium">
                Explore Resources →
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to bring your UNA into focus?</h2>
          <p className="text-lg mb-6 opacity-90">
            Schedule a 60-90 minute UNA Strategy Session to get personalized guidance, 
            strategic planning, and next steps for your formation journey.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gold-300">
              <Calendar className="h-5 w-5" />
              <span>60-90 minute session</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gold-300">
              <span className="text-2xl font-bold">$250/hr</span>
            </div>
          </div>
          <a
            href="/consultation"
            className="inline-flex items-center bg-gold-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-700 transition-all duration-200 mt-6 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Schedule UNA Strategy Session
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </div>

        {/* Start Over */}
        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="text-gold-600 hover:text-gold-800 font-medium"
          >
            Start over with new answers
          </button>
        </div>
      </div>
    </div>
  );
}
