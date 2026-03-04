import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
    fetchTickets();
  }, [navigate, token]);

  async function fetchTasks() {
    try {
      const res = await axios.get(`${API_BASE_URL}/employeetasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }
      setError(err.response?.data?.error ?? "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTickets() {
    try {
      setTicketsLoading(true);
      const res = await axios.get(`${API_BASE_URL}/tickets`);
      setTickets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.error ?? "Failed to load tickets");
    } finally {
      setTicketsLoading(false);
    }
  }

  const cardStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ margin: 0 }}>Employee Dashboard</h1>
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

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ marginBottom: "12px" }}>My Tasks</h2>
        {tasks.length === 0 ? (
          <div style={{ ...cardStyle, color: "#64748b" }}>No tasks yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {tasks.map((t) => (
              <div key={t._id} style={cardStyle}>
                <div>{t.task}</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>
                  {new Date(t.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ marginBottom: "12px" }}>Tickets</h2>
        {ticketsLoading ? (
          <div style={{ color: "#64748b", padding: "16px" }}>Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div style={{ ...cardStyle, color: "#64748b" }}>No tickets yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {tickets.map((t) => (
              <div key={t._id} style={cardStyle}>
                <div style={{ fontWeight: "600" }}>{t.title}</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  {t.description}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    marginTop: "4px",
                    textTransform: "capitalize",
                  }}
                >
                  Status: {t.status === "open" ? "pending" : t.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default EmployeeDashboard;