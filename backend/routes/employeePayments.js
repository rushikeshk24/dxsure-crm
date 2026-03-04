const express = require("express");
const EmployeePayment = require("../models/EmployeePayment");

const router = express.Router();

// CREATE EMPLOYEE PAYMENT
// POST /api/employeepayments
router.post("/", async (req, res) => {
  try {
    const { salary, employeeName, date } = req.body;

    if (!salary || !employeeName || !date) {
      return res
        .status(400)
        .json({ message: "salary, employeeName and date are required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const payment = await EmployeePayment.create({
      salary,
      employeeName,
      date: parsedDate,
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL EMPLOYEE PAYMENTS
// GET /api/employeepayments
router.get("/", async (req, res) => {
  try {
    const payments = await EmployeePayment.find().sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
