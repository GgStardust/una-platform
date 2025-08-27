import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Calendar } from 'lucide-react';
import { ExploreAnswers } from '@/lib/types';
import { detectUserLocation, getStateSuggestionText, LocationHint } from '@/lib/geolocation';
import { generateStrategyInsights, generateToolkitRecommendations, generateExecutiveSummary } from '@/lib/strategy-insights';



export default function Explore() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<ExploreAnswers>({
    entityState: '',
    mission: [],
    vision: [],
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
    visionDescription: '',
    overallImpact: ''
  });



  // Full USA states list for broader accessibility
  const stateOptions = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  
  // Enhanced options for comprehensive flow
  const missionOptions = ['Events', 'Education', 'Art', 'Community', 'Research', 'Healing', 'Other'];
  const visionOptions = ['Personal growth', 'Community transformation', 'Cultural evolution', 'Systemic change', 'Creative expression', 'Other'];
  const impactOptions = ['Personal transformation', 'Community building', 'Economic empowerment', 'Creative culture', 'Teaching and learning', 'Other'];
  
  // Enhanced prompt systems for better user guidance
  const missionPrompts = [
    'Describe your core mission in 2-3 sentences',
    'What problem are you solving?',
    'Who are you serving?',
    'What change do you want to create?',
    'What would success look like?'
  ];
  
  const visionPrompts = [
    'What is your long-term vision?',
    'How do you see the world changing?',
    'What legacy do you want to leave?',
    'What would you like to be remembered for?'
  ];
  
  const impactPrompts = [
    'How will you measure success?',
    'What impact do you want to have?',
    'How will you know you\'ve made a difference?',
    'What would transformation look like?'
  ];

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

  const handleVisionToggle = (vision: string) => {
    setAnswers(prev => ({
      ...prev,
      vision: prev.vision.includes(vision)
        ? prev.vision.filter(v => v !== vision)
        : [...prev.vision, vision]
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
  
  // Helper functions for prompt system
  const getRandomPrompt = (prompts: string[]) => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };
  
  const insertPrompt = (field: keyof typeof freeTextDescriptions, prompts: string[]) => {
    const prompt = getRandomPrompt(prompts);
    const currentValue = freeTextDescriptions[field];
    const newValue = currentValue ? `${currentValue}\n\n${prompt}` : prompt;
    handleFreeTextChange(field, newValue);
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
                <div className="mb-3 flex flex-wrap gap-2">
                  {missionPrompts.slice(0, 4).map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => insertPrompt('missionDescription', missionPrompts)}
                      className="una-prompt-chip"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
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
            {/* Vision Section */}
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">What is your vision for the future?</h3>
              <p className="text-navy-600 mb-6">Select all that align with your vision:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {visionOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleVisionToggle(option)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      answers.vision.includes(option)
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
                <div className="mb-3 flex flex-wrap gap-2">
                  {visionPrompts.slice(0, 4).map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => insertPrompt('visionDescription', visionPrompts)}
                      className="una-prompt-chip"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <textarea
                  value={freeTextDescriptions.visionDescription}
                  onChange={(e) => handleFreeTextChange('visionDescription', e.target.value)}
                  placeholder="What is your long-term vision? How do you see the world changing? What future are you working toward?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Impact Section */}
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">What impact do you want to create?</h3>
              <p className="text-navy-600 mb-6">Select all that align with your impact goals:</p>
              
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
                  Tell us more about your impact goals (optional):
                </label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {impactPrompts.slice(0, 4).map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => insertPrompt('overallImpact', impactPrompts)}
                      className="una-prompt-chip"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <textarea
                  value={freeTextDescriptions.overallImpact}
                  onChange={(e) => handleFreeTextChange('overallImpact', e.target.value)}
                  placeholder="What change do you want to create in the world? Who will benefit? What does success look like?"
                  rows={3}
                  className="w-full p-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
              <h4 className="font-semibold text-navy-900 mb-3">Your Selections Summary:</h4>
              <div className="text-sm text-navy-800 space-y-2">
                <p><strong>Location:</strong> {answers.entityState || 'Not selected'}</p>
                <p><strong>Mission:</strong> {answers.mission.length > 0 ? answers.mission.join(', ') : 'Not selected'}</p>
                <p><strong>Vision:</strong> {answers.vision.length > 0 ? answers.vision.join(', ') : 'Not selected'}</p>
                <p><strong>Impact Goals:</strong> {answers.impact.length > 0 ? answers.impact.join(', ') : 'Not selected'}</p>
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
  const strategyInsights = generateStrategyInsights(answers, freeTextDescriptions);
  const toolkitRecommendations = generateToolkitRecommendations(answers, freeTextDescriptions);
  const executiveSummary = generateExecutiveSummary(answers, freeTextDescriptions);

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

        {/* Executive Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Executive Summary</h2>
          <p className="text-navy-700 leading-relaxed">
            {executiveSummary}
          </p>
        </div>

        {/* Strategic Insights */}
        <div className="bg-gold-50 rounded-lg border border-gold-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Strategic Insights</h2>
          <div className="space-y-4">
            {strategyInsights.slice(0, 3).map((insight: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gold-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-navy-800">{insight.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {insight.priority} priority
                  </span>
                </div>
                <p className="text-navy-700 text-sm leading-relaxed mb-2">{insight.description}</p>
                {insight.action && (
                  <p className="text-gold-700 text-sm font-medium">{insight.action}</p>
                )}
                {insight.category && (
                  <span className="text-xs text-navy-500 bg-navy-100 px-2 py-1 rounded">
                    {insight.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Toolkit Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Recommended Toolkit Tools</h2>
          <p className="text-navy-700 mb-6">
            Based on your mission and impact goals, we recommend these specific tools to support your UNA journey:
          </p>
          
          {toolkitRecommendations.map((category: any, index: number) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-semibold text-navy-800 mb-3 text-lg">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.tools.map((tool: any) => (
                  <div key={tool.id} className="p-3 border border-navy-200 rounded-lg bg-navy-50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-navy-800 text-sm">{tool.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tool.priority === 'high' ? 'bg-red-100 text-red-800' :
                        tool.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {tool.priority}
                      </span>
                    </div>
                    <p className="text-navy-600 text-xs mb-2">{tool.reason}</p>
                    <a href="/resources" className="text-gold-600 hover:text-gold-800 text-xs font-medium">
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center pt-4">
            <a href="/resources" className="inline-flex items-center bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Explore Full Toolkit
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
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
              <span>1 hour session</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gold-300">
              <span className="text-2xl font-bold">$250</span>
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
