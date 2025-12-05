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
router.post("/auth/singup", registerUser);
router.post("/auth/login", loginUser);

// Protected routes
router.get("/", requireAuth, getAllUsers);
router.get("/:userId", requireAuth, getUserById);
router.put("/:userId", requireAuth, updateUser);
router.delete("/:userId", requireAuth, deleteUser);

module.exports = router;