import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  School,
  Activity,
  HeartHandshake,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";

export const Informacion = () => {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Hero Institucional */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d9488 100%)",
          color: "white",
          borderRadius: "1.25rem",
          padding: "3.5rem 2rem",
          textAlign: "center",
          marginBottom: "3rem",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            padding: "0.35rem 1rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          <Sparkles size={16} /> RedNeC · Nexo Educativo Colaborativo
        </div>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          Información Institucional
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            maxWidth: "720px",
            margin: "0 auto",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          Conocé más sobre nuestra red de articulación pedagógica, clínica y familiar para garantizar el derecho a una educación verdaderamente inclusiva.
        </p>
      </section>

      {/* Qué es RedNeC */}
      <section className="card" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "0.75rem", borderRadius: "12px" }}>
            <BookOpen size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              ¿Qué es RED NEC?
            </h2>
            <span style={{ fontSize: "0.875rem", color: "#64748b" }}>Nexo Educativo Colaborativo</span>
          </div>
        </div>

        <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          <strong>RED NEC</strong> es un ecosistema digital y metodológico concebido para eliminar las barreras de comunicación históricas entre la <strong>escuela común</strong>, los <strong>equipos de apoyo y terapeutas externos</strong> (psicólogos, fonoaudiólogos, psicopedagogos, TO) y las <strong>familias o tutores legales</strong>.
        </p>
        <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.7 }}>
          A través de bitácoras sincronizadas, semáforos de evolución en tiempo real y protocolos de validación de identidad profesional, logramos que cada estudiante con requerimientos pedagógicos específicos o neurodivergencia cuente con un plan integral coherente en el aula, en el consultorio y en su hogar.
        </p>
      </section>

      {/* Misión, Visión y Valores */}
      <section style={{ marginBottom: "3rem" }}>
        <div className="grid-2" style={{ gap: "1.5rem" }}>
          {/* Misión */}
          <div className="card" style={{ padding: "2rem", borderLeft: "5px solid #2563eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <Target size={24} color="#2563eb" />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", margin: 0 }}>Nuestra Misión</h3>
            </div>
            <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.6 }}>
              Fortalecer la articulación multidisciplinaria mediante herramientas tecnológicas seguras, facilitando el intercambio oportuno de estrategias pedagógicas y terapéuticas para que cada niño, niña y adolescente alcance su máximo potencial socioeducativo.
            </p>
          </div>

          {/* Visión */}
          <div className="card" style={{ padding: "2rem", borderLeft: "5px solid #0d9488" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <Eye size={24} color="#0d9488" />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", margin: 0 }}>Nuestra Visión</h3>
            </div>
            <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.6 }}>
              Ser la plataforma de referencia regional en gestión de inclusión escolar y salud infanto-juvenil, reconocida por su rigor ético en la custodia de datos sensibles y su capacidad de generar acuerdos de trabajo colaborativos y medibles.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos Específicos */}
      <section className="card" style={{ padding: "2.5rem", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "1.5rem", textAlign: "center" }}>
          Objetivos Estratégicos de la Plataforma
        </h2>

        <div className="grid-2" style={{ gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
            <div style={{ background: "#ecfdf5", color: "#059669", padding: "0.5rem", borderRadius: "8px", flexShrink: 0 }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem" }}>
                Comunicación Ágil y Centralizada
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5 }}>
                Reemplaza los cuadernos de comunicación dispersos y las reuniones demoradas por una bitácora digital organizada por fecha y tipo de intervención.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
            <div style={{ background: "#eff6ff", color: "#2563eb", padding: "0.5rem", borderRadius: "8px", flexShrink: 0 }}>
              <FileCheck2 size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem" }}>
                Seguimiento Interdisciplinario Medible
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5 }}>
                Semáforos de estado (Progreso Bueno, Regular, Atención) que alertan tempranamente sobre retrocesos conductuales o cognitivos para reajustar intervenciones.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
            <div style={{ background: "#fef3c7", color: "#d97706", padding: "0.5rem", borderRadius: "8px", flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem" }}>
                Verificación Estricta de Identidad
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5 }}>
                Validación de CUE institucional en escuelas, matrículas sanitarias (MN/MP) en terapeutas y autorización del consentimiento parental para la vista de datos.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
            <div style={{ background: "#f5f3ff", color: "#7c3aed", padding: "0.5rem", borderRadius: "8px", flexShrink: 0 }}>
              <HeartHandshake size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem" }}>
                Empoderamiento de las Familias
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5 }}>
                Los tutores participan activamente, registran observaciones del ámbito hogareño y tienen control transparente sobre quiénes conforman la red del alumno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto en Cifras (Stats) */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "1.5rem", textAlign: "center" }}>
          Impacto de la Red en Cifras
        </h2>
        <div className="grid-3" style={{ gap: "1.25rem" }}>
          <div className="card" style={{ padding: "1.75rem", textAlign: "center", background: "#f8fafc" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary)", lineHeight: 1 }}>+120</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: "700", color: "#1e293b", marginTop: "0.5rem" }}>Escuelas Conectadas</div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem" }}>De gestión pública y privada</div>
          </div>

          <div className="card" style={{ padding: "1.75rem", textAlign: "center", background: "#f8fafc" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0d9488", lineHeight: 1 }}>+450</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: "700", color: "#1e293b", marginTop: "0.5rem" }}>Profesionales Activos</div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem" }}>Docentes, terapeutas y directivos</div>
          </div>

          <div className="card" style={{ padding: "1.75rem", textAlign: "center", background: "#f8fafc" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#f59e0b", lineHeight: 1 }}>98%</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: "700", color: "#1e293b", marginTop: "0.5rem" }}>Satisfacción Familiar</div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem" }}>Mayor tranquilidad y acompañamiento</div>
          </div>
        </div>
      </section>

      {/* Programas Institucionales */}
      <section className="card" style={{ padding: "2.5rem", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "1.5rem" }}>
          Nuestros Programas y Líneas de Acción
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#f8fafc", padding: "1.25rem", borderRadius: "10px" }}>
            <School size={28} color="var(--primary)" style={{ flexShrink: 0, marginTop: "4px" }} />
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>
                1. Sinergia en el Aula e Inclusión Pedagógica
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#475569", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Capacitación continua a docentes en adaptaciones curriculares, uso de pictogramas y estrategias de autorregulación sensory-friendly dentro de la jornada escolar.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#f8fafc", padding: "1.25rem", borderRadius: "10px" }}>
            <Activity size={28} color="#0d9488" style={{ flexShrink: 0, marginTop: "4px" }} />
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>
                2. Red Asistencial y Seguimiento Clínico
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#475569", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Vínculo fluido con centros de rehabilitación y consultorios particulares para armonizar metas terapéuticas y volcarlas al entorno cotidiano del estudiante.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#f8fafc", padding: "1.25rem", borderRadius: "10px" }}>
            <Users size={28} color="#f59e0b" style={{ flexShrink: 0, marginTop: "4px" }} />
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>
                3. Acompañamiento Familiar y Orientación
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#475569", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Espacios de escucha activa, guías para el trámite de CUD (Certificado Único de Discapacidad) y talleres de pautas de crianza positiva en casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
          color: "white",
          borderRadius: "1.25rem",
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: "800", marginBottom: "0.75rem" }}>
          ¿Sos parte de una institución escolar o equipo terapéutico?
        </h2>
        <p style={{ fontSize: "1rem", maxWidth: "620px", margin: "0 auto 1.75rem", opacity: 0.9 }}>
          Sumate a la red para comenzar a registrar reportes unificados, generar alertas tempranas y brindar un seguimiento de excelencia.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
            Registrarse en RedNeC <ArrowRight size={18} />
          </Link>
          <Link to="/contacto" className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
            Contactar al Equipo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Informacion;
