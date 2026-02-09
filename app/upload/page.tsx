'use client';

import { useState } from 'react';
import VideoUploader from '@/components/VideoUploader';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard, Clock, Globe, Mail } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [language, setLanguage] = useState('Hindi');
  const [email, setEmail] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const PRICE_PER_MIN = 5;

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      setIsCalculating(true);
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        setDuration(Math.max(1, Math.ceil(video.duration / 60)));
        setIsCalculating(false);
      };
      video.src = URL.createObjectURL(selectedFile);
    } else {
      setDuration(0);
    }
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !email) return;

    setIsSubmitting(true);
    
    // Create FormData for the API
    const formData = new FormData();
    formData.append('video', file);
    formData.append('language', language);

    try {
      // Direct call to your FastAPI backend
      const response = await fetch('http://localhost:8000/process-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');

      // Convert response to blob (SRT file)
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Store the download link in localStorage for the success page
      localStorage.setItem('srtDownloadUrl', downloadUrl);
      localStorage.setItem('targetEmail', email);

      router.push('/success');
    } catch (error) {
      console.error(error);
      alert('An error occurred during processing. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-300px)] py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Upload your video</h1>
          <p className="mt-2 text-gray-500">Connect to our AI engine to generate perfect subtitles.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-primary text-xs mr-2">1</span>
                Upload Video
              </h2>
              <VideoUploader onFileSelect={handleFileSelect} selectedFile={file} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-primary text-xs mr-2">2</span>
                Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Language</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-black"
                    >
                      <option value="Hindi">Hindi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> Duration
                  </span>
                  <span className="font-medium text-gray-900">
                    {isCalculating ? <Loader2 className="h-4 w-4 animate-spin" /> : `${duration} mins`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{duration * PRICE_PER_MIN}</span>
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={!file || !email || isCalculating || isSubmitting}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing AI...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" /> Pay & Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}