import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Loader2, Sparkles, FileCode } from 'lucide-react';

export default function UploadCvModal({ isOpen, onClose, onUploadSuccess }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'processing' | 'success' | 'failed'
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setErrorMsg('');
    const ext = selectedFile.name.toLowerCase().split('.').pop();
    if (!['pdf', 'docx', 'doc'].includes(ext)) {
      setErrorMsg('Invalid file type. Please upload a PDF or DOCX document.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds maximum 5MB limit.');
      return;
    }

    setFile(selectedFile);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setErrorMsg('');
    setStatus('uploading');

    const formData = new FormData();
    formData.append('cvFile', file);

    try {
      setTimeout(() => {
        setStatus('processing');
      }, 800);

      const res = await fetch(`${API_BASE_URL}/resumes/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to parse CV file.');
      }

      setStatus('success');

      // Save parsed data to localStorage so ResumeBuilder picks it up live
      if (data.data && data.data.resumeData) {
        try {
          localStorage.setItem('careercraft_resume', JSON.stringify(data.data.resumeData));
        } catch (e) {}
      }

      if (onUploadSuccess) {
        onUploadSuccess(data.data);
      }

      // Redirect to builder after 1 second so candidate can review & edit
      setTimeout(() => {
        onClose();
        navigate('/builder');
      }, 1200);

    } catch (err) {
      console.error('CV Upload error:', err);
      setStatus('failed');
      setErrorMsg(err.message || 'Error processing CV file. Please try another document.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gray-950 relative space-y-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={status === 'uploading' || status === 'processing'}
          className="absolute top-5 right-5 p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            AI Document Parser
          </div>
          <h3 className="text-2xl font-extrabold text-white">Upload Existing CV</h3>
          <p className="text-xs text-gray-400">
            Upload your existing PDF or DOCX resume. Gemini AI extracts your work experience, education, and skills into your editable builder profile.
          </p>
        </div>

        {/* Status Error Banner */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Upload Form & Drop Zone */}
        {status === 'idle' || status === 'failed' ? (
          <form onSubmit={handleUploadSubmit} className="space-y-6">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-gray-800 hover:border-indigo-500/50 bg-gray-900/60'
              }`}
              onClick={() => document.getElementById('cv-file-input').click()}
            >
              <input
                id="cv-file-input"
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-7 h-7" />
              </div>

              {file ? (
                <div className="space-y-1">
                  <span className="text-sm font-bold text-white block">{file.name}</span>
                  <span className="text-xs text-indigo-300 block font-mono">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to Parse
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    Drag and drop your CV file here, or <span className="text-indigo-400 underline">browse</span>
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Supports PDF, DOCX (Max 5MB)</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!file}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-300" />
              Upload & Parse CV
            </button>
          </form>
        ) : null}

        {/* Uploading / Processing Progress View */}
        {status === 'uploading' || status === 'processing' ? (
          <div className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7 animate-spin text-pink-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                {status === 'uploading' ? 'Uploading CV Document...' : 'Parsing CV Data with Gemini AI...'}
              </h4>
              <p className="text-xs text-gray-400">Extracting skills, work history, and contact details securely.</p>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-pulse w-3/4" />
            </div>
          </div>
        ) : null}

        {/* Success View */}
        {status === 'success' ? (
          <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-extrabold text-white">CV Parsed Successfully!</h4>
            <p className="text-xs text-emerald-300">Opening your structured profile in the Resume Builder...</p>
          </div>
        ) : null}

      </div>
    </div>
  );
}
