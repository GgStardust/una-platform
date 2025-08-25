import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { IntakeData } from '@/lib/types';

interface EmblemDesignerProps {
  intakeData: IntakeData;
  onClose: () => void;
}

export default function EmblemDesigner({ intakeData, onClose }: EmblemDesignerProps) {
  const [activeTab, setActiveTab] = useState<'designs' | 'affiliates' | 'downloads'>('designs');

  // Emblem generation removed - users upload existing files
  useEffect(() => {
    console.log('Emblem designer opened - users upload existing files');
  }, [intakeData]);

  // Download functions removed - users upload existing files

  if (!intakeData.hasInsignia) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4">
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Emblem Creation</h3>
          <p className="text-navy-600 mb-6">
            You haven't selected emblem creation in your intake form. Please complete the intake form first.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-navy-600 text-white py-2 px-4 rounded-md hover:bg-navy-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI Emblem Designer</h2>
              <p className="text-navy-100">Professional emblem creation for {intakeData.entityName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-navy-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-navy-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('designs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'designs'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300'
              }`}
            >
              AI Designs
            </button>
            <button
              onClick={() => setActiveTab('affiliates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'affiliates'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300'
              }`}
            >
              <Users className="inline w-4 h-4 mr-2" />
              Product Recommendations
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'downloads'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300'
              }`}
            >
              Download All Formats
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'designs' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="text-navy-600 mb-4">
                  <p className="text-lg font-medium mb-2">Emblem Generation Removed</p>
                  <p className="mb-4">Emblem generation has been removed. Please upload your existing emblem file using the file upload option in the intake form.</p>
                </div>
                <button
                  onClick={() => onClose()}
                  className="bg-navy-600 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors"
                >
                  Return to Intake Form
                </button>
              </div>
            </div>
          )}

          {activeTab === 'affiliates' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="text-navy-600 mb-4">
                  <p className="text-lg font-medium mb-2">Product Recommendations Unavailable</p>
                  <p className="mb-4">Product recommendations are not available since emblem generation has been removed. Please upload your existing emblem file.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="text-navy-600 mb-4">
                  <p className="text-lg font-medium mb-2">Downloads Unavailable</p>
                  <p className="mb-4">Downloads are not available since emblem generation has been removed. Please upload your existing emblem file.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
