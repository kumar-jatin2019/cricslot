// // app.js

// const express = require('express');
// const mongoose = require('mongoose');
//  const connectDB = require('./config/db.js'); // Import the connectDB function
// require('dotenv').config(); // Load environment variables
// const app = express();
// const PORT = process.env.PORT || 2000;
// const authRoutes = require('./routes/auth.js');
// const cors = require('cors');
// // Connect to MongoDB
//  connectDB();
// // mongoose.connect(process.env.MONGO_URI, () => {
// //     console.log("Mongo connected");
// // });

// // Routes
// // Middleware
// app.use(cors({
//     origin: ["https://cricslot-slot.vercel.app", "'http://localhost:58219'"], // Allow both production and local origins
//     methods: ["POST", "PATCH", "PUT", "DELETE"],
//     credentials: true
// })); // Enable CORS for all requests
// app.use(express.json()); // Parse incoming JSON requests
// app.use('/api/auth', authRoutes); // Authentication routes

// // Default route for checking the server
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });
// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Serverrrr is running on http://localhost:${PORT}`);
// // });
// api/auth.js

const express = require('express');
const mongoose = require('mongoose');
 const connectDB = require('./config/db.js'); // Import the connectDB function
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const serverless = require('serverless-http'); // Import serverless-http package

const app = express();

// Connect to MongoDB
async function connect() {
    try {
        await connectDB();
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

app.use(cors({
    origin: ["https://cricslot-slot.vercel.app", "http://localhost:58219"], // Allow both production and local origins
    methods: ["POST", "PATCH", "PUT", "DELETE"],
    credentials: true
})); // Enable CORS for all requests


console.log(app, "app");
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/auth', authRoutes); // Authentication routes

// Default route for checking the server
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Wrap the Express app with serverless
module.exports.handler = serverless(app);

// Ensure the database connection is made before handling requests
connect().catch(err => {
    console.error('Error in serverless function:', err);
});

