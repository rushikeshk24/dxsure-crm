const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
name:String,
contact:String,
service:String,
status:{
type:String,
default:"new"
}
});

module.exports = mongoose.model("Lead",leadSchema);