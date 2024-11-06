// Ground controller
const Ground = require('../../models/Ground');
const Slot = require('../../models/Slot');
const { validationResult } = require('express-validator');
const { sendBookingConfirmation } = require('../../emailService'); // Import your email service

exports.createGround = async (req, res) => {
  const { groundName, location, slots , description } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Only allow ground owners to create a ground
    if (req.user.user.role !== 'groundOwner') {
      return res.status(403).json({ msg: 'Access denied. Only ground owners can create grounds.' });
    }

    // Create new ground
   // Create new ground
   const ground = new Ground({
    groundName,
    location,
    description,
    ownerId: req.user.user.id, // Associate the ground with the logged-in owner
    slots: Array.isArray(slots) ? slots : [] // Add slots if they exist
  });

    await ground.save();

    // Create slots for the ground

    // Respond with ground details and associated slots
    res.status(201).json({
      ground: {
        id: ground._id,
        groundName: ground.groundName,
        location: ground.location,
        description: ground.description,
        slots: ground.slots // Include slots in the response
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// Get grounds by owner
exports.getGroundsByOwner = async (req, res) => {
  try {
    const ownerId = req.user.user.id; // `req.user` is populated by the `auth` middleware

   // Find all grounds that belong to the logged-in user and populate the slots
   const grounds = await Ground.find({ ownerId }).populate('slots');

   console.log(grounds, "grounds");

   // Always return 200 status with grounds information
   res.status(200).json({
     message: grounds.length > 0 ? 'Grounds fetched successfully.' : 'No grounds found for this owner.',
     grounds: grounds.length > 0 ? 
       grounds.map(ground => ({
         id: ground._id,
         groundName: ground.groundName,
         location: ground.location,
         description:ground.description,
         slots: ground.slots // Return associated slots
       })) : [] // Return an empty array if no grounds found
   });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverrrr Error ',  });
  }
};

// User Grounds

// Ground controller

exports.getAvailableGrounds = async (req, res) => {
  try {
    // Find all grounds that have available slots
    const grounds = await Ground.find({}).populate({
      path: 'slots',
      match: { isAvailable: true }, // Only populate slots that are available
    });

    const availableGrounds = grounds
      .filter(ground => ground.slots.length > 0) // Filter grounds with at least one available slot
      .map(ground => ({
        id: ground._id,
        groundName: ground.groundName,
        location: ground.location,
        description: ground.description,
        slots: ground.slots, // Available slots only
      }));

    res.status(200).json({
      message: availableGrounds.length > 0 ? 'Available grounds fetched successfully.' : 'No available grounds found.',
      grounds: availableGrounds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Update Ground
exports.updateGround = async (req, res) => {
  const { groundName, location, slots, description } = req.body;
  const groundId = req.params.id; // Get the ground ID from the request parameters

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Only allow ground owners to update their own ground
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ msg: 'Ground not found' });
    }

    if (ground.ownerId.toString() !== req.user.user.id) {
      return res.status(403).json({ msg: 'Access denied. You do not own this ground.' });
    }

    // Update the ground details
    ground.groundName = groundName || ground.groundName;
    ground.location = location || ground.location;
    ground.description = description || ground.description;
    ground.slots = Array.isArray(slots) ? slots : ground.slots; // Update slots if they exist, otherwise keep existing ones

    await ground.save(); // Save the updated ground

    // Respond with the updated ground details
    res.status(200).json({
      ground: {
        id: ground._id,
        groundName: ground.groundName,
        location: ground.location,
        description: ground.description,
        slots: ground.slots, // Include slots in the response
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// Boook Ground
// Book a Slot
// Book a Slot
exports.bookSlot = async (req, res) => {
  const { groundId, slotId, userId, userEmail } = req.body; // Get user email from request body

  try {
    // Your existing logic to find the ground and slot
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ msg: 'Ground not found' });
    }

    const slot = ground.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ msg: 'Slot not found' });
    }

    if (slot.isBooked) {
      return res.status(400).json({ msg: 'Slot is already booked.' });
    }

    // Mark the slot as booked
    slot.isBooked = true;
    slot.availability = false;
    slot.bookedBy = userId;

    await ground.save(); // Save changes to the database

    // Prepare booking details for email
    const bookingDetails = {
      groundName: ground.groundName,
      slotName: slot.slotName,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    // Send booking confirmation email
    await sendBookingConfirmation('piyusehgal7017@gmail.com', bookingDetails);

    // Respond with success message
    res.status(200).json({
      message: 'Slot booked successfully.',
      slot: {
        id: slot._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        availability: slot.availability,
        slotName: slot.slotName,
        price: slot.price,
        bookedBy: slot.bookedBy,
        isBooked: slot.isBooked,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};


