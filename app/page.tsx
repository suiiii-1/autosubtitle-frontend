import Link from 'next/link';
import { UploadCloud, Languages, CreditCard, Mail, CheckCircle2, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-primary text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Now supporting 50+ languages
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
            Turn any video into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">subtitles in 1 click</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            Upload • Choose language • Pay • Get subtitles by email. 
            <br />Simple, fast, and accurate AI-powered subtitling.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/upload" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-primary hover:bg-indigo-700 md:text-xl transition-all shadow-xl shadow-indigo-500/20">
              Upload Video <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="#demo" className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-lg font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:text-xl transition-all">
              <Play className="ml-2 h-5 w-5 text-gray-400 mr-2" /> Watch Demo
            </a>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-30">
          <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-[40%] w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-0"></div>

            {[
              { icon: UploadCloud, title: "1. Upload", desc: "Drag & drop your video file securely." },
              { icon: Languages, title: "2. Customize", desc: "Select from Hindi, Tamil, Telugu, and more." },
              { icon: Mail, title: "3. Receive", desc: "Get accurate subtitles delivered to your inbox." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 z-10">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-primary mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="px-6 py-8 sm:p-10 sm:pb-6 bg-indigo-600">
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-500 text-white">
                  Pay as you go
                </span>
              </div>
              <div className="mt-4 flex justify-center text-6xl font-extrabold text-white">
                ₹5
                <span className="ml-1 text-2xl font-medium text-indigo-200 self-end mb-4">/ min</span>
              </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10 sm:pt-6">
              <ul className="space-y-4">
                {[
                  "99% Accuracy",
                  "SRT & VTT Formats",
                  "Fast Turnaround",
                  "Secure Processing"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feat}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/upload" className="block w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                  Start Subtitling Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does it take?", a: "Usually about 50% of the video duration. A 10-minute video takes ~5 minutes." },
              { q: "What formats do you support?", a: "MP4, MOV, AVI, and MKV up to 500MB." },
              { q: "Is it accurate?", a: "We use state-of-the-art AI models with 98%+ accuracy for clear audio." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}