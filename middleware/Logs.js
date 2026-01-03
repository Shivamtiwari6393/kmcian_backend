const Log = require('../models/log');

const Logs = async (req, res, next) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const newRequest = new Log({
      method: req.method,
      url: req.originalUrl,
      ip: clientIp,
    });

    await newRequest.save();

    // console.log('Request saved to database', newRequest);
  } catch (error) {
    console.error('Error saving request to database:', error);
  }

  next();
};

module.exports = Logs;
