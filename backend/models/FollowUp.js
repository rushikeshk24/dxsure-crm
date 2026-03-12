const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
clientName:String,
contact:String,
followUpDate:String,
notes:String
});

module.exports = mongoose.model("FollowUp",followSchema);