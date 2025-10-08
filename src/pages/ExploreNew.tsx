import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Lock, DollarSign } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { GradientHeader } from '@/components/ui';

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
  primaryGoal: string;
  memberCount: string;
  annualBudget: string;
  privacyPreference: string;
  state: string;
}

export default function ExploreNew() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    primaryGoal: '',
    memberCount: '',
    annualBudget: '',
    privacyPreference: '',
    state: ''
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'primaryGoal',
      question: "What's your primary goal for forming an organization?",
      options: [
        { value: 'community', label: 'Community Building', icon: Shield, score: 10 },
        { value: 'tax', label: 'Tax Exemption', icon: DollarSign, score: 7 },
        { value: 'legal', label: 'Legal Protection', icon: Shield, score: 9 },
        { value: 'privacy', label: 'Privacy & Sovereignty', icon: Lock, score: 10 }
      ]
    },
    {
      id: 'memberCount',
      question: "How many founding members do you have?",
      options: [
        { value: 'small', label: 'Less than 3', score: 8 },
        { value: 'medium', label: '3-7 members', score: 10 },
        { value: 'large', label: '8+ members', score: 10 }
      ]
    },
    {
      id: 'annualBudget',
      question: "What's your expected annual budget?",
      options: [
        { value: 'micro', label: 'Under $50,000', score: 10 },
        { value: 'small', label: '$50,000 - $250,000', score: 9 },
        { value: 'medium', label: 'Over $250,000', score: 7 }
      ]
    },
    {
      id: 'privacyPreference',
      question: "How important is privacy to your organization?",
      options: [
        { value: 'critical', label: 'Critical - want to stay private', score: 10 },
        { value: 'important', label: 'Important - some privacy preferred', score: 8 },
        { value: 'neutral', label: 'Not a priority - transparency is fine', score: 5 }
      ]
    },
    {
      id: 'state',
      question: "Which state will you operate in?",
      isDropdown: true,
      options: US_STATES.map(state => ({ value: state.toLowerCase(), label: state, score: 10 }))
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
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

  const calculateResults = () => {
    // Calculate readiness score based on answers
    let score = 0;
    questions.forEach(question => {
      const answer = answers[question.id as keyof QuizAnswers];
      const option = question.options.find(opt => opt.value === answer);
      if (option && 'score' in option) {
        score += option.score;
      }
    });

    // Store results
    const results = {
      score: Math.round((score / 50) * 100),
      answers,
      timestamp: Date.now()
    };
    localStorage.setItem('unaReadinessResults', JSON.stringify(results));

    setShowResults(true);
  };

  const getReadinessData = () => {
    const stored = localStorage.getItem('unaReadinessResults');
    if (!stored) return null;
    return JSON.parse(stored);
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = answers[currentQuestion.id as keyof QuizAnswers] !== '';
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
          description="Take our quick 5-question assessment to discover if a UNA is the right fit for your organization. Get instant results and personalized recommendations."
          keywords={[
            'UNA assessment',
            'nonprofit formation',
            'unincorporated association',
            'nonprofit readiness',
            'UNA formation legal assistance'
          ]}
        />

        <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
          <GradientHeader
            title="Your UNA Readiness Results"
            subtitle="Based on your answers, here's how well a UNA fits your organization"
          />

          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Score Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center mb-8">
              <div className="mb-6">
                <div className="text-6xl font-bold text-white mb-2">{score}%</div>
                <div className={`text-2xl font-semibold ${recommendationClass}`}>
                  {recommendation}
                </div>
              </div>

              <div className="w-full bg-white/20 rounded-full h-4 mb-6">
                <div
                  className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="text-white/90 text-lg font-lora">
                Based on your answers, a UNA is {score >= 85 ? 'an excellent' : score >= 70 ? 'a great' : 'a good'} match for your organization's needs.
              </p>
            </div>

            {/* Why UNA Is Right */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">
                Why a UNA Is Right For You:
              </h3>

              <div className="space-y-4">
                {answers.primaryGoal === 'privacy' && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#C49A6C] flex-shrink-0 mt-1" />
                    <p className="text-white/90 font-lora">
                      <strong className="text-white">Maximum Privacy:</strong> UNAs don't require public disclosure of members or finances, protecting your sovereignty.
                    </p>
                  </div>
                )}

                {answers.annualBudget === 'micro' && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#C49A6C] flex-shrink-0 mt-1" />
                    <p className="text-white/90 font-lora">
                      <strong className="text-white">Cost Effective:</strong> UNA formation costs $1,000-$5,000 vs $5,000-$15,000 for 501(c)(3) incorporation.
                    </p>
                  </div>
                )}

                {(answers.memberCount === 'small' || answers.memberCount === 'medium') && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#C49A6C] flex-shrink-0 mt-1" />
                    <p className="text-white/90 font-lora">
                      <strong className="text-white">Simple Governance:</strong> No board meetings, complex bylaws, or corporate formalities required.
                    </p>
                  </div>
                )}

                {answers.primaryGoal === 'legal' && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#C49A6C] flex-shrink-0 mt-1" />
                    <p className="text-white/90 font-lora">
                      <strong className="text-white">Legal Protection:</strong> Members get liability protection without losing organizational autonomy.
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#C49A6C] flex-shrink-0 mt-1" />
                  <p className="text-white/90 font-lora">
                    <strong className="text-white">Fast Formation:</strong> Get up and running in weeks, not months.
                  </p>
                </div>
              </div>
            </div>

            {/* UNA vs 501(c)(3) Comparison */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">
                UNA vs 501(c)(3) Comparison
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="pb-3 text-white font-montserrat">Feature</th>
                      <th className="pb-3 text-[#C49A6C] font-montserrat">UNA</th>
                      <th className="pb-3 text-white/60 font-montserrat">501(c)(3)</th>
                    </tr>
                  </thead>
                  <tbody className="font-lora">
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white/90">Formation Time</td>
                      <td className="py-3 text-[#C49A6C]">2-4 weeks</td>
                      <td className="py-3 text-white/60">3-12 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white/90">Formation Cost</td>
                      <td className="py-3 text-[#C49A6C]">$1,000-$5,000</td>
                      <td className="py-3 text-white/60">$5,000-$15,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white/90">Annual Reports</td>
                      <td className="py-3 text-[#C49A6C]">Minimal/None</td>
                      <td className="py-3 text-white/60">Form 990 Required</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white/90">Privacy</td>
                      <td className="py-3 text-[#C49A6C]">High</td>
                      <td className="py-3 text-white/60">Low (Public 990s)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white/90">Tax Exemption</td>
                      <td className="py-3 text-[#C49A6C]">Available</td>
                      <td className="py-3 text-white/60">Available</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white/90">Governance</td>
                      <td className="py-3 text-[#C49A6C]">Flexible</td>
                      <td className="py-3 text-white/60">Rigid (Board req.)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Steps CTAs */}
            <div className="space-y-4">
              <button
                onClick={() => navigate('/services')}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-200 font-montserrat text-lg flex items-center justify-center gap-3"
              >
                Start Your UNA Formation
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => navigate('/blog')}
                className="w-full px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 font-montserrat"
              >
                Learn More About UNAs
              </button>

              <div className="text-center pt-4">
                <p className="text-white/70 text-sm font-lora mb-3">
                  Want a custom formation checklist for {answers.state}?
                </p>
                <button
                  onClick={() => navigate('/intake?package=strategy-session')}
                  className="text-[#C49A6C] hover:text-[#B8955A] font-semibold underline font-montserrat"
                >
                  Get Your Free PDF Guide
                </button>
              </div>
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
        description="Not sure if a UNA is right for your organization? Take our quick 5-question assessment to get instant, personalized results and recommendations for nonprofit formation."
        keywords={[
          'UNA assessment',
          'nonprofit formation',
          'unincorporated association',
          'is a UNA right for me',
          'nonprofit formation legal assistance',
          'UNA requirements'
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        <GradientHeader
          title="Is a UNA Right For You?"
          subtitle="Quick 5-question assessment • Get instant results • Free personalized recommendations"
        />

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm font-montserrat">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-white/70 text-sm font-montserrat">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#C49A6C] to-[#2F7E7E] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">
              {currentQuestion.question}
            </h2>

            {currentQuestion.isDropdown ? (
              <select
                value={answers[currentQuestion.id as keyof QuizAnswers]}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white font-lora focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              >
                <option value="" className="bg-[#1E2A38] text-white">Select your state...</option>
                {currentQuestion.options.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#1E2A38] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const Icon = 'icon' in option ? option.icon : null;
                  const isSelected = answers[currentQuestion.id as keyof QuizAnswers] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-[#C49A6C] bg-[#C49A6C]/20'
                          : 'border-white/30 bg-white/5 hover:border-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className={`h-5 w-5 ${isSelected ? 'text-[#C49A6C]' : 'text-white/70'}`} />}
                        <span className={`font-semibold ${isSelected ? 'text-white' : 'text-white/90'} font-montserrat`}>
                          {option.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 font-montserrat"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 font-montserrat flex items-center gap-2 ${
                isAnswered
                  ? 'bg-gradient-to-r from-[#C49A6C] to-[#B8955A] text-white hover:shadow-lg'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
