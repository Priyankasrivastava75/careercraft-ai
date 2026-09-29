const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    default: 'My Professional Resume'
  },
  template: {
    type: String,
    enum: ['modern', 'minimal', 'professional'],
    default: 'modern'
  },
  resumeData: {
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      portfolio: { type: String, default: '' }
    },
    summary: { type: String, default: '' },
    experience: { type: Array, default: [] },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    certifications: { type: Array, default: [] }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
