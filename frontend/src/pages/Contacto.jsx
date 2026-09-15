import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "DOCENTE",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    // Simulacion de envio al backend / soporte
    setTimeout(() => {
      setCargando(false);
      setEnviado(true);
      setFormData({
        nombre: "",
        email: "",
        rol: "DOCENTE",
        asunto: "",
        mensaje: "",
      });
    }, 800);
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Hero Contacto */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",
          color: "white",
          borderRadius: "1.25rem",
          padding: "3.5rem 2rem",
          textAlign: "center",
          marginBottom: "3rem",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.2)",
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
          <Sparkles size={16} /> Mesa de Ayuda y Articulación
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", lineHeight: 1.2, marginBottom: "1rem" }}>
          Contacto y Asistencia
        </h1>
        <p style={{ fontSize: "1.125rem", maxWidth: "680px", margin: "0 auto", opacity: 0.9, lineHeight: 1.6 }}>
          ¿Tenés dudas sobre cómo registrar tu escuela, validar tu matrícula o vincularte con un estudiante? Nuestro equipo interdisciplinario está a tu disposición.
        </p>
      </section>

      <div className="grid-2" style={{ gap: "2rem", alignItems: "flex-start", marginBottom: "3rem" }}>
        {/* Formulario de Contacto */}
        <div className="card" style={{ padding: "2.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
            <div style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "0.625rem", borderRadius: "10px" }}>
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                Envianos tu consulta
              </h2>
              <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>Respuesta garantizada dentro de las 24 hs hábiles</span>
            </div>
          </div>

          {enviado && (
            <div
              style={{
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                color: "#065f46",
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <CheckCircle2 size={24} color="#059669" style={{ flexShrink: 0 }} />
              <div>
                <strong>¡Mensaje recibido con éxito!</strong>
                <div style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  Nos pondremos en contacto a la brevedad para coordinar la asistencia requerida.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.375rem" }}>
                Nombre y Apellido *
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Prof. Mariana Díaz"
                style={{ width: "100%", padding: "0.65rem 0.875rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9375rem" }}
              />
            </div>

            <div className="grid-2" style={{ gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.375rem" }}>
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu.correo@ejemplo.com"
                  style={{ width: "100%", padding: "0.65rem 0.875rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9375rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.375rem" }}>
                  Rol / Perfil *
                </label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "0.65rem 0.875rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9375rem", background: "white" }}
                >
                  <option value="DOCENTE">Docente / Directivo Escolar</option>
                  <option value="TERAPEUTA">Profesional de la Salud / Terapeuta</option>
                  <option value="FAMILIAR">Familiar / Tutor Legal</option>
                  <option value="OTRO">Institución / Organización</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.375rem" }}>
                Asunto de la consulta *
              </label>
              <input
                type="text"
                name="asunto"
                required
                value={formData.asunto}
                onChange={handleChange}
                placeholder="Ej: Validación de CUE para escuela primaria"
                style={{ width: "100%", padding: "0.65rem 0.875rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9375rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.375rem" }}>
                Mensaje o Detalle del Requerimiento *
              </label>
              <textarea
                name="mensaje"
                required
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribí aquí los detalles de tu consulta o situación..."
                style={{ width: "100%", padding: "0.65rem 0.875rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9375rem", resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="btn btn-primary"
              style={{ padding: "0.75rem 1.5rem", fontSize: "1rem", display: "inline-flex", justifyContent: "center", gap: "0.5rem" }}
            >
              {cargando ? "Enviando mensaje..." : (
                <>
                  <Send size={18} /> Enviar Consulta
                </>
              )}
            </button>
          </form>
        </div>

        {/* Canales Oficiales de Contacto */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "1.25rem" }}>
              Canales Oficiales
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "0.5rem", borderRadius: "8px" }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.9375rem" }}>Sede Central RedNeC</div>
                  <div style={{ color: "#64748b", fontSize: "0.875rem" }}>Av. Córdoba 1850, Piso 4, CABA, Argentina</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ background: "#ecfdf5", color: "#059669", padding: "0.5rem", borderRadius: "8px" }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.9375rem" }}>Línea de Guardia y Soporte</div>
                  <div style={{ color: "#64748b", fontSize: "0.875rem" }}>+54 11 4444-5555 / WhatsApp: +54 9 11 2345-6789</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ background: "#eff6ff", color: "#2563eb", padding: "0.5rem", borderRadius: "8px" }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.9375rem" }}>Correo Institucional</div>
                  <div style={{ color: "#64748b", fontSize: "0.875rem" }}>contacto@rednec.com · soporte@rednec.com</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ background: "#fef3c7", color: "#d97706", padding: "0.5rem", borderRadius: "8px" }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.9375rem" }}>Horario de Atención</div>
                  <div style={{ color: "#64748b", fontSize: "0.875rem" }}>Lunes a Viernes de 8:00 a 19:00 hs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Preguntas de Asistencia Rápida */}
          <div className="card" style={{ padding: "1.75rem", background: "#f8fafc" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#1e293b", fontWeight: "700" }}>
              <HelpCircle size={20} color="var(--primary)" />
              <span>¿Necesitás verificar tu cuenta?</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
              Si te registraste como docente o terapeuta, tu cuenta queda en estado "En Revisión" hasta que el CUE o matrícula sea convalidado por el administrador.
            </p>
            <a href="/guia-verificacion" style={{ fontSize: "0.875rem", fontWeight: "700", color: "var(--primary)", textDecoration: "none" }}>
              Ver Guía de Verificación de Identidad →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
