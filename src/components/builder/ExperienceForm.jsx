import React from 'react';
import { Briefcase, Plus, Trash2, Calendar, Building2, AlertCircle } from 'lucide-react';

export default function ExperienceForm({ experience, onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange('experience', [...experience, newItem]);
  };

  const handleRemove = (id) => {
    onChange('experience', experience.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    const updated = experience.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange('experience', updated);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <Briefcase className="w-5 h-5 text-pink-400" />
          Work Experience
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 hover:bg-indigo-900/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-800 rounded-xl">
          <p className="text-xs text-gray-500">No work experience entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first job entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Position #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Job Title */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => handleItemChange(item.id, 'company', e.target.value)}
                    placeholder="e.g. Acme Tech Inc."
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
                    placeholder="e.g. Jan 2022"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    End Date / Present
                  </label>
                  <input
                    type="text"
                    value={item.endDate}
                    onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
                    placeholder="e.g. Present or Dec 2024"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Key Achievements & Responsibilities
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  placeholder="• Architected microservices with Node.js & React&#10;• Improved database query throughput by 35%..."
                  className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
