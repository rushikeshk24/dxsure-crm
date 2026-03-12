import React from "react";
import { Link } from "react-router-dom";

function EmployeeDashboard() {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Employee Dashboard</h1>
      <p style={styles.subheading}>
        Welcome back! Choose what you want to work on today.
      </p>

      <div style={styles.linksContainer}>
        <Link to="/dayplan" style={styles.linkCard}>
          <span style={styles.linkTitle}>Day Plan</span>
          <span style={styles.linkText}>View and update your day plan</span>
        </Link>

        <Link to="/tickets" style={styles.linkCard}>
          <span style={styles.linkTitle}>Tickets</span>
          <span style={styles.linkText}>Check and manage your tickets</span>
        </Link>

        <Link to="/enquiry" style={styles.linkCard}>
          <span style={styles.linkTitle}>Client Enquiry</span>
          <span style={styles.linkText}>Handle client enquiries</span>
        </Link>

        <Link to="/follow-ups" style={styles.linkCard}>
          <span style={styles.linkTitle}>Follow Ups</span>
          <span style={styles.linkText}>Track and complete follow ups</span>
        </Link>
      </div>
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
    marginBottom: "0.5rem",
    fontSize: "2rem",
    color: "#111827",
  },
  subheading: {
    marginBottom: "1.5rem",
    color: "#6b7280",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    maxWidth: "420px",
  },
  linkCard: {
    display: "flex",
    flexDirection: "column",
    padding: "0.9rem 1.1rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    textDecoration: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: "background-color 0.1s ease, box-shadow 0.1s ease",
    color: "inherit",
  },
  linkTitle: {
    fontWeight: 600,
    marginBottom: "0.15rem",
    color: "#111827",
  },
  linkText: {
    fontSize: "0.9rem",
    color: "#6b7280",
  },
};

export default EmployeeDashboard;

