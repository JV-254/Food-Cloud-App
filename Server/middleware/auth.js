// Server/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // 1. Grab token from incoming HTTP Authorization Header
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access Denied: Missing cryptographic workspace credentials.' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Decode and verify the signature using our isolated JWT secret key
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach the decrypted user session metadata payload to the request object
    req.user = verifiedUser;
    
    // 4. Pass execution to the next controller in the pipeline
    next();
  } catch (error) {
    console.error('Invalid signature intercept:', error.message);
    return res.status(403).json({ 
      success: false, 
      message: 'Access Denied: Invalid or expired workspace session token.' 
    });
  }
};