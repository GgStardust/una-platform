import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';

interface InsigniaUploadProps {
  onFileSelect: (file: File, description: string) => void;
  onFileRemove: () => void;
  selectedFile?: File;
  description?: string;
}

const InsigniaUpload: React.FC<InsigniaUploadProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  description: initialDescription = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/svg+xml'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported. Please upload PDF, PNG, or SVG files only.';
    }

    if (file.size > maxSize) {
      return 'File size too large. Maximum size is 5MB.';
    }

    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    onFileSelect(file, description);
  }, [onFileSelect, description]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleRemove = useCallback(() => {
    setDescription('');
    setError('');
    onFileRemove();
  }, [onFileRemove]);

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (file.type === 'image/svg+xml') return <File className="w-8 h-8 text-emerald-500" />;
    return <Image className="w-8 h-8 text-navy-500" />;
  };

  const getFileTypeText = (file: File) => {
    if (file.type === 'application/pdf') return 'PDF Document';
    if (file.type === 'image/svg+xml') return 'SVG Image';
    return 'PNG Image';
  };

  if (selectedFile) {
    return (
      <div className="border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getFileIcon(selectedFile)}
            <div>
              <p className="font-medium text-navy-900">{selectedFile.name}</p>
              <p className="text-sm text-navy-500">{getFileTypeText(selectedFile)}</p>
              <p className="text-sm text-navy-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-navy-400 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-navy-700 mb-2">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your insignia or organization symbol..."
            className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-gold-400 bg-gold-50'
            : 'border-navy-300 hover:border-navy-400 hover:bg-navy-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-navy-400" />
        <div className="mt-4">
          <p className="text-lg font-medium text-navy-900">
            Upload your organization insignia
          </p>
          <p className="text-sm text-navy-500 mt-1">
            Drag and drop your file here, or click to browse
          </p>
          <p className="text-xs text-navy-400 mt-2">
            Supported formats: PDF, PNG, SVG (max 5MB)
          </p>
        </div>
        <input
          type="file"
          accept=".pdf,.png,.svg"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 cursor-pointer"
        >
          Choose File
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsigniaUpload;
