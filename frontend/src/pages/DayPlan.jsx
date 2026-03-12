import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

function DayPlan() {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [task, setTask] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDayPlans();
  }, []);

  async function fetchDayPlans() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/dayplan`);
      setPlans(response.data || []);
    } catch (error) {
      console.error("Error loading day plans:", error);
      alert("Could not load day plans.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();

    if (!employeeEmail || !task) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/dayplan/create`, {
        employeeEmail,
        task,
      });

      setEmployeeEmail("");
      setTask("");
      fetchDayPlans();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Could not add task.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Day Plan</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Add Task</h2>
        <form onSubmit={handleAddTask} style={styles.form}>
          <div style={styles.formRow}>
            <label style={styles.label}>Employee Email</label>
            <input
              type="email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              style={styles.input}
              placeholder="employee@example.com"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Task</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ ...styles.input, height: "70px", resize: "vertical" }}
              placeholder="Describe the task"
            />
          </div>

          <button type="submit" style={styles.button}>
            Add Task
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tasks</h2>

        {loading ? (
          <p>Loading tasks...</p>
        ) : plans.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul style={styles.list}>
            {plans.map((plan) => (
              <li key={plan._id || plan.id} style={styles.listItem}>
                <div style={styles.listEmail}>
                  {plan.employeeEmail || "Unknown"}
                </div>
                <div style={styles.listTask}>{plan.task}</div>
              </li>
            ))}
          </ul>
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
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  listItem: {
    padding: "0.75rem 0.9rem",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  listEmail: {
    fontWeight: 600,
    marginBottom: "0.2rem",
    color: "#111827",
    fontSize: "0.9rem",
  },
  listTask: {
    fontSize: "0.9rem",
    color: "#4b5563",
  },
};

export default DayPlan;

