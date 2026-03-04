const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vendor", vendorSchema);

