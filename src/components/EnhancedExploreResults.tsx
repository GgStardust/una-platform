import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, ArrowRight, Download } from 'lucide-react';
import { processUserInput } from '@/lib/text/normalizeS2S';

interface EnhancedExploreResultsProps {
  answers: any;
  freeTextDescriptions: any;
  onContinueToFormation: () => void;
  onExportResults: () => void;
}

export default function EnhancedExploreResults({
  answers,
  freeTextDescriptions,
  onContinueToFormation,
  onExportResults
}: EnhancedExploreResultsProps) {
  // Process user inputs to generate S2S-approved summaries
  const summary = React.useMemo(() => {
    const missionInput = freeTextDescriptions.missionDescription || '';
    const structureInput = freeTextDescriptions.currentFormDescription || '';
    const impactInput = freeTextDescriptions.impactDescription || '';
    
    const missionRefinement = processUserInput(missionInput);
    const structureRefinement = processUserInput(structureInput);
    const impactRefinement = processUserInput(impactInput);
    
    return {
      mission: missionRefinement,
      structure: structureRefinement,
      impact: impactRefinement,
      overall: {
        confidence: missionRefinement.confidence === 'high' && structureRefinement.confidence === 'high' ? 'high' : 'medium',
        gaps: [...missionRefinement.gaps, ...structureRefinement.gaps, ...impactRefinement.gaps],
        strategicSteps: [
          ...missionRefinement.nextSteps,
          ...structureRefinement.nextSteps,
          ...impactRefinement.nextSteps
        ].slice(0, 5) // Limit to top 5 steps
      }
    };
  }, [answers, freeTextDescriptions]);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-navy-600 bg-navy-50';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high': return <CheckCircle className="h-5 w-5" />;
      case 'medium': return <AlertTriangle className="h-5 w-5" />;
      case 'low': return <AlertTriangle className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">
          Your UNA Formation Assessment
        </h1>
        <p className="text-lg text-navy-600">
          Based on your exploration, here's what we've discovered about your organization's readiness
        </p>
      </div>

      {/* Confidence Assessment */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-navy-900">Assessment Confidence</h2>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getConfidenceColor(summary.overall.confidence)}`}>
            {getConfidenceIcon(summary.overall.confidence)}
            <span className="text-sm font-medium capitalize">{summary.overall.confidence} Confidence</span>
          </div>
        </div>
        
        <p className="text-navy-700 leading-relaxed">
          {summary.overall.confidence === 'high' 
            ? 'Your exploration provides a clear foundation for UNA formation. The information you have shared gives us confidence in proceeding with the formation process.'
            : summary.overall.confidence === 'medium' 
            ? 'Your exploration reveals a solid foundation with some areas that would benefit from further development. We can proceed with formation while addressing these areas.'
            : 'Your exploration shows the beginning of a vision that would benefit from further development before proceeding with formation. We can work together to clarify these elements.'
          }
        </p>
      </div>

      {/* Mission Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Mission & Purpose</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-navy-800 mb-2">Your Mission Focus</h3>
            <p className="text-navy-700 leading-relaxed">
              {answers.mission.length > 0 ? 
                `This organization focuses on ${answers.mission.join(', ')}. ${freeTextDescriptions.missionDescription ? 
                  summary.mission.refined : 
                  'Your mission provides a clear direction for your work in the community.'
                }` :
                'Your mission focus requires further definition to provide clear direction for your organization.'
              }
            </p>
          </div>

          {summary.mission.strategicGuidance.length > 0 && (
            <div>
              <h3 className="font-medium text-navy-800 mb-2">Strategic Considerations</h3>
              <div className="space-y-2">
                {summary.mission.strategicGuidance.map((guidance, index) => (
                  <p key={index} className="text-navy-700 leading-relaxed flex items-start">
                    <Lightbulb className="h-4 w-4 text-gold-600 mr-2 mt-0.5 flex-shrink-0" />
                    {guidance}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Structure & Governance */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Structure & Governance</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-navy-800 mb-2">Organizational Form</h3>
            <p className="text-navy-700 leading-relaxed">
              {answers.currentForm ? 
                `Your organization operates as a ${answers.currentForm} structure. ${freeTextDescriptions.currentFormDescription ? 
                  summary.structure.refined : 
                  'This structure provides a foundation for your collaborative work.'
                }` :
                'Your organizational structure requires definition to establish clear governance and decision-making processes.'
              }
            </p>
          </div>

          {summary.structure.strategicGuidance.length > 0 && (
            <div>
              <h3 className="font-medium text-navy-800 mb-2">Governance Development</h3>
              <div className="space-y-2">
                {summary.structure.strategicGuidance.map((guidance, index) => (
                  <p key={index} className="text-navy-700 leading-relaxed flex items-start">
                    <Lightbulb className="h-4 w-4 text-gold-600 mr-2 mt-0.5 flex-shrink-0" />
                    {guidance}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Impact & Audience */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Impact & Audience</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-navy-800 mb-2">Community Impact</h3>
            <p className="text-navy-700 leading-relaxed">
              {answers.impact.length > 0 ? 
                `Your organization aims to create ${answers.impact.join(', ')}. ${freeTextDescriptions.impactDescription ? 
                  summary.impact.refined : 
                  'This impact focus guides your programs and community engagement.'
                }` :
                'Your impact focus requires clarification to guide program development and community engagement.'
              }
            </p>
          </div>

          <div>
            <h3 className="font-medium text-navy-800 mb-2">Operational Environment</h3>
            <p className="text-navy-700 leading-relaxed">
              {answers.environments.length > 0 ? 
                `Your work occurs in ${answers.environments.join(', ')} environments. This operational context shapes how you deliver your programs and engage with your community.` :
                'Your operational environment requires definition to understand how you will deliver your programs and engage with your community.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Gap Analysis */}
      {summary.overall.gaps.length > 0 && (
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">Areas for Development</h2>
          
          <div className="space-y-3">
            {summary.overall.gaps.map((gap, index) => (
              <div key={index} className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-amber-800 leading-relaxed">{gap}</p>
              </div>
            ))}
          </div>
          
          <p className="text-amber-700 mt-4 leading-relaxed">
            These areas represent opportunities to strengthen your organization's foundation. Addressing them will enhance your ability to fulfill your mission effectively.
          </p>
        </div>
      )}

      {/* Strategic Next Steps */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-200 p-6">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Strategic Next Steps</h2>
        
        <div className="space-y-4">
          <p className="text-navy-700 leading-relaxed">
            Based on your exploration, here are the key steps to move forward with your UNA formation:
          </p>
          
          <div className="space-y-3">
            {summary.overall.strategicSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gold-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-gold-800 text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-navy-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          
          <p className="text-navy-700 mt-4 leading-relaxed">
            These steps will help you build a strong foundation for your organization. Each step builds upon the previous one, creating a comprehensive approach to UNA formation.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onExportResults}
          className="flex items-center justify-center px-6 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Assessment
        </button>
        
        <button
          onClick={onContinueToFormation}
          className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-lg hover:from-gold-700 hover:to-gold-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Continue to Formation
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>

      {/* Sovereignty Note */}
      <div className="bg-cream-50 rounded-lg border border-cream-200 p-4 text-center">
        <p className="text-navy-700 text-sm leading-relaxed">
          Remember that your organization serves your mission, not the other way around. The structure we create together will support your creativity and community impact while providing the legal foundation you need to thrive.
        </p>
      </div>
    </div>
  );
}
