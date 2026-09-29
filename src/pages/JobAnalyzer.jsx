import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AtsScoreCard from '../components/AtsScoreCard';
import AiSuggestionsCard from '../components/AiSuggestionsCard';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Building2,
  Briefcase,
  FileText,
  CheckCircle2,
  Cpu,
  AlertCircle,
  Zap,
  ShieldCheck,
  Tag,
  GraduationCap,
  Award,
  BarChart3,
  Lightbulb,
  Check,
  RefreshCw,
  FolderKanban
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const sampleJobDescription = `We are seeking a Senior Full Stack Software Engineer at TechCorp AI to build next-generation AI web platforms. 

Requirements:
• 5+ years of hands-on experience with React, TypeScript, Node.js, and Express.
• Strong experience with MongoDB, REST APIs, and Cloud Deployments (AWS / Docker).
• Bachelor's Degree in Computer Science or equivalent field required.
• Excellent problem-solving, team collaboration, and communication skills.
• AWS Certified Solutions Architect is a plus.

Responsibilities:
• Architect, scale, and maintain high-performance frontend interfaces and backend microservices.
• Lead technical design reviews and mentor junior developers.
• Collaborate with product managers and UX designers to ship weekly releases.`;

// Default fallback resume structure if none exists in localStorage
const defaultResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    portfolio: 'github.com/alexjohnson'
  },
  summary: 'Motivated Software Engineer with 3+ years experience building web applications using JavaScript, React, and Node.js.',
  skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Node.js', 'Git', 'REST APIs'],
  experience: [
    {
      jobTitle: 'Software Developer',
      company: 'Tech Solutions Inc.',
      startDate: '2022',
      endDate: 'Present',
      description: 'Worked on frontend components using React and developed backend API endpoints in Node.js.'
    }
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      college: 'University of California',
      startYear: '2018',
      endYear: '2022'
    }
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      technologies: 'React, Node.js, MongoDB',
      description: 'Built full stack e-commerce store with payment integration and state management.'
    }
  ],
  certifications: []
};

