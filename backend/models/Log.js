const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);