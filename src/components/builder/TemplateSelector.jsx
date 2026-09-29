import React from 'react';
import { Layout, Check, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern SaaS',
      tagline: 'Gradient Header Accent',
      badge: 'Popular',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      previewBg: 'from-indigo-600 via-purple-600 to-pink-500'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      tagline: 'Ultra Clean Whitespace',
      badge: 'ATS Rated A+',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      previewBg: 'from-gray-700 via-gray-800 to-gray-900'
    },
    {
      id: 'professional',
      name: 'Executive Classic',
      tagline: 'Corporate & Tech Lead',
      badge: 'Corporate',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
      previewBg: 'from-slate-800 via-slate-900 to-black'
    }
  ];

  return (
    <div className="glass-panel p-4 rounded-2xl border border-gray-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Choose Resume Template
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> 100% ATS Parseable
        </span>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-3 gap-3">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                  : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-800/60'
              }`}
            >
              {/* Top active checkmark badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                  <Check className="w-3 h-3" />
                </div>
              )}

              <div>
                {/* Visual Thumbnail Banner */}
                <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${tpl.previewBg} mb-2.5 opacity-90 group-hover:opacity-100 transition-opacity flex items-center px-2`}>
                  <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                </div>

                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  {tpl.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-normal mt-0.5">
                  {tpl.tagline}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-800/60 flex items-center justify-between">
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded border ${tpl.badgeColor}`}>
                  {tpl.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
