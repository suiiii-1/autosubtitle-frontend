import Link from 'next/link';
import { Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">AutoSubtitle</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#how-it-works" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
              How it works
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/#faq" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
              FAQ
            </Link>
            <Link 
              href="/upload" 
              className="bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
