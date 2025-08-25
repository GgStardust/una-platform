import { Link } from 'react-router-dom';

interface InternalLinksProps {
  type: 'formation' | 'guidance' | 'resources' | 'support';
  className?: string;
}

export default function InternalLinks({ type, className = '' }: InternalLinksProps) {
  const linkGroups = {
    formation: {
      title: "Start Your UNA Formation",
      links: [
        { to: "/explore", text: "Explore Your Path", description: "Take our 4-step assessment to find your ideal formation approach" },
        { to: "/intake", text: "Begin Formation Process", description: "Start your UNA formation with our comprehensive intake form" },
        { to: "/services", text: "View Our Services", description: "See all the professional formation services we offer" }
      ]
    },
    guidance: {
      title: "Expert UNA Guidance",
      links: [
        { to: "/faq", text: "Frequently Asked Questions", description: "Get answers to common UNA formation questions" },
        { to: "/blog", text: "Formation Insights", description: "Read expert guidance on UNA formation and compliance" },
        { to: "/success", text: "Success Stories", description: "Learn from real UNA formation experiences" }
      ]
    },
    resources: {
      title: "UNA Formation Resources",
      links: [
        { to: "/blog/una-formation-done-right-california", text: "Formation Guide", description: "Complete guide to UNA formation in California" },
        { to: "/blog/legal-pitfalls-generic-una-formation", text: "Avoid Common Mistakes", description: "Learn about legal pitfalls and how to avoid them" },
        { to: "/blog/california-una-formation-legal-compliance", text: "Legal Compliance", description: "Ensure your UNA meets all California requirements" }
      ]
    },
    support: {
      title: "Get Professional Support",
      links: [
        { to: "/about", text: "About Our Team", description: "Learn about our expertise in UNA formation" },
        { to: "/services", text: "Professional Services", description: "Get professional guidance for your formation" },
        { to: "/intake", text: "Schedule Consultation", description: "Start your formation journey with expert support" }
      ]
    }
  };

  const currentGroup = linkGroups[type];

  return (
    <div className={`bg-navy-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-navy-900 mb-4">
        {currentGroup.title}
      </h3>
      <div className="space-y-3">
        {currentGroup.links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="block p-3 bg-white rounded-lg border border-navy-200 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="font-medium text-gold-600 hover:text-gold-800">
              {link.text}
            </div>
            <div className="text-sm text-navy-600 mt-1">
              {link.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
