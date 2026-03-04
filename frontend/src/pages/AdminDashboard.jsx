import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [stats, setStats] = useState({ users: 0, tickets: 0, logs: 0 });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    fetchTickets();
    fetchAdminStats();
  }, [navigate]);

  async function fetchAdminStats() {
    try {
      const res = await axios.get(`${API_BASE_URL}/dashboard/admin-stats`);
      setStats(res.data ?? { users: 0, tickets: 0, logs: 0 });
    } catch (err) {
      setError("Failed to load stats");
    }
  }

  async function fetchTickets() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE_URL}/tickets`);
      setTickets(res.data);
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTicket(e) {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      setCreating(true);
      setError("");

      await axios.post(`${API_BASE_URL}/tickets`, {
        title,
        description,
        assignedTo,
        // backend uses "open" / "closed"; we treat "open" as "pending" in the UI
        status: "open",
      });

      setTitle("");
      setDescription("");
      setAssignedTo("");

      // Refresh list
      fetchTickets();
      fetchAdminStats();
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to create ticket");
    } finally {
      setCreating(false);
    }
  }

  // newStatusUI is "pending" or "completed"
  async function handleUpdateStatus(id, newStatusUI) {
    try {
      setUpdatingId(id);
      setError("");

      // Map UI status to backend status field
      const statusMap = {
        pending: "open",
        completed: "closed",
      };

      await axios.patch(`${API_BASE_URL}/tickets/${id}/status`, {
        status: statusMap[newStatusUI],
      });

      // Refresh list
      fetchTickets();
      fetchAdminStats();
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  function formatStatusForUI(statusFromBackend) {
    if (statusFromBackend === "open") return "pending";
    if (statusFromBackend === "closed") return "completed";
    return statusFromBackend;
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  }

  const cardStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    minWidth: "140px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            background: "#6b7280",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <div style={{ ...cardStyle, background: "#eff6ff" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb" }}>
            {stats.users}
          </div>
          <div style={{ color: "#64748b", marginTop: "4px" }}>Users</div>
        </div>
        <div style={{ ...cardStyle, background: "#f0fdf4" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#16a34a" }}>
            {stats.tickets}
          </div>
          <div style={{ color: "#64748b", marginTop: "4px" }}>Tickets</div>
        </div>
        <div style={{ ...cardStyle, background: "#fef3c7" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#d97706" }}>
            {stats.logs}
          </div>
          <div style={{ color: "#64748b", marginTop: "4px" }}>Logs</div>
        </div>
      </div>

      <h2>Admin Dashboard - Tickets</h2>

      {error && (
        <div
          style={{
            color: "#dc2626",
            marginBottom: "12px",
            padding: "10px 12px",
            background: "#fef2f2",
            borderRadius: "6px",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </div>
      )}

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <h2>Create Ticket</h2>
        <form onSubmit={handleCreateTicket}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                placeholder="Enter ticket title"
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                rows={3}
                placeholder="Describe the issue"
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Assign to (employee email or name):
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                placeholder="e.g. john@example.com"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={creating}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {creating ? "Creating..." : "Create Ticket"}
          </button>
        </form>
      </section>

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <h2>All Tickets</h2>
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "12px",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Title
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Description
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Assigned To
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Status
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Created At
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "8px",
                    }}
                  >
                    {ticket.title}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "8px",
                    }}
                  >
                    {ticket.description}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "8px",
                    }}
                  >
                    {ticket.assignedTo || "-"}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {formatStatusForUI(ticket.status)}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "8px",
                    }}
                  >
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "8px",
                    }}
                  >
                    <button
                      onClick={() => handleUpdateStatus(ticket._id, "pending")}
                      disabled={updatingId === ticket._id}
                      style={{
                        padding: "4px 8px",
                        marginRight: "6px",
                        borderRadius: "4px",
                        border: "1px solid #d4d4d4",
                        backgroundColor: "#f9fafb",
                        cursor: "pointer",
                      }}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(ticket._id, "completed")}
                      disabled={updatingId === ticket._id}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid #16a34a",
                        backgroundColor: "#22c55e",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;