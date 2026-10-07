import React from 'react';
import { Download, Printer } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ data, selectedTemplate = 'modern' }) {
  const handlePrint = () => {
    window.print();
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
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Printable Resume Container */}
      <div id="printable-resume-container" className="printable-resume overflow-hidden rounded-2xl">
        {renderTemplate()}
      </div>
    </div>
  );
}

