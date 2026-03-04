const express = require("express");
const Client = require("../models/Client");

const router = express.Router();

// ADD CLIENT
// POST /api/clients
router.post("/", async (req, res) => {
  try {
    const { name, company, contact, email } = req.body;

    if (!name || !company || !contact || !email) {
      return res.status(400).json({
        message: "name, company, contact and email are required",
      });
    }

    const client = await Client.create({
      name,
      company,
      contact,
      email,
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CLIENTS
// GET /api/clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

