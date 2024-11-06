// routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../config/controllers/authController');
const router = express.Router();
const groundController = require('../config/controllers/groundController');
const auth = require('../middleware/auth'); // Auth middleware
// const slotController = require('../config/controllers/slotController');
// const getGroundWithSlots = require('../config/controllers/getSlotsController');
// const getAvailableGrounds = require('../config/controllers/groundController');

// Register new user
router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.registerUser
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  authController.loginUser // Assuming you have a loginUser function in your authController
);


// Route to create a new ground (Only accessible by ground owners)
router.post(
  '/createGrounds',
  auth,
  [
    check('groundName', 'Ground name is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
  ],
  groundController.createGround
);



router.get('/myGrounds', auth, groundController.getGroundsByOwner);


// 5. Get slots for a specific ground (for users)
router.get(
  '/grounds',
  auth, 
  [
    check('id', 'Ground ID is required').notEmpty(), // Adjust the parameter name here
  ],
  groundController.getAvailableGrounds

);

// Route to book a specific slot in a ground
router.post(
  '/bookSlot',
  auth,
  [
    check('groundId', 'Ground ID is required').notEmpty(),
    check('slotId', 'Slot ID is required').notEmpty(),
  ],
  groundController.bookSlot // Call the bookSlot function in the ground controller
);
// Route to update an existing ground
router.put(
  '/grounds/:id', // The ID of the ground to be updated is passed as a URL parameter
  auth,
  [
    check('groundName', 'Ground name is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    // You can add more validation for other fields if necessary
  ],
  groundController.updateGround // Call the updateGround function in the controller
);


module.exports = router;
