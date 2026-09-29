import React from 'react';
import { FileText } from 'lucide-react';

export default function SummaryForm({ summary, onChange }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <FileText className="w-5 h-5 text-purple-400" />
          Professional Summary
        </div>
        <span className="text-[10px] text-gray-500 font-mono">
          {summary ? summary.length : 0} chars
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1">
          Career Overview & Core Strengths
        </label>
        <textarea
          rows={4}
          value={summary || ''}
          onChange={(e) => onChange('summary', e.target.value)}
          placeholder="e.g. Results-driven Senior Full Stack Software Engineer with 6+ years of experience designing high-scalability web apps..."
          className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none transition-colors leading-relaxed"
        />
        <p className="text-[11px] text-gray-500 mt-1">
          💡 Tip: Keep it 2-4 sentences highlighting key achievements and target roles.
        </p>
      </div>
    </div>
  );
}
