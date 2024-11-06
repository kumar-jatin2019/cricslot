// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user with JWT
module.exports = function (req, res, next) {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    // Check if the token is provided
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Split the token from the Bearer prefix
    const tokenParts = authHeader.split(' ');
    
    console.log(tokenParts, "tokenparts");
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Token format is invalid' });
    }

    const token = tokenParts[1];

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded, "decoded");
        // Attach user information to the request object
        req.user = decoded; // Contains user ID and role
        console.log(req.user, "req.user");
        next(); // Move to the next middleware or route handler
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: 'Token is not valid' , ReturnCode:400 });
    }
};
