import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

export default function CertificationsForm({ certifications, onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: ''
    };
    onChange('certifications', [...certifications, newItem]);
  };

  const handleRemove = (id) => {
    onChange('certifications', certifications.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    const updated = certifications.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange('certifications', updated);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <Award className="w-5 h-5 text-amber-400" />
          Certifications & Licenses
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 hover:bg-indigo-900/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-800 rounded-xl">
          <p className="text-xs text-gray-500">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add a certification entry
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Certification #{index + 1}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Certification Name */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Issuer */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={item.issuer}
                    onChange={(e) => handleItemChange(item.id, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Issue Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Date Issued
                  </label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleItemChange(item.id, 'date', e.target.value)}
                    placeholder="e.g. Nov 2023"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
