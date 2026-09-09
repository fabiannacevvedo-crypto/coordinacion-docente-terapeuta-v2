import React from "react";
import { HeartHandshake, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer style={{ background: "white", borderTop: "1px solid var(--border-color)", padding: "2rem 1rem", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "700", color: "#334155" }}>
          <HeartHandshake size={20} color="#2563eb" />
          <span>Plataforma RedNeC - Coordinacion Escolar y Multidisciplinar</span>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "#64748b", maxWidth: "600px" }}>
          Espacio seguro para la sinergia entre docentes, profesionales de la salud y familias en el seguimiento de trayectorias educativas y neurodesarrollo.
        </p>
        <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
          Practica Profesional 2026 · Protocolo de Verificacion de Identidad y Proteccion de Datos Sensibles
        </div>
      </div>
    </footer>
  );
};
