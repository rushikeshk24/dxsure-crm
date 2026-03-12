import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

function ClientPayments() {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/clientpayments`);
      setPayments(response.data || []);
    } catch (error) {
      console.error("Error loading client payments:", error);
      alert("Could not load client payments.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPayment(e) {
    e.preventDefault();

    if (!clientName || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount)) {
      alert("Amount must be a number.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/clientpayments/create`, {
        clientName,
        amount: numericAmount,
      });

      setClientName("");
      setAmount("");
      fetchPayments();
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Could not add payment.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Client Payments</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Add Payment</h2>
        <form onSubmit={handleAddPayment} style={styles.form}>
          <div style={styles.formRow}>
            <label style={styles.label}>Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={styles.input}
              placeholder="Client name"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              placeholder="Amount"
            />
          </div>

          <button type="submit" style={styles.button}>
            Add Payment
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Payment List</h2>

        {loading ? (
          <p>Loading payments...</p>
        ) : payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Client Name</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id || payment.id}>
                    <td style={styles.td}>{payment.clientName}</td>
                    <td style={styles.td}>
                      {typeof payment.amount === "number"
                        ? payment.amount.toFixed(2)
                        : payment.amount}
                    </td>
                    <td style={styles.td}>
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  page: {
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#111827",
  },
  section: {
    marginBottom: "2rem",
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#111827",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    maxWidth: "480px",
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#374151",
  },
  input: {
    padding: "0.5rem 0.6rem",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    textAlign: "left",
    padding: "0.5rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f3f4f6",
  },
  td: {
    padding: "0.5rem",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top",
  },
};

export default ClientPayments;

