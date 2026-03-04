const mongoose = require("mongoose");

const clientPaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClientPayment", clientPaymentSchema);
