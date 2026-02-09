'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileVideo, X } from 'lucide-react';

interface VideoUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export default function VideoUploader({ onFileSelect, selectedFile }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Simple validation
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
    if (validTypes.includes(file.type)) {
      onFileSelect(file);
    } else {
      alert('Please upload a valid video file (MP4, MOV, AVI, MKV)');
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer group ${
          isDragging
            ? 'border-primary bg-indigo-50 scale-[1.01]'
            : selectedFile 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/*"
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {selectedFile ? (
            <>
              <div className="bg-green-100 p-4 rounded-full">
                <FileVideo className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <button
                onClick={removeFile}
                className="absolute top-4 right-4 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </>
          ) : (
            <>
              <div className={`p-4 rounded-full transition-colors ${isDragging ? 'bg-indigo-100 text-primary' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-primary'}`}>
                <UploadCloud className="h-10 w-10" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  <span className="text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI (max. 500MB)</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
