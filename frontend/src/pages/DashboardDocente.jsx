import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import {
  GraduationCap,
  PlusCircle,
  AlertCircle,
  FileText,
  CheckCircle2,
  UserPlus,
  Link2,
} from "lucide-react";

export const DashboardDocente = () => {
  const { user, isVerified } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal para Reportes
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

  // Modal para Registrar Alumno
  const [showAlumnoModal, setShowAlumnoModal] = useState(false);
  const [alumnoFormData, setAlumnoFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    grado_sala: user?.perfil_docente?.cargo || "4to Grado A",
    escuela: user?.perfil_docente?.institucion || "Escuela Primaria N° 12",
    diagnostico_resumen: "",
    cud_vigente: false,
  });
  const [alumnoError, setAlumnoError] = useState(null);
  const [alumnoSuccess, setAlumnoSuccess] = useState(false);

  // Modal para Vincular Alumno por Código
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [codigoVinculo, setCodigoVinculo] = useState("");
  const [linkError, setLinkError] = useState(null);
  const [linkSuccess, setLinkSuccess] = useState(false);

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

  const handleCrearAlumno = async (e) => {
    e.preventDefault();
    setAlumnoError(null);
    setAlumnoSuccess(false);

    try {
      await api.crearAlumno(alumnoFormData);
      setAlumnoSuccess(true);
      setAlumnoFormData({
        nombre: "",
        apellido: "",
        dni: "",
        fecha_nacimiento: "",
        grado_sala: user?.perfil_docente?.cargo || "4to Grado A",
        escuela: user?.perfil_docente?.institucion || "Escuela Primaria N° 12",
        diagnostico_resumen: "",
        cud_vigente: false,
      });
      setTimeout(() => {
        setShowAlumnoModal(false);
        setAlumnoSuccess(false);
        cargarAlumnos();
      }, 1200);
    } catch (err) {
      setAlumnoError(err.message);
    }
  };

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

        {isVerified && (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowLinkModal(true)}
              className="btn btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Link2 size={16} /> Vincular por Código
            </button>
            <button
              onClick={() => setShowAlumnoModal(true)}
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <UserPlus size={16} /> Registrar Alumno
            </button>
          </div>
        )}
      </div>

      {!isVerified && (
        <div className="alert alert-warning" style={{ marginBottom: "2rem" }}>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: "700", fontSize: "1rem" }}>Tu cuenta docente está en proceso de revisión</div>
            <p style={{ marginTop: "0.25rem" }}>
              Estamos cotejando el CUE de tu institución y tus datos con las autoridades escolares. Un administrador de coordinación validará tu acceso en breve. Mientras tanto, tu acceso a los legajos se encuentra restringido por motivos de protección de datos.
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
              <p style={{ color: "#64748b", marginBottom: "1rem" }}>No tienes alumnos asignados aún en tu curso.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button onClick={() => setShowAlumnoModal(true)} className="btn btn-primary">
                  <UserPlus size={16} /> Registrar Primer Alumno
                </button>
              </div>
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
                        <strong>Diagnóstico / Pauta:</strong> {alumno.diagnostico_resumen || "Sin observaciones iniciales"}
                      </div>

                      {ultimoReporte ? (
                        <div style={{ fontSize: "0.8125rem", color: "#475569", marginBottom: "1rem" }}>
                          <span style={{ fontWeight: "700" }}>Última nota ({ultimoReporte.tipo}):</span> "{ultimoReporte.titulo}"
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

      {/* Modal Nuevo Reporte */}
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
                <CheckCircle2 size={18} /> Reporte pedagógico guardado con éxito
              </div>
            )}

            <form onSubmit={handleCrearReporte}>
              <div className="form-group">
                <label className="form-label">Título de la observación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Desempeño en matemáticas y trabajo colaborativo"
                  className="form-input"
                  value={reporteData.titulo}
                  onChange={(e) => setReporteData({ ...reporteData, titulo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Semáforo de Estado</label>
                <select
                  className="form-select"
                  value={reporteData.semaforo}
                  onChange={(e) => setReporteData({ ...reporteData, semaforo: e.target.value })}
                >
                  <option value="bueno">🟢 Bueno (Avances positivos y calma)</option>
                  <option value="regular">🟡 Regular (Requiere ajustes leves o seguimiento)</option>
                  <option value="atencion">🔴 Atención (Dificultades notorias o desregulación)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Observaciones en el aula</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detalla cómo respondió a las consignas, relación con pares y atención..."
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

      {/* Modal Registrar Nuevo Alumno */}
      {showAlumnoModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "540px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Dar de Alta Nuevo Alumno
              </h3>
              <button onClick={() => setShowAlumnoModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            {alumnoError && <div className="alert alert-danger">{alumnoError}</div>}
            {alumnoSuccess && (
              <div className="alert alert-success">
                <CheckCircle2 size={18} /> ¡Alumno dado de alta y vinculado con éxito!
              </div>
            )}

            <form onSubmit={handleCrearAlumno}>
              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sofía"
                    className="form-input"
                    value={alumnoFormData.nombre}
                    onChange={(e) => setAlumnoFormData({ ...alumnoFormData, nombre: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Gómez"
                    className="form-input"
                    value={alumnoFormData.apellido}
                    onChange={(e) => setAlumnoFormData({ ...alumnoFormData, apellido: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">DNI *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 48920112"
                    className="form-input"
                    value={alumnoFormData.dni}
                    onChange={(e) => setAlumnoFormData({ ...alumnoFormData, dni: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={alumnoFormData.fecha_nacimiento}
                    onChange={(e) => setAlumnoFormData({ ...alumnoFormData, fecha_nacimiento: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">Grado / Sala *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 4to Grado A"
                    className="form-input"
                    value={alumnoFormData.grado_sala}
                    onChange={(e) => setAlumnoFormData({ ...alumnoFormData, grado_sala: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Escuela / Institución *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Escuela Primaria N° 12"
                    className="form-input"
                    value={alumnoFormData.escuela}
                    onChange={(e) => setAlumnoFormData({ ...alumnoFormData, escuela: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Diagnóstico o Necesidad de Apoyo</label>
                <textarea
                  rows={2}
                  placeholder="Ej: Apoyo en lectoescritura, adaptaciones de tiempo y consignas visuales..."
                  className="form-textarea"
                  value={alumnoFormData.diagnostico_resumen}
                  onChange={(e) => setAlumnoFormData({ ...alumnoFormData, diagnostico_resumen: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <input
                  type="checkbox"
                  id="cud_vigente"
                  checked={alumnoFormData.cud_vigente}
                  onChange={(e) => setAlumnoFormData({ ...alumnoFormData, cud_vigente: e.target.checked })}
                  style={{ width: "16px", height: "16px" }}
                />
                <label htmlFor="cud_vigente" style={{ fontSize: "0.875rem", color: "#334155" }}>
                  Cuenta con Certificado Único de Discapacidad (CUD) vigente
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setShowAlumnoModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Dar de Alta Alumno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Vincular por Código */}
      {showLinkModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "440px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Vincular Alumno por Código
              </h3>
              <button onClick={() => setShowLinkModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            {linkError && <div className="alert alert-danger">{linkError}</div>}
            {linkSuccess && (
              <div className="alert alert-success">
                <CheckCircle2 size={18} /> ¡Vinculación confirmada exitosamente!
              </div>
            )}

            <form onSubmit={handleVincular}>
              <div className="form-group">
                <label className="form-label">Código de Vinculación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: EQ-9A8B2C"
                  className="form-input"
                  style={{ textTransform: "uppercase", letterSpacing: "1px", fontFamily: "monospace" }}
                  value={codigoVinculo}
                  onChange={(e) => setCodigoVinculo(e.target.value)}
                />
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
                  Ingresa el código provisto por la institución o la familia.
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowLinkModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDocente;
