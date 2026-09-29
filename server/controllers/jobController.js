const {
  analyzeJobDescription,
  calculateAtsScore,
  generateResumeSuggestions
} = require('../services/geminiService');

/**
 * @desc    Analyze Job Description using Gemini AI
 * @route   POST /api/jobs/analyze
 * @access  Private
 */
const analyzeJob = async (req, res, next) => {
  try {
    const { jobDescription, companyName, jobRole } = req.body;

    // Validation
    if (!jobDescription || typeof jobDescription !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Job description is required.'
      });
    }

    if (jobDescription.trim().length < 30) {
      return res.status(400).json({
        success: false,
        message: 'Job description is too short. Please paste at least 30 characters of text.'
      });
    }

    // Call Gemini AI analysis service
    const analysisResult = await analyzeJobDescription(
      jobDescription.trim(),
      companyName ? companyName.trim() : '',
      jobRole ? jobRole.trim() : ''
    );

    res.status(200).json({
      success: true,
      message: 'Job description analyzed successfully',
      data: analysisResult
    });
  } catch (error) {
    console.error('❌ Job Analysis Controller Error:', error);
    next(error);
  }
};

/**
 * @desc    Calculate ATS Resume Score (0-100) against target Job Description
 * @route   POST /api/jobs/score
 * @access  Private
 */
const scoreResume = async (req, res, next) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 30) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required and must be at least 30 characters.'
      });
    }

    if (!resumeData || typeof resumeData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Valid resume data object is required.'
      });
    }

    const scoreResult = await calculateAtsScore(resumeData, jobDescription.trim());

    res.status(200).json({
      success: true,
      message: 'ATS Resume score calculated successfully',
      data: scoreResult
    });
  } catch (error) {
    console.error('❌ ATS Score Controller Error:', error);
    next(error);
  }
};

/**
 * @desc    Generate AI Resume Improvement Suggestions
 * @route   POST /api/jobs/suggestions
 * @access  Private
 */
const generateSuggestions = async (req, res, next) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 30) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required and must be at least 30 characters.'
      });
    }

    if (!resumeData || typeof resumeData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Valid resume data object is required.'
      });
    }

    const suggestionsResult = await generateResumeSuggestions(resumeData, jobDescription.trim());

    res.status(200).json({
      success: true,
      message: 'AI Suggestions generated successfully',
      data: suggestionsResult
    });
  } catch (error) {
    console.error('❌ AI Suggestions Controller Error:', error);
    next(error);
  }
};

module.exports = {
  analyzeJob,
  scoreResume,
  generateSuggestions
};
