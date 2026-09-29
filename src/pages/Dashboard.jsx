import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadCvModal from '../components/UploadCvModal';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  UploadCloud,
  Plus,
  Target,
  Sparkles,
  Trash2,
  Edit3,
  Copy,
  Download,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  BarChart2,
  FolderKanban,
  Zap,
  ArrowRight
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5001/api';

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // CV Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Confirmation modal for deleting resume
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch saved resumes on mount
  useEffect(() => {
    fetchResumes();
  }, [token]);

  const fetchResumes = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/resumes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResumes(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to load saved resumes.');
      }
    } catch (err) {
      console.error('Fetch resumes error:', err);
      setError(err.message || 'Unable to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResumes(prev => prev.filter(r => r._id !== id));
        showToast('Resume deleted successfully.');
      } else {
        throw new Error(data.message || 'Failed to delete resume.');
      }
    } catch (err) {
      alert(err.message || 'Failed to delete resume.');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleDuplicateResume = async (resumeToDup) => {
    try {
      const res = await fetch(`${API_BASE_URL}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: `${resumeToDup.title} (Copy)`,
          template: resumeToDup.template,
          resumeData: resumeToDup.resumeData
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResumes(prev => [data.data, ...prev]);
        showToast('Resume duplicated successfully.');
      }
    } catch (err) {
      console.error('Duplicate error:', err);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 animate-bounce bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 text-xs sm:text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* CV Upload Modal */}
      <UploadCvModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={() => {
          fetchResumes();
          showToast('CV parsed successfully!');
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl border border-rose-500/30 bg-gray-950 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-white">Delete Resume?</h4>
            <p className="text-xs text-gray-400">This action cannot be undone. Are you sure you want to delete this resume?</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-gray-900 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteResume(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* User Profile Header Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-gray-950 to-purple-950/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-500/20">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Account
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome back, {user?.name || 'Professional'}!
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="glass-panel px-5 py-3 rounded-2xl border border-gray-800 text-center min-w-[120px]">
                <span className="text-[11px] text-gray-400 block font-medium">Saved Resumes</span>
                <span className="text-2xl font-black text-indigo-400">{resumes.length}</span>
              </div>
              <div className="glass-panel px-5 py-3 rounded-2xl border border-gray-800 text-center min-w-[120px]">
                <span className="text-[11px] text-gray-400 block font-medium">ATS Scans</span>
                <span className="text-2xl font-black text-pink-400">Unlimited</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action 1: Create New Resume */}
          <Link
            to="/builder"
            className="glass-panel p-6 rounded-3xl border border-gray-800 hover:border-indigo-500/60 bg-gradient-to-br from-gray-900/90 via-gray-950 to-indigo-950/20 hover:scale-[1.02] transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                Build New Resume
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Create a professional ATS-friendly resume from scratch with live side-by-side template preview.
              </p>
            </div>
          </Link>

          {/* Action 2: Upload Existing CV */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="glass-panel p-6 rounded-3xl border border-gray-800 hover:border-purple-500/60 bg-gradient-to-br from-gray-900/90 via-gray-950 to-purple-950/20 hover:scale-[1.02] transition-all text-left group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                Upload Existing CV
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Upload your PDF or DOCX file to instantly extract experience, skills, and education with Gemini AI.
              </p>
            </div>
          </button>

          {/* Action 3: Job Description Analyzer */}
          <Link
            to="/job-analyzer"
            className="glass-panel p-6 rounded-3xl border border-gray-800 hover:border-pink-500/60 bg-gradient-to-br from-gray-900/90 via-gray-950 to-pink-950/20 hover:scale-[1.02] transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors flex items-center gap-2">
                Job Description Analyzer
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Paste job descriptions to extract keywords, compute 0-100 ATS scores, and get one-click AI suggestions.
              </p>
            </div>
          </Link>

        </div>

        {/* Saved Resumes Grid Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-indigo-400" />
              My Saved Resumes
            </h2>

            <button
              onClick={fetchResumes}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-900 border border-gray-800 flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              Refresh List
            </button>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <div key={n} className="glass-panel p-6 rounded-3xl border border-gray-800 h-48 animate-pulse bg-gray-900/50" />
              ))}
            </div>
          )}

          {!isLoading && resumes.length === 0 && (
            <div className="glass-panel p-12 rounded-3xl border border-gray-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 mx-auto flex items-center justify-center">
                <FileText className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">No Resumes Created Yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Get started by creating your first resume or uploading an existing CV file.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to="/builder"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                >
                  Build New Resume
                </Link>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-indigo-300 border border-indigo-800 bg-indigo-950/60"
                >
                  Upload Existing CV
                </button>
              </div>
            </div>
          )}

          {!isLoading && resumes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((res) => (
                <div
                  key={res._id}
                  className="glass-panel p-6 rounded-3xl border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 bg-gray-900/80"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                        {res.template || 'modern'} Template
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {new Date(res.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white truncate">
                      {res.title}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2">
                      {res.resumeData?.personalInfo?.fullName
                        ? `Candidate: ${res.resumeData.personalInfo.fullName}`
                        : 'Custom Resume Document'}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-2 text-xs font-semibold">
                    <button
                      onClick={() => navigate('/builder')}
                      className="px-3 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDuplicateResume(res)}
                      className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white transition-colors"
                      title="Duplicate Resume"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(res._id)}
                      className="p-2 rounded-xl bg-gray-800 text-rose-400 hover:bg-rose-950/60 transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
