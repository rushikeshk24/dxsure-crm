const mongoose = require("mongoose");

const dayPlanSchema = new mongoose.Schema({
employeeEmail:String,
task:String,
date:{
type:Date,
default:Date.now
}
});

module.exports = mongoose.model("DayPlan",dayPlanSchema);