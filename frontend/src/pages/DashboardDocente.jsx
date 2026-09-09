import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import { GraduationCap, PlusCircle, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export const DashboardDocente = () => {
  const { user, isVerified } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  const handleCrearReporte = async (e) => {
    e.preventDefault();
    setReporteError(null);
    setReporteSuccess(false);

    try {
      await api.crearReporte({
        alumno_id: selectedAlumno.id,
        tipo: "PEDAGOGICO",
        ...reporteData,
      });
      setReporteSuccess(true);
      setReporteData({ titulo: "", semaforo: "bueno", observaciones: "", estrategia_sugerida: "" });
      setTimeout(() => {
        setShowModal(false);
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--docente-color)", fontWeight: "700", fontSize: "0.875rem", textTransform: "uppercase" }}>
            <GraduationCap size={20} /> Panel Docente de Aula
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a" }}>
            Bienvenida/o, {user?.nombre} {user?.apellido}
          </h1>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
            {user?.perfil_docente?.institucion || "Escuela Primaria N° 12"} · CUE: {user?.perfil_docente?.cue_escuela || "020012300"}
          </div>
        </div>
      </div>

      {!isVerified && (
        <div className="alert alert-warning" style={{ marginBottom: "2rem" }}>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: "700", fontSize: "1rem" }}>Tu cuenta docente esta en proceso de revision</div>
            <p style={{ marginTop: "0.25rem" }}>
              Estamos cotejando el CUE de tu institucion y tus datos con las autoridades escolares. Un administrador de coordinacion validara tu acceso en breve. Mientras tanto, tu acceso a los legajos se encuentra restringido por motivos de proteccion de datos.
            </p>
          </div>
        </div>
      )}

      {isVerified && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b" }}>
              Alumnos en tu grado con seguimiento interdisciplinar ({alumnos.length})
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>Cargando alumnos...</div>
          ) : alumnos.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "#64748b" }}>No tienes alumnos asignados aun en tu curso.</p>
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
                            {alumno.grado_sala} · {alumno.escuela}
                          </div>
                        </div>
                        {ultimoReporte && <SemaforoBadge estado={ultimoReporte.semaforo} />}
                      </div>

                      <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "8px", fontSize: "0.8125rem", color: "#334155", marginBottom: "1rem" }}>
                        <strong>Diagnostico / Pauta:</strong> {alumno.diagnostico_resumen || "Sin observaciones iniciales"}
                      </div>

                      {ultimoReporte ? (
                        <div style={{ fontSize: "0.8125rem", color: "#475569", marginBottom: "1rem" }}>
                          <span style={{ fontWeight: "700" }}>Ultima nota ({ultimoReporte.tipo}):</span> "{ultimoReporte.titulo}"
                        </div>
                      ) : (
                        <div style={{ fontSize: "0.8125rem", color: "#94a3b8", marginBottom: "1rem" }}>
                          Sin reportes recientes
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                      <Link to={`/alumnos/${alumno.id}`} className="btn btn-secondary" style={{ flex: 1, fontSize: "0.8125rem" }}>
                        <FileText size={15} /> Ver Legajo
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedAlumno(alumno);
                          setShowModal(true);
                        }}
                        className="btn btn-primary"
                        style={{ flex: 1, fontSize: "0.8125rem" }}
                      >
                        <PlusCircle size={15} /> Nuevo Reporte
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {showModal && selectedAlumno && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "540px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Nuevo Reporte de Aula: {selectedAlumno.nombre} {selectedAlumno.apellido}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            {reporteError && <div className="alert alert-danger">{reporteError}</div>}
            {reporteSuccess && (
              <div className="alert alert-success">
                <CheckCircle2 size={18} /> Reporte pedagogico guardado con exito
              </div>
            )}

            <form onSubmit={handleCrearReporte}>
              <div className="form-group">
                <label className="form-label">Titulo de la observacion</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Desempeno en matematicas y trabajo colaborativo"
                  className="form-input"
                  value={reporteData.titulo}
                  onChange={(e) => setReporteData({ ...reporteData, titulo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Semaforo de Estado</label>
                <select
                  className="form-select"
                  value={reporteData.semaforo}
                  onChange={(e) => setReporteData({ ...reporteData, semaforo: e.target.value })}
                >
                  <option value="bueno">🟢 Bueno (Avances positivos y calma)</option>
                  <option value="regular">🟡 Regular (Requiere ajustes leves o seguimiento)</option>
                  <option value="atencion">🔴 Atencion (Dificultades notorias o desregulacion)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Observaciones en el aula</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detalla como respondio a las consignas, relacion con pares y atencion..."
                  className="form-textarea"
                  value={reporteData.observaciones}
                  onChange={(e) => setReporteData({ ...reporteData, observaciones: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estrategia sugerida o acuerdo interdisciplinar</label>
                <textarea
                  rows={2}
                  placeholder="Ej: Continuar con el soporte visual antes de cambiar de materia..."
                  className="form-textarea"
                  value={reporteData.estrategia_sugerida}
                  onChange={(e) => setReporteData({ ...reporteData, estrategia_sugerida: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Publicar Reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
