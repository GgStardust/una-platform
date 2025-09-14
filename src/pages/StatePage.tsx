import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, FileText, Building, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface StateSnippet {
  state_code: string;
  title: string;
  summary: string;
  requirements: {
    recognition: string;
    filing_fee: string;
    annual_reports: {
      required: boolean;
      fee: string;
      description: string;
    };
    tax_registration: {
      required: boolean;
      threshold: string;
      agency: string;
    };
    banking: string;
    property_ownership: string;
  };
}

// State snippets data (in a real app, this would come from Supabase)
const stateSnippets: Record<string, StateSnippet> = {
  'CA': {
    state_code: 'CA',
    title: 'California UNA Formation',
    summary: 'California recognizes UNAs under the Nonprofit Corporation Law with strong legal protections. Filing fee: $30-50, annual reports required ($20-40), tax registration needed for organizations over $25K gross receipts.',
    requirements: {
      recognition: 'Nonprofit Corporation Law',
      filing_fee: '$30-50',
      annual_reports: {
        required: true,
        fee: '$20-40',
        description: 'Basic organizational information and financial summaries'
      },
      tax_registration: {
        required: true,
        threshold: '$25,000 gross receipts',
        agency: 'Franchise Tax Board'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established through case law'
    }
  },
  'TX': {
    state_code: 'TX',
    title: 'Texas UNA Formation',
    summary: 'Texas has one of the most UNA-friendly frameworks with clear statutes. Filing fee: $25, no annual reports required, straightforward tax registration. Excellent choice for minimal regulatory burden.',
    requirements: {
      recognition: 'Texas Business Organizations Code',
      filing_fee: '$25',
      annual_reports: {
        required: false,
        fee: '$0',
        description: 'No annual reports required'
      },
      tax_registration: {
        required: true,
        threshold: 'All organizations',
        agency: 'Comptroller'
      },
      banking: 'Very familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'FL': {
    state_code: 'FL',
    title: 'Florida UNA Formation',
    summary: 'Florida recognizes UNAs under its Nonprofit Corporation Act with solid protections. Filing fee: $35-50, annual reports required ($61.25), tax registration needed for taxable activities.',
    requirements: {
      recognition: 'Nonprofit Corporation Act',
      filing_fee: '$35-50',
      annual_reports: {
        required: true,
        fee: '$61.25',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Revenue'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'NY': {
    state_code: 'NY',
    title: 'New York UNA Formation',
    summary: 'New York has a complex legal framework with requirements varying by county. Filing fees: $50-100, annual reports required (varies by county), mandatory tax registration. Requires careful navigation.',
    requirements: {
      recognition: 'Varies by county',
      filing_fee: '$50-100',
      annual_reports: {
        required: true,
        fee: 'Varies by county',
        description: 'Requirements vary by county and organizational size'
      },
      tax_registration: {
        required: true,
        threshold: 'All organizations',
        agency: 'Department of Taxation and Finance'
      },
      banking: 'Familiar but may require additional documentation',
      property_ownership: 'Well-established but may require additional steps'
    }
  },
  'IL': {
    state_code: 'IL',
    title: 'Illinois UNA Formation',
    summary: 'Illinois provides clear UNA recognition with solid legal protections. Filing fee: $50, annual reports required ($10), tax registration needed for taxable activities. Central location advantage.',
    requirements: {
      recognition: 'General Not For Profit Corporation Act',
      filing_fee: '$50',
      annual_reports: {
        required: true,
        fee: '$10',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Revenue'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'PA': {
    state_code: 'PA',
    title: 'Pennsylvania UNA Formation',
    summary: 'Pennsylvania recognizes UNAs with good legal protections. Filing fee: $125, annual reports required ($7), tax registration needed for taxable activities. Higher initial cost but low ongoing fees.',
    requirements: {
      recognition: 'Nonprofit Corporation Law',
      filing_fee: '$125',
      annual_reports: {
        required: true,
        fee: '$7',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Revenue'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'OH': {
    state_code: 'OH',
    title: 'Ohio UNA Formation',
    summary: 'Ohio has a straightforward approach with clear guidelines and minimal complexity. Filing fee: $25, annual reports required ($5), tax registration needed for taxable activities. Very affordable option.',
    requirements: {
      recognition: 'Nonprofit Corporation Law',
      filing_fee: '$25',
      annual_reports: {
        required: true,
        fee: '$5',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Taxation'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'GA': {
    state_code: 'GA',
    title: 'Georgia UNA Formation',
    summary: 'Georgia provides clear UNA recognition with solid legal protections. Filing fee: $30, annual reports required ($20), tax registration needed for taxable activities. Growing economy advantage.',
    requirements: {
      recognition: 'Nonprofit Corporation Code',
      filing_fee: '$30',
      annual_reports: {
        required: true,
        fee: '$20',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Revenue'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'NC': {
    state_code: 'NC',
    title: 'North Carolina UNA Formation',
    summary: 'North Carolina has a well-established legal framework with comprehensive protections. Filing fee: $60, annual reports required ($15), tax registration needed for taxable activities. Moderate costs overall.',
    requirements: {
      recognition: 'Nonprofit Corporation Act',
      filing_fee: '$60',
      annual_reports: {
        required: true,
        fee: '$15',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Revenue'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  },
  'MI': {
    state_code: 'MI',
    title: 'Michigan UNA Formation',
    summary: 'Michigan provides clear UNA recognition with solid legal protections. Filing fee: $20, annual reports required ($10), tax registration needed for taxable activities. Very affordable with low ongoing costs.',
    requirements: {
      recognition: 'Nonprofit Corporation Act',
      filing_fee: '$20',
      annual_reports: {
        required: true,
        fee: '$10',
        description: 'Basic organizational information'
      },
      tax_registration: {
        required: true,
        threshold: 'Taxable activities',
        agency: 'Department of Treasury'
      },
      banking: 'Generally familiar with UNA accounts',
      property_ownership: 'Well-established'
    }
  }
};

const stateNames: Record<string, string> = {
  'CA': 'California',
  'TX': 'Texas',
  'FL': 'Florida',
  'NY': 'New York',
  'IL': 'Illinois',
  'PA': 'Pennsylvania',
  'OH': 'Ohio',
  'GA': 'Georgia',
  'NC': 'North Carolina',
  'MI': 'Michigan'
};

export default function StatePage() {
  const { stateCode } = useParams<{ stateCode: string }>();
  const [snippet, setSnippet] = useState<StateSnippet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stateCode) {
      const stateData = stateSnippets[stateCode.toUpperCase()];
      if (stateData) {
        setSnippet(stateData);
      }
      setLoading(false);
    }
  }, [stateCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C49A6C] mx-auto mb-4"></div>
          <p className="text-navy-900">Loading state information...</p>
        </div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">State Not Found</h1>
            <p className="text-lg text-navy-700 mb-8">
              We don't have specific information for {stateCode?.toUpperCase()}. 
              Check out our comprehensive guide for the top 10 states.
            </p>
            <Link 
              to="/blog/top-10-states-una-requirements"
              className="inline-flex items-center px-6 py-3 bg-[#C49A6C] text-white rounded-lg hover:bg-[#B88A5A] transition-colors"
            >
              View Top 10 States Guide
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stateName = stateNames[snippet.state_code] || snippet.state_code;

  return (
    <>
      <SEOHead
        title={`UNA Formation in ${stateName} - Requirements & Guidelines`}
        description={`Complete guide to UNA formation requirements in ${stateName}. Learn filing fees, annual reports, tax registration, and compliance requirements.`}
        keywords={['UNA Formation', stateName, 'State Requirements', 'Nonprofit Association', 'Legal Compliance']}
      />
      
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-[#C49A6C] hover:text-[#B88A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-[#C49A6C] mr-2" />
              <h1 className="text-3xl font-bold text-navy-900">{snippet.title}</h1>
            </div>
            <p className="text-lg text-navy-700 leading-relaxed">{snippet.summary}</p>
          </div>

          {/* Requirements Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Recognition */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#C49A6C]/20">
              <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center">
                <FileText className="h-5 w-5 text-[#C49A6C] mr-2" />
                Legal Recognition
              </h3>
              <p className="text-navy-700">{snippet.requirements.recognition}</p>
            </div>

            {/* Filing Fee */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#C49A6C]/20">
              <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center">
                <DollarSign className="h-5 w-5 text-[#C49A6C] mr-2" />
                Filing Fee
              </h3>
              <p className="text-2xl font-bold text-[#C49A6C]">{snippet.requirements.filing_fee}</p>
            </div>

            {/* Annual Reports */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#C49A6C]/20">
              <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-[#C49A6C] mr-2" />
                Annual Reports
              </h3>
              <div className="space-y-2">
                <p className="text-navy-700">
                  <span className="font-medium">Required:</span> {snippet.requirements.annual_reports.required ? 'Yes' : 'No'}
                </p>
                <p className="text-navy-700">
                  <span className="font-medium">Fee:</span> {snippet.requirements.annual_reports.fee}
                </p>
                <p className="text-sm text-navy-600">{snippet.requirements.annual_reports.description}</p>
              </div>
            </div>

            {/* Tax Registration */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#C49A6C]/20">
              <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center">
                <Building className="h-5 w-5 text-[#C49A6C] mr-2" />
                Tax Registration
              </h3>
              <div className="space-y-2">
                <p className="text-navy-700">
                  <span className="font-medium">Required:</span> {snippet.requirements.tax_registration.required ? 'Yes' : 'No'}
                </p>
                <p className="text-navy-700">
                  <span className="font-medium">Threshold:</span> {snippet.requirements.tax_registration.threshold}
                </p>
                <p className="text-navy-700">
                  <span className="font-medium">Agency:</span> {snippet.requirements.tax_registration.agency}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#C49A6C]/20 mb-8">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Additional Considerations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-navy-900 mb-2">Banking</h4>
                <p className="text-navy-700">{snippet.requirements.banking}</p>
              </div>
              <div>
                <h4 className="font-medium text-navy-900 mb-2">Property Ownership</h4>
                <p className="text-navy-700">{snippet.requirements.property_ownership}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#C49A6C] to-[#B88A5A] rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Form Your UNA in {stateName}?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get personalized guidance for {stateName} UNA formation with our Strategy Session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/services"
                className="inline-flex items-center px-6 py-3 bg-white text-[#C49A6C] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Book Strategy Session
              </Link>
              <Link 
                to="/blog/top-10-states-una-requirements"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#C49A6C] transition-colors font-semibold"
              >
                Compare All States
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
