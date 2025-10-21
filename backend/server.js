// Import required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "https://vivek-notes-app.netlify.app"
}));
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---  <-- THIS IS THE NEW PART
// Import the routes for notes
const noteRoutes = require('./routes/notes.routes');
// Use the routes, prefixing them with /api/notes
app.use('/api/notes', noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});