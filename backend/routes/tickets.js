const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

// CREATE TICKET
// POST /api/tickets
router.post("/", async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      assignedTo: assignedTo || "",
      status: status || "open",
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TICKETS
// GET /api/tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const VALID_STATUSES = ["open", "in-progress", "closed"];

// UPDATE TICKET STATUS
// PATCH /api/tickets/:id/status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

