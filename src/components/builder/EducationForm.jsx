import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function EducationForm({ education, onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      degree: '',
      institution: '',
      startYear: '',
      endYear: ''
    };
    onChange('education', [...education, newItem]);
  };

  const handleRemove = (id) => {
    onChange('education', education.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    const updated = education.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange('education', updated);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          Education
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 hover:bg-indigo-900/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-800 rounded-xl">
          <p className="text-xs text-gray-500">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add degree or diploma
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Education #{index + 1}
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
                {/* Degree */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Degree / Qualification
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => handleItemChange(item.id, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => handleItemChange(item.id, 'institution', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Start Year */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={item.startYear}
                    onChange={(e) => handleItemChange(item.id, 'startYear', e.target.value)}
                    placeholder="e.g. 2018"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* End Year */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={item.endYear}
                    onChange={(e) => handleItemChange(item.id, 'endYear', e.target.value)}
                    placeholder="e.g. 2022"
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
