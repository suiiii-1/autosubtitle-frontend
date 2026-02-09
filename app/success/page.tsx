import Link from 'next/link';
import { CheckCircle2, Download, Mail, ArrowLeft } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-[calc(100vh-64px-200px)] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-[bounce_1s_ease-in-out_1]">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Success!</h1>
        <p className="text-gray-500 mb-8 text-lg">
          Your subtitles have been generated successfully.
        </p>

        <div className="bg-indigo-50 rounded-xl p-6 mb-8 text-left border border-indigo-100">
          <div className="flex items-start mb-4">
            <Mail className="h-6 w-6 text-primary mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Check your email</h3>
              <p className="text-sm text-gray-600 mt-1">
                We've sent the SRT and VTT files to your inbox. Please check your spam folder if you don't see it.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 transition-colors">
            <Download className="mr-2 h-5 w-5" /> Download Subtitles (SRT)
          </button>
          
          <Link 
            href="/upload" 
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Upload Another Video
          </Link>
        </div>
      </div>
    </div>
  );
}
