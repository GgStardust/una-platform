import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Lock, Target, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { GradientHeader, ResponsiveContainer, ResponsiveCard, ResponsiveText, ResponsiveButton } from '@/components/ui';
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
  primaryGoals: string[];
  memberCount: string;
  annualBudget: string;
  privacyPreferences: string[];
  state: string;
  email: string;
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
    let score = 0;
    let totalPossible = 0;

    questions.forEach(question => {
      if (question.multiSelect) {
        const selectedValues = answers[question.id as keyof QuizAnswers] as string[];
        selectedValues.forEach(value => {
          const option = question.options?.find(opt => opt.value === value);
          if (option && 'score' in option) {
            score += option.score;
            totalPossible += 10;
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
        score += 10;
      }
    });

    const percentageScore = Math.round((score / totalPossible) * 100);

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

    const results = {
      score: percentageScore,
      answers,
      timestamp: Date.now()
    };
    localStorage.setItem('unaReadinessResults', JSON.stringify(results));

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
    ? true
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

          <ResponsiveContainer size="default" maxWidth="lg">
            {/* Score Display */}
            <ResponsiveCard variant="default" className="text-center mb-5">
              <ResponsiveText variant="h1" weight="bold" className="text-white mb-2">
                {score}%
              </ResponsiveText>
              <ResponsiveText variant="h2" weight="semibold" className={`${recommendationClass} mb-4`}>
                {recommendation}
              </ResponsiveText>

              <div className="w-full bg-white/20 rounded-full h-3 md:h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] h-3 md:h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${score}%` }}
                />
              </div>

              <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90">
                A UNA is {score >= 85 ? 'an excellent' : score >= 70 ? 'a great' : 'a good'} match for your needs.
              </ResponsiveText>
            </ResponsiveCard>

            {/* Why UNA Is Right */}
            <ResponsiveCard variant="default" className="mb-5">
              <ResponsiveText variant="h3" weight="bold" font="montserrat" className="text-white mb-3">
                Why a UNA Works For You:
              </ResponsiveText>

              <div className="space-y-2.5">
                {answers.primaryGoals.includes('sovereignty') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <ResponsiveText variant="body" font="lora" className="text-white/90">
                      <strong className="text-white">Autonomy:</strong> Maintain sovereignty without corporate oversight
                    </ResponsiveText>
                  </div>
                )}

                {answers.privacyPreferences.includes('privacy') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <ResponsiveText variant="body" font="lora" className="text-white/90">
                      <strong className="text-white">Privacy:</strong> No public disclosure of members or finances
                    </ResponsiveText>
                  </div>
                )}

                {answers.annualBudget === 'micro' && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <ResponsiveText variant="body" font="lora" className="text-white/90">
                      <strong className="text-white">Cost Effective:</strong> $1,000-$5,000 vs $5,000-$15,000 for 501(c)(3)
                    </ResponsiveText>
                  </div>
                )}

                {answers.privacyPreferences.includes('flexibility') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <ResponsiveText variant="body" font="lora" className="text-white/90">
                      <strong className="text-white">Simple:</strong> No board meetings or complex bylaws
                    </ResponsiveText>
                  </div>
                )}

                {answers.privacyPreferences.includes('speed') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                    <ResponsiveText variant="body" font="lora" className="text-white/90">
                      <strong className="text-white">Fast:</strong> Formation in weeks, not months
                    </ResponsiveText>
                  </div>
                )}
              </div>
            </ResponsiveCard>

            {/* Next Steps CTAs */}
            <div className="space-y-2.5">
              {answers.email ? (
                <>
                  <ResponsiveButton
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => navigate('/intake', { state: { email: answers.email, quizResults: answers } })}
                  >
                    Continue to Intake Form
                    <ArrowRight className="h-4 w-4" />
                  </ResponsiveButton>
                  <ResponsiveText variant="captionSmall" font="lora" className="text-white/60 text-center block">
                    We'll send your results to {answers.email}
                  </ResponsiveText>
                </>
              ) : (
                <ResponsiveCard variant="compact" className="bg-white/5 border-white/20 mb-2">
                  <ResponsiveText variant="caption" font="lora" className="text-white/80 text-center mb-1.5 block">
                    💡 <strong className="text-white">Next Step:</strong> Take your time reviewing these results.
                  </ResponsiveText>
                  <ResponsiveText variant="captionSmall" font="lora" className="text-white/60 text-center block">
                    When you're ready, explore our services below.
                  </ResponsiveText>
                </ResponsiveCard>
              )}

              <ResponsiveButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => navigate('/services')}
              >
                View Services & Pricing
              </ResponsiveButton>

              <ResponsiveButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => navigate('/faq')}
              >
                Learn More About UNAs
              </ResponsiveButton>
            </div>
          </ResponsiveContainer>
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

        <ResponsiveContainer size="default" maxWidth="md">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <ResponsiveText variant="captionSmall" font="montserrat" className="text-white/70">
                Question {currentStep + 1} of {questions.length}
              </ResponsiveText>
              <ResponsiveText variant="captionSmall" font="montserrat" className="text-white/70">
                {Math.round(progress)}%
              </ResponsiveText>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 md:h-2">
              <div
                className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] h-1.5 md:h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <ResponsiveCard variant="default" className="mb-4">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-2">
              {currentQuestion.question}
            </ResponsiveText>

            {'subtitle' in currentQuestion && (
              <ResponsiveText variant="caption" font="lora" className="text-white/60 mb-3 block">
                {currentQuestion.subtitle}
              </ResponsiveText>
            )}

            {'description' in currentQuestion && (
              <ResponsiveText variant="caption" font="lora" className="text-white/70 mb-3 block italic">
                {currentQuestion.description}
              </ResponsiveText>
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
                    className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/40 font-lora focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-base"
                  />
                </div>
                {currentQuestion.optional && (
                  <ResponsiveText variant="captionSmall" font="lora" className="text-white/50 mt-2 block italic">
                    Skip this step if you prefer to just see your results now
                  </ResponsiveText>
                )}
              </div>
            ) : currentQuestion.isDropdown ? (
              <select
                value={answers[currentQuestion.id as keyof QuizAnswers] as string}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white font-lora focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-base"
              >
                <option value="" className="bg-[#1E2A38] text-white">Select your state...</option>
                {currentQuestion.options?.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#1E2A38] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => {
                  const Icon = 'icon' in option ? option.icon : null;
                  const isSelected = currentQuestion.multiSelect
                    ? (answers[currentQuestion.id as keyof QuizAnswers] as string[]).includes(option.value)
                    : answers[currentQuestion.id as keyof QuizAnswers] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left min-h-[44px] ${
                        isSelected
                          ? 'border-[#C49A6C] bg-[#C49A6C]/20'
                          : 'border-white/30 bg-white/5 hover:border-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-[#C49A6C]' : 'text-white/70'}`} />}
                        <ResponsiveText variant="caption" weight="semibold" font="montserrat" className={isSelected ? 'text-white' : 'text-white/90'}>
                          {option.label}
                        </ResponsiveText>
                        {currentQuestion.multiSelect && isSelected && (
                          <CheckCircle className="h-4 w-4 ml-auto text-[#C49A6C]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </ResponsiveCard>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3">
            {currentStep > 0 ? (
              <ResponsiveButton variant="outline" size="sm" onClick={handleBack}>
                Back
              </ResponsiveButton>
            ) : (
              <div />
            )}

            <ResponsiveButton
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </ResponsiveButton>
          </div>
        </ResponsiveContainer>
      </div>
    </>
  );
}
