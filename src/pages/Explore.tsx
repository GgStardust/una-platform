import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Lock, Target, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { GradientHeader } from '@/components/ui';
import { submitQuizResults } from '../lib/supabase/quiz';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

interface QuizAnswers {
  primaryGoals: string[]; // Changed to array
  memberCount: string;
  annualBudget: string;
  privacyPreferences: string[]; // Changed to array
  state: string;
  email: string; // Added email
}

export default function ExploreNew() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    primaryGoals: [],
    memberCount: '',
    annualBudget: '',
    privacyPreferences: [],
    state: '',
    email: ''
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'primaryGoals',
      question: "What matters most in how you organize together?",
      subtitle: "Select all that apply",
      multiSelect: true,
      options: [
        { value: 'purpose', label: 'Our shared purpose and vision', icon: Target, score: 10 },
        { value: 'sovereignty', label: 'Protecting our autonomy', icon: Shield, score: 10 },
        { value: 'clarity', label: 'Legal clarity without bureaucracy', icon: CheckCircle, score: 9 },
        { value: 'legacy', label: 'Building something that lasts', icon: TrendingUp, score: 10 }
      ]
    },
    {
      id: 'memberCount',
      question: "Where are you in your journey?",
      options: [
        { value: 'exploring', label: 'Just beginning to explore', score: 8 },
        { value: 'ready', label: 'Clear on purpose, ready for next steps', score: 10 },
        { value: 'operating', label: 'Already operating, need legal recognition', score: 10 },
        { value: 'alternative', label: 'Tried other structures, seeking alternatives', score: 9 }
      ]
    },
    {
      id: 'annualBudget',
      question: "Expected annual gross receipts?",
      description: "This determines your EIN and state filing requirements.",
      options: [
        { value: 'micro', label: 'Under $50,000', score: 10 },
        { value: 'small', label: '$50,000 - $250,000', score: 9 },
        { value: 'medium', label: 'Over $250,000', score: 7 }
      ]
    },
    {
      id: 'privacyPreferences',
      question: "What do you value most about staying unincorporated?",
      subtitle: "Select all that apply",
      multiSelect: true,
      options: [
        { value: 'privacy', label: 'Privacy - no public disclosure required', icon: Lock, score: 10 },
        { value: 'flexibility', label: 'Flexibility - no board meetings required', icon: Shield, score: 10 },
        { value: 'speed', label: 'Speed - formation in weeks', score: 8 },
        { value: 'sovereignty', label: 'Sovereignty - organizational autonomy', icon: Shield, score: 10 }
      ]
    },
    {
      id: 'state',
      question: "Which state will be your home?",
      isDropdown: true,
      options: US_STATES.map(state => ({ value: state.toLowerCase(), label: state, score: 10 }))
    },
    {
      id: 'email',
      question: "Want to stay connected?",
      description: "Optional: Receive your personalized UNA readiness report via email, plus occasional updates on formation best practices. You can skip this and continue to see your results.",
      isEmail: true,
      optional: true
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const question = questions[currentStep];

    if (question.multiSelect) {
      // Handle multi-select
      setAnswers(prev => {
        const currentValues = prev[questionId as keyof QuizAnswers] as string[];
        const isSelected = currentValues.includes(value);

        return {
          ...prev,
          [questionId]: isSelected
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value]
        };
      });
    } else {
      // Handle single select
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateResults = async () => {
    // Calculate readiness score based on answers
    let score = 0;
    let totalPossible = 0;

    questions.forEach(question => {
      if (question.multiSelect) {
        const selectedValues = answers[question.id as keyof QuizAnswers] as string[];
        selectedValues.forEach(value => {
          const option = question.options?.find(opt => opt.value === value);
          if (option && 'score' in option) {
            score += option.score;
            totalPossible += 10; // Assume max score is 10
          }
        });
      } else if (!question.isEmail && !question.isDropdown) {
        const answer = answers[question.id as keyof QuizAnswers];
        const option = question.options?.find(opt => opt.value === answer);
        if (option && 'score' in option) {
          score += option.score;
          totalPossible += 10;
        }
      } else if (question.isDropdown) {
        totalPossible += 10;
        score += 10; // Full points for state selection
      }
    });

    const percentageScore = Math.round((score / totalPossible) * 100);

    // Determine recommendation
    let recommendation = '';
    if (percentageScore >= 85) {
      recommendation = 'EXCELLENT FIT';
    } else if (percentageScore >= 70) {
      recommendation = 'GREAT FIT';
    } else if (percentageScore >= 50) {
      recommendation = 'GOOD FIT';
    } else {
      recommendation = 'POSSIBLE FIT';
    }

    // Store results locally
    const results = {
      score: percentageScore,
      answers,
      timestamp: Date.now()
    };
    localStorage.setItem('unaReadinessResults', JSON.stringify(results));

    // Submit to Supabase
    await submitQuizResults({
      email: answers.email,
      primary_goal: answers.primaryGoals.join(', '),
      journey_stage: answers.memberCount,
      annual_budget: answers.annualBudget,
      privacy_preference: answers.privacyPreferences.join(', '),
      state: answers.state,
      score: percentageScore,
      recommendation
    });

    setShowResults(true);
  };

  const getReadinessData = () => {
    const stored = localStorage.getItem('unaReadinessResults');
    if (!stored) return null;
    return JSON.parse(stored);
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = currentQuestion.isEmail && currentQuestion.optional
    ? true // Email is optional, always allow next
    : currentQuestion.isEmail
      ? answers.email !== '' && answers.email.includes('@')
      : currentQuestion.multiSelect
        ? (answers[currentQuestion.id as keyof QuizAnswers] as string[]).length > 0
        : answers[currentQuestion.id as keyof QuizAnswers] !== '';
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults) {
    const results = getReadinessData();
    const score = results?.score || 0;

    let recommendation = '';
    let recommendationClass = '';

    if (score >= 85) {
      recommendation = 'EXCELLENT FIT';
      recommendationClass = 'text-green-400';
    } else if (score >= 70) {
      recommendation = 'GREAT FIT';
      recommendationClass = 'text-blue-400';
    } else if (score >= 50) {
      recommendation = 'GOOD FIT';
      recommendationClass = 'text-yellow-400';
    } else {
      recommendation = 'POSSIBLE FIT';
      recommendationClass = 'text-orange-400';
    }

    return (
      <>
        <SEOHead
          title="Is a UNA Right For You? - UNA Readiness Assessment"
          description="Take our quick 6-question assessment to discover if a UNA is the right fit for your organization. Get instant results and personalized recommendations."
          keywords={[
            'UNA assessment',
            'unincorporated association',
            'UNA formation support'
          ]}
        />

        <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
          <GradientHeader
            title="Your UNA Readiness Results"
            subtitle="Based on your answers"
          />

          <div className="max-w-3xl mx-auto px-3 md:px-4 py-3 md:py-6">
            {/* Score Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 text-center mb-4 md:mb-5">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">{score}%</div>
              <div className={`text-xl md:text-2xl font-semibold ${recommendationClass} mb-4`}>
                {recommendation}
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 md:h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] h-3 md:h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-white/90 text-base md:text-lg font-lora">
                A UNA is {score >= 85 ? 'an excellent' : score >= 70 ? 'a great' : 'a good'} match for your needs.
              </p>
            </div>

            {/* Why UNA Is Right - Simplified */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 mb-4 md:mb-5">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-montserrat">
                Why a UNA Works For You:
              </h3>

              <div className="space-y-2 md:space-y-2.5">
                {answers.primaryGoals.includes('sovereignty') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 font-lora text-sm md:text-base">
                      <strong className="text-white">Autonomy:</strong> Maintain sovereignty without corporate oversight
                    </p>
                  </div>
                )}

                {answers.privacyPreferences.includes('privacy') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 font-lora text-sm md:text-base">
                      <strong className="text-white">Privacy:</strong> No public disclosure of members or finances
                    </p>
                  </div>
                )}

                {answers.annualBudget === 'micro' && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 font-lora text-sm md:text-base">
                      <strong className="text-white">Cost Effective:</strong> $1,000-$5,000 vs $5,000-$15,000 for 501(c)(3)
                    </p>
                  </div>
                )}

                {answers.privacyPreferences.includes('flexibility') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 font-lora text-sm md:text-base">
                      <strong className="text-white">Simple:</strong> No board meetings or complex bylaws
                    </p>
                  </div>
                )}

                {answers.privacyPreferences.includes('speed') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 font-lora text-sm md:text-base">
                      <strong className="text-white">Fast:</strong> Formation in weeks, not months
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps CTAs */}
            <div className="space-y-2 md:space-y-2.5">
              {answers.email ? (
                <>
                  <button
                    onClick={() => {
                      // Pass email to intake form
                      navigate('/intake', { state: { email: answers.email, quizResults: answers } });
                    }}
                    className="w-full px-5 py-2.5 md:px-8 md:py-3.5 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-200 font-montserrat text-sm md:text-base flex items-center justify-center gap-2"
                  >
                    Continue to Intake Form
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-white/60 text-xs text-center font-lora">
                    We'll send your results to {answers.email}
                  </p>
                </>
              ) : (
                <div className="bg-white/5 border border-white/20 rounded-lg p-3 mb-2">
                  <p className="text-white/80 text-xs md:text-sm font-lora text-center mb-1.5">
                    💡 <strong className="text-white">Next Step:</strong> Take your time reviewing these results.
                  </p>
                  <p className="text-white/60 text-xs font-lora text-center">
                    When you're ready, explore our services below.
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate('/services')}
                className="w-full px-5 py-2.5 md:px-8 md:py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 font-montserrat text-sm md:text-base"
              >
                View Services & Pricing
              </button>

              <button
                onClick={() => navigate('/faq')}
                className="w-full px-5 py-2.5 md:px-8 md:py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 font-montserrat text-sm md:text-base"
              >
                Learn More About UNAs
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
        title="Is a UNA Right For You? - Free Assessment | UNA Platform"
        description="Take our quick 6-question assessment to discover if a UNA is the right fit for your organization."
        keywords={[
          'UNA assessment',
          'unincorporated association',
          'is a UNA right for me',
          'UNA requirements'
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <GradientHeader
          title="Is a UNA Right For You?"
          subtitle="6-question assessment • Instant results"
        />

        <div className="max-w-2xl mx-auto px-3 md:px-4 py-2 md:py-4">
          {/* Progress Bar */}
          <div className="mb-3 md:mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white/70 text-xs font-montserrat">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-white/70 text-xs font-montserrat">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 md:h-2">
              <div
                className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] h-1.5 md:h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 border border-white/20 mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 font-montserrat">
              {currentQuestion.question}
            </h2>
            {'subtitle' in currentQuestion && (
              <p className="text-white/60 text-xs md:text-sm font-lora mb-2 md:mb-3">
                {currentQuestion.subtitle}
              </p>
            )}
            {'description' in currentQuestion && (
              <p className="text-white/70 text-xs md:text-sm font-lora mb-2 md:mb-3 italic">
                {currentQuestion.description}
              </p>
            )}

            {currentQuestion.isEmail ? (
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="email"
                    value={answers.email}
                    onChange={(e) => handleAnswer('email', e.target.value)}
                    placeholder="your@email.com (optional)"
                    className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/40 font-lora focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-sm"
                  />
                </div>
                {currentQuestion.optional && (
                  <p className="text-white/50 text-xs mt-2 font-lora italic">
                    Skip this step if you prefer to just see your results now
                  </p>
                )}
              </div>
            ) : currentQuestion.isDropdown ? (
              <select
                value={answers[currentQuestion.id as keyof QuizAnswers] as string}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/10 border border-white/30 rounded-lg text-white font-lora focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-sm"
              >
                <option value="" className="bg-[#1E2A38] text-white">Select your state...</option>
                {currentQuestion.options?.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#1E2A38] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-1.5 md:space-y-2">
                {currentQuestion.options?.map((option) => {
                  const Icon = 'icon' in option ? option.icon : null;
                  const isSelected = currentQuestion.multiSelect
                    ? (answers[currentQuestion.id as keyof QuizAnswers] as string[]).includes(option.value)
                    : answers[currentQuestion.id as keyof QuizAnswers] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`w-full p-2.5 md:p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-[#C49A6C] bg-[#C49A6C]/20'
                          : 'border-white/30 bg-white/5 hover:border-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-[#C49A6C]' : 'text-white/70'}`} />}
                        <span className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-white/90'} font-montserrat`}>
                          {option.label}
                        </span>
                        {currentQuestion.multiSelect && isSelected && (
                          <CheckCircle className="h-4 w-4 ml-auto text-[#C49A6C]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-2 md:gap-3">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="px-4 md:px-6 py-2 md:py-2.5 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 font-montserrat text-sm"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-5 md:px-8 py-2 md:py-2.5 rounded-lg font-semibold transition-all duration-200 font-montserrat flex items-center gap-1.5 md:gap-2 text-sm ${
                isAnswered
                  ? 'bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white hover:shadow-lg'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
