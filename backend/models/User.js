// models/User.js
const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({
  groundName: String,
  location: String,
  numberOfSlots: Number,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'groundOwner'], // Define roles
    default: 'user',
  },
  groundDetails: [groundSchema], // Array of ground details for ground owners
});

module.exports = mongoose.model('User', userSchema);