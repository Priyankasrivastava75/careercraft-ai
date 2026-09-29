/**
 * Centralized API Base URL configuration
 * Supports Vercel environment variables (VITE_API_BASE_URL) with fallback to local development.
 */
const rawUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  'http://localhost:5001/api';

// Normalize URL to ensure it correctly points to the /api endpoint
const cleanUrl = rawUrl.trim().replace(/\/+$/, '');
export const API_BASE_URL = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
