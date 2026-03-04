const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

// CREATE LEAD
// POST /api/leads
router.post("/", async (req, res) => {
  try {
    const { name, contact, status } = req.body;

    if (!name || !contact) {
      return res
        .status(400)
        .json({ message: "name and contact are required" });
    }

    const lead = await Lead.create({
      name,
      contact,
      status: status || "new",
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE LEAD STATUS
// PATCH /api/leads/:id/status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OPTIONAL: GET ALL LEADS (handy for UI)
// GET /api/leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

