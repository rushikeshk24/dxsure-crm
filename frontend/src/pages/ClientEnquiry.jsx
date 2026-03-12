import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

function ClientEnquiry() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/enquiry`);
      setEnquiries(response.data || []);
    } catch (error) {
      console.error("Error loading enquiries:", error);
      alert("Could not load client enquiries.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !contact || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/enquiry/create`, {
        name,
        contact,
        message,
      });

      setName("");
      setContact("");
      setMessage("");
      fetchEnquiries();
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Could not submit client enquiry.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Client Enquiry</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>New Enquiry</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Client name"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={styles.input}
              placeholder="Phone or email"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...styles.input, height: "80px", resize: "vertical" }}
              placeholder="Client enquiry message"
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit Enquiry
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Enquiries</h2>

        {loading ? (
          <p>Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p>No enquiries found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Message</th>
                  <th style={styles.th}>Created At</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id || enquiry.id}>
                    <td style={styles.td}>{enquiry.name}</td>
                    <td style={styles.td}>{enquiry.contact}</td>
                    <td style={styles.td}>{enquiry.message}</td>
                    <td style={styles.td}>
                      {enquiry.createdAt
                        ? new Date(enquiry.createdAt).toLocaleString()
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

export default ClientEnquiry;

