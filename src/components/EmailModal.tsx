import React, { useState } from "react";
import { Copy, X } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  body: string;
}

export default function EmailModal({ isOpen, onClose, subject, body }: EmailModalProps) {
  const [subjectText, setSubjectText] = useState(subject);
  const [bodyText, setBodyText] = useState(body);
  const [copySuccess, setCopySuccess] = useState('');

  // Update local state when props change
  React.useEffect(() => {
    setSubjectText(subject);
    setBodyText(body);
  }, [subject, body]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} copied to clipboard!`);
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(`${type} copied to clipboard!`);
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-navy-100">
          <h2 className="text-xl font-semibold text-navy-900">Email Template</h2>
          <button
            className="text-navy-400 hover:text-navy-600 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Subject Line
            </label>
            <div className="flex gap-2">
              <textarea
                className="flex-1 border border-navy-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent resize-none"
                rows={2}
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
                placeholder="Email subject..."
              />
              <button
                onClick={() => copyToClipboard(subjectText, 'Subject')}
                className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Copy className="h-4 w-4" />
                Copy Subject
              </button>
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Email Body
            </label>
            <div className="space-y-2">
              <textarea
                className="w-full border border-navy-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent resize-none"
                rows={12}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Email body content..."
              />
              <button
                onClick={() => copyToClipboard(bodyText, 'Body')}
                className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Body
              </button>
            </div>
          </div>

          {/* Copy Success Message */}
          {copySuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3">
              <p className="text-sm text-emerald-600">{copySuccess}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-navy-50 rounded-md p-4">
            <h4 className="text-sm font-medium text-navy-700 mb-2">Instructions:</h4>
            <ul className="text-sm text-navy-600 space-y-1">
              <li>• Edit the subject and body as needed</li>
              <li>• Click "Copy Subject" or "Copy Body" to copy to clipboard</li>
              <li>• Paste into Gmail or your email client</li>
              <li>• Send manually to the client</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-navy-100">
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
