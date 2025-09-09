const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const multer = require('multer');

// Setup file upload
const upload = multer({ dest: 'uploads/' });

// Upload resume and job description
router.post('/upload', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jobDescription', maxCount: 1 }
]), interviewController.uploadFiles);

// Get questions based on difficulty
router.get('/questions', interviewController.getQuestions);

// Submit an answer (Teach Mode)
router.post('/answer', interviewController.submitAnswer);

// Submit complete interview (Experience Mode)
router.post('/submit', interviewController.submitInterview);

router.get('/test', (req, res) => {
    res.send("API is working!");
});


module.exports = router;
