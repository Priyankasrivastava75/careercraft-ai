import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FileText, Target, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import ResumePreviewCard from './ResumePreviewCard';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Powered by Gemini AI Engine 2.0</span>
          <span className="bg-indigo-500/20 text-indigo-200 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Build & Optimize Job-Winning Resumes <span className="text-gradient">With AI Precision</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Stop getting ghosted by ATS filters. CareerCraft AI analyzes target job descriptions, rewrites bullet points for maximum impact, and guarantees top recruiter match scores.
        </p>

        {/* Primary & Secondary Call To Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/builder"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <FileText className="w-5 h-5 text-indigo-100" />
            Build My Resume
            <ArrowRight className="w-5 h-5 text-white/80" />
          </Link>

          <Link
            to="/job-analyzer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-gray-200 hover:text-white border-2 border-gray-700/80 hover:border-indigo-500/60 bg-gray-900/80 hover:bg-gray-800/90 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Target className="w-5 h-5 text-pink-400" />
            Analyze Job Description
            <Zap className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        {/* Micro Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>100% ATS Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Tailored in under 2 minutes</span>
          </div>
        </div>

        {/* Live Interactive Preview Demo Component */}
        <div className="mt-16">
          <ResumePreviewCard />
        </div>

      </div>
    </section>
  );
}
