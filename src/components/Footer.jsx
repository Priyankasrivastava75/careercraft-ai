import React from 'react';
import { Sparkles, Globe, Share2, Code2, Heart } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="glass-panel border-t border-gray-800/80 bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-gray-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                CareerCraft <span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI-powered Resume Builder & Job-Specific Resume Optimizer. Helping job seekers pass ATS filters and land top interviews.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-4">Product</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">AI Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-4">Resources</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#ats-guide" className="hover:text-white transition-colors">ATS Optimization Guide</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Resume Templates</a></li>
              <li><a href="#bullet-points" className="hover:text-white transition-colors">Action Verbs Library</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-4">Connect</h5>
            <p className="text-xs text-gray-400 mb-4">
              Stay updated with career tips & AI resume insights.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Website" className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Share" className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Code" className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} CareerCraft AI. Built step-by-step for job seekers.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
