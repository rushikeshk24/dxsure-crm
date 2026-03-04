const mongoose = require("mongoose");

const employeePaymentSchema = new mongoose.Schema({
  salary: {
    type: Number,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeePayment", employeePaymentSchema);
