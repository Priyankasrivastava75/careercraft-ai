import React from 'react';
import { Target, Zap, Shield, TrendingUp, Sparkles, Check, X } from 'lucide-react';

export default function ProductOverview() {
  return (
    <section id="overview" className="py-20 relative border-t border-gray-800/60 bg-gray-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 inline-block px-3.5 py-1.5 rounded-full mb-4">
            Why CareerCraft AI?
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Generic resumes get filtered out. <br />
            <span className="text-gradient">Tailored resumes get hired.</span>
          </h3>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Over 75% of resumes are rejected by Applicant Tracking Systems (ATS) before a human recruiter even sees them. CareerCraft AI bridges the gap between your experience and target job postings.
          </p>
        </div>

        {/* Stats Highlight Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl text-center relative overflow-hidden group">
            <div className="text-4xl sm:text-5xl font-black text-gradient mb-2">3.8x</div>
            <div className="text-base font-bold text-white">More Interview Callbacks</div>
            <p className="text-xs text-gray-400 mt-2">Candidates using tailored AI resumes land significantly more initial recruiter screenings.</p>
          </div>

          <div className="glass-panel glass-panel-hover p-8 rounded-3xl text-center relative overflow-hidden group">
            <div className="text-4xl sm:text-5xl font-black text-gradient-cyan mb-2">98%</div>
            <div className="text-base font-bold text-white">ATS Pass Rate</div>
            <p className="text-xs text-gray-400 mt-2">Guaranteed formatting compliance with Workday, Greenhouse, Lever, and Taleo.</p>
          </div>

          <div className="glass-panel glass-panel-hover p-8 rounded-3xl text-center relative overflow-hidden group">
            <div className="text-4xl sm:text-5xl font-black text-pink-400 mb-2 font-mono">&lt; 120s</div>
            <div className="text-base font-bold text-white">Optimization Speed</div>
            <p className="text-xs text-gray-400 mt-2">Tailor your existing resume specifically to any job link or description instantly.</p>
          </div>
        </div>

        {/* Side-by-side comparison table */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gray-800">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-white">Traditional Resume vs. CareerCraft AI</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Old Way */}
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-rose-900/30 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                <X className="w-5 h-5" />
                The Old Way
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Sending one generic resume to 50 different job applications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Missing critical industry keywords present in job descriptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Weak, passive bullet points ("Responsible for managing tasks").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Hours spent manually tweaking margins and fonts in Microsoft Word.</span>
                </li>
              </ul>
            </div>

            {/* The CareerCraft AI Way */}
            <div className="bg-gradient-to-b from-indigo-950/40 to-purple-950/40 p-6 rounded-2xl border border-indigo-500/30 space-y-4 relative">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                <Check className="w-5 h-5 text-emerald-400" />
                With CareerCraft AI
              </div>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Job-Specific Matching:</strong> Automatically align bullet points with job requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>High Impact Action Verbs:</strong> Quantify your achievements with AI metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Real-time ATS Audit:</strong> Instant feedback score before submitting your application.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>One-Click Modern Templates:</strong> Beautiful, recruiter-tested layouts.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
