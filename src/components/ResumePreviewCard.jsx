import React, { useState } from 'react';
import { Sparkles, CheckCircle2, TrendingUp, Zap, AlertCircle, RefreshCw } from 'lucide-react';

export default function ResumePreviewCard() {
  const [activeTab, setActiveTab] = useState('optimized'); // 'original' or 'optimized'
  const [selectedRole, setSelectedRole] = useState('fullstack');

  const roleData = {
    fullstack: {
      title: 'Senior Full Stack Engineer',
      company: 'TechCorp AI',
      atsOriginal: 58,
      atsOptimized: 96,
      keywordsMatched: ['React', 'Node.js', 'System Architecture', 'CI/CD Pipelines'],
      originalBullet: 'Built web applications using React and Node.js for client projects and improved performance.',
      optimizedBullet: 'Architected & deployed high-throughput React & Node.js microservices, boosting app throughput by 42% and reducing latency by 180ms.',
      impactStats: '+42% Throughput • 96% Keyword Coverage',
    },
    product: {
      title: 'Lead Product Manager',
      company: 'Innovate Labs',
      atsOriginal: 62,
      atsOptimized: 98,
      keywordsMatched: ['Agile Roadmap', 'User Retention', 'A/B Testing', 'Data Analytics'],
      originalBullet: 'Managed product roadmap and worked with engineering team to release new software features.',
      optimizedBullet: 'Spearheaded end-to-end product roadmap across 5 cross-functional squads, driving a 34% increase in Q3 user retention via data-driven A/B testing.',
      impactStats: '+34% Retention • 100% Roadmap Delivery',
    }
  };

  const current = roleData[selectedRole];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-pink-500/10 shadow-2xl shadow-indigo-500/20">
      <div className="glass-panel rounded-[22px] p-6 sm:p-8 bg-gray-950/90 text-left relative overflow-hidden">
        
        {/* Glowing backdrop elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Widget Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Live AI Match Simulator
            </span>
          </div>

          {/* Role selector dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Target Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="fullstack">Senior Full Stack Engineer</option>
              <option value="product">Lead Product Manager</option>
            </select>
          </div>
        </div>

        {/* Score Comparison Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          
          {/* Target Job Info Card */}
          <div className="bg-gray-900/60 rounded-2xl p-4 border border-gray-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Job Title</span>
              <h4 className="text-base font-bold text-white mt-1">{current.title}</h4>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">{current.company}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {current.keywordsMatched.map((kw, i) => (
                <span key={i} className="text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 px-2 py-0.5 rounded-md font-medium">
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* ATS Match Score Indicator */}
          <div className="bg-gray-900/60 rounded-2xl p-4 border border-gray-800 flex items-center justify-between col-span-1 md:col-span-2">
            <div>
              <span className="text-xs text-gray-400 block font-medium">ATS Match Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-4xl font-extrabold ${activeTab === 'optimized' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {activeTab === 'optimized' ? `${current.atsOptimized}%` : `${current.atsOriginal}%`}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {activeTab === 'optimized' ? 'Ready for Recruiter Review' : 'High Risk of Rejection'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {activeTab === 'optimized'
                  ? '✨ Contains high-impact action verbs and 100% essential job description keywords.'
                  : '⚠️ Missing 6 critical skill keywords needed for top candidate tier.'}
              </p>
            </div>

            {/* Visual Gauge */}
            <div className="hidden sm:flex flex-col items-center justify-center pl-4 border-l border-gray-800">
              <div className="w-16 h-16 rounded-full bg-gray-950 border-4 border-gray-800 flex items-center justify-center relative">
                <span className={`text-sm font-black ${activeTab === 'optimized' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {activeTab === 'optimized' ? 'A+' : 'C-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Toggle Controls */}
        <div className="flex items-center justify-between bg-gray-900/80 p-1.5 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('original')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'original'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Standard Resume Bullet
          </button>
          
          <button
            onClick={() => setActiveTab('optimized')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'optimized'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            AI-Crafted High-Impact Bullet
          </button>
        </div>

        {/* Bullet Comparison Display */}
        <div className="mt-4 p-5 rounded-2xl bg-gray-900/40 border border-gray-800/80 transition-all duration-300">
          <div className="flex items-start gap-3">
            {activeTab === 'optimized' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-2">
              <p className="text-sm font-medium leading-relaxed text-gray-200">
                "{activeTab === 'optimized' ? current.optimizedBullet : current.originalBullet}"
              </p>
              
              {activeTab === 'optimized' && (
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-950/70 border border-indigo-800/50 px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {current.impactStats}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
