const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "qualified", "lost", "converted"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", leadSchema);

