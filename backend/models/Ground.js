const mongoose = require('mongoose');

const GroundSchema = new mongoose.Schema({
  groundName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming User model stores ground owners
    required: true,
  },
  slots: [{
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true, // Default is available
    },
    slotName: {
      type: String,
      required: true, // Frontend will send the slot name, so this is required
    },
    price: {
      type: String,
      required: true, // Frontend will send the slot name, so this is required
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User who booked the slot
      default: null, // No user booked initially
    },
    isBooked: {
      type: Boolean,
      default: false, // Initially, slots are not booked
    },
  }],
});

module.exports = mongoose.model('Ground', GroundSchema);
