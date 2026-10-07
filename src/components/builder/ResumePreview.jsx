import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ data, selectedTemplate = 'modern' }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = () => {
    if (isGenerating) return;

    // Set loading state immediately so UI feedback paints instantly (prevents Chrome INP metric latency)
    setIsGenerating(true);

    // Defer heavy print execution to next paint frame using requestAnimationFrame + setTimeout
    requestAnimationFrame(() => {
      setTimeout(() => {
        const cleanupListener = () => {
          setIsGenerating(false);
          window.removeEventListener('afterprint', cleanupListener);
        };

        window.addEventListener('afterprint', cleanupListener);

        try {
          window.print();
        } catch (err) {
          console.error('Failed to trigger print dialog:', err);
          setIsGenerating(false);
        }

        // Safety fallback timer to guarantee state reset
        setTimeout(() => {
          setIsGenerating(false);
        }, 1200);
      }, 100);
    });
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Top Action Bar for Live Preview */}
      <div className="flex items-center justify-between bg-gray-900/80 p-2.5 rounded-xl border border-gray-800 no-print">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-white tracking-wider uppercase">
            Live Preview ({selectedTemplate.toUpperCase()})
          </span>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
            isGenerating
              ? 'bg-indigo-900/80 border border-indigo-700/60 opacity-80 cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-300" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Printable Resume Container */}
      <div id="printable-resume-container" className="printable-resume overflow-hidden rounded-2xl">
        {renderTemplate()}
      </div>
    </div>
  );
}


