import React from 'react';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm({ projects, onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      techStack: ''
    };
    onChange('projects', [...projects, newItem]);
  };

  const handleRemove = (id) => {
    onChange('projects', projects.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    const updated = projects.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange('projects', updated);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <FolderGit2 className="w-5 h-5 text-emerald-400" />
          Projects
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 hover:bg-indigo-900/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-800 rounded-xl">
          <p className="text-xs text-gray-500">No portfolio projects added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add a project entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Project #{index + 1}
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
                {/* Project Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    placeholder="e.g. CareerCraft AI Resume Optimizer"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Technologies Used */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={item.techStack}
                    onChange={(e) => handleItemChange(item.id, 'techStack', e.target.value)}
                    placeholder="e.g. React, Node.js, Tailwind CSS"
                    className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Project Description & Outcomes
                </label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  placeholder="Built an AI-assisted web platform enabling users to create and score resumes against ATS algorithms..."
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
