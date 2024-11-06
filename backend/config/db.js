// const mongoose = require('mongoose');
// require('dotenv').config(); // Ensure you load environment variables

// const connectDB = async () => {
//     try {
//         console.log('Connecting to MongoDB...');
//         const uri = process.env.MONGO_URI; // Load MongoDB URI from .env
//         console.log('MongoDB URI:', uri); // Add this line to debug
//         // await mongoose.connect('mongodb://localhost:27017/cricslot', {
//         //     // useNewUrlParser: true,
//         //     // useUnifiedTopology: true,
//         //   })// No need for options in Mongoose 6 and above
//         await mongoose.connect(uri, {
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//           })// No need for options in Mongoose 6 and above
//         console.log('Connected to MongoDB!');
//     } catch (error) {
//         console.error('MongoDB connection error:', error.message);
//         process.exit(1); // Exit the process with failure
//     }
// };

// module.exports = connectDB;

// connectDB.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const uri = process.env.MONGO_URI; // Load MongoDB URI from .env
        console.log('MongoDB URI:', uri); // Debugging: Print the MongoDB URI

        // Attempt to connect to the MongoDB database
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4, // Use IPv4, skip IPv6
            // No need for useNewUrlParser and useUnifiedTopology in Mongoose 6 and above
            serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
        });

        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('MongoDB connection error:', error); // Log the entire error object
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
