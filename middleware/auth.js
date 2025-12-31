const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // console.log("insided auth");
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Not authorized,Please Login' });
      }
      const decoded = jwt.verify(token, process.env.JWT);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select('-password');
      console.log(req.user, "authenticated");
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Token verification failed, Please Login' });
    }
  }
  else {
    return res.status(401).json({ message: 'Token verification failed, Please Login' });

  }


};

module.exports = protect;
