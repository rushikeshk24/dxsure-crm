const express = require("express");
const DayPlan = require("../models/DayPlan");

const router = express.Router();

// CREATE DAY PLAN
// POST /api/dayplans
router.post("/", async (req, res) => {
  try {
    const { task, employee, date } = req.body;

    if (!task || !employee || !date) {
      return res
        .status(400)
        .json({ message: "task, employee and date are required" });
    }

    // Try to parse the date in a flexible way
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const dayPlan = await DayPlan.create({
      task,
      employee,
      date: parsedDate,
    });

    res.status(201).json(dayPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET DAY PLANS
// GET /api/dayplans
// Optional filters: ?employee=John&date=2026-02-23
router.get("/", async (req, res) => {
  try {
    const { employee, date } = req.query;
    const filter = {};

    if (employee) {
      filter.employee = employee;
    }

    if (date) {
      // If date is provided as "YYYY-MM-DD", find plans for that whole day
      const start = new Date(date);
      const end = new Date(date);
      if (!isNaN(start.getTime())) {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        filter.date = { $gte: start, $lte: end };
      }
    }

    const plans = await DayPlan.find(filter).sort({ date: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

