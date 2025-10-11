// src/pages/ResetPasswordPage.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordService } from "../services/authService";

export default function ResetPasswordPage() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token"); // extrae ?token=...
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordService({ token, newPassword: password });
      setSuccess("Contraseña restablecida correctamente");
      setTimeout(() => navigate("/login"), 2000); // redirige al login
    } catch (err) {
      setError(err.response?.data?.message || "Error al restablecer contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Restablecer contraseña</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
          {loading ? "Procesando..." : "Restablecer contraseña"}
        </button>
      </form>
    </div>
  );
}
