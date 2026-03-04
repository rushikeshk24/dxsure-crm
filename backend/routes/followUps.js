const express = require("express");
const FollowUp = require("../models/FollowUp");

const router = express.Router();

// ADD FOLLOW-UP
// POST /api/followups
router.post("/", async (req, res) => {
  try {
    const { clientName, followUpDate, notes } = req.body;

    if (!clientName || !followUpDate || !notes) {
      return res
        .status(400)
        .json({ message: "clientName, followUpDate and notes are required" });
    }

    const parsedDate = new Date(followUpDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid followUpDate format" });
    }

    const followUp = await FollowUp.create({
      clientName,
      followUpDate: parsedDate,
      notes,
    });

    res.status(201).json(followUp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL FOLLOW-UPS
// GET /api/followups
router.get("/", async (req, res) => {
  try {
    const followUps = await FollowUp.find().sort({ followUpDate: 1 });
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

