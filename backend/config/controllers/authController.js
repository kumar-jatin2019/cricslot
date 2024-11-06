// controllers/authController.js
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../../models/User');
const generateToken = require('../../utils/jwt');
const Login = require('../../models/Login');

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role, groundDetails } = req.body;
   console.log(username, "username");
   console.log(email, "email");

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role: role || 'user', // Assign 'groundOwner' or 'user' based on input
      groundDetails: role === 'groundOwner' ? groundDetails : [] // Add ground details only if role is 'groundOwner'
    });

     await user.save();

     // Generate token with user info
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        groundDetails: user.groundDetails // Include ground details if available
      }
    };

    const token = generateToken(payload);
  res.status(201).json({ token , msg: 'User Register Succesfully' });
  } catch (err) {
    console.error('Registration error:', err); // Log the full error object
    res.status(500).json({ msg: 'Server error', error: err.message }); // Send a more specific error message
}
};

// login 
// Login User or Ground Owner
exports.loginUser = async (req, res) => {
  debugger;
  const { email, password } = req.body;
  console.log(email,"email");
  console.log(password, "pass")
  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    console.log(user, "user");
   
   // console.log(user, "user");
    if (user == null) {
      // Log failed login attempt
      await Login.create({
        userId: null, // No user found
        status: 'failure',
        role: 'unknown'  // Role is unknown for failed login
      });
      return res.status(400).json({ msg: 'Invalid credentials. User not found.' });
    }

    // 2. Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Log failed login attempt
      await Login.create({
        userId: user._id,
        status: 'failure',
        role: user.role
      });
      return res.status(400).json({ msg: 'Invalid credentials. Incorrect password.' });
    }

    // 3. Generate a JWT token if login is successful
   // Generate a JWT token with additional user information
   const payload = {
    user: {
      id: user.id,
      email: user.email, // Include email
      username: user.username, // Include username
      role: user.role // Include role
    }
  };

   
  const token = generateToken(payload);

  await Login.create({
    userId: user._id,
    status: 'success',
    role: user.role
  });
  res.status(201).json({
          token,
          msg: 'User Login Succesfully',
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
          }
        });
  }
  
  
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