export default function JobAnalyzer() {
  const { token } = useAuth();
  
  // Input fields
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');

  // Active Tab: 'analysis' | 'ats_score' | 'suggestions'
  const [activeTab, setActiveTab] = useState('analysis');

  // Loading & Error States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Results Data
  const [analysisResult, setAnalysisResult] = useState(null);
  const [atsScoreResult, setAtsScoreResult] = useState(null);
  const [suggestionsResult, setSuggestionsResult] = useState(null);

  // Resume Selection
  const [savedResumes, setSavedResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('draft'); // 'draft' or Mongo ID
  const [activeResumeData, setActiveResumeData] = useState(defaultResumeData);

  // Fetch saved resumes on mount
  useEffect(() => {
    // 1. Try loading draft resume from localStorage
    try {
      const localDraft = localStorage.getItem('careercraft_resume');
      if (localDraft) {
        const parsed = JSON.parse(localDraft);
        if (parsed.resumeData) {
          setActiveResumeData(parsed.resumeData);
        } else {
          setActiveResumeData(parsed);
        }
      }
    } catch (err) {
      console.warn('Could not parse local resume draft:', err);
    }

    // 2. Fetch user's saved resumes from MongoDB API
    const fetchUserResumes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/resumes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.data)) {
          setSavedResumes(data.data);
        }
      } catch (err) {
        console.warn('Failed to fetch user resumes:', err);
      }
    };

    if (token) {
      fetchUserResumes();
    }
  }, [token]);

  // Handle selecting a resume
  const handleResumeChange = (e) => {
    const val = e.target.value;
    setSelectedResumeId(val);

    if (val === 'draft') {
      try {
        const localDraft = localStorage.getItem('careercraft_resume');
        if (localDraft) {
          const parsed = JSON.parse(localDraft);
          setActiveResumeData(parsed.resumeData || parsed);
          return;
        }
      } catch (err) {}
      setActiveResumeData(defaultResumeData);
    } else {
      const found = savedResumes.find(r => r._id === val);
      if (found && found.resumeData) {
        setActiveResumeData(found.resumeData);
      }
    }
  };

  // Step 1: Analyze Job Description
  const handleAnalyzeJob = async (e) => {
    e?.preventDefault();
    setError('');

    if (!jobDescription || jobDescription.trim().length < 30) {
      setError('Job description is too short. Please paste at least 30 characters of text.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // 1. Call Job Analysis API
      const res = await fetch(`${API_BASE_URL}/jobs/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          jobDescription: jobDescription.trim(),
          companyName: companyName.trim(),
          jobRole: jobRole.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to analyze job description.');
      }

      setAnalysisResult(data.data);

      // Automatically trigger ATS Score and Suggestions calculation
      runScoreAndSuggestions(data.data, activeResumeData);
    } catch (err) {
      console.error('Job analysis error:', err);
      setError(err.message || 'Something went wrong during AI analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 2 & 3: Run ATS Score and AI Suggestions in parallel
  const runScoreAndSuggestions = async (jdData, resumeDataToUse) => {
    setIsScoring(true);
    setIsSuggesting(true);

    const jdText = jobDescription.trim();

    try {
      // Parallel fetch for Score and Suggestions
      const [scoreRes, sugRes] = await Promise.all([
        fetch(`${API_BASE_URL}/jobs/score`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ jobDescription: jdText, resumeData: resumeDataToUse })
        }),
        fetch(`${API_BASE_URL}/jobs/suggestions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ jobDescription: jdText, resumeData: resumeDataToUse })
        })
      ]);

      const scoreData = await scoreRes.json();
      if (scoreRes.ok && scoreData.success) {
        setAtsScoreResult(scoreData.data);
      }

      const sugData = await sugRes.json();
      if (sugRes.ok && sugData.success) {
        setSuggestionsResult(sugData.data);
      }
    } catch (err) {
      console.error('Error calculating ATS score or suggestions:', err);
    } finally {
      setIsScoring(false);
      setIsSuggesting(false);
    }
  };

  // Apply Suggestion directly to active resume
  const handleApplySuggestion = async (suggestion) => {
    const updatedResume = { ...activeResumeData };

    if (suggestion.field === 'skills') {
      // Split comma separated or push
      const newSkillsList = suggestion.suggestedValue
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      updatedResume.skills = newSkillsList;
    } else if (suggestion.targetSection === 'summary') {
      updatedResume.summary = suggestion.suggestedValue;
    } else if (suggestion.targetSection === 'experience' && Array.isArray(updatedResume.experience)) {
      const idx = suggestion.targetIndex ?? 0;
      if (updatedResume.experience[idx]) {
        updatedResume.experience[idx] = {
          ...updatedResume.experience[idx],
          [suggestion.field || 'description']: suggestion.suggestedValue
        };
      }
    } else if (suggestion.targetSection === 'projects' && Array.isArray(updatedResume.projects)) {
      const idx = suggestion.targetIndex ?? 0;
      if (updatedResume.projects[idx]) {
        updatedResume.projects[idx] = {
          ...updatedResume.projects[idx],
          [suggestion.field || 'technologies']: suggestion.suggestedValue
        };
      }
    }

    // Update active state
    setActiveResumeData(updatedResume);

    // Save to localStorage so Resume Builder picks it up live!
    try {
      localStorage.setItem('careercraft_resume', JSON.stringify(updatedResume));
    } catch (e) {}

    // If selected resume is a saved MongoDB resume, update backend DB as well!
    if (selectedResumeId && selectedResumeId !== 'draft') {
      try {
        await fetch(`${API_BASE_URL}/resumes/${selectedResumeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ resumeData: updatedResume })
        });
      } catch (err) {
        console.warn('Failed to auto-sync applied suggestion to MongoDB:', err);
      }
    }

    // Show Toast
    setToastMessage(`Applied "${suggestion.title}" to your resume!`);
    setTimeout(() => setToastMessage(''), 4000);

    // Re-score dynamically with updated resume!
    if (analysisResult) {
      runScoreAndSuggestions(analysisResult, updatedResume);
    }
  };

  const handleLoadSample = () => {
    setJobDescription(sampleJobDescription);
    setCompanyName('TechCorp AI');
    setJobRole('Senior Full Stack Software Engineer');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-bounce bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 text-xs sm:text-sm font-bold">
          <Check className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/50 text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              AI Job Intelligence & ATS Optimizer
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Job Description <span className="text-gradient">Analyzer & ATS Score</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Paste target job requirements below. Get an instant ATS match score (0-100), key skills breakdown, and actionable AI suggestions with one-click resume updates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLoadSample}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-300 border border-indigo-800/60 bg-indigo-950/50 hover:bg-indigo-900/60 hover:border-indigo-700 transition-colors flex items-center gap-2 shrink-0 shadow-md"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Load Sample Job Description
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls & Resume Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Resume Selection Selector */}
            <div className="glass-panel p-5 rounded-3xl border border-indigo-500/30 bg-indigo-950/20 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-indigo-400" />
                Select Target Resume to Score & Match
              </label>

              <select
                value={selectedResumeId}
                onChange={handleResumeChange}
                className="w-full bg-gray-900 border border-indigo-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400 font-medium"
              >
                <option value="draft">📄 Current Active Resume Draft (Local Builder Data)</option>
                {savedResumes.map((res) => (
                  <option key={res._id} value={res._id}>
                    💾 {res.title} ({new Date(res.updatedAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-gray-400">
                Active Resume: <strong className="text-gray-200">{activeResumeData.personalInfo?.fullName || 'Untitled'}</strong> ({activeResumeData.skills?.length || 0} skills, {activeResumeData.experience?.length || 0} exp entries)
              </p>
            </div>

            {/* Input Form */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
              
              {error && (
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleAnalyzeJob} className="space-y-4">
                
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company Name <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Stripe, Google, TechCorp"
                      className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Job Role */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Target Job Title / Role <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      placeholder="e.g. Senior Full Stack Engineer"
                      className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Job Description Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Paste Job Description <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {jobDescription.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={9}
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste full job description text here..."
                    className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl p-4 text-xs text-white focus:outline-none transition-colors leading-relaxed"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isAnalyzing || !jobDescription.trim()}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
                      <span>Analyzing Job & Scoring Resume...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-pink-300" />
                      <span>Analyze Job & Score Resume</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Right Column: Dynamic Output Panel with Tabs */}
          <div className="lg:col-span-7 space-y-6">
            
            {!analysisResult && !isAnalyzing && (
              <div className="glass-panel p-12 rounded-3xl border border-gray-800 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 mx-auto flex items-center justify-center">
                  <FileText className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white">No Analysis Generated Yet</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Paste a job description on the left and click <strong>"Analyze Job & Score Resume"</strong> to extract requirements, calculate your ATS match score, and get AI wording suggestions.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="glass-panel p-12 rounded-3xl border border-gray-800 text-center space-y-6 animate-pulse">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 mx-auto flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-indigo-400 animate-spin" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Analyzing & Scoring with Gemini AI...</h3>
                  <p className="text-xs text-indigo-300">Extracting requirements, computing 7 ATS categories, and preparing suggestions.</p>
                </div>
                <div className="w-full max-w-sm mx-auto h-2 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-pulse w-3/4" />
                </div>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Header Card */}
                <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-gray-950 to-purple-950/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800/60 inline-block mb-2">
                        {analysisResult.companyName}
                      </span>
                      <h2 className="text-2xl font-black text-white tracking-tight">
                        {analysisResult.jobTitle}
                      </h2>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Exp Level: {analysisResult.experienceLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-gray-800 pb-1">
                  <button
                    onClick={() => setActiveTab('analysis')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'analysis'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Job Breakdown
                  </button>

                  <button
                    onClick={() => setActiveTab('ats_score')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'ats_score'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    ATS Match Score ({atsScoreResult?.overallScore ?? '--'}%)
                  </button>

                  <button
                    onClick={() => setActiveTab('suggestions')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'suggestions'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    AI Suggestions ({suggestionsResult?.length ?? 0})
                  </button>
                </div>

                {/* TAB 1: Job Breakdown */}
                {activeTab === 'analysis' && (
                  <div className="space-y-6">
                    {/* Technical Skills */}
                    <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-gray-800 pb-2.5">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        Required Technical Skills
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {analysisResult.technicalSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-950/80 text-indigo-200 border border-indigo-800/70 text-xs px-3 py-1 rounded-lg font-semibold shadow-sm"
                          >
                            ⚡ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Soft Skills */}
                    {analysisResult.softSkills && analysisResult.softSkills.length > 0 && (
                      <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-gray-800 pb-2.5">
                          <Tag className="w-4 h-4 text-cyan-400" />
                          Soft Skills & Workplace Traits
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {analysisResult.softSkills.map((soft, idx) => (
                            <span
                              key={idx}
                              className="bg-cyan-950/80 text-cyan-200 border border-cyan-800/70 text-xs px-3 py-1 rounded-lg font-medium"
                            >
                              ✓ {soft}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ATS Keywords */}
                    <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-purple-950/20 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-purple-200 border-b border-purple-900/60 pb-2.5">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        Critical ATS Optimization Keywords
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {analysisResult.importantKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-900/60 text-purple-200 border border-purple-700/60 text-xs px-3 py-1 rounded-full font-semibold font-mono"
                          >
                            # {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-gray-800 pb-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Key Responsibilities & Duties
                      </div>
                      <ul className="space-y-2.5 text-xs text-gray-300 leading-relaxed">
                        {analysisResult.mainResponsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-gray-900/60 p-3 rounded-xl border border-gray-800/80">
                            <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 2: ATS Match Score */}
                {activeTab === 'ats_score' && (
                  <div>
                    {isScoring ? (
                      <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
                        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                        <p className="text-sm font-semibold text-white">Calculating ATS match scores across 7 categories...</p>
                      </div>
                    ) : (
                      <AtsScoreCard scoreData={atsScoreResult} />
                    )}
                  </div>
                )}

                {/* TAB 3: AI Suggestions */}
                {activeTab === 'suggestions' && (
                  <div>
                    {isSuggesting ? (
                      <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
                        <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                        <p className="text-sm font-semibold text-white">Generating tailored wording and keyword suggestions...</p>
                      </div>
                    ) : (
                      <AiSuggestionsCard
                        suggestions={suggestionsResult}
                        onApplySuggestion={handleApplySuggestion}
                      />
                    )}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
