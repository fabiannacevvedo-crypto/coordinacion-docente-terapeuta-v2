import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Stethoscope,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Laptop,
  BarChart3,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
} from "lucide-react";

export const Home = () => {
  // Estado para el acordeon interactivo de FAQ
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = [
    {
      pregunta: "¿Cómo me registro en RED NEC y qué requisitos necesito?",
      respuesta:
        "Podés registrarte haciendo clic en 'Registrarse' en la barra superior. Seleccionás tu rol (Docente, Terapeuta o Familiar) y completás el formulario con los datos requeridos (CUE institucional si sos docente, Matrícula Nacional o Provincial si sos terapeuta, o DNI y datos de tutela si sos familiar).",
    },
    {
      pregunta: "¿Cómo se protegen los datos confidenciales de los estudiantes?",
      respuesta:
        "Cumplimos estrictamente con la Ley 26.061 de Protección Integral de los Derechos de Niñas, Niños y Adolescentes y la Ley de Habeas Data. Cada cuenta pasa por un proceso de auditoría y validación de credenciales antes de habilitar el acceso a los legajos. Además, ningún usuario puede ver casos a los que no haya sido expresamente vinculado.",
    },
    {
      pregunta: "¿Cómo funciona la vinculación entre terapeuta, docente y alumno?",
      respuesta:
        "La familia o la institución educativa genera un 'Código de Consentimiento y Vinculación' seguro desde su panel. El terapeuta ingresa dicho código en su cuenta validada y el vínculo queda activo automáticamente, habilitando la bitácora cruzada.",
    },
    {
      pregunta: "¿Qué significan los semáforos de evolución en los reportes?",
      respuesta:
        "El semáforo es una herramienta de alerta temprana visual: Verde indica avances positivos y respuesta favorable a las adaptaciones; Amarillo señala dificultades transitorias que requieren observación continua; Rojo convoca a una revisión urgente de las estrategias entre escuela, clínica y familia.",
    },
  ];

  return (
    <div>
      {/* HERO PRINCIPAL - SINERGIA EN EL AULA */}
      <section
        style={{
          position: "relative",
          borderRadius: "1.5rem",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.88))",
          color: "white",
          padding: "4.5rem 2rem",
          textAlign: "center",
          marginBottom: "3.5rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Imagen de fondo sutil inspirada en la referencia */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/assets/img/sinergia-en-aula.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(37, 99, 235, 0.25)",
              border: "1px solid rgba(147, 197, 253, 0.3)",
              color: "#93c5fd",
              padding: "0.4rem 1.1rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              backdropFilter: "blur(4px)",
            }}
          >
            <Sparkles size={16} /> RedNeC v2.0 · Sinergia en el Aula
          </div>

          <h1
            style={{
              fontSize: "2.85rem",
              fontWeight: "900",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            Educación Inclusiva con Colaboración Interdisciplinaria
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#cbd5e1",
              margin: "0 auto 2.25rem",
              lineHeight: 1.6,
              maxWidth: "680px",
            }}
          >
            Unificamos el seguimiento pedagógico, clínico y familiar de estudiantes con requerimientos de apoyo educativo. Reportes cruzados, bitácora en tiempo real y protocolo estricto de <strong>verificación de identidad</strong>.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "1rem" }}>
              Ingresar a la Plataforma <ArrowRight size={18} />
            </Link>
            <Link
              to="/informacion"
              className="btn btn-secondary"
              style={{
                padding: "0.875rem 1.75rem",
                fontSize: "1rem",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              Conocer Más sobre RedNeC
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFICIOS DE RED NEC (Presentes en el repo de referencia) */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Propuesta de Valor
          </span>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a", marginTop: "0.25rem" }}>
            Beneficios de RED NEC
          </h2>
          <p style={{ fontSize: "1rem", color: "#64748b", maxWidth: "560px", margin: "0.5rem auto 0" }}>
            Optimizamos los tiempos de comunicación y eliminamos la fragmentación entre escuela y salud.
          </p>
        </div>

        <div className="grid-3" style={{ gap: "1.5rem" }}>
          {/* Beneficio 1 */}
          <div className="card" style={{ padding: "2rem", textAlign: "center", transition: "transform 0.2s" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#eff6ff",
                color: "#2563eb",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Users size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
              Trabajo en Equipo
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#64748b", lineHeight: 1.6 }}>
              Docentes, terapeutas y familias colaboran en un mismo espacio digital con acuerdos claros y objetivos sincronizados.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="card" style={{ padding: "2rem", textAlign: "center", transition: "transform 0.2s" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#f0fdf4",
                color: "#16a34a",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Laptop size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
              Plataforma Digital Segura
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#64748b", lineHeight: 1.6 }}>
              Acceso rápido, confidencial y auditado a los legajos, reportes semanales y adaptaciones pedagógicas desde cualquier dispositivo.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="card" style={{ padding: "2rem", textAlign: "center", transition: "transform 0.2s" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#fef3c7",
                color: "#d97706",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <BarChart3 size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
              Resultados Medibles
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#64748b", lineHeight: 1.6 }}>
              Semáforos de evolución que permiten evaluar cuantitativa y cualitativamente el impacto real de las intervenciones.
            </p>
          </div>
        </div>
      </section>

      {/* LOS TRES PILARES (CON IMÁGENES DEL REPOSITORIO DE REFERENCIA) */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#0f172a" }}>
            Tres Miradas Integradas en un Solo Legajo
          </h2>
          <p style={{ fontSize: "1rem", color: "#64748b" }}>
            Cada rol aporta su perspectiva fundamental para el desarrollo integral del estudiante.
          </p>
        </div>

        <div className="grid-3" style={{ gap: "1.5rem" }}>
          {/* Docente */}
          <div className="card" style={{ borderTop: "4px solid var(--docente-color)", overflow: "hidden" }}>
            <div style={{ height: "160px", overflow: "hidden", background: "#f8fafc" }}>
              <img
                src="/assets/img/docentes.png"
                alt="Docentes en el aula"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <GraduationCap size={22} color="var(--docente-color)" />
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", margin: 0 }}>Docentes de Aula</h3>
                <span className="badge badge-docente" style={{ marginLeft: "auto" }}>Pedagógico</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
                Registran la dinámica diaria, adecuaciones curriculares y estrategias de participación en el grupo de pares.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "#334155", background: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "8px" }}>
                <strong>Validación:</strong> CUE oficial de escuela y constancia de designación.
              </div>
            </div>
          </div>

          {/* Terapeuta */}
          <div className="card" style={{ borderTop: "4px solid var(--terapeuta-color)", overflow: "hidden" }}>
            <div style={{ height: "160px", overflow: "hidden", background: "#f8fafc" }}>
              <img
                src="/assets/img/terapeutas.png"
                alt="Terapeutas y profesionales"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <Stethoscope size={22} color="var(--terapeuta-color)" />
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", margin: 0 }}>Terapeutas</h3>
                <span className="badge badge-terapeuta" style={{ marginLeft: "auto" }}>Clínico</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
                Aportan orientaciones de autorregulación, pautas fonoaudiológicas y terapéuticas adaptables al aula.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "#334155", background: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "8px" }}>
                <strong>Validación:</strong> Matrícula Profesional (MN/MP) y consentimiento del tutor.
              </div>
            </div>
          </div>

          {/* Familiar */}
          <div className="card" style={{ borderTop: "4px solid var(--familiar-color)", overflow: "hidden" }}>
            <div style={{ height: "160px", overflow: "hidden", background: "#f8fafc" }}>
              <img
                src="/assets/img/seguimiento-familiar.png"
                alt="Seguimiento familiar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <Users size={22} color="var(--familiar-color)" />
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", margin: 0 }}>Familias</h3>
                <span className="badge badge-familiar" style={{ marginLeft: "auto" }}>Hogar</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
                Comparten la vivencia diaria en el hogar, rutinas de sueño y autorizan a los profesionales que intervienen.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "#334155", background: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "8px" }}>
                <strong>Validación:</strong> Código provisto en inscripción escolar o DNI de tutoría.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ INTERACTIVO) */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#0f172a" }}>
            Preguntas Frecuentes
          </h2>
          <p style={{ fontSize: "1rem", color: "#64748b" }}>
            Respuestas a las dudas más habituales sobre la plataforma y su funcionamiento.
          </p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  border: isOpen ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: isOpen ? "#f8fafc" : "white",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: "700",
                    fontSize: "1rem",
                    color: isOpen ? "var(--primary)" : "#1e293b",
                  }}
                >
                  <span>{faq.pregunta}</span>
                  {isOpen ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="#94a3b8" />}
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      fontSize: "0.9375rem",
                      color: "#475569",
                      lineHeight: 1.6,
                      background: "white",
                      borderTop: "1px solid var(--border-color)",
                    }}
                  >
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA INVITACIÓN A REGISTRO */}
      <section
        className="card"
        style={{
          padding: "3rem 2rem",
          background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
          color: "white",
          textAlign: "center",
          borderRadius: "1.25rem",
        }}
      >
        <h2 style={{ fontSize: "1.85rem", fontWeight: "800", marginBottom: "0.75rem" }}>
          Sumá tu escuela o consultorio a RED NEC
        </h2>
        <p style={{ fontSize: "1rem", maxWidth: "620px", margin: "0 auto 2rem", color: "#cbd5e1" }}>
          Unite a la comunidad de docentes y terapeutas comprometidos con una educación accesible, interdisciplinaria y basada en evidencias.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "1rem" }}>
            Registrarse Gratis <ArrowRight size={18} />
          </Link>
          <Link to="/guia-verificacion" className="btn btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "1rem" }}>
            <ShieldCheck size={18} /> Protocolo de Identidad
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
