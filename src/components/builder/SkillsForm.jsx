import React, { useState } from 'react';
import { Cpu, Plus, X, Tag } from 'lucide-react';

export default function SkillsForm({ skills, onChange }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange('skills', [...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange('skills', skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Technical & Soft Skills
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {skills.length} skills added
        </span>
      </div>

      {/* Skill Input Bar */}
      <form onSubmit={handleAddSkill} className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill (e.g. React, Node.js, Agile) and press Enter"
            className="w-full bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!newSkill.trim()}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Skills Badges Container */}
      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-900 text-indigo-300 border border-indigo-900/60 shadow-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-gray-400 hover:text-rose-400 p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-gray-500 italic">No skills added yet. Add key technical and soft skills above.</p>
        )}
      </div>
    </div>
  );
}
