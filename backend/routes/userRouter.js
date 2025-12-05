const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { requireAuth } = require("../middleware/authMiddleware");

// Auth routes
router.post("/auth/signup", registerUser);
router.post("/auth/login", loginUser);

// Protected routes
router.get("/users/", requireAuth, getAllUsers);
router.get("/users/:userId", requireAuth, getUserById);
router.put("/users/:userId", requireAuth, updateUser);
router.delete("/users/:userId", requireAuth, deleteUser);

module.exports = router;