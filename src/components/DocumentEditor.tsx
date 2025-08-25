import React, { useState, useEffect } from 'react';
import { FileText, FileDown, FileCode, RotateCcw, Eye, Edit3 } from 'lucide-react';
import { generatePDF } from '@/lib/pdf';
import { generateDOCX } from '@/lib/docx';

interface DocumentEditorProps {
  title: string;
  content: string;
  onContentChange: (newContent: string) => void;
  originalContent: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  title,
  content,
  onContentChange,
  originalContent
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = () => {
    onContentChange(editedContent);
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditedContent(originalContent);
    onContentChange(originalContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([editedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    try {
      const pdfData = await generatePDF(editedContent, title);
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const downloadDOCX = async () => {
    try {
      const docxData = await generateDOCX(editedContent, title);
      const blob = new Blob([docxData], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Error generating DOCX. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-navy-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-navy-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-navy-900">{title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isPreviewMode
                  ? 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                  : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
              }`}
            >
              {isPreviewMode ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isEditing
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
              }`}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? 'Save' : 'Edit'}
            </button>
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-navy-600 text-white hover:bg-navy-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gold-600 text-white hover:bg-gold-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-96 p-4 border border-navy-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Edit your document content here..."
            />
            <div className="flex items-center justify-between text-sm text-navy-500">
              <span>Markdown formatting supported</span>
              <span>{editedContent.length} characters</span>
            </div>
          </div>
        ) : isPreviewMode ? (
          <div className="prose max-w-none">
            <div 
              className="markdown-preview p-4 border border-navy-200 rounded-md bg-navy-50"
              dangerouslySetInnerHTML={{ 
                __html: editedContent
                  .replace(/\n/g, '<br>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-navy-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-mono text-sm text-navy-800">{editedContent}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Download Options */}
      <div className="px-6 py-4 border-t border-navy-200 bg-navy-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-navy-600">
            {isEditing ? 'Save your changes before downloading' : 'Download in your preferred format'}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadMarkdown}
              disabled={isEditing}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-navy-600 text-white hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileCode className="w-4 h-4 mr-2" />
              MD
            </button>
            <button
              onClick={downloadPDF}
              disabled={isEditing}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </button>
            <button
              onClick={downloadDOCX}
              disabled={isEditing}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gold-600 text-white hover:bg-gold-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown className="w-4 h-4 mr-2" />
              DOCX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
