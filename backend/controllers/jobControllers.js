const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// GET /api/jobs
const getAll = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/:id
const getById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

// POST /api/jobs
const create = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

// PUT /api/jobs/:id
const update = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const updated = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Job not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/jobs/:id
const remove = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted", id });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
