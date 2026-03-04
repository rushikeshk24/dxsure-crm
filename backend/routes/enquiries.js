const express = require("express");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

// CREATE ENQUIRY
// POST /api/enquiries
router.post("/", async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    if (!name || !contact || !message) {
      return res
        .status(400)
        .json({ message: "name, contact and message are required" });
    }

    const enquiry = await Enquiry.create({
      name,
      contact,
      message,
    });

    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ENQUIRIES
// GET /api/enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

