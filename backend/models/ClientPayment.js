const mongoose = require("mongoose");

const clientPaySchema = new mongoose.Schema({
clientName:String,
amount:Number,
status:{
type:String,
default:"pending"
}
});

module.exports = mongoose.model("ClientPayment",clientPaySchema);