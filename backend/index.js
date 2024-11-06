// app.js

const express = require('express');
const mongoose = require('mongoose');
 const connectDB = require('./config/db.js'); // Import the connectDB function
require('dotenv').config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth.js');
const cors = require('cors');
// Connect to MongoDB
 connectDB();
// mongoose.connect(process.env.MONGO_URI, () => {
//     console.log("Mongo connected");
// });

// Routes
// Middleware
app.use(cors(
    {
        origin: [""],
        methods:["POST", "PATCH", "PUT", "DELETE", "GET"],
        credentials: true
    }
)); // Enable CORS for all requests
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/auth', authRoutes); // Authentication routes

// Default route for checking the server
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Serverrrr is running on http://localhost:${PORT}`);
});
