import React from 'react';
import { User, Mail, Phone, MapPin, Link2, Globe, AlertCircle } from 'lucide-react';


export default function PersonalInfoForm({ data, onChange, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange('personalInfo', { ...data, [name]: value });
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
      <div className="flex items-center gap-2 text-base font-bold text-white border-b border-gray-800 pb-3">
        <User className="w-5 h-5 text-indigo-400" />
        Personal Information
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center justify-between">
            <span>Full Name <span className="text-rose-400">*</span></span>
            {errors?.fullName && <span className="text-[10px] text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Required</span>}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              name="fullName"
              value={data.fullName || ''}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className={`w-full bg-gray-900 border ${errors?.fullName ? 'border-rose-500/80 focus:border-rose-500' : 'border-gray-800 focus:border-indigo-500'} rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center justify-between">
            <span>Email Address <span className="text-rose-400">*</span></span>
            {errors?.email && <span className="text-[10px] text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Required</span>}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="email"
              name="email"
              value={data.email || ''}
              onChange={handleChange}
              placeholder="e.g. alex.morgan@example.com"
              className={`w-full bg-gray-900 border ${errors?.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-gray-800 focus:border-indigo-500'} rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors`}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              name="phone"
              value={data.phone || ''}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Location / City, Country
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              name="location"
              value={data.location || ''}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
              className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            LinkedIn Profile URL
          </label>
          <div className="relative">
            <Link2 className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              name="linkedin"
              value={data.linkedin || ''}
              onChange={handleChange}
              placeholder="linkedin.com/in/alexmorgan"
              className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Portfolio / GitHub Website
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              name="portfolio"
              value={data.portfolio || ''}
              onChange={handleChange}
              placeholder="alexmorgan.dev"
              className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
