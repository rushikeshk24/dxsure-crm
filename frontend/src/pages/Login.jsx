import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, role } = res.data;

      // save token
      localStorage.setItem("token", token);

      // redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }

    } catch (error) {
      alert("Login failed. Check email/password.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>CRM Login</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="email@example.com"
              required
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "360px",
  },
  heading: {
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
  },
  button: {
    marginTop: "0.75rem",
    padding: "0.6rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Login;