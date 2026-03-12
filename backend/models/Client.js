const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// CREATE CLIENT
router.post("/create", async (req, res) => {
  const { name, company, contact, email, service } = req.body;

  const client = new Client({
    name,
    company,
    contact,
    email,
    service,
  });

  await client.save();

  res.json({ message: "Client created" });
});

// GET CLIENTS
router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

module.exports = router;