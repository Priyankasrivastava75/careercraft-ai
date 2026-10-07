import React from 'react';
import { Mail, Phone, MapPin, Link2, Globe, Award } from 'lucide-react';

export default function ExecutiveTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin || personalInfo.portfolio;

  return (
    <div className="w-full bg-white text-gray-900 font-serif shadow-2xl rounded-2xl p-8 sm:p-12 min-h-[842px] relative text-left border border-gray-200">
      
      {/* Executive Header Banner */}
      <div className="border-b-2 border-amber-600 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase font-sans">
              {personalInfo.fullName || 'YOUR FULL NAME'}
            </h1>
            <p className="text-xs text-amber-700 font-bold uppercase tracking-widest mt-1 font-sans">
              {experience && experience[0]?.title ? experience[0].title : 'EXECUTIVE & LEADERSHIP PROFILE'}
            </p>
          </div>
        </div>

        {hasContactInfo && (
          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-sans font-medium">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-amber-600" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                {personalInfo.portfolio}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Executive Summary */}
      {summary && summary.trim() ? (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 font-sans border-b border-slate-300 pb-1 mb-2">
            Executive Profile & Leadership Overview
          </h2>
          <p className="text-xs leading-relaxed text-slate-800 font-normal whitespace-pre-line">
            {summary}
          </p>
        </div>
      ) : null}

      {/* Core Competencies */}
      {skills && skills.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 font-sans border-b border-slate-300 pb-1 mb-2.5">
            Core Executive Competencies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4 font-sans text-xs">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-1.5 text-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                <span className="font-semibold">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Leadership Experience */}
      {experience && experience.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 font-sans border-b border-slate-300 pb-1 mb-3">
            Professional & Leadership Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-sans">
                  <span className="text-xs font-bold text-slate-900">
                    {exp.title || 'Executive Role'} {exp.company && <span className="text-amber-800 font-semibold">| {exp.company}</span>}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">
                    {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs leading-relaxed text-slate-800 font-normal whitespace-pre-line pl-3 border-l-2 border-amber-600/40">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Key Projects & Strategic Initiatives */}
      {projects && projects.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 font-sans border-b border-slate-300 pb-1 mb-3">
            Strategic Initiatives & Key Projects
          </h2>
          <div className="space-y-3 font-sans">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">
                    {proj.name}
                  </span>
                  {proj.techStack && (
                    <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono">
                      {proj.techStack}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-700 font-normal leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Education */}
      {education && education.length > 0 ? (
        <div className="mb-6 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Education & Credentials
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {edu.degree}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    {edu.institution}
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 font-semibold">
                  {edu.startYear} {edu.startYear || edu.endYear ? '–' : ''} {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Certifications */}
      {certifications && certifications.length > 0 ? (
        <div className="font-sans">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Certifications & Board Affiliations
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" />
                  {cert.name} {cert.issuer && <span className="text-slate-600 font-normal">({cert.issuer})</span>}
                </span>
                <span className="text-[11px] text-slate-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

    </div>
  );
}
