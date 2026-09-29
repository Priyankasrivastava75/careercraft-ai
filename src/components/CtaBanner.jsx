import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FileText, Target, Zap } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-pink-900/40 border border-indigo-500/30 glass-panel relative overflow-hidden text-center">
          
          {/* Subtle background glow circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300 bg-pink-950/80 border border-pink-700/60 inline-block px-3.5 py-1.5 rounded-full">
              ✨ Ready for your next career leap?
            </span>
            
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Stop Applying to Black Holes. <br />
              <span className="text-gradient">Start Getting Interviewed.</span>
            </h3>

            <p className="text-base sm:text-lg text-gray-300 font-normal max-w-2xl mx-auto">
              Craft your resume in minutes or optimize your existing resume for any target job position with Gemini AI precision.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FileText className="w-5 h-5 text-indigo-100" />
                Build My Resume Now
                <ArrowRight className="w-5 h-5 text-white/80" />
              </Link>

              <Link
                to="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-gray-200 hover:text-white border border-gray-700 hover:border-indigo-500/50 bg-gray-900/90 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Target className="w-5 h-5 text-pink-400" />
                Optimize Existing Resume
                <Zap className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
