// models/LoginLog.js
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'failure'],  // To indicate login status
    required: true
  },
  role: {
    type: String,
    required: true  // Store the role of the user (user or groundowner)
  }
});

module.exports = mongoose.model('Login', LoginSchema);
