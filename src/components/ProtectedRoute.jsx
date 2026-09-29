import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5 animate-spin">
          <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        <p className="text-xs text-gray-400 font-medium">Verifying Session...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login preserving intended target page location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
