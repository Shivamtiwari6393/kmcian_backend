const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  papers: [
    {
      paperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paper",
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      paper: {
        type: String,
        required: true,
      },
      semester: {
        type: String,
        required: true,
      },
      year: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
