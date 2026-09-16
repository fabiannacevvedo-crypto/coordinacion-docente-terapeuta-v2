import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import { Users, Copy, Check, PlusCircle, FileText, Link2, CheckCircle2 } from "lucide-react";

export const DashboardFamiliar = () => {
  const { user } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  // Modal para reporte familiar
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [reporteData, setReporteData] = useState({
    titulo: "",
    semaforo: "bueno",
    observaciones: "",
    estrategia_sugerida: "",
  });
  const [successMsg, setSuccessMsg] = useState(false);

  // Modal para vincular alumno
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
    cargarAlumnos();
  }, []);

  const copiarAlPortapapeles = (codigo) => {
    navigator.clipboard.writeText(codigo);
    setCopiedCode(codigo);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCrearReporteFamiliar = async (e) => {
    e.preventDefault();
    try {
      await api.crearReporte({
        alumno_id: selectedAlumno.id,
        tipo: "FAMILIAR",
        ...reporteData,
      });
      setSuccessMsg(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg(false);
        cargarAlumnos();
      }, 1000);
    } catch (err) {
      alert(err.message);
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--familiar-color)", fontWeight: "700", fontSize: "0.875rem", textTransform: "uppercase" }}>
            <Users size={20} /> Espacio Familiar
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a" }}>
            Hola, {user?.nombre} {user?.apellido}
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
            Seguimiento del día a día de tus hijos en conjunto con la escuela y sus terapeutas
          </p>
        </div>

        <button
          onClick={() => setShowLinkModal(true)}
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
        >
          <Link2 size={16} /> Vincular Hijo/a con Código
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>Cargando información...</div>
      ) : alumnos.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>No tienes hijos vinculados actualmente.</p>
          <button onClick={() => setShowLinkModal(true)} className="btn btn-primary">
            <Link2 size={16} /> Vincular con Código Escolar
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {alumnos.map((alumno) => {
            const reportes = alumno.reportes || [];
            const ultimoDocente = reportes.find((r) => r.tipo === "PEDAGOGICO");
            const ultimoTerapeuta = reportes.find((r) => r.tipo === "TERAPEUTICO");

            return (
              <div key={alumno.id} className="card" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>
                      {alumno.nombre} {alumno.apellido}
                    </h2>
                    <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                      {alumno.grado_sala} · {alumno.escuela}
                    </div>
                  </div>

                  <div style={{ background: "#ecfdf5", border: "1px solid #d1fae5", padding: "0.5rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#065f46" }}>CÓDIGO PARA PROFESIONALES:</div>
                      <div style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: "800", color: "#047857" }}>{alumno.codigo_equipo}</div>
                    </div>
                    <button
                      onClick={() => copiarAlPortapapeles(alumno.codigo_equipo)}
                      className="btn btn-secondary"
                      style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem", background: "white" }}
                      title="Copiar código para enviar al terapeuta"
                    >
                      {copiedCode === alumno.codigo_equipo ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
                  <div style={{ background: "#f0f9ff", border: "1px solid #e0f2fe", padding: "1.25rem", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span className="badge badge-docente">Desde la Escuela</span>
                      {ultimoDocente && <SemaforoBadge estado={ultimoDocente.semaforo} />}
                    </div>
                    {ultimoDocente ? (
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.9375rem", color: "#0369a1", marginBottom: "0.25rem" }}>
                          {ultimoDocente.titulo}
                        </div>
                        <p style={{ fontSize: "0.8125rem", color: "#334155", marginBottom: "0.5rem" }}>
                          "{ultimoDocente.observaciones}"
                        </p>
                        {ultimoDocente.estrategia_sugerida && (
                          <div style={{ fontSize: "0.75rem", color: "#0284c7", background: "white", padding: "0.5rem", borderRadius: "6px" }}>
                            💡 <strong>Recomendación del docente:</strong> {ultimoDocente.estrategia_sugerida}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>Sin reportes escolares recientes.</p>
                    )}
                  </div>

                  <div style={{ background: "#faf5ff", border: "1px solid #f3e8ff", padding: "1.25rem", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span className="badge badge-terapeuta">Desde la Terapia</span>
                      {ultimoTerapeuta && <SemaforoBadge estado={ultimoTerapeuta.semaforo} />}
                    </div>
                    {ultimoTerapeuta ? (
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.9375rem", color: "#6b21a8", marginBottom: "0.25rem" }}>
                          {ultimoTerapeuta.titulo}
                        </div>
                        <p style={{ fontSize: "0.8125rem", color: "#334155", marginBottom: "0.5rem" }}>
                          "{ultimoTerapeuta.observaciones}"
                        </p>
                        {ultimoTerapeuta.estrategia_sugerida && (
                          <div style={{ fontSize: "0.75rem", color: "#7c3aed", background: "white", padding: "0.5rem", borderRadius: "6px" }}>
                            🩺 <strong>Pauta para el hogar:</strong> {ultimoTerapeuta.estrategia_sugerida}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>Sin notas terapéuticas recientes.</p>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <Link to={`/alumnos/${alumno.id}`} className="btn btn-secondary">
                    <FileText size={16} /> Ver Historial Completo
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedAlumno(alumno);
                      setShowModal(true);
                    }}
                    className="btn btn-primary"
                  >
                    <PlusCircle size={16} /> Aportar Nota Familiar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Aportar Nota Familiar */}
      {showModal && selectedAlumno && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "540px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Nota del Hogar: {selectedAlumno.nombre} {selectedAlumno.apellido}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            {successMsg && (
              <div className="alert alert-success">
                Nota guardada exitosamente. Visible para el equipo docente y terapéutico.
              </div>
            )}

            <form onSubmit={handleCrearReporteFamiliar}>
              <div className="form-group">
                <label className="form-label">Asunto o situación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Rutina de sueño durante la semana, medicación, estado de ánimo"
                  className="form-input"
                  value={reporteData.titulo}
                  onChange={(e) => setReporteData({ ...reporteData, titulo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Semáforo de Bienestar en Casa</label>
                <select
                  className="form-select"
                  value={reporteData.semaforo}
                  onChange={(e) => setReporteData({ ...reporteData, semaforo: e.target.value })}
                >
                  <option value="bueno">🟢 Tranquilo/a (Semana con rutinas estables)</option>
                  <option value="regular">🟡 Regular (Cierto cansancio o irritabilidad transitoria)</option>
                  <option value="atencion">🔴 Atención (Cambio de medicación o crisis en el hogar)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detalle de la vivencia</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Comenta lo que consideres importante para que la maestra y los terapeutas tengan en cuenta..."
                  className="form-textarea"
                  value={reporteData.observaciones}
                  onChange={(e) => setReporteData({ ...reporteData, observaciones: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Enviar al Equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Vincular Alumno por Código */}
      {showLinkModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "440px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Vincular Hijo/a con Código
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
                <label className="form-label">Código Familiar</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: FAM-7B3K9P"
                  className="form-input"
                  style={{ textTransform: "uppercase", letterSpacing: "1px", fontFamily: "monospace" }}
                  value={codigoVinculo}
                  onChange={(e) => setCodigoVinculo(e.target.value)}
                />
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
                  Ingresa el código proporcionado por la escuela en la inscripción del estudiante.
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

export default DashboardFamiliar;
