const mongoose = require("mongoose");

const employeePaySchema = new mongoose.Schema({
employeeName:String,
amount:Number,
date:{
type:Date,
default:Date.now
}
});

module.exports = mongoose.model("EmployeePayment",employeePaySchema);