const express = require("express");

const router = express.Router();

const {
  getAll, getById, create, update, remove
} = require("../controllers/jobControllers");

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
