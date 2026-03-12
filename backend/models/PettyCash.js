const mongoose = require("mongoose");

const pettySchema = new mongoose.Schema({
amount:Number,
description:String,
date:{
type:Date,
default:Date.now
}
});

module.exports = mongoose.model("PettyCash",pettySchema);