const express = require('express');
const router = express.Router();
const Note = require('../models/Node');
const authenticateToken = require('../middlewares/authenticateToken');

// Get a specific note by ID
router.get('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const note = await Note.find({ userId: req.params.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new note
router.post('/notes', authenticateToken, async (req, res) => {
  try {
    //const userId = req.body;
    const { userId, title, content } = req.body;
    const newNote = new Note({ userId, title, content, time: new Date().toLocaleString() });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a note by ID
router.patch('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a note by ID
router.delete('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
