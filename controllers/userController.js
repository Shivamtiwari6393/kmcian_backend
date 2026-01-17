const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const paperSchema = require("../models/paperModel");
// ===============generate taken====================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "2h",
  });
};

// ================user register==============

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let role = "user";
  if (req.user?.role === "superadmin") role = "superadmin";
  if (req.user?.role === "admin") role = "admin";

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Sorry! Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Success! User registered successfully." });
  } catch (error) {
    console.log("registration failed", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============user login===========================

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // console.log(email, password, "email", "password");
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id);

    return res.status(200).json({
      message: `Bonjour, ${user.username}!`,
      token: token,
      userId: user._id,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    console.log("login failed", error);
    res.status(500).json({ message: "Server error" });
  }
};

//============== update user =========================

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log("user updation failed", error);

    res.status(500).json({ error: "Server error" });
  }
};

const userData = async (req, res) => {
  try {
    const userId = req.query?.userId;
    const user = await User.findById(userId)
      .select("-papers._id")
      .populate(
        "papers.paperId",
        "-pdf"
      );
      
    if (!user) return res.status(404).json({ message: "User not found" });
    return res
      .status(200)
      .json({ username: user.username, papers: user.papers });
  } catch (error) {
    console.log("err in userData", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, updateUser, userData };
