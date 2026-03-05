import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setError("");
    const trimmedEmail = email?.trim?.() ?? "";
    const trimmedPassword = password?.trim?.() ?? "";

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and Password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const token = res.data?.token;
      if (!token) {
        setError("Invalid response from server");
        return;
      }

      localStorage.setItem("token", token);
      const role = res.data?.role ?? "employee";
      navigate(role === "admin" ? "/admin" : "/employee");
    } catch (err) {
      const msg = err.response?.data?.message ?? err.message ?? "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "360px",
        margin: "80px auto",
        padding: "24px",
        textAlign: "center",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "20px" }}>Login</h2>

      {error && (
        <div
          style={{
            color: "#dc2626",
            fontSize: "0.875rem",
            marginBottom: "12px",
            padding: "8px",
            background: "#fef2f2",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: loading ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "500",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;