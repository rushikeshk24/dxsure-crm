const express = require("express");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Log = require("../models/log");

const router = express.Router();

// ADMIN DASHBOARD STATS
// GET /api/dashboard/admin-stats
router.get("/admin-stats", async (req, res) => {
  try {
    const [users, tickets, logs] = await Promise.all([
      User.countDocuments(),
      Ticket.countDocuments(),
      Log.countDocuments(),
    ]);
    res.json({ users, tickets, logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
