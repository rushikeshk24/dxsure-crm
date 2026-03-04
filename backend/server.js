const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/dxsure")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/dayplans", require("./routes/dayPlans"));
app.use("/api/enquiries", require("./routes/enquiries"));
app.use("/api/followups", require("./routes/followUps"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/vendors", require("./routes/vendors"));
app.use("/api/pettycash", require("./routes/pettyCash"));
app.use("/api/clientpayments", require("./routes/clientPayments"));
app.use("/api/employeepayments", require("./routes/employeePayments"));
app.use("/api/employeetasks", require("./routes/employeeTasks"));

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
