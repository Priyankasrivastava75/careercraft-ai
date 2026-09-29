import React from 'react';

export default function ProfessionalTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin || personalInfo.portfolio;

  return (
    <div className="w-full bg-white text-gray-900 font-sans shadow-2xl rounded-2xl p-8 sm:p-10 min-h-[842px] relative text-left border border-gray-200">
      
      {/* Executive Header */}
      <div className="border-b-4 border-slate-800 pb-5 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>

        {hasContactInfo && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
            {personalInfo.email && <span>Email: {personalInfo.email}</span>}
            {personalInfo.phone && <span>|  Phone: {personalInfo.phone}</span>}
            {personalInfo.location && <span>|  Location: {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>|  LinkedIn: {personalInfo.linkedin}</span>}
            {personalInfo.portfolio && <span>|  Portfolio: {personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && summary.trim() && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 mb-2 font-mono border-l-4 border-slate-800">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 font-normal whitespace-pre-line px-1">
            {summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 mb-3 font-mono border-l-4 border-slate-800">
            Professional Experience
          </h2>
          <div className="space-y-4 px-1">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">
                    {exp.title || 'Job Title'} {exp.company && <span className="font-semibold text-slate-700">— {exp.company}</span>}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs leading-relaxed text-slate-700 font-normal whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 mb-2.5 font-mono border-l-4 border-slate-800">
            Technical & Functional Competencies
          </h2>
          <div className="flex flex-wrap gap-2 px-1">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-800 border border-slate-300 text-[11px] px-2 py-0.5 rounded font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 mb-3 font-mono border-l-4 border-slate-800">
            Education & Academic Background
          </h2>
          <div className="space-y-2 px-1">
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
                <span className="text-[11px] text-slate-500 font-medium">
                  {edu.startYear} {edu.startYear || edu.endYear ? '–' : ''} {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 mb-3 font-mono border-l-4 border-slate-800">
            Notable Projects
          </h2>
          <div className="space-y-3 px-1">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">
                    {proj.name}
                  </span>
                  {proj.techStack && (
                    <span className="text-[10px] text-slate-600 font-mono">
                      ({proj.techStack})
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
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 mb-2 font-mono border-l-4 border-slate-800">
            Certifications
          </h2>
          <div className="space-y-1 px-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-slate-900">
                  {cert.name} {cert.issuer && <span className="text-slate-600 font-normal">— {cert.issuer}</span>}
                </span>
                <span className="text-[11px] text-slate-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
