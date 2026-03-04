const mongoose = require("mongoose");

const dayPlanSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  employee: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("DayPlan", dayPlanSchema);

