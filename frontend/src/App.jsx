import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Tickets from "./pages/Tickets";
import DayPlan from "./pages/DayPlan";
import ClientEnquiry from "./pages/ClientEnquiry";
import Leads from "./pages/Leads";
import Clients from "./pages/Clients";
import Vendors from "./pages/Vendors";
import PettyCash from "./pages/PettyCash";
import ClientPayments from "./pages/ClientPayments";
import EmployeePayments from "./pages/EmployeePayments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core auth / dashboards */}
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/* Extra CRM modules */}
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/dayplan" element={<DayPlan />} />
        <Route path="/enquiry" element={<ClientEnquiry />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/pettycash" element={<PettyCash />} />
        <Route path="/clientpayments" element={<ClientPayments />} />
        <Route path="/employeepayments" element={<EmployeePayments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;