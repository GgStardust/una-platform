import { ExploreAnswers, IntakeDraft } from './types';

/**
 * Maps exploration answers to intake form fields for prefilling
 * Only maps fields that have clear logical connections
 */
export function mapExploreToIntake(explore: ExploreAnswers): Partial<IntakeDraft> {
  const intake: Partial<IntakeDraft> = {};

  // Map mission focus to entity purpose and activities
  if (explore.mission.length > 0) {
    const missionText = explore.mission.join(', ');
    if (explore.otherText) {
      intake.entityPurpose = `${missionText}, ${explore.otherText}`;
    } else {
      intake.entityPurpose = missionText;
    }
    
    // Map to entity activities based on mission focus
    const activities = explore.mission.map(mission => {
      switch (mission) {
        case 'Events': return 'event planning and community gatherings';
        case 'Education': return 'educational programs and workshops';
        case 'Art': return 'artistic creation and cultural expression';
        case 'Community': return 'community building and organizing';
        case 'Research': return 'research and knowledge development';
        case 'Healing': return 'healing practices and wellness support';
        default: return mission.toLowerCase();
      }
    });
    intake.entityActivities = activities.join(', ');
  }

  // Map current form to leadership structure
  if (explore.currentForm) {
    switch (explore.currentForm) {
      case 'solo':
        intake.leadershipStructure = 'Solo practitioner with potential for future expansion';
        break;
      case 'team':
        intake.leadershipStructure = 'Small collaborative team with shared decision-making';
        break;
      case 'community':
        intake.leadershipStructure = 'Community-driven organization with participatory governance';
        break;
      case 'traveling':
        intake.leadershipStructure = 'Mobile or traveling project with flexible structure';
        break;
      case 'space':
        intake.leadershipStructure = 'Physical space-based organization with community engagement';
        break;
    }
  }

  // Map support needs to relevant fields
  if (explore.support.includes('Financial flows')) {
    intake.needsEIN = true;
    intake.fiscalSponsorship = true;
  }

  if (explore.support.includes('Legal recognition')) {
    intake.needsEIN = true;
  }

  if (explore.support.includes('Agreements & documents')) {
    intake.complianceNotes = 'Focus on establishing clear agreements and governance structures';
  }

  // Map impact to plans
  if (explore.impact.includes('Economic empowerment')) {
    intake.grantPlans = 'Seek grants and funding for economic empowerment initiatives';
    intake.fundraisingPlans = 'Develop sustainable fundraising strategies';
  }

  if (explore.impact.includes('Teaching and learning')) {
    intake.grantPlans = 'Apply for educational and capacity-building grants';
  }

  if (explore.impact.includes('Creative culture')) {
    intake.propertyPlans = 'Consider creative spaces and cultural facilities';
  }

  if (explore.impact.includes('Community building')) {
    intake.successionPlanning = 'Plan for community leadership development and continuity';
  }

  return intake;
}
