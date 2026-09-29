import React from 'react';
import { Mail, Phone, MapPin, Link2, Globe, Briefcase, GraduationCap, Cpu, FolderGit2, Award, FileText } from 'lucide-react';

export default function ModernTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin || personalInfo.portfolio;

  return (
    <div className="w-full bg-white text-gray-900 font-sans shadow-2xl rounded-2xl p-8 sm:p-10 min-h-[842px] relative text-left border border-gray-200">
      
      {/* Top Header Banner Accent */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 p-8 sm:p-10 text-white rounded-t-2xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>

        {hasContactInfo && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-indigo-200 font-medium">
            {personalInfo.email && (
              <span className="flex items-center gap-1 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                {personalInfo.portfolio}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {summary && summary.trim() && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-500 pb-1 mb-2.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" /> Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-700 font-normal whitespace-pre-line">
            {summary}
          </p>
        </div>
      )}

      {/* Skills Pill Badges */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-500 pb-1 mb-2.5 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" /> Core Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-50 text-indigo-950 border border-indigo-200 text-[11px] px-2.5 py-1 rounded-md font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-500 pb-1 mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">
                    {exp.title || 'Job Title'} {exp.company && <span className="text-indigo-700 font-semibold">@ {exp.company}</span>}
                  </span>
                  <span className="text-[11px] text-indigo-900 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-mono font-medium">
                    {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs leading-relaxed text-gray-700 font-normal whitespace-pre-line pl-3 border-l-2 border-indigo-400">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-500 pb-1 mb-3 flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" /> Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">
                    {proj.name || 'Project Name'}
                  </span>
                  {proj.techStack && (
                    <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-mono font-medium">
                      {proj.techStack}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-gray-700 font-normal leading-relaxed">
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
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-500 pb-1 mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    {edu.degree || 'Degree'}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    {edu.institution || 'University Name'}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-500 pb-1 mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-600" /> Certifications & Achievements
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-gray-900">
                  {cert.name} {cert.issuer && <span className="text-gray-600 font-normal">({cert.issuer})</span>}
                </span>
                <span className="text-[11px] text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
