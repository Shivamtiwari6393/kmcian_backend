const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;  

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1]      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      req.user = await User.findById(decoded.id).select('-password');
      // console.log(req.user,"authenticated");
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, Please Login' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized,Please Login' });
  }
};

module.exports = protect;
