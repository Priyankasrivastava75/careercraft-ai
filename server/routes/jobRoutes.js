const express = require('express');
const router = express.Router();
const { analyzeJob, scoreResume, generateSuggestions } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Protect all job endpoints with JWT auth
router.use(protect);

router.post('/analyze', analyzeJob);
router.post('/score', scoreResume);
router.post('/suggestions', generateSuggestions);

module.exports = router;
