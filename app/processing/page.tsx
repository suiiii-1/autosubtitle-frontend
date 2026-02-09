'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Progress from '@/components/Progress';
import { Sparkles, FileAudio, FileText, Send, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { label: 'Uploading video securely...', icon: FileAudio, threshold: 30 },
  { label: 'Extracting audio...', icon: FileAudio, threshold: 50 },
  { label: 'AI Generating subtitles...', icon: Sparkles, threshold: 80 },
  { label: 'Formatting files...', icon: FileText, threshold: 90 },
  { label: 'Sending email...', icon: Send, threshold: 100 },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/success'), 500);
          return 100;
        }

        // Calculate progress increment based on current step
        const currentThreshold = STEPS[currentStepIndex].threshold;
        const nextProgress = prev + Math.random() * 2; // Random increment

        if (nextProgress >= currentThreshold && currentStepIndex < STEPS.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
        }

        return Math.min(nextProgress, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStepIndex, router]);

  const CurrentIcon = STEPS[currentStepIndex].icon;

  return (
    <div className="min-h-[calc(100vh-64px-200px)] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
          <CurrentIcon className="h-8 w-8 text-primary animate-pulse" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing your video</h2>
        <p className="text-gray-500 mb-8">Please don't close this tab.</p>

        <Progress value={progress} status={STEPS[currentStepIndex].label} />

        <div className="mt-8 grid grid-cols-5 gap-2">
          {STEPS.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={`h-2 w-full rounded-full mb-2 transition-colors ${
                  isCompleted ? 'bg-green-500' : isActive ? 'bg-primary' : 'bg-gray-200'
                }`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
