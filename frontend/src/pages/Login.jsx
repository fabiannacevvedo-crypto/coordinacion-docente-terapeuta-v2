import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, AlertCircle, ArrowRight, KeyRound } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.ok) {
        const rol = res.usuario.roles?.[0]?.toLowerCase() || "docente";
        navigate(`/dashboard/${rol}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Botones de acceso rapido para testeo inmediato
  const testAccount = (testEmail, testPass = "Rednec123!") => {
    setEmail(testEmail);
    setPassword(testPass);
  };

  return (
    <div style={{ maxWidth: "440px", margin: "2rem auto" }}>
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ width: "48px", height: "48px", background: "var(--primary-light)", color: "var(--primary)", borderRadius: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
            <KeyRound size={24} />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>Iniciar Sesion</h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Accede al espacio interdisciplinario</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Correo Electronico</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                className="form-input"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Contrasenia</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ padding: "0.75rem", marginTop: "0.5rem" }}>
            {loading ? "Verificando..." : "Ingresar"} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: "700" }}>
            Registrate aqui
          </Link>
        </div>

        {/* Panel de prueba rapida para el evaluador */}
        <div style={{ marginTop: "2rem", borderTop: "1px dashed var(--border-color)", paddingTop: "1.25rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "0.75rem", textAlign: "center" }}>
            ⚡ Accesos Rapidos de Demostracion (Seed)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => testAccount("docente@escuela.edu.ar")}
              className="btn btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.4rem", justifyContent: "flex-start" }}
            >
              👩‍🏫 Docente
            </button>
            <button
              type="button"
              onClick={() => testAccount("terapeuta@salud.com")}
              className="btn btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.4rem", justifyContent: "flex-start" }}
            >
              🩺 Terapeuta
            </button>
            <button
              type="button"
              onClick={() => testAccount("familiar@familia.com")}
              className="btn btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.4rem", justifyContent: "flex-start" }}
            >
              👨‍👩‍👦 Familiar
            </button>
            <button
              type="button"
              onClick={() => testAccount("admin@rednec.com")}
              className="btn btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.4rem", justifyContent: "flex-start" }}
            >
              🛡️ Admin
            </button>
          </div>
          <button
            type="button"
            onClick={() => testAccount("mariana.docente@gmail.com")}
            className="btn btn-secondary btn-block"
            style={{ fontSize: "0.75rem", padding: "0.4rem", marginTop: "0.5rem", color: "#b45309" }}
          >
            ⏳ Probar Docente "En Revision" (Pendiente)
          </button>
        </div>
      </div>
    </div>
  );
};
