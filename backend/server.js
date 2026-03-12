const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/dxsure")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tickets", require("./routes/ticket"));
app.use("/api/dayplan", require("./routes/dayplan"));
app.use("/api/enquiry", require("./routes/clientEnquiry"));
app.use("/api/followup", require("./routes/followup"));
app.use("/api/leads", require("./routes/lead"));
app.use("/api/clients", require("./routes/client"));
app.use("/api/vendors", require("./routes/vendor"));
app.use("/api/pettycash", require("./routes/pettycash"));
app.use("/api/clientpayments", require("./routes/clientpayment"));
app.use("/api/employeepayments", require("./routes/employeepayment"));

app.get("/",(req,res)=>{
res.send("DXSure CRM Backend Running");
});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});