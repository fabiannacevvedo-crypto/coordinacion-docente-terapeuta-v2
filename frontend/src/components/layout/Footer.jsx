import React from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#cbd5e1",
        padding: "3.5rem 1rem 2rem",
        marginTop: "4rem",
        borderTop: "1px solid #1e293b",
        fontSize: "0.875rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-3" style={{ gap: "2.5rem", marginBottom: "2.5rem" }}>
          {/* Columna 1: Brand & Descripcion */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", marginBottom: "0.875rem" }}>
              <div style={{ background: "#2563eb", color: "white", padding: "0.4rem", borderRadius: "8px" }}>
                <HeartHandshake size={20} />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: "800" }}>RedNeC</span>
            </div>
            <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: "1rem" }}>
              Plataforma de coordinación multidisciplinar para el seguimiento pedagógico, clínico y familiar de estudiantes con requerimientos de apoyo a la inclusión.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>
              Práctica Profesionalizante I · 2do Cuatrimestre 2026
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 style={{ color: "white", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>
              Navegación
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>Inicio</Link>
              </li>
              <li>
                <Link to="/informacion" style={{ color: "#cbd5e1", textDecoration: "none" }}>Información Institucional</Link>
              </li>
              <li>
                <Link to="/seguimiento" style={{ color: "#cbd5e1", textDecoration: "none" }}>Seguimiento de Alumnos</Link>
              </li>
              <li>
                <Link to="/contacto" style={{ color: "#cbd5e1", textDecoration: "none" }}>Contacto y Soporte</Link>
              </li>
              <li>
                <Link to="/guia-verificacion" style={{ color: "#cbd5e1", textDecoration: "none" }}>Guía de Verificación de Identidad</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Marco Legal y Seguridad */}
          <div>
            <h4 style={{ color: "white", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>
              Protección y Confidencialidad
            </h4>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "0.8125rem", color: "#94a3b8", lineHeight: 1.5 }}>
                Conformidad con la <strong>Ley 26.061</strong> de Protección Integral de los Derechos de Niñas, Niños y Adolescentes y Ley 25.326 de Protección de Datos Personales (Habeas Data).
              </span>
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>
              Los registros clínicos y notas pedagógicas son de carácter reservado y sólo son accesibles para el equipo directamente vinculado al caso.
            </div>
          </div>
        </div>

        {/* Barra inferior de Copyright */}
        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8125rem",
            color: "#64748b",
          }}
        >
          <div>© {new Date().getFullYear()} RedNeC (Nexo Educativo Colaborativo) v2.0. Todos los derechos reservados.</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/informacion" style={{ color: "#64748b", textDecoration: "none" }}>Misión y Visión</Link>
            <Link to="/contacto" style={{ color: "#64748b", textDecoration: "none" }}>Mesa de Ayuda</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
