import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import { Stethoscope, PlusCircle, AlertCircle, Link2, FileText, CheckCircle2 } from "lucide-react";

export const DashboardTerapeuta = () => {
  const { user, isVerified } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [codigoVinculo, setCodigoVinculo] = useState("");
  const [linkError, setLinkError] = useState(null);
  const [linkSuccess, setLinkSuccess] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [reporteData, setReporteData] = useState({
    titulo: "",
    semaforo: "bueno",
    observaciones: "",
    estrategia_sugerida: "",
  });
  const [reporteSuccess, setReporteSuccess] = useState(false);
  const [reporteError, setReporteError] = useState(null);

  const cargarAlumnos = async () => {
    try {
      setLoading(true);
      const res = await api.getMisAlumnos();
      if (res.ok) {
        setAlumnos(res.alumnos || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified) {
      cargarAlumnos();
    } else {
      setLoading(false);
    }
  }, [isVerified]);

  const handleVincular = async (e) => {
    e.preventDefault();
    setLinkError(null);
    setLinkSuccess(false);

    try {
      await api.vincularAlumno(codigoVinculo);
      setLinkSuccess(true);
      setCodigoVinculo("");
      setTimeout(() => {
        setShowLinkModal(false);
        setLinkSuccess(false);
        cargarAlumnos();
      }, 1200);
    } catch (err) {
      setLinkError(err.message);
    }
  };

  const handleCrearReporte = async (e) => {
    e.preventDefault();
    setReporteError(null);
    setReporteSuccess(false);

    try {
      await api.crearReporte({
        alumno_id: selectedAlumno.id,
        tipo: "TERAPEUTICO",
        ...reporteData,
      });
      setReporteSuccess(true);
      setReporteData({ titulo: "", semaforo: "bueno", observaciones: "", estrategia_sugerida: "" });
      setTimeout(() => {
        setShowReportModal(false);
        setReporteSuccess(false);
        cargarAlumnos();
      }, 1200);
    } catch (err) {
      setReporteError(err.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--terapeuta-color)", fontWeight: "700", fontSize: "0.875rem", textTransform: "uppercase" }}>
            <Stethoscope size={20} /> Panel Terapeutico / Clinico
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a" }}>
            Lic. {user?.nombre} {user?.apellido}
          </h1>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
            {user?.perfil_terapeuta?.especialidad || "Psicologia Infantil"} · Matricula: {user?.perfil_terapeuta?.matricula_tipo} {user?.perfil_terapeuta?.matricula_numero}
          </div>
        </div>

        {isVerified && (
          <button onClick={() => setShowLinkModal(true)} className="btn btn-primary" style={{ background: "var(--terapeuta-color)" }}>
            <Link2 size={18} /> Vincular Nuevo Paciente / Alumno
          </button>
        )}
      </div>

      {!isVerified && (
        <div className="alert alert-warning">
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: "700", fontSize: "1rem" }}>Matricula profesional en proceso de validacion</div>
            <p style={{ marginTop: "0.25rem" }}>
              Estamos validando tu matricula en los registros de prestadores de salud. Una vez aprobada tu cuenta podras vincular pacientes e interactuar con sus docentes.
            </p>
          </div>
        </div>
      )}

      {isVerified && (
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
            Pacientes y Casos Asignados ({alumnos.length})
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>Cargando casos...</div>
          ) : alumnos.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "#64748b", marginBottom: "1rem" }}>No tienes pacientes vinculados todavia.</p>
              <button onClick={() => setShowLinkModal(true)} className="btn btn-secondary">
                <Link2 size={16} /> Ingresar Codigo de Vinculacion
              </button>
            </div>
          ) : (
            <div className="grid-2">
              {alumnos.map((alumno) => {
                const ultimoReporte = alumno.reportes?.[0];
                return (
                  <div key={alumno.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a" }}>
                            {alumno.nombre} {alumno.apellido}
                          </h3>
                          <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>
                            DNI: {alumno.dni} · {alumno.escuela}
                          </div>
                        </div>
                        {ultimoReporte && <SemaforoBadge estado={ultimoReporte.semaforo} />}
                      </div>

                      <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "8px", fontSize: "0.8125rem", color: "#334155", marginBottom: "1rem" }}>
                        <strong>Diagnostico:</strong> {alumno.diagnostico_resumen || "En evaluacion"}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                      <Link to={`/alumnos/${alumno.id}`} className="btn btn-secondary" style={{ flex: 1, fontSize: "0.8125rem" }}>
                        <FileText size={15} /> Ver Evolucion
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedAlumno(alumno);
                          setShowReportModal(true);
                        }}
                        className="btn btn-primary"
                        style={{ flex: 1, fontSize: "0.8125rem", background: "var(--terapeuta-color)" }}
                      >
                        <PlusCircle size={15} /> Nota Terapeutica
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {showLinkModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "440px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>Vincular Paciente por Codigo</h3>
              <button onClick={() => setShowLinkModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            <p style={{ fontSize: "0.8125rem", color: "#64748b", marginBottom: "1rem" }}>
              Solicita a la familia o a la escuela el <strong>Codigo de Equipo</strong> del alumno (ej: <code>EQ-LUCAS</code> o <code>EQ-SOFIA</code>).
            </p>

            {linkError && <div className="alert alert-danger">{linkError}</div>}
            {linkSuccess && <div className="alert alert-success"><CheckCircle2 size={18} /> ¡Paciente vinculado exitosamente!</div>}

            <form onSubmit={handleVincular}>
              <div className="form-group">
                <label className="form-label">Codigo de Equipo</label>
                <input
                  type="text"
                  required
                  placeholder="EQ-XXXXXX"
                  className="form-input"
                  value={codigoVinculo}
                  onChange={(e) => setCodigoVinculo(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setShowLinkModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: "var(--terapeuta-color)" }}>
                  Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReportModal && selectedAlumno && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "540px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Nota Terapeutica: {selectedAlumno.nombre} {selectedAlumno.apellido}
              </h3>
              <button onClick={() => setShowReportModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            {reporteError && <div className="alert alert-danger">{reporteError}</div>}
            {reporteSuccess && <div className="alert alert-success"><CheckCircle2 size={18} /> Nota clinica guardada</div>}

            <form onSubmit={handleCrearReporte}>
              <div className="form-group">
                <label className="form-label">Foco de la sesion / Objetivo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Intervencion en autorregulacion y tolerancia a la frustracion"
                  className="form-input"
                  value={reporteData.titulo}
                  onChange={(e) => setReporteData({ ...reporteData, titulo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Semaforo Clinico</label>
                <select
                  className="form-select"
                  value={reporteData.semaforo}
                  onChange={(e) => setReporteData({ ...reporteData, semaforo: e.target.value })}
                >
                  <option value="bueno">🟢 Bueno (Evolucion favorable hacia los objetivos)</option>
                  <option value="regular">🟡 Regular (Progreso pausado o meseta)</option>
                  <option value="atencion">🔴 Atencion (Retroceso conductual o necesidad de interconsulta)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Observaciones clinicas de la sesion</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe avances, respuestas a estimulos y tecnicas aplicadas..."
                  className="form-textarea"
                  value={reporteData.observaciones}
                  onChange={(e) => setReporteData({ ...reporteData, observaciones: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sugerencia practica para la escuela y el hogar</label>
                <textarea
                  rows={2}
                  placeholder="Pautas concretas que docentes y padres pueden replicar..."
                  className="form-textarea"
                  value={reporteData.estrategia_sugerida}
                  onChange={(e) => setReporteData({ ...reporteData, estrategia_sugerida: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setShowReportModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: "var(--terapeuta-color)" }}>
                  Registrar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
