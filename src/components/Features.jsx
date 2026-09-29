import React from 'react';
import { Sparkles, Target, FileText, Cpu, CheckCircle2, Zap, Layout, ShieldCheck, BarChart3, Sliders } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "AI Bullet Point Enhancer",
      description: "Transforms plain bullet points into high-impact, quantified achievement statements that grab recruiters' attention.",
      badge: "AI Powered"
    },
    {
      icon: <Target className="w-6 h-6 text-pink-400" />,
      title: "Job-Description Optimizer",
      description: "Paste target job postings. Our AI analyzes missing skills, keywords, and qualifications to match requirements 1:1.",
      badge: "Highest Impact"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
      title: "Real-Time ATS Keyword Engine",
      description: "Checks your resume against top ATS software (Workday, Greenhouse, Taleo) and gives you an instant 0-100 match score.",
      badge: "Instant Audit"
    },
    {
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      title: "Recruiter-Approved Templates",
      description: "Clean, elegant typography designed for fast readability. 100% parseable by automated applicant screening tools.",
      badge: "SaaS Design"
    },
    {
      icon: <Sliders className="w-6 h-6 text-emerald-400" />,
      title: "Tailored Executive Summaries",
      description: "Automatically generates compelling summary statements customized for specific job titles and seniority levels.",
      badge: "Smart Copy"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: "Privacy & Data Protection",
      description: "Your professional data is encrypted and kept safe. You maintain complete ownership of your career history.",
      badge: "Secure"
    }
  ];

  return (
    <section id="features" className="py-24 relative bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/50 inline-block px-3.5 py-1.5 rounded-full mb-4">
            Powerful Feature Suite
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need To <br />
            <span className="text-gradient">Land Your Next Dream Role</span>
          </h3>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Engineered with Gemini AI to help job seekers stand out, bypass recruiter filters, and win interviews faster.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-gray-800/80 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle card glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all duration-300" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-gray-900 text-gray-400 border border-gray-800 px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h4>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/60 flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span>Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
