/**
 * Centralized API Base URL configuration
 * Supports VITE_API_URL, VITE_API_BASE_URL, VITE_BACKEND_URL with fallback to Render backend in production and localhost in development.
 */
const getRawUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;

  // Default to deployed Render backend URL in production
  if (import.meta.env.PROD) {
    return 'https://careercraft-ai-1-0oq5.onrender.com/api';
  }

  return 'http://localhost:5001/api';
};

const rawUrl = getRawUrl();
const cleanUrl = rawUrl.trim().replace(/\/+$/, '');
export const API_BASE_URL = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;

