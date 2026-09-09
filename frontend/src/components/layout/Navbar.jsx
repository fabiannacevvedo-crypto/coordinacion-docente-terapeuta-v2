import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, LogOut, User, Sparkles, BookOpen, AlertCircle, HeartHandshake } from "lucide-react";

export const Navbar = () => {
  const { user, roles, activeRole, setActiveRole, isAuthenticated, logout, isVerified } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getRoleBadgeClass = (rol) => {
    switch (rol) {
      case "DOCENTE": return "badge-docente";
      case "TERAPEUTA": return "badge-terapeuta";
      case "FAMILIAR": return "badge-familiar";
      case "ADMIN": return "badge-admin";
      default: return "";
    }
  };

  return (
    <header style={{ background: "white", borderBottom: "1px solid var(--border-color)", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0.875rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo & Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{ background: "linear-gradient(135deg, #2563eb, #0d9488)", color: "white", padding: "0.5rem", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HeartHandshake size={24} />
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "1.125rem", color: "#0f172a", lineHeight: 1.1 }}>RedNeC</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Docente · Terapeuta · Familia</div>
          </div>
        </Link>

        {/* Links & Auth State */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/guia-verificacion" style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <ShieldCheck size={18} />
            <span>Guia de Verificacion</span>
          </Link>

          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              
              {/* Badge de Verificación de Cuenta */}
              {isVerified ? (
                <span className="badge" style={{ background: "#ecfdf5", color: "#065f46" }}>
                  <ShieldCheck size={14} /> Verificado
                </span>
              ) : (
                <span className="badge" style={{ background: "#fffbeb", color: "#b45309" }}>
                  <AlertCircle size={14} /> En Revision
                </span>
              )}

              {/* Selector de Rol o Badge */}
              <span className={`badge ${getRoleBadgeClass(activeRole)}`}>
                {activeRole}
              </span>

              {/* Enlace al Dashboard segun rol */}
              <Link
                to={`/dashboard/${activeRole?.toLowerCase()}`}
                className="btn btn-secondary"
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                Mi Panel
              </Link>

              {/* Botón Logout */}
              <button
                onClick={handleLogout}
                className="btn"
                title="Cerrar sesion"
                style={{ padding: "0.4rem 0.6rem", color: "#ef4444" }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: "0.5rem 0.875rem" }}>
                Ingresar
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "0.5rem 0.875rem" }}>
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
