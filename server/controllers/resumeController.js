const Resume = require('../models/Resume');
const { extractTextFromBuffer, parseCvTextToResumeData } = require('../services/resumeParserService');

/**
 * @desc    Get all resumes for logged-in user
 * @route   GET /api/resumes
 * @access  Private
 */
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single resume by ID for logged-in user
 * @route   GET /api/resumes/:id
 * @access  Private
 */
const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Security Check: Verify user owns this resume
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this resume' });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new resume for logged-in user
 * @route   POST /api/resumes
 * @access  Private
 */
const createResume = async (req, res, next) => {
  try {
    const { title, template, resumeData } = req.body;

    const resume = await Resume.create({
      user: req.user._id,
      title: title || 'My Professional Resume',
      template: template || 'modern',
      resumeData: resumeData || {}
    });

    res.status(201).json({
      success: true,
      message: 'Resume saved successfully',
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing resume for logged-in user
 * @route   PUT /api/resumes/:id
 * @access  Private
 */
const updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Security Check: Verify user owns this resume
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this resume' });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete resume for logged-in user
 * @route   DELETE /api/resumes/:id
 * @access  Private
 */
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Security Check: Verify user owns this resume
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resume' });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload CV file (PDF/DOCX) & parse into structured ResumeData
 * @route   POST /api/resumes/upload
 * @access  Private
 */
const uploadCv = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF or DOCX CV file.'
      });
    }

    console.log(`📥 [CV Upload] Received file: "${req.file.originalname}" | Mime: ${req.file.mimetype} | Size: ${req.file.size} bytes`);

    // Validate buffer presence and integrity
    if (!req.file.buffer || !Buffer.isBuffer(req.file.buffer) || req.file.buffer.length === 0) {
      console.error('❌ [CV Upload] File buffer is empty or invalid');
      return res.status(400).json({
        success: false,
        message: 'Uploaded file buffer is empty or corrupt. Please re-upload.'
      });
    }

    // Validate size (5MB max)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds maximum 5MB limit.'
      });
    }

    console.log(`🔍 [CV Upload] Extracting text from buffer (${req.file.buffer.length} bytes)...`);

    // Extract raw text from uploaded buffer
    const rawText = await extractTextFromBuffer(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    console.log(`✅ [CV Upload] Text extracted (${rawText.length} chars). Parsing structured resume fields...`);

    // Parse extracted text into structured resume fields
    const parsedResumeData = await parseCvTextToResumeData(rawText);

    // Save as new Resume document for user
    const title = req.file.originalname
      ? `Uploaded CV - ${req.file.originalname.replace(/\.[^/.]+$/, '')}`
      : 'Uploaded CV';

    const resume = await Resume.create({
      user: req.user._id,
      title,
      template: 'modern',
      resumeData: parsedResumeData
    });

    console.log(`🎉 [CV Upload] Resume document created successfully (ID: ${resume._id})`);

    res.status(201).json({
      success: true,
      message: 'CV uploaded and parsed successfully!',
      data: resume
    });
  } catch (error) {
    console.error('❌ [CV Upload] Controller Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to upload and parse CV file.'
    });
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  uploadCv
};
