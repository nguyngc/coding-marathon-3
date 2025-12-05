const express = require("express");

const router = express.Router();

const {
  getAll, getById, create, update, remove
} = require("../controllers/jobControllers");

router.get("/", getAll);
router.post("/", create);
router.get("/:jobId", getById);
router.put("/:jobId", update);
router.delete("/:jobId", remove);

module.exports = router;
