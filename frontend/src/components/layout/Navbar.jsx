import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ShieldCheck,
  LogOut,
  Sparkles,
  AlertCircle,
  HeartHandshake,
  Menu,
  X,
  User,
  LayoutDashboard,
} from "lucide-react";

export const Navbar = () => {
  const { user, roles, activeRole, isAuthenticated, logout, isVerified } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: "Inicio", path: "/" },
    { label: "Información", path: "/informacion" },
    { label: "Seguimiento", path: "/seguimiento" },
    { label: "Contacto", path: "/contacto" },
    { label: "Verificación", path: "/guia-verificacion" },
  ];

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo & Brand RedNeC */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #2563eb, #0d9488)",
              color: "white",
              padding: "0.5rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)",
            }}
          >
            <HeartHandshake size={24} />
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "1.15rem", color: "#0f172a", lineHeight: 1.1 }}>
              RedNeC
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>
              Docente · Terapeuta · Familia
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.25rem" }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: isActive ? "700" : "600",
                  color: isActive ? "var(--primary)" : "#475569",
                  textDecoration: "none",
                  padding: "0.25rem 0.5rem",
                  borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Auth State / Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* Badge de Verificacion */}
              {isVerified ? (
                <span
                  className="badge"
                  style={{ background: "#ecfdf5", color: "#065f46", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                  title="Identidad convalidada"
                >
                  <ShieldCheck size={14} /> Verificado
                </span>
              ) : (
                <span
                  className="badge"
                  style={{ background: "#fffbeb", color: "#b45309", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                  title="Cuenta en revisión de documentación"
                >
                  <AlertCircle size={14} /> En Revisión
                </span>
              )}

              {/* Badge Rol */}
              <span className={`badge ${getRoleBadgeClass(activeRole)}`}>
                {activeRole}
              </span>

              {/* Botón Mi Panel */}
              <Link
                to={`/dashboard/${activeRole?.toLowerCase()}`}
                className="btn btn-secondary"
                style={{ padding: "0.45rem 0.8rem", fontSize: "0.8125rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <LayoutDashboard size={15} /> Mi Panel
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="btn"
                title="Cerrar sesión"
                style={{ padding: "0.45rem 0.6rem", color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca" }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: "0.45rem 0.875rem", fontSize: "0.875rem" }}>
                Ingresar
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "0.45rem 0.875rem", fontSize: "0.875rem" }}>
                Registrarse
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "none",
              border: "none",
              padding: "0.35rem",
              cursor: "pointer",
              color: "#334155",
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--border-color)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
          className="mobile-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: location.pathname === link.path ? "var(--primary)" : "#334155",
                textDecoration: "none",
                padding: "0.4rem 0",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
