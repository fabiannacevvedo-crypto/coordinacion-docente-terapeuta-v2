import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import {
  GraduationCap,
  Stethoscope,
  Users,
  Calendar,
  ArrowLeft,
  Lightbulb,
  Sparkles,
  Search,
  Printer,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Award,
} from "lucide-react";

export const AlumnoDetalle = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [filtro, setFiltro] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setLoading(true);
        const resAlumnos = await api.getMisAlumnos();
        if (resAlumnos.ok) {
          const enc = resAlumnos.alumnos.find((a) => String(a.id) === String(id));
          setAlumno(enc);
        }

        const resReportes = await api.getReportesAlumno(id);
        if (resReportes.ok) {
          setReportes(resReportes.reportes || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDetalle();
  }, [id]);

  const reportesFiltrados = reportes.filter((r) => {
    const coincideTipo = filtro === "TODOS" || r.tipo === filtro;
    const coincideTexto =
      busqueda.trim() === "" ||
      r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.observaciones.toLowerCase().includes(busqueda.toLowerCase()) ||
      (r.estrategia_sugerida && r.estrategia_sugerida.toLowerCase().includes(busqueda.toLowerCase()));
    return coincideTipo && coincideTexto;
  });

  const getIconoPorTipo = (tipo) => {
    if (tipo === "PEDAGOGICO") return <GraduationCap size={20} color="var(--docente-color)" />;
    if (tipo === "TERAPEUTICO") return <Stethoscope size={20} color="var(--terapeuta-color)" />;
    return <Users size={20} color="var(--familiar-color)" />;
  };

  const getNombreTipo = (tipo) => {
    if (tipo === "PEDAGOGICO") return "Docente Escolar";
    if (tipo === "TERAPEUTICO") return "Profesional de Terapia";
    return "Familia / Hogar";
  };

  const positivos = reportes.filter((r) => r.semaforo === "bueno").length;
  const porcentaje = reportes.length > 0 ? Math.round((positivos / reportes.length) * 100) : 100;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <Link to="/" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: "700" }}>
          <ArrowLeft size={16} /> Volver al Inicio
        </Link>

        <button
          onClick={() => window.print()}
          className="btn btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          <Printer size={16} /> Imprimir / Guardar Resumen
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#64748b" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌱</div>
          Cargando el legajo y la evolución del estudiante...
        </div>
      ) : !alumno ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          Alumno no encontrado o sin autorización para visualizar este caso.
        </div>
      ) : (
        <div>
          {/* CABECERA DEL LEGAJO DEL ALUMNO */}
          <div
            className="card"
            style={{
              padding: "2rem",
              marginBottom: "2rem",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "2px solid #e2e8f0",
              borderRadius: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "24px",
                    background: "linear-gradient(135deg, #0284c7, #2563eb)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: "900",
                    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
                  }}
                >
                  {alumno.nombre.charAt(0)}
                </div>
                <div>
                  <span className="badge badge-docente" style={{ marginBottom: "0.4rem" }}>
                    Legajo Unificado RedNeC
                  </span>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", lineHeight: 1.2 }}>
                    {alumno.nombre} {alumno.apellido}
                  </h1>
                  <div style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "0.25rem" }}>
                    <strong>DNI:</strong> {alumno.dni} · <strong>Grado:</strong> {alumno.grado_sala} · <strong>Escuela:</strong> {alumno.escuela}
                  </div>
                </div>
              </div>

              {/* STATS DEL PROGRESO */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "0.75rem 1.25rem", borderRadius: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#065f46" }}>BIENESTAR POSITIVO</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#059669" }}>{porcentaje}%</div>
                </div>

                <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", padding: "0.75rem 1.25rem", borderRadius: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#0369a1" }}>TOTAL NOTAS</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0284c7" }}>{reportes.length}</div>
                </div>
              </div>
            </div>

            {/* ADAPTACIONES Y DIAGNÓSTICO */}
            <div
              style={{
                marginTop: "1.5rem",
                background: "white",
                border: "1px solid #e2e8f0",
                padding: "1.25rem",
                borderRadius: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "800", color: "#1e293b", fontSize: "0.9rem", marginBottom: "0.35rem" }}>
                <HeartHandshake size={18} color="#0284c7" /> Diagnóstico y Adaptaciones Curriculares:
              </div>
              <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: "1.6", margin: 0 }}>
                {alumno.diagnostico_resumen || "Sin adaptaciones registradas"}
              </p>
            </div>
          </div>

          {/* FILTROS Y BÚSQUEDA INTERACTIVA */}
          <div
            className="card"
            style={{
              padding: "1.25rem 1.5rem",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* BUSCADOR */}
            <div style={{ position: "relative", minWidth: "260px", flex: 1, maxWidth: "420px" }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Buscar por palabra clave (ej: pictogramas, recreo)..."
                className="form-input"
                style={{ paddingLeft: "2.4rem" }}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            {/* BOTONES DE FILTRADO POR ÁREA */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setFiltro("TODOS")}
                className={`tab-pill ${filtro === "TODOS" ? "active" : ""}`}
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.8125rem" }}
              >
                Todos ({reportes.length})
              </button>
              <button
                onClick={() => setFiltro("PEDAGOGICO")}
                className={`tab-pill ${filtro === "PEDAGOGICO" ? "active" : ""}`}
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.8125rem" }}
              >
                🏫 Escuela
              </button>
              <button
                onClick={() => setFiltro("TERAPEUTICO")}
                className={`tab-pill ${filtro === "TERAPEUTICO" ? "active" : ""}`}
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.8125rem" }}
              >
                🩺 Terapia
              </button>
              <button
                onClick={() => setFiltro("FAMILIAR")}
                className={`tab-pill ${filtro === "FAMILIAR" ? "active" : ""}`}
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.8125rem" }}
              >
                🏡 Familia
              </button>
            </div>
          </div>

          {/* LISTADO DE REPORTES CON LÍNEA DE TIEMPO INTERACTIVA */}
          {reportesFiltrados.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a" }}>No encontramos notas que coincidan</h3>
              <p style={{ color: "#64748b" }}>Prueba cambiando el filtro o la palabra clave de búsqueda.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {reportesFiltrados.map((rep) => (
                <div key={rep.id} className="card interactive-card" style={{ padding: "1.75rem", borderLeft: `5px solid ${rep.tipo === "PEDAGOGICO" ? "#0284c7" : rep.tipo === "TERAPEUTICO" ? "#7c3aed" : "#059669"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <div
                        style={{
                          background: rep.tipo === "PEDAGOGICO" ? "#e0f2fe" : rep.tipo === "TERAPEUTICO" ? "#f3e8ff" : "#d1fae5",
                          padding: "0.75rem",
                          borderRadius: "14px",
                        }}
                      >
                        {getIconoPorTipo(rep.tipo)}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span className={`badge badge-${rep.tipo.toLowerCase()}`}>
                            {getNombreTipo(rep.tipo)}
                          </span>
                          <span style={{ fontSize: "0.8125rem", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <Calendar size={14} /> {rep.fecha}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.25rem" }}>
                          {rep.titulo}
                        </h3>
                      </div>
                    </div>

                    <SemaforoBadge estado={rep.semaforo} />
                  </div>

                  <p style={{ fontSize: "0.95rem", color: "#334155", lineHeight: "1.7", marginBottom: "1.25rem", background: "#f8fafc", padding: "1rem", borderRadius: "10px" }}>
                    {rep.observaciones}
                  </p>

                  {rep.estrategia_sugerida && (
                    <div
                      style={{
                        background: "#f0fdf4",
                        borderLeft: "4px solid #10b981",
                        padding: "1rem 1.25rem",
                        borderRadius: "0 12px 12px 0",
                        fontSize: "0.9rem",
                        color: "#065f46",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.65rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Lightbulb size={20} color="#059669" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <strong style={{ display: "block", marginBottom: "0.2rem" }}>Estrategia & Pauta Recomendada:</strong>
                        {rep.estrategia_sugerida}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
                    <span>Registrado por: <strong>{rep.autor?.nombre} {rep.autor?.apellido}</strong> ({rep.autor?.email})</span>
                    <span style={{ color: "#0284c7", fontWeight: "600" }}>✓ Caso coordinado</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlumnoDetalle;
