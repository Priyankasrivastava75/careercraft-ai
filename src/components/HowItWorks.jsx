import React from 'react';
import { Upload, Sparkles, Download, CheckCircle, ArrowRight, FileCheck, Target, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Upload className="w-6 h-6 text-indigo-400" />,
      title: "Input Details or Upload Resume",
      description: "Start from scratch using our intuitive guided builder, or upload your existing resume (PDF/DOCX) to import your career history in seconds."
    },
    {
      number: "02",
      icon: <Target className="w-6 h-6 text-purple-400" />,
      title: "Paste Target Job Description",
      description: "Enter the job description or URL of the role you want to apply for. Our AI inspects missing keywords, skills, and industry terminology."
    },
    {
      number: "03",
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      title: "AI Enhances & Generates PDF",
      description: "CareerCraft AI rewrites bullet points, maximizes your ATS score match, and formats a clean, recruiter-ready resume for instant download."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-gray-950/80 border-t border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-950/60 border border-pink-800/50 inline-block px-3.5 py-1.5 rounded-full mb-4">
            3-Step Simple Process
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How CareerCraft AI <span className="text-gradient">Transforms Your Job Search</span>
          </h3>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            From raw work experience to a targeted, high-converting resume in under 2 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border border-gray-800 relative flex flex-col justify-between">
              
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl font-black text-gray-800 font-mono group-hover:text-indigo-500/30 transition-colors">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Automated AI Assistance</span>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
