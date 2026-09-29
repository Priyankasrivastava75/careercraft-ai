const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  uploadCv
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer for in-memory file handling
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(pdf|docx|doc|txt)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT documents are allowed.'), false);
    }
  }
});

// All resume endpoints require valid JWT authentication
router.use(protect);

// Upload CV file route
router.post('/upload', upload.single('cvFile'), uploadCv);

router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

module.exports = router;
