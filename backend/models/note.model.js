const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the structure of a "note" document
const noteSchema = new Schema({
  title: {
    type: String,
    required: true, // A title is required
  },
  content: {
    type: String,
    required: true, // Content is required
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a model from the schema, which we will use to interact with the database
const Note = mongoose.model('Note', noteSchema);

// Export the model so other files can use it
module.exports = Note;