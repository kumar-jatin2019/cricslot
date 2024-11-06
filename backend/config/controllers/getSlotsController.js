const Ground = require('../../models/Ground');
const Slot = require('../../models/Slot');

exports.getGroundWithSlots = async (req, res) => {
  const { id } = req.params; // Get the ground ID from the request parameters

  try {
    // Find the ground by ID and populate the slots
    const ground = await Ground.findById(id).populate('slots');

    if (!ground) {
      return res.status(404).json({ msg: 'Ground not found' });
    }

    // Find the slots associated with the ground
    const slots = await Slot.find({ groundId: ground._id });

    // Respond with the ground and its slots
    res.json({
      ground: {
        _id: ground._id,
        groundName: ground.groundName,
        location: ground.location,
        ownerId: ground.ownerId,
        slots: ground.slots // Include the slots in the response
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
