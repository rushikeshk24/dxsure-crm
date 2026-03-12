import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===== Auth =====

export async function login(email, password) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function register(name, email, password, role) {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return response.data;
}

// ===== Tickets =====

export async function getTickets() {
  const response = await api.get("/tickets");
  return response.data;
}

export async function createTicket(ticketData) {
  const response = await api.post("/tickets", ticketData);
  return response.data;
}

// ===== Day Plans =====

export async function getDayPlans() {
  const response = await api.get("/dayplan");
  return response.data;
}

export async function createDayPlan(dayPlanData) {
  const response = await api.post("/dayplan", dayPlanData);
  return response.data;
}

// ===== Clients =====

export async function getClients() {
  const response = await api.get("/clients");
  return response.data;
}

export async function createClient(clientData) {
  const response = await api.post("/clients", clientData);
  return response.data;
}

// ===== Leads =====

export async function getLeads() {
  const response = await api.get("/leads");
  return response.data;
}

export async function createLead(leadData) {
  const response = await api.post("/leads", leadData);
  return response.data;
}

// ===== Vendors =====

export async function getVendors() {
  const response = await api.get("/vendors");
  return response.data;
}

export async function createVendor(vendorData) {
  const response = await api.post("/vendors", vendorData);
  return response.data;
}

// ===== Petty Cash =====

export async function getPettyCash() {
  const response = await api.get("/pettycash");
  return response.data;
}

export async function createPettyCash(pettyCashData) {
  const response = await api.post("/pettycash", pettyCashData);
  return response.data;
}

// ===== Client Payments =====

export async function getClientPayments() {
  const response = await api.get("/clientpayments");
  return response.data;
}

export async function createClientPayment(clientPaymentData) {
  const response = await api.post("/clientpayments", clientPaymentData);
  return response.data;
}

// ===== Employee Payments =====

export async function getEmployeePayments() {
  const response = await api.get("/employeepayments");
  return response.data;
}

export async function createEmployeePayment(employeePaymentData) {
  const response = await api.post("/employeepayments", employeePaymentData);
  return response.data;
}

