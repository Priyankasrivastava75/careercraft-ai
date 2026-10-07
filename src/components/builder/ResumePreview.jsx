import React, { useState } from 'react';
import { Download, Printer, FileDown, X, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ data, selectedTemplate = 'modern' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  // Direct A4 PDF File Download
  const handleDirectPdfDownload = () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);

    requestAnimationFrame(() => {
      setTimeout(async () => {
        try {
          const element = document.getElementById('printable-resume-container');
          if (element) {
            const html2pdf = (await import('html2pdf.js')).default;
            const opt = {
              margin: 0,
              filename: 'CareerCraftAI_Resume.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, logging: false },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            await html2pdf().set(opt).from(element).save();
          }
        } catch (err) {
          console.error('Direct PDF generation error:', err);
          // Fallback to print
          window.print();
        } finally {
          setIsGeneratingPdf(false);
          setIsModalOpen(false);
        }
      }, 100);
    });
  };

  // Browser Print Dialog (A4 Layout)
  const handlePrintAction = () => {
    if (isPrinting) return;
    setIsPrinting(true);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const cleanupListener = () => {
          setIsPrinting(false);
          setIsModalOpen(false);
          window.removeEventListener('afterprint', cleanupListener);
        };

        window.addEventListener('afterprint', cleanupListener);

        try {
          window.print();
        } catch (err) {
          console.error('Print trigger error:', err);
          setIsPrinting(false);
        }

        setTimeout(() => {
          setIsPrinting(false);
          setIsModalOpen(false);
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
          onClick={() => setIsModalOpen(true)}
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

      {/* Export Options Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in no-print"
          onClick={() => {
            if (!isGeneratingPdf && !isPrinting) setIsModalOpen(false);
          }}
        >
          <div
            className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Export Resume Options
                  </h3>
                  <p className="text-xs text-gray-400">
                    Choose how you want to output your resume.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isGeneratingPdf || isPrinting}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Cards */}
            <div className="space-y-3 pt-1">
              
              {/* Option 1: Direct Download PDF */}
              <button
                type="button"
                onClick={handleDirectPdfDownload}
                disabled={isGeneratingPdf || isPrinting}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                  isGeneratingPdf
                    ? 'bg-indigo-950/80 border-indigo-500 ring-1 ring-indigo-500'
                    : 'bg-gray-900/60 border-gray-800 hover:border-indigo-500/80 hover:bg-gray-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                  {isGeneratingPdf ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileDown className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Document'}
                    </h4>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                      A4 PDF
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Directly download <span className="text-gray-300 font-mono font-medium">CareerCraftAI_Resume.pdf</span> with current <span className="capitalize text-indigo-400">{selectedTemplate}</span> template.
                  </p>
                </div>
              </button>

              {/* Option 2: Print Resume */}
              <button
                type="button"
                onClick={handlePrintAction}
                disabled={isGeneratingPdf || isPrinting}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                  isPrinting
                    ? 'bg-purple-950/80 border-purple-500 ring-1 ring-purple-500'
                    : 'bg-gray-900/60 border-gray-800 hover:border-purple-500/80 hover:bg-gray-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                  {isPrinting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Printer className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {isPrinting ? 'Opening Print Dialog...' : 'Print Resume'}
                    </h4>
                    <span className="text-[10px] font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded-full">
                      Print Dialog
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Open browser print dialog for physical printing or custom PDF print driver.
                  </p>
                </div>
              </button>

            </div>

            {/* Modal Footer / Cancel */}
            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isGeneratingPdf || isPrinting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}



