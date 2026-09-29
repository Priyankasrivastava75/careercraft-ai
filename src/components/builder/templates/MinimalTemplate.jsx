import React from 'react';

export default function MinimalTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin || personalInfo.portfolio;

  return (
    <div className="w-full bg-white text-gray-900 font-sans shadow-2xl rounded-2xl p-8 sm:p-12 min-h-[842px] relative text-left border border-gray-200">
      
      {/* Minimal Centered Header */}
      <div className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-light tracking-widest text-gray-900 uppercase">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>

        {hasContactInfo && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 tracking-wide font-light">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {summary && summary.trim() && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Overview
          </h2>
          <p className="text-xs leading-relaxed text-gray-800 font-light whitespace-pre-line">
            {summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Skills & Expertise
          </h2>
          <p className="text-xs text-gray-800 font-light leading-relaxed">
            {skills.join('  •  ')}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-gray-900">
                    {exp.title || 'Job Title'} {exp.company && <span className="font-light text-gray-500">/ {exp.company}</span>}
                  </span>
                  <span className="text-[11px] text-gray-400 font-light">
                    {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs leading-relaxed text-gray-600 font-light whitespace-pre-line pt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Selected Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-gray-900">
                    {proj.name}
                  </span>
                  {proj.techStack && (
                    <span className="text-[10px] text-gray-400 font-light">
                      [{proj.techStack}]
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-medium text-gray-900 block">
                    {edu.degree}
                  </span>
                  <span className="text-xs text-gray-500 font-light">
                    {edu.institution}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-light">
                  {edu.startYear} {edu.startYear || edu.endYear ? '–' : ''} {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-xs font-light text-gray-700">
                <span>{cert.name} {cert.issuer && `(${cert.issuer})`}</span>
                <span className="text-gray-400">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
