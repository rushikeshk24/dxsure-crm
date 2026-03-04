const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD DAILY TASK (employee only, uses logged-in user)
// POST /api/employeetasks
router.post("/", auth, async (req, res) => {
  try {
    const { task, date } = req.body;

    if (!task || !date) {
      return res
        .status(400)
        .json({ message: "task and date are required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const newTask = await Task.create({
      task,
      employeeId: req.userId,
      date: parsedDate,
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FETCH OWN TASKS (employee only)
// GET /api/employeetasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ employeeId: req.userId })
      .sort({ date: -1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
