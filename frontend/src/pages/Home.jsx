import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Stethoscope, Users, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "3rem 1rem 4rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--primary-light)", color: "var(--primary)", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: "700", marginBottom: "1.5rem" }}>
          <Sparkles size={16} /> Plataforma v2.0 · Sinergia Multidisciplinar
        </div>
        <h1 style={{ fontSize: "2.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.15, marginBottom: "1.25rem", maxWidth: "800px", margin: "0 auto 1.25rem" }}>
          Coordinacion Docente, Terapeuta y Familiar
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#475569", maxWidth: "680px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          Unificamos el seguimiento pedagogico, clinico y familiar de ninos y jovenes. Reportes cruzados, semaforos de alerta y un estricto protocolo de <strong>verificacion de identidades</strong> para proteger datos sensibles de menores.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "1rem" }}>
            Ingresar a la Plataforma <ArrowRight size={18} />
          </Link>
          <Link to="/guia-verificacion" className="btn btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "1rem" }}>
            <ShieldCheck size={18} color="#2563eb" /> ¿Como verificamos los roles?
          </Link>
        </div>
      </section>

      {/* Los 3 Roles Pilares */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "800", marginBottom: "2rem", color: "#1e293b" }}>
          Tres miradas integradas en un solo legajo digital
        </h2>

        <div className="grid-3">
          {/* Docente */}
          <div className="card" style={{ borderTop: "4px solid var(--docente-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "var(--docente-bg)", color: "var(--docente-color)", padding: "0.75rem", borderRadius: "12px" }}>
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>Docentes de Aula</h3>
                <span className="badge badge-docente">Pedagogico</span>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1rem" }}>
              Registran la dinamica en el aula, atencion, adaptaciones curriculares y estrategias que funcionan en el dia a dia escolar.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "#334155", background: "#f8fafc", padding: "0.75rem", borderRadius: "8px" }}>
              <strong>Verificacion:</strong> Validacion por CUE institucional, constancia de toma de posesion o invitacion de la escuela.
            </div>
          </div>

          {/* Terapeuta */}
          <div className="card" style={{ borderTop: "4px solid var(--terapeuta-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "var(--terapeuta-bg)", color: "var(--terapeuta-color)", padding: "0.75rem", borderRadius: "12px" }}>
                <Stethoscope size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>Terapeutas</h3>
                <span className="badge badge-terapeuta">Clinico</span>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1rem" }}>
              Psicologos, Fonoaudiologos, Terapeutas Ocupacionales y Psicopedagogos comparten objetivos y recomendaciones practicas.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "#334155", background: "#f8fafc", padding: "0.75rem", borderRadius: "8px" }}>
              <strong>Verificacion:</strong> Cotejo de Matricula Nacional/Provincial (MN/MP) y codigo de consentimiento familiar.
            </div>
          </div>

          {/* Familiar */}
          <div className="card" style={{ borderTop: "4px solid var(--familiar-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "var(--familiar-bg)", color: "var(--familiar-color)", padding: "0.75rem", borderRadius: "12px" }}>
                <Users size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>Familias y Tutores</h3>
                <span className="badge badge-familiar">Hogar</span>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1rem" }}>
              Aportan la vivencia cotidiana en casa, rutinas de sueno, medicacion y tienen la potestad de autorizar que profesionales acceden.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "#334155", background: "#f8fafc", padding: "0.75rem", borderRadius: "8px" }}>
              <strong>Verificacion:</strong> Token seguro provisto en la inscripcion escolar o validacion de patria potestad/DNI.
            </div>
          </div>
        </div>
      </section>

      {/* Caracteristicas clave */}
      <section className="card" style={{ padding: "2.5rem", background: "linear-gradient(135deg, #1e3a8a, #0f172a)", color: "white" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1.5rem", textAlign: "center" }}>
          ¿Por que es fundamental la verificacion de identidad en esta plataforma?
        </h2>
        <div className="grid-3" style={{ gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#93c5fd" }}>
              <CheckCircle2 size={20} /> Secreto Profesional y Etica
            </div>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
              Los reportes psicologicos y clinicos no pueden ser leidos por personas sin matricula valida ni autorizacion del tutor legal.
            </p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#93c5fd" }}>
              <CheckCircle2 size={20} /> Proteccion de Menores
            </div>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
              Cumplimiento estricto con la Ley de Proteccion Integral de Ninos, Ninas y Adolescentes (Ley 26.061) y Habeas Data.
            </p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#93c5fd" }}>
              <CheckCircle2 size={20} /> Aislamiento de Casos (RBAC)
            </div>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
              Un docente o terapeuta solo ve a los alumnos asignados explicitamente a su curso o caso, impidiendo el acceso global no autorizado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
