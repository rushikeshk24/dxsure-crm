import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

function Leads() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/leads`);
      setLeads(response.data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
      alert("Could not load leads.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLead(e) {
    e.preventDefault();

    if (!name || !contact || !service) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/leads/create`, {
        name,
        contact,
        service,
      });

      setName("");
      setContact("");
      setService("");
      fetchLeads();
    } catch (error) {
      console.error("Error adding lead:", error);
      alert("Could not add lead.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Leads</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Add Lead</h2>
        <form onSubmit={handleAddLead} style={styles.form}>
          <div style={styles.formRow}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Lead name"
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
            <label style={styles.label}>Service</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={styles.input}
              placeholder="Service interested in"
            />
          </div>

          <button type="submit" style={styles.button}>
            Add Lead
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Lead List</h2>

        {loading ? (
          <p>Loading leads...</p>
        ) : leads.length === 0 ? (
          <p>No leads found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Service</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id || lead.id}>
                    <td style={styles.td}>{lead.name}</td>
                    <td style={styles.td}>{lead.contact}</td>
                    <td style={styles.td}>{lead.service}</td>
                    <td style={styles.td}>{lead.status || "New"}</td>
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

export default Leads;

