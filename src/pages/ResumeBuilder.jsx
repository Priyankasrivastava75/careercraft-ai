import React, { useState } from 'react';
import BuilderNavbar from '../components/builder/BuilderNavbar';
import TemplateSelector from '../components/builder/TemplateSelector';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import SummaryForm from '../components/builder/SummaryForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import CertificationsForm from '../components/builder/CertificationsForm';
import ResumePreview from '../components/builder/ResumePreview';

const initialResumeState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

const sampleResumeState = {
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    portfolio: 'alexmorgan.dev'
  },
  summary: 'Results-driven Senior Full Stack Engineer with 6+ years of experience building high-throughput web applications using React, Node.js, and Cloud Infrastructure. Proven track record of boosting application performance by 40%+ and leading cross-functional engineering teams.',
  experience: [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      company: 'TechCorp AI',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: '• Spearheaded design and deployment of React & Node.js microservices serving 2M+ active monthly users.\n• Optimized database query speeds by 38%, reducing latency across core user workflows.\n• Mentored 5 junior engineers and implemented CI/CD automated test pipelines.'
    },
    {
      id: 2,
      title: 'Software Developer',
      company: 'Innovate Solutions',
      startDate: 'Jun 2018',
      endDate: 'Dec 2021',
      description: '• Developed responsive frontend interfaces with React, Redux, and Tailwind CSS.\n• Integrated REST APIs and third-party payment processing engines with 99.9% uptime.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      startYear: '2014',
      endYear: '2018'
    }
  ],
  skills: ['React', 'JavaScript (ES6+)', 'Node.js', 'Express', 'Tailwind CSS', 'TypeScript', 'MongoDB', 'REST APIs', 'Git', 'Agile/Scrum'],
  projects: [
    {
      id: 1,
      name: 'CareerCraft AI Resume Platform',
      techStack: 'React, Tailwind CSS, Vite',
      description: 'Engineered a real-time interactive resume builder and ATS score simulator empowering job seekers to craft high-converting resumes.'
    }
  ],
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Nov 2023'
    }
  ]
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(sampleResumeState);
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); // 'modern' | 'minimal' | 'professional'
  const [activeTab, setActiveTab] = useState('form'); // For mobile toggle ('form' | 'preview')
  const [errors, setErrors] = useState({});

  const handleSectionChange = (sectionKey, value) => {
    setResumeData(prev => ({
      ...prev,
      [sectionKey]: value
    }));

    if (sectionKey === 'personalInfo') {
      const newErrors = { ...errors };
      if (value.fullName?.trim()) delete newErrors.fullName;
      if (value.email?.trim()) delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handleLoadSample = () => {
    setResumeData(sampleResumeState);
    setErrors({});
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form fields?')) {
      setResumeData(initialResumeState);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      
      {/* Header Navbar */}
      <BuilderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      {/* Main Two-Column Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Template Selector Bar */}
        <div className="mb-8">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Enter Your Career Details
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Fill in your details below. The right panel updates live as you type.
                </p>
              </div>
            </div>

            {/* Form Sections */}
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={handleSectionChange}
              errors={errors}
            />

            <SummaryForm
              summary={resumeData.summary}
              onChange={handleSectionChange}
            />

            <ExperienceForm
              experience={resumeData.experience}
              onChange={handleSectionChange}
            />

            <SkillsForm
              skills={resumeData.skills}
              onChange={handleSectionChange}
            />

            <EducationForm
              education={resumeData.education}
              onChange={handleSectionChange}
            />

            <ProjectsForm
              projects={resumeData.projects}
              onChange={handleSectionChange}
            />

            <CertificationsForm
              certifications={resumeData.certifications}
              onChange={handleSectionChange}
            />
          </div>

          {/* Right Column: Sticky Live Resume Preview */}
          <div
            className={`lg:col-span-6 lg:sticky lg:top-24 ${
              activeTab === 'form' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live A4 Resume Preview ({selectedTemplate.toUpperCase()})
                </span>
                <span className="text-[11px] text-gray-500 font-mono">
                  Instant Sync
                </span>
              </div>

              {/* Render Selected Paper Template */}
              <div className="overflow-hidden rounded-2xl">
                <ResumePreview
                  data={resumeData}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
