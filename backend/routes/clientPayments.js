const express = require("express");
const ClientPayment = require("../models/ClientPayment");

const router = express.Router();

// CREATE CLIENT PAYMENT
// POST /api/clientpayments
router.post("/", async (req, res) => {
  try {
    const { amount, clientName, date, status } = req.body;

    if (!amount || !clientName || !date) {
      return res
        .status(400)
        .json({ message: "amount, clientName and date are required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const payment = await ClientPayment.create({
      amount,
      clientName,
      date: parsedDate,
      status: status || "pending",
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CLIENT PAYMENTS
// GET /api/clientpayments
router.get("/", async (req, res) => {
  try {
    const payments = await ClientPayment.find().sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
