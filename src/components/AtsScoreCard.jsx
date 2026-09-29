import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Zap,
  Target,
  BookOpen,
  Layout,
  Briefcase,
  HelpCircle
} from 'lucide-react';

export default function AtsScoreCard({ scoreData }) {
  if (!scoreData) return null;

  const { overallScore = 0, categories = {}, strengths = [], areasForImprovement = [] } = scoreData;

  // Determine score color badge
  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', ring: '#10b981' };
    if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', ring: '#f59e0b' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', ring: '#f43f5e' };
  };

  const scoreTheme = getScoreColor(overallScore);

  const categoryConfigs = [
    { key: 'jobDescriptionMatch', label: 'Job Description Match', icon: Target },
    { key: 'requiredSkills', label: 'Required Skills', icon: Zap },
    { key: 'keywords', label: 'ATS Keywords', icon: FileCheck },
    { key: 'resumeStructure', label: 'Resume Structure', icon: Layout },
    { key: 'readability', label: 'Readability & Formatting', icon: BookOpen },
    { key: 'experienceRelevance', label: 'Experience Relevance', icon: Briefcase },
    { key: 'educationRelevance', label: 'Education Relevance', icon: Award }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner & Overall Score Gauge */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/90 via-gray-950 to-indigo-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Gauge Ring */}
          <div className="flex items-center gap-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  strokeDasharray={`${overallScore}, 100`}
                  stroke={scoreTheme.ring}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className={`text-4xl font-extrabold ${scoreTheme.text}`}>
                  {overallScore}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">/ 100 Score</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
                <Award className="w-3.5 h-3.5" />
                ATS Match Rating
              </div>
              <h3 className="text-2xl font-bold text-white">
                {overallScore >= 80 ? 'Excellent ATS Alignment!' : overallScore >= 60 ? 'Good Match — Needs Minor Tuning' : 'Optimization Recommended'}
              </h3>
              <p className="text-sm text-gray-400 mt-1 max-w-md">
                Transparent scoring based on keyword overlap, structural parsing, skill matching, and role relevance.
              </p>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center min-w-[130px]">
              <span className="text-xs text-gray-400 block font-medium">Strengths</span>
              <span className="text-2xl font-extrabold text-emerald-400">{strengths.length}</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center min-w-[130px]">
              <span className="text-xs text-gray-400 block font-medium">Fix Suggestions</span>
              <span className="text-2xl font-extrabold text-amber-400">{areasForImprovement.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category-Wise Scores Grid */}
      <div>
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          Category Score Breakdown
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryConfigs.map(({ key, label, icon: Icon }) => {
            const cat = categories[key] || { score: 0, explanation: 'Not evaluated' };
            const catTheme = getScoreColor(cat.score);

            return (
              <div
                key={key}
                className="glass-panel p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gray-800/80 text-indigo-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-200">{label}</span>
                  </div>
                  <span className={`text-base font-extrabold ${catTheme.text}`}>
                    {cat.score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${cat.score}%`,
                      backgroundColor: catTheme.ring
                    }}
                  />
                </div>

                {/* Explanation text */}
                <p className="text-xs text-gray-400 leading-relaxed flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                  <span>{cat.explanation}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Improvement Areas Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-emerald-950/10 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="text-base font-bold text-white">Resume Strengths</h4>
          </div>
          <ul className="space-y-3">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 bg-amber-950/10 space-y-4">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="text-base font-bold text-white">Areas for Improvement</h4>
          </div>
          <ul className="space-y-3">
            {areasForImprovement.map((area, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
