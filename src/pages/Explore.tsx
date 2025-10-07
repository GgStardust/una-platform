import { useState } from 'react';
import { ArrowLeft, ArrowRight, Users, Building, Target, Heart, Palette, BookOpen, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { saveExploreResponse } from '../lib/supabase/explore';

interface ExploreAnswers {
  state: string;
  readiness: {
    hasMembers: boolean | null;
    hasBylaws: boolean | null;
    hasEIN: boolean | null;
    needsEINHelp: boolean | null;
    needsBanking: boolean | null;
  };
  collectiveTypes: string[];
  priorities: string[];
  otherPriority: string;
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

const COLLECTIVE_TYPES = [
  { 
    id: 'advocacy', 
    label: 'Advocacy Group', 
    description: 'Work together to raise awareness, influence policy, or support a shared cause in your community.',
    icon: Target 
  },
  { 
    id: 'creative', 
    label: 'Creative Collective', 
    description: 'Collaborate on arts, media, design, or cultural expression that benefits your members and the public.',
    icon: Palette 
  },
  { 
    id: 'healing', 
    label: 'Healing & Wellness Circle', 
    description: 'Gather around health, well-being, spiritual, or supportive practices.',
    icon: Heart 
  },
  { 
    id: 'education', 
    label: 'Educational Group', 
    description: 'Provide learning, training, or shared knowledge to members or the wider public.',
    icon: BookOpen 
  },
  { 
    id: 'cooperative', 
    label: 'Cooperative / Mutual Aid', 
    description: 'Pool resources, share costs, or provide direct support among members.',
    icon: Users 
  },
  { 
    id: 'community', 
    label: 'Community Builders', 
    description: 'Organize local projects, events, or ongoing neighborhood improvement.',
    icon: Shield 
  },
  { 
    id: 'other', 
    label: 'Other', 
    description: 'If your group does not fit these categories, describe it in your own words.',
    icon: Building 
  }
];

const PRIORITY_CATEGORIES = {
  'Formal Recognition': [
    'To give our group formal recognition',
    'To apply for grants or funding',
    'To open a bank account in the group\'s name',
    'To build credibility with partners or the public'
  ],
  'Organization & Structure': [
    'To create clear rules and agreements for members',
    'To organize events or programs together',
    'To strengthen community voice and influence'
  ],
  'Other': [
    'Other (specify below)'
  ]
};

export default function Explore() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<ExploreAnswers>({
    state: '',
    readiness: {
      hasMembers: null,
      hasBylaws: null,
      hasEIN: null,
      needsEINHelp: null,
      needsBanking: null
    },
    collectiveTypes: [],
    priorities: [],
    otherPriority: ''
  });
  const [customPriority, setCustomPriority] = useState('');
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const handleReadinessChange = (field: keyof ExploreAnswers['readiness'], value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      readiness: {
        ...prev.readiness,
        [field]: value
      }
    }));
  };

  const handleCollectiveTypeToggle = (typeId: string) => {
    setAnswers(prev => ({
      ...prev,
      collectiveTypes: prev.collectiveTypes.includes(typeId)
        ? prev.collectiveTypes.filter(id => id !== typeId)
        : [...prev.collectiveTypes, typeId]
    }));
  };

  const handlePriorityToggle = (priority: string) => {
    setAnswers(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const validateStep = (step: number): boolean => {
    const warnings: string[] = [];
    
    if (step === 1) {
      if (!answers.state) warnings.push('Please select your state');
      if (answers.readiness.hasMembers === null) warnings.push('Please indicate if you have committed members');
      if (answers.readiness.hasBylaws === null) warnings.push('Please indicate if you have governing rules');
      if (answers.readiness.hasEIN === null) warnings.push('Please indicate if you have an EIN');
      if (answers.readiness.needsBanking === null) warnings.push('Please indicate if you plan to open a bank account');
    } else if (step === 2) {
      if (answers.collectiveTypes.length === 0) warnings.push('Please select your collective type(s)');
    } else if (step === 3) {
      if (answers.priorities.length === 0 && !customPriority) warnings.push('Please select at least one formation priority');
    }
    
    setValidationWarnings(warnings);
    return warnings.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
    if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationWarnings([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const finalAnswers = {
        state: answers.state,
        readiness: answers.readiness,
        collective_type: answers.collectiveTypes.join(', '),
        priorities: customPriority ? [...answers.priorities, customPriority] : answers.priorities
      };
      
      await saveExploreResponse(finalAnswers);
      setShowResults(true);
    } catch (error) {
      console.error('Error saving explore response:', error);
      // Still show results even if save fails
    setShowResults(true);
    }
  };


  const getActionList = (): string[] => {
    const actions = [];
    const { readiness } = answers;
    
    if (!readiness.hasEIN) actions.push('Apply for EIN (federal tax ID)');
    if (!readiness.hasBylaws) actions.push('Draft your UNA Agreement and bylaws');
    if (!readiness.hasMembers) actions.push('Gather committed members (minimum 2 required)');
    if (answers.state) actions.push(`Complete state registration in ${answers.state}`);
    actions.push('Open a bank account in the UNA name');
    
    return actions;
  };

  const isStepComplete = (step: number): boolean => {
    if (step === 1) {
      return answers.state !== '' && 
             answers.readiness.hasMembers !== null && 
             answers.readiness.hasBylaws !== null && 
             answers.readiness.hasEIN !== null && 
             answers.readiness.needsBanking !== null;
    } else if (step === 2) {
      return answers.collectiveTypes.length > 0;
    } else if (step === 3) {
      return answers.priorities.length > 0 || customPriority !== '';
    }
    return false;
  };

  if (showResults) {
        return (
      <>
        <SEOHead
          title="UNA Formation Assessment Results | UNA Platform"
          description="Get personalized recommendations for your UNA formation based on your readiness and priorities."
        />
        
        <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
          <div className="container mx-auto px-4 py-16">
            {/* Results Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">
                Your Formation Path
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-lora max-w-3xl mx-auto">
                Here's what we recommend based on your readiness and goals
              </p>
            </div>

            {/* Results Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/20 max-w-4xl mx-auto">
              {/* Readiness Summary */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-6">
                  Where You Are Now
                </h2>
                <div className="space-y-4">
                  <p className="text-white/90 font-lora leading-relaxed">
                    You already have several important pieces in place: committed members and the beginnings of a shared purpose. These foundations make it possible to move into the next stage of UNA formation.
                  </p>
                  <p className="text-white/90 font-lora leading-relaxed">
                    To be fully ready, you'll want to complete a few key steps: applying for an EIN, preparing a UNA Agreement, checking your state's requirements, and setting up a bank account. Once these are in place, your UNA can operate confidently and securely.
                  </p>
                </div>
              </div>
              
              {/* Readiness Checklist */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-6">
                  Your Formation Checklist
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-navy-600 font-montserrat mb-4 flex items-center">
                      <span className="text-emerald-600 mr-2">✓</span>
                      Ready
                    </h3>
                    <ul className="space-y-2">
                      {answers.readiness.hasMembers && <li className="text-navy-600 font-lora flex items-center"><span className="text-emerald-600 mr-2">✓</span>2+ members</li>}
                      {answers.readiness.hasBylaws && <li className="text-navy-600 font-lora flex items-center"><span className="text-emerald-600 mr-2">✓</span>Purpose statement</li>}
                      {answers.readiness.hasBylaws && <li className="text-navy-600 font-lora flex items-center"><span className="text-emerald-600 mr-2">✓</span>UNA Agreement</li>}
                      {answers.readiness.hasEIN && <li className="text-navy-600 font-lora flex items-center"><span className="text-emerald-600 mr-2">✓</span>EIN (federal tax ID)</li>}
                      {answers.readiness.needsBanking && <li className="text-navy-600 font-lora flex items-center"><span className="text-emerald-600 mr-2">✓</span>Bank account</li>}
                      {!answers.readiness.hasMembers && !answers.readiness.hasBylaws && !answers.readiness.hasEIN && !answers.readiness.needsBanking && (
                        <li className="text-navy-600 font-lora">Nothing yet - that's okay!</li>
                      )}
                    </ul>
            </div>

                  <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-navy-600 font-montserrat mb-4 flex items-center">
                      <span className="text-amber-600 mr-2">○</span>
                      Next Steps
                    </h3>
                    <ul className="space-y-2">
                      {!answers.readiness.hasMembers && <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>2+ members</li>}
                      {!answers.readiness.hasBylaws && <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>Purpose statement</li>}
                      {!answers.readiness.hasBylaws && <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>UNA Agreement</li>}
                      {!answers.readiness.hasEIN && <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>EIN (federal tax ID)</li>}
                      <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>State registration (if required)</li>
                      {!answers.readiness.needsBanking && <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>Bank account</li>}
                      <li className="text-navy-600 font-lora flex items-center"><span className="text-amber-600 mr-2">○</span>Recordkeeping system</li>
                    </ul>
              </div>
                </div>
              </div>
              
              
              {/* Next Steps */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-6">
                  Recommended Actions
                </h2>
                <div className="bg-white/95 backdrop-blur rounded-xl p-6 mb-8 shadow-lg">
                  <ol className="space-y-3">
                    {getActionList().map((action, index) => (
                      <li key={index} className="text-navy-600 font-lora flex items-start">
                        <span className="bg-[#C49A6C] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-sm flex-shrink-0">{index + 1}</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/services"
                    className="btn-grad btn-primary px-8 py-4 text-center font-montserrat text-lg font-bold"
                  >
                    Book Expert Strategy Session
                  </Link>
                  <Link
                    to="/services"
                    className="btn-grad btn-secondary px-8 py-4 text-center font-montserrat text-lg font-bold"
                  >
                    View Formation Packages
                  </Link>
                </div>
                <p className="text-center text-white/80 text-sm font-lora mt-4">
                  Investment starts at $1,000 for 90-minute expert consultation
                </p>
              </div>
            </div>
            
            {/* Start Over Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                  setAnswers({
                    state: '',
                    readiness: {
                      hasMembers: null,
                      hasBylaws: null,
                      hasEIN: null,
                      needsEINHelp: null,
                      needsBanking: null
                    },
                    collectiveTypes: [],
                    priorities: [],
                    otherPriority: ''
                  });
                  setCustomPriority('');
                  setValidationWarnings([]);
                }}
                className="text-white hover:text-white/80 font-lora underline transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="UNA Formation Assessment | UNA Platform"
        description="Take our comprehensive assessment to get personalized recommendations for your UNA formation journey."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <div className="container mx-auto px-4 py-16">
        {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">
              Explore Your UNA Path
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-lora max-w-2xl mx-auto mb-2">
              Free assessment to understand your readiness and get personalized guidance
            </p>
            <p className="text-sm text-white/70 font-lora italic">
              Takes 3-5 minutes • No email required
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-between mb-3">
              {[
                { num: 1, label: 'Readiness' },
                { num: 2, label: 'Type' },
                { num: 3, label: 'Priorities' }
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold mb-1 transition-all ${
                      currentStep >= step.num
                        ? 'bg-[#C49A6C] text-white shadow-lg'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {step.num}
                  </div>
                  <span className={`text-xs font-montserrat ${
                    currentStep >= step.num ? 'text-[#C49A6C]' : 'text-white/60'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-[#C49A6C] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Location & Readiness */}
            {currentStep === 1 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/20">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-8">
                  Location & Readiness
                </h2>
                
                {/* State Selection */}
                <div className="mb-6">
                  <label className="block text-white text-lg font-bold font-montserrat mb-4">
                    In what state will your UNA be based?
                  </label>
                  <select
                    value={answers.state}
                    onChange={(e) => setAnswers(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3DB5B0] focus:border-transparent font-lora text-base min-h-[44px]"
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
        </div>

                {/* Readiness Questions */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-lg font-bold font-montserrat mb-4">
                      Do you already have at least two people committed to forming this UNA?
                    </label>
                    <div className="flex flex-col space-y-3 items-center">
                      <button
                        onClick={() => handleReadinessChange('hasMembers', true)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.hasMembers === true
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleReadinessChange('hasMembers', false)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.hasMembers === false
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    {answers.readiness.hasMembers === true && (
                      <p className="text-sm text-green-600 font-lora mt-2">
                        UNA law requires two or more people to form.
                      </p>
                    )}
                    {answers.readiness.hasMembers === false && (
                      <p className="text-sm text-red-600 font-lora mt-2">
                        A UNA requires at least two people. You'll need to gather members before formalizing.
                      </p>
                    )}
        </div>

                  <div>
                    <label className="block text-white text-lg font-bold font-montserrat mb-4">
                      Do you already have governing rules (bylaws or agreements)?
                    </label>
                    <div className="flex flex-col space-y-3 items-center">
                      <button
                        onClick={() => handleReadinessChange('hasBylaws', true)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.hasBylaws === true
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        Yes
                      </button>
          <button
                        onClick={() => handleReadinessChange('hasBylaws', false)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.hasBylaws === false
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        No
          </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-lg font-bold font-montserrat mb-4">
                      Do you have an EIN (federal tax ID)?
                    </label>
                    <div className="flex flex-col space-y-3 items-center">
            <button
                        onClick={() => handleReadinessChange('hasEIN', true)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.hasEIN === true
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        Yes
            </button>
            <button
                        onClick={() => handleReadinessChange('hasEIN', false)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.hasEIN === false
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        No
            </button>
                    </div>
                    {answers.readiness.hasEIN === false && (
                      <p className="text-sm text-red-600 font-lora mt-2">
                        You'll need an EIN for banking and grant eligibility. We can help you apply.
                      </p>
          )}
        </div>

                  <div>
                    <label className="block text-white text-lg font-bold font-montserrat mb-4">
                      Do you plan to open a bank account in the UNA's name?
                    </label>
                    <div className="flex flex-col space-y-3 items-center">
                      <button
                        onClick={() => handleReadinessChange('needsBanking', true)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.needsBanking === true
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleReadinessChange('needsBanking', false)}
                        className={`px-8 py-3 rounded-xl font-black transition-all duration-200 font-montserrat text-white shadow-lg text-xl ${
                          answers.readiness.needsBanking === false
                            ? 'bg-gradient-to-r from-[#3DB5B0] to-[#1E2A38] shadow-xl transform scale-105 border-2 border-[#3DB5B0]'
                            : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                        }`}
                      >
                        No
                      </button>
                    </div>
        </div>
      </div>
    </div>
            )}

            {/* Step 2: Collective Type */}
            {currentStep === 2 && (
              <div className="bg-gradient-to-br from-[#1E2A38] to-[#3DB5B0] rounded-xl p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-black text-white font-montserrat mb-8 tracking-tight">
                  Step 2: Collective Type
                </h2>
                
                <div className="mb-6">
                  <label className="block text-white text-lg font-bold font-montserrat mb-6">
                    What kind of UNA are you creating? (Select all that apply)
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {COLLECTIVE_TYPES.map((type) => {
                      const Icon = type.icon;
  return (
                        <button
                          key={type.id}
                          onClick={() => handleCollectiveTypeToggle(type.id)}
                          className={`p-6 rounded-xl border-2 transition-all duration-200 font-montserrat text-left shadow-lg ${
                            answers.collectiveTypes.includes(type.id)
                              ? 'border-[#3DB5B0] bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] shadow-xl transform scale-105'
                              : 'border-[#1E2A38] bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-white font-black text-xl mb-2">{type.label}</div>
                              <div className="text-white/80 text-base font-lora leading-relaxed">{type.description}</div>
                            </div>
        </div>
                        </button>
                      );
                    })}
        </div>

                </div>
              </div>
            )}

            {/* Step 3: Formation Priorities */}
            {currentStep === 3 && (
              <div className="bg-gradient-to-br from-[#1E2A38] to-[#3DB5B0] rounded-xl p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-black text-white font-montserrat mb-8 tracking-tight">
                  Step 3: Why You're Forming a UNA
                </h2>
                
                <div className="mb-6">
                  <label className="block text-white text-lg font-bold font-montserrat mb-6">
                    What are your main reasons for forming a UNA? (Select all that apply)
                  </label>
                  
                  <div className="space-y-6">
                    {Object.entries(PRIORITY_CATEGORIES).map(([category, priorities]) => (
                      <div key={category}>
                        <h3 className="text-xl font-black text-white font-montserrat mb-4 tracking-tight">
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {priorities.map((priority) => (
                            <label
                              key={priority}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                answers.priorities.includes(priority)
                                  ? 'bg-gradient-to-r from-[#3DB5B0]/20 to-[#1E2A38]/20 border border-[#3DB5B0]'
                                  : 'hover:bg-white/10'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={answers.priorities.includes(priority)}
                                onChange={() => handlePriorityToggle(priority)}
                                className="h-5 w-5 text-[#3DB5B0] focus:ring-[#3DB5B0] border-gray-300 rounded min-h-[44px] min-w-[44px]"
                              />
                              <span className="text-white font-lora font-bold text-base">{priority}</span>
                            </label>
            ))}
          </div>
        </div>
                    ))}
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white font-montserrat mb-3">
                        Other
                      </h3>
                      <input
                        type="text"
                        value={customPriority}
                        onChange={(e) => setCustomPriority(e.target.value)}
                        placeholder="Please specify your other priority"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3DB5B0] focus:border-transparent font-lora text-base min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Warnings */}
            {validationWarnings.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-900 font-semibold font-montserrat mb-2">
                  Please complete the following:
                </h3>
                <ul className="text-red-800 font-lora space-y-1">
                  {validationWarnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 font-montserrat ${
                  currentStep === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] text-white shadow-lg hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              
              <button
                onClick={nextStep}
                disabled={!isStepComplete(currentStep)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 font-montserrat ${
                  isStepComplete(currentStep)
                    ? 'bg-gradient-to-r from-[#1E2A38] to-[#3DB5B0] text-white shadow-lg hover:from-[#2A2F4A] hover:to-[#4AC5C0] hover:shadow-xl hover:transform hover:scale-105 active:from-[#0F1220] active:to-[#2A9B96]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === 3 ? 'Get Results' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
