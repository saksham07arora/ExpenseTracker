const express = require('express');
const router = express.Router();
const { saveNote } = require('../controllers/notesController');
const { checkToken } = require('../middleware/authMiddleware');

router.post('/', checkToken, saveNote);

module.exports = router;
