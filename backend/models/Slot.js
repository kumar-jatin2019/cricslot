const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    groundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground',
        required: true,
    },
    startTime: {
        type: String, // e.g. "06:00 AM"
        required: true,
    },
    endTime: {
        type: String, // e.g. "09:00 AM"
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available',
    },
});

module.exports = mongoose.model('Slot', SlotSchema);
