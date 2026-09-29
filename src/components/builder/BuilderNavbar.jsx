import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Eye, Edit3, RotateCcw } from 'lucide-react';

export default function BuilderNavbar({ activeTab, setActiveTab, onLoadSample, onReset }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800 bg-gray-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Back Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-gray-800 bg-gray-900/60 hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <div className="h-5 w-px bg-gray-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-gray-950 rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Resume <span className="text-gradient">Builder</span>
            </span>
          </div>
        </div>

        {/* Mobile View Toggle Buttons */}
        <div className="flex lg:hidden bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'form'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Form
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLoadSample}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-300 border border-indigo-800/60 bg-indigo-950/50 hover:bg-indigo-900/60 hover:border-indigo-700 transition-colors"
            title="Pre-fill with sample professional data"
          >
            ⚡ Load Sample Data
          </button>
          <button
            onClick={onReset}
            className="p-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-rose-400 border border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors"
            title="Reset Form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
