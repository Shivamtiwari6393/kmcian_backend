const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    method: String,
    url: String,
    ip: String,
    user: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
