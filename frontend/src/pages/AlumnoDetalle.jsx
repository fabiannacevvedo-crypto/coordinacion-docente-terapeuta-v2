import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import { GraduationCap, Stethoscope, Users, Calendar, ArrowLeft, Lightbulb } from "lucide-react";

export const AlumnoDetalle = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [filtro, setFiltro] = useState("TODOS");
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
    if (filtro === "TODOS") return true;
    return r.tipo === filtro;
  });

  const getIconoPorTipo = (tipo) => {
    if (tipo === "PEDAGOGICO") return <GraduationCap size={18} color="var(--docente-color)" />;
    if (tipo === "TERAPEUTICO") return <Stethoscope size={18} color="var(--terapeuta-color)" />;
    return <Users size={18} color="var(--familiar-color)" />;
  };

  return (
    <div>
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
        <ArrowLeft size={16} /> Volver a mis alumnos
      </Link>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>Cargando legajo...</div>
      ) : !alumno ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          Alumno no encontrado o sin autorizacion para visualizar este caso.
        </div>
      ) : (
        <div>
          <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="badge" style={{ background: "#f1f5f9", color: "#475569", marginBottom: "0.5rem" }}>
                  Legajo Unificado RedNeC
                </span>
                <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a" }}>
                  {alumno.nombre} {alumno.apellido}
                </h1>
                <div style={{ fontSize: "0.9375rem", color: "#64748b" }}>
                  DNI: {alumno.dni} · {alumno.grado_sala} · {alumno.escuela}
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ background: "#f8fafc", padding: "0.5rem 1rem", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>TOTAL REPORTES</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--primary)" }}>{reportes.length}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.25rem", background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "0.8125rem", fontWeight: "700", color: "#334155", marginBottom: "0.25rem" }}>
                Diagnostico y Adaptaciones Curriculares:
              </div>
              <p style={{ fontSize: "0.875rem", color: "#475569" }}>
                {alumno.diagnostico_resumen || "Sin diagnostico registrado"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#1e293b" }}>
              Bitacora Multidisciplinar Cronologica
            </h2>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setFiltro("TODOS")}
                className={`btn ${filtro === "TODOS" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                Todos ({reportes.length})
              </button>
              <button
                onClick={() => setFiltro("PEDAGOGICO")}
                className={`btn ${filtro === "PEDAGOGICO" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                Docente
              </button>
              <button
                onClick={() => setFiltro("TERAPEUTICO")}
                className={`btn ${filtro === "TERAPEUTICO" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                Terapeutas
              </button>
              <button
                onClick={() => setFiltro("FAMILIAR")}
                className={`btn ${filtro === "FAMILIAR" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                Familia
              </button>
            </div>
          </div>

          {reportesFiltrados.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "#64748b" }}>No hay registros para el filtro seleccionado.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {reportesFiltrados.map((rep) => (
                <div key={rep.id} className="card" style={{ padding: "1.5rem", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{ background: "#f8fafc", padding: "0.5rem", borderRadius: "8px" }}>
                        {getIconoPorTipo(rep.tipo)}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span className={`badge badge-${rep.tipo.toLowerCase()}`}>{rep.tipo}</span>
                          <span style={{ fontSize: "0.8125rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <Calendar size={13} /> {rep.fecha}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#0f172a", marginTop: "0.25rem" }}>
                          {rep.titulo}
                        </h3>
                      </div>
                    </div>
                    <SemaforoBadge estado={rep.semaforo} />
                  </div>

                  <p style={{ fontSize: "0.9375rem", color: "#334155", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {rep.observaciones}
                  </p>

                  {rep.estrategia_sugerida && (
                    <div style={{ background: "#f8fafc", borderLeft: "3px solid var(--primary)", padding: "0.75rem 1rem", borderRadius: "0 8px 8px 0", fontSize: "0.8125rem", color: "#1e293b", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <Lightbulb size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <strong>Estrategia Interdisciplinar:</strong> {rep.estrategia_sugerida}
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#94a3b8", textAlign: "right" }}>
                    Registrado por: {rep.autor?.nombre} {rep.autor?.apellido} ({rep.autor?.email})
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
