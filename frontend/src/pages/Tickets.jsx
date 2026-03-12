import React, { useEffect, useState } from "react";
import axios from "axios";

// Base URL for the backend API
const API_BASE = "http://localhost:5000/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);

  // Load tickets when the page first renders
  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/tickets`);
      setTickets(response.data || []);
    } catch (error) {
      console.error("Error loading tickets:", error);
      alert("Could not load tickets.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTicket(e) {
    e.preventDefault();

    if (!title || !description || !assignedTo) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const newTicket = {
        title,
        description,
        assignedTo,
      };

      await axios.post(`${API_BASE}/tickets/create`, newTicket);

      // Clear form
      setTitle("");
      setDescription("");
      setAssignedTo("");

      // Refresh list
      fetchTickets();
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Could not create ticket.");
    }
  }

  async function handleMarkCompleted(id) {
    try {
      await axios.put(`${API_BASE}/tickets/update/${id}`, {
        status: "Completed",
      });
      fetchTickets();
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Could not update ticket.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Tickets</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Create Ticket</h2>
        <form onSubmit={handleCreateTicket} style={styles.form}>
          <div style={styles.formRow}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Enter ticket title"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: "80px", resize: "vertical" }}
              placeholder="Enter ticket description"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Assigned To</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              style={styles.input}
              placeholder="Employee name"
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Ticket
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>All Tickets</h2>

        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Assigned To</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id || ticket.id}>
                    <td style={styles.td}>{ticket.title}</td>
                    <td style={styles.td}>{ticket.description}</td>
                    <td style={styles.td}>{ticket.assignedTo}</td>
                    <td style={styles.td}>{ticket.status || "Open"}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.smallButton}
                        onClick={() =>
                          handleMarkCompleted(ticket._id || ticket.id)
                        }
                        disabled={ticket.status === "Completed"}
                      >
                        {ticket.status === "Completed"
                          ? "Completed"
                          : "Mark Completed"}
                      </button>
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
  smallButton: {
    padding: "0.3rem 0.6rem",
    fontSize: "0.8rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#10b981",
    color: "#ffffff",
  },
};

export default Tickets;

