// groundController.js
const Ground = require('../models/Ground');

// Get grounds by owner
const getGroundsByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id; // `req.user` is populated by the `protect` middleware (after verifying the JWT)
    console.log(ownerId, "ownerId")

    // Find all grounds that belong to the logged-in user
    const grounds = await Ground.find({ owner: ownerId });

    // Send response with 200 status code
    res.status(200).json({
      message: 'Grounds fetched successfully.',
      grounds: grounds || [], // Return an empty array if no grounds are found
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getGroundsByOwner,
};
