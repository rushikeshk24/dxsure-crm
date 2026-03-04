const express = require("express");
const Vendor = require("../models/Vendor");

const router = express.Router();

// CREATE VENDOR
// POST /api/vendors
router.post("/", async (req, res) => {
  try {
    const { name, service, contact } = req.body;

    if (!name || !service || !contact) {
      return res
        .status(400)
        .json({ message: "name, service and contact are required" });
    }

    const vendor = await Vendor.create({
      name,
      service,
      contact,
    });

    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL VENDORS
// GET /api/vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

