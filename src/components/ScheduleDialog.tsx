import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleDialog({ isOpen, onClose }: ScheduleDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-navy-200">
          <h2 className="text-2xl font-bold text-navy-900">Contact Gigi Stardust</h2>
          <button
            onClick={onClose}
            className="text-navy-400 hover:text-navy-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Contact Options */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Contact Gigi Stardust</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Email Option */}
              <div className="card p-4">
                <h4 className="font-medium text-navy-900 mb-2">Email Gigi</h4>
                <p className="text-sm text-navy-600 mb-3">
                  Send an email to discuss your UNA formation needs and schedule a conversation.
                </p>
                <a
                  href="mailto:gigi@gigistardust.com?subject=UNA Formation Consultation Request&body=Hi Gigi,%0D%0A%0D%0AI'm interested in forming a UNA and would like to schedule a consultation.%0D%0A%0D%0APlease let me know your availability and any information you need from me.%0D%0A%0D%0AThank you!"
                  className="inline-flex items-center px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
                >
                  Email gigi@gigistardust.com
                </a>
              </div>
              
              {/* Call Request Option */}
              <div className="card p-4">
                <h4 className="font-medium text-navy-900 mb-2">Request a Call</h4>
                <p className="text-sm text-navy-600 mb-3">
                  Let us know when you're available and we'll reach out to schedule a call.
                </p>
                <button
                  onClick={() => {
                    // For now, this opens email with call request subject
                    window.open(
                      'mailto:gigi@gigistardust.com?subject=Call Request - UNA Formation&body=Hi Gigi,%0D%0A%0D%0AI would like to request a call to discuss UNA formation.%0D%0A%0D%0AMy preferred times are:%0D%0A%0D%0AMy phone number is:%0D%0A%0D%0AThank you!',
                      '_blank'
                    );
                  }}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Request Call
                </button>
              </div>
            </div>
          </div>
          
          {/* Calendly iframe - for future use */}
          <div className="border-t border-navy-200 pt-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Schedule Online (Coming Soon)</h3>
            <div className="bg-navy-50 rounded-lg p-6 text-center">
              <p className="text-navy-600 mb-4">
                Online scheduling will be available soon. For now, please use the contact options above.
              </p>
              <div className="bg-navy-100 rounded-lg p-4">
                <p className="text-sm text-navy-500">Calendly integration coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-navy-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
