const express = require('express');
const router = express.Router();

// Make sure updateNote is included here
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote, // <-- CHECK THIS
} = require('../controllers/notes.controller');

// GET request to /api/notes/
router.get('/', getAllNotes);

// POST request to /api/notes/
router.post('/', createNote);

// DELETE request to /api/notes/:id
router.delete('/:id', deleteNote);

// PUT request to /api/notes/:id  <-- ADD THIS LINE
router.put('/:id', updateNote);

module.exports = router;