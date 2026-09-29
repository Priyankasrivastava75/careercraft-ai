import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is an ATS and why does my resume need to be optimized for it?",
      answer: "An Applicant Tracking System (ATS) is automated recruitment software used by companies (Workday, Greenhouse, Lever, Taleo) to scan, rank, and filter resumes based on job description keywords. CareerCraft AI formats and tunes your content so your resume scores 90%+ and passes automated ATS screens."
    },
    {
      question: "How does CareerCraft AI tailor my resume to a specific job?",
      answer: "When you paste a target job description or link, our Gemini AI engine extracts key technical skills, action verbs, and core requirements. It then rewrites and rearranges your work achievements to match the role's priorities without embellishing or inventing false experience."
    },
    {
      question: "Can I create a brand new resume if I don't have an existing one?",
      answer: "Yes! You can use our guided resume builder step-by-step. Simply answer a few quick questions about your education, work experience, and skills, and CareerCraft AI will draft a complete, professional resume from scratch."
    },
    {
      question: "Are the resume templates compatible with recruiter standard formats?",
      answer: "All CareerCraft AI templates are designed following strict HR and recruiter guidelines — clean typography, clear section hierarchy, single/double column parseable layouts, and zero hidden tables or graphic shapes that confuse ATS parsers."
    },
    {
      question: "Is my personal data safe and private?",
      answer: "Yes, your career data and contact details are stored securely. We never sell your personal information or share your resume with unauthorized third parties."
    }
  ];

  return (
    <section id="faq" className="py-24 relative bg-gray-950 border-t border-gray-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            Frequently Asked Questions
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We’ve Got Answers.
          </h3>
          <p className="mt-3 text-base text-gray-400">
            Learn how CareerCraft AI empowers job seekers to get past ATS filters and win interviews.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-gray-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-gray-800/40 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
