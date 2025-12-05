const express = require("express");
const router = express.Router();

const {
  getAll, getById, create, update, remove
} = require("../controllers/jobControllers");

const { requireAuth } = require("../middleware/authMiddleware");

// Public reads
router.get("/", getAll);
router.get("/:id", getById);

// Protected writes
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

module.exports = router;
