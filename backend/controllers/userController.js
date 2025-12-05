const User = require("../models/userModel");
const mongoose = require("mongoose");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();          
    res.status(201).json(newUser);   } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
    res.status(400).json({ message: err.message });
  }
};

// GET /users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    Object.assign(user, req.body);

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
