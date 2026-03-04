const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  followUpDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FollowUp", followUpSchema);

