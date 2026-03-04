const express = require("express");
const PettyCash = require("../models/PettyCash");

const router = express.Router();

// CREATE PETTY CASH ENTRY
// POST /api/pettycash
router.post("/", async (req, res) => {
  try {
    const { amount, description, date } = req.body;

    if (!amount || !description || !date) {
      return res
        .status(400)
        .json({ message: "amount, description and date are required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const entry = await PettyCash.create({
      amount,
      description,
      date: parsedDate,
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PETTY CASH ENTRIES
// GET /api/pettycash
router.get("/", async (req, res) => {
  try {
    const entries = await PettyCash.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

