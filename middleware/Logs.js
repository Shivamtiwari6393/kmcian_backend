const Log = require('../models/log');

const Logs = async (req, res, next) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Create a new log object
     
    const newRequest = new Log({
      method: req.method,
      url: req.originalUrl,
      ip: clientIp,
    });

    // Save the request to the database
    await newRequest.save();

    // console.log('Request saved to database');
  } catch (error) {
    console.error('Error saving request to database:', error);
  }

  next();
};

module.exports = Logs;
