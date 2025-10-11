
import { useState } from "react";
import { forgotPasswordService } from "../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await forgotPasswordService({ email });
      setSuccess("Se envió un correo con el enlace para restablecer la contraseña");
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Recuperar contraseña</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
          {loading ? "Enviando..." : "Enviar correo"}
        </button>
      </form>
    </div>
  );
}
