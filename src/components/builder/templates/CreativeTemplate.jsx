import React from 'react';
import { Mail, Phone, MapPin, Link2, Globe, Briefcase, GraduationCap, Cpu, FolderGit2, Award, FileText } from 'lucide-react';

export default function CreativeTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin || personalInfo.portfolio;

  return (
    <div className="w-full bg-white text-gray-900 font-sans shadow-2xl rounded-2xl min-h-[842px] relative text-left border border-gray-200 overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Sidebar Accent Column */}
      <div className="w-full md:w-1/3 bg-slate-900 text-slate-100 p-6 sm:p-8 space-y-6 flex-shrink-0">
        
        {/* Name & Header */}
        <div className="border-b border-slate-700 pb-5">
          <h1 className="text-2xl font-black tracking-tight text-white uppercase leading-tight">
            {personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          <p className="text-xs text-teal-400 font-semibold tracking-wider uppercase mt-1">
            {experience && experience[0]?.title ? experience[0].title : 'Professional Profile'}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2.5 text-xs text-slate-300">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-teal-400 border-b border-slate-800 pb-1">
            Contact Details
          </h2>
          {personalInfo.email && (
            <div className="flex items-center gap-2 break-all">
              <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Link2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-2 break-all">
              <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
          {!hasContactInfo && (
            <p className="text-[11px] text-slate-500 italic">Add contact details to populate</p>
          )}
        </div>

        {/* Core Skills */}
        <div className="space-y-2 text-xs">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-teal-400 border-b border-slate-800 pb-1 flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Core Skills
          </h2>
          {skills && skills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-slate-800 text-teal-300 border border-teal-500/30 text-[10px] px-2 py-0.5 rounded font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 italic">Add skills to display</p>
          )}
        </div>

        {/* Education Sidebar Section */}
        {education && education.length > 0 && (
          <div className="space-y-3 pt-2 text-xs">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-teal-400 border-b border-slate-800 pb-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" /> Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <span className="font-semibold text-white block leading-tight">{edu.degree}</span>
                <span className="text-slate-400 text-[11px] block">{edu.institution}</span>
                <span className="text-[10px] text-teal-400 font-mono">
                  {edu.startYear} {edu.startYear || edu.endYear ? '–' : ''} {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Sidebar */}
        {certifications && certifications.length > 0 && (
          <div className="space-y-2 pt-2 text-xs">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-teal-400 border-b border-slate-800 pb-1 flex items-center gap-1">
              <Award className="w-3 h-3" /> Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-[11px] text-slate-300">
                <span className="font-medium text-white block">{cert.name}</span>
                <span className="text-slate-400 text-[10px]">{cert.issuer} {cert.date && `(${cert.date})`}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Main Content Column */}
      <div className="flex-1 p-6 sm:p-8 space-y-6">
        
        {/* Executive Summary */}
        {summary && summary.trim() ? (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-teal-500 pb-1 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" /> About Me
            </h2>
            <p className="text-xs leading-relaxed text-gray-700 font-normal whitespace-pre-line">
              {summary}
            </p>
          </div>
        ) : null}

        {/* Work Experience */}
        {experience && experience.length > 0 ? (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-teal-500 pb-1 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-teal-600" /> Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-gray-900">
                      {exp.title || 'Job Title'} {exp.company && <span className="text-teal-700 font-semibold">@ {exp.company}</span>}
                    </span>
                    <span className="text-[11px] text-teal-900 bg-teal-50 px-2 py-0.5 rounded font-mono font-medium">
                      {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs leading-relaxed text-gray-700 font-normal whitespace-pre-line pl-2 border-l-2 border-teal-300">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Key Projects */}
        {projects && projects.length > 0 ? (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-teal-500 pb-1 mb-3 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-teal-600" /> Projects & Portfolio
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-gray-900">
                      {proj.name || 'Project Title'}
                    </span>
                    {proj.techStack && (
                      <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-mono">
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
        ) : null}

        {/* Blank State Guidance if no body content */}
        {!summary && (!experience || experience.length === 0) && (!projects || projects.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-xs text-gray-400 font-medium">
              Fill in your summary, work experience, and skills in the left panel to populate your live Creative resume.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
