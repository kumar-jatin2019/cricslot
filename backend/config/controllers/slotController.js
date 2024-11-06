const Slot = require('../../models/Slot');
const { validationResult } = require('express-validator');

// Get slots for a specific ground
exports.getSlots = async (req, res) => {
  const { groundId } = req.params; // Assuming groundId is passed in the route params

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const slots = await Slot.find({ groundId });
    
    if (!slots.length) {
      return res.status(404).json({ msg: 'No slots found for this ground.' });
    }

    res.status(200).json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
