import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Lightbulb, Info, FileText, Code2, Tag, Layers } from 'lucide-react';

export default function AiSuggestionsCard({ suggestions = [], onApplySuggestion }) {
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-3xl text-center border border-gray-800 text-gray-400">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3 animate-pulse" />
        <p className="text-sm font-medium">No suggestions generated yet. Click "Analyze Job & Score Resume" to get tailored recommendations.</p>
      </div>
    );
  }

  const handleApply = (suggestion) => {
    if (onApplySuggestion) {
      onApplySuggestion(suggestion);
    }
    setAppliedIds((prev) => new Set(prev).add(suggestion.id));
  };

  const categories = [
    { id: 'all', label: 'All Suggestions' },
    { id: 'keywords', label: 'Keywords & Skills' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'projects', label: 'Projects' }
  ];

  const filteredSuggestions = activeCategory === 'all'
    ? suggestions
    : suggestions.filter(s => s.category?.toLowerCase() === activeCategory.toLowerCase());

  const getCategoryBadge = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'keywords':
      case 'skills':
        return { label: 'Keyword Match', icon: Tag, color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' };
      case 'summary':
        return { label: 'Summary Focus', icon: FileText, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
      case 'experience':
        return { label: 'Action Bullet', icon: Layers, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
      case 'projects':
        return { label: 'Project Detail', icon: Code2, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
      default:
        return { label: 'AI Suggestion', icon: Lightbulb, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'glass-panel text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Suggestions List */}
      <div className="space-y-6">
        {filteredSuggestions.map((sug) => {
          const isApplied = appliedIds.has(sug.id);
          const badge = getCategoryBadge(sug.category);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={sug.id}
              className={`glass-panel p-6 sm:p-7 rounded-3xl border transition-all ${
                isApplied
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-gray-800 hover:border-indigo-500/40 bg-gray-900/90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Target Section: <strong className="text-gray-200 capitalize">{sug.targetSection}</strong>
                  </span>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => handleApply(sug)}
                  disabled={isApplied}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-indigo-500/30 transform hover:-translate-y-0.5'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Applied to Resume
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-pink-300" />
                      Apply Suggestion
                    </>
                  )}
                </button>
              </div>

              {/* Suggestion Title & Reason */}
              <h4 className="text-base font-bold text-white mb-2">{sug.title}</h4>
              <p className="text-xs sm:text-sm text-gray-300 flex items-start gap-2 mb-5">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{sug.reason}</span>
              </p>

              {/* Side by side Preview Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* Current Wording */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block font-sans">
                    Current Wording
                  </span>
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {sug.currentValue || '(Not specified)'}
                  </p>
                </div>

                {/* Suggested Wording */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block font-sans flex items-center justify-between">
                    <span>Suggested Wording</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  <p className="text-emerald-200 whitespace-pre-wrap leading-relaxed font-semibold">
                    {sug.suggestedValue}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
