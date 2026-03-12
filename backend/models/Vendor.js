const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
name:String,
service:String,
contact:String
});

module.exports = mongoose.model("Vendor",vendorSchema);