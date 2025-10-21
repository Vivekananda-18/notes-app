import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // --- NEW state variables for editing ---
  // This will store the ID of the note we are currently editing
  const [editingNoteId, setEditingNoteId] = useState(null); 
  // This will store the updated title text for the note being edited
  const [updatedTitle, setUpdatedTitle] = useState('');
  // This will store the updated content text for the note being edited
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // ... (This function is unchanged)
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleCreateNote = async (e) => {
    // ... (This function is unchanged)
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      alert('Please enter both title and content.');
      return;
    }
    try {
      const response = await axios.post(API_URL, { title: newNoteTitle, content: newNoteContent });
      setNotes([...notes, response.data]);
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    // ... (This function is unchanged)
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // --- NEW functions for handling edits ---

  // This function is called when the user clicks the "Edit" button
  const handleEditClick = (note) => {
    setEditingNoteId(note._id);   // Set the ID of the note being edited
    setUpdatedTitle(note.title);  // Pre-fill the input with the current title
    setUpdatedContent(note.content); // Pre-fill the input with the current content
  };

  // This function is called when the user clicks the "Save" button
  const handleUpdateNote = async (e, noteId) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${noteId}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      // Update the notes list with the new data
      const updatedNotes = notes.map((note) =>
        note._id === noteId ? response.data : note
      );
      setNotes(updatedNotes);
      setEditingNoteId(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Notes App</h1>
      </header>

      {/* --- Create Note Form (Unchanged) --- */}
      <div className="note-form-container">
        <form onSubmit={handleCreateNote} className="note-form">
          <h2>Create a New Note</h2>
          <input type="text" placeholder="Title" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
          <textarea placeholder="Content" value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}></textarea>
          <button type="submit">Add Note</button>
        </form>
      </div>

      {/* --- Notes List (UPDATED with edit logic) --- */}
      <div className="notes-list-container">
        <h2>Your Notes</h2>
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              {editingNoteId === note._id ? (
                // --- If this note is being edited, show an input form ---
                <form onSubmit={(e) => handleUpdateNote(e, note._id)}>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  ></textarea>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingNoteId(null)}>Cancel</button>
                </form>
              ) : (
                // --- Otherwise, show the note's content ---
                <>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <div className="note-actions">
                    <button onClick={() => handleEditClick(note)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteNote(note._id)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;