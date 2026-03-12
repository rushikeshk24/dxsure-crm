const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
name:String,
contact:String,
message:String,
date:{
type:Date,
default:Date.now
}
});

module.exports = mongoose.model("ClientEnquiry",enquirySchema);