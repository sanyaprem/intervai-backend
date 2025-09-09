const dataStore = require('../models/dataStore');

exports.uploadFiles = (req, res) => {
    const resume = req.files['resume'] ? req.files['resume'][0] : null;
    const jobDescription = req.files['jobDescription'] ? req.files['jobDescription'][0] : null;

    if (!resume || !jobDescription) {
        return res.status(400).json({ message: "Both resume and job description files are required." });
    }

    dataStore.resume = resume;
    dataStore.jobDescription = jobDescription;

    res.json({ message: "Files uploaded successfully", files: { resume, jobDescription } });
};

exports.getQuestions = (req, res) => {
    const difficulty = req.query.difficulty || 'easy';
    
    // Dummy questions
    const questions = [
        { id: 1, question: "What is your greatest strength?", difficulty: "easy" },
        { id: 2, question: "Explain OOP principles.", difficulty: "medium" },
        { id: 3, question: "What is a race condition?", difficulty: "hard" }
    ];

    const filtered = questions.filter(q => q.difficulty === difficulty);
    dataStore.questions = filtered;

    res.json({ questions: filtered });
};

exports.submitAnswer = (req, res) => {
    const { questionId, answer } = req.body;

    if (!questionId || !answer) {
        return res.status(400).json({ message: "questionId and answer are required." });
    }

    dataStore.answers.push({ questionId, answer, timestamp: new Date() });

    // Provide simple feedback for demonstration
    const feedback = `Received answer for question ${questionId}.`;

    res.json({ message: "Answer submitted.", feedback });
};

exports.submitInterview = (req, res) => {
    // Summarize the session
    const summary = {
        totalQuestions: dataStore.questions.length,
        totalAnswered: dataStore.answers.length,
        feedback: "This is a dummy summary. Real analysis will be added later."
    };

    res.json({ message: "Interview submitted.", summary });
};
