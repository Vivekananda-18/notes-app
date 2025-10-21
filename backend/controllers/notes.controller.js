// Import the Note model we created earlier
const Note = require('../models/note.model');

// --- Controller Functions ---

// 1. Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find(); // Find all notes in the database
    res.status(200).json(notes);     // Send them back as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error });
  }
};

// 2. Create a new note
const createNote = async (req, res) => {
  const { title, content } = req.body; // Get title and content from the request body

  try {
    const newNote = new Note({
      title,
      content,
    });
    const savedNote = await newNote.save(); // Save the new note to the database
    res.status(201).json(savedNote);      // Send the saved note back as a response
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error });
  }
};

// 3. Delete a note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id; // Get the note ID from the URL (e.g., /api/notes/some_id)
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error });
  }
};


// 4. Update a note
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    // Find the note by its ID and update it with the new data
    // { new: true } tells Mongoose to return the updated document
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(200).json(updatedNote); // Send back the updated note
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error });
  }
};


// Add updateNote to the list of exported functions
module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote, 
};

