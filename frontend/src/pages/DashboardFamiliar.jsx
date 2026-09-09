import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import { Users, Copy, Check, PlusCircle, FileText } from "lucide-react";

export const DashboardFamiliar = () => {
  const { user } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [reporteData, setReporteData] = useState({
    titulo: "",
    semaforo: "bueno",
    observaciones: "",
    estrategia_sugerida: "",
  });
  const [successMsg, setSuccessMsg] = useState(false);

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

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--familiar-color)", fontWeight: "700", fontSize: "0.875rem", textTransform: "uppercase" }}>
          <Users size={20} /> Espacio Familiar
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a" }}>
          Hola, {user?.nombre} {user?.apellido}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Seguimiento del dia a dia de tus hijos en conjunto con la escuela y sus terapeutas
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>Cargando informacion...</div>
      ) : alumnos.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "#64748b" }}>No tienes hijos vinculados actualmente.</p>
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
                      <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#065f46" }}>CODIGO PARA PROFESIONALES:</div>
                      <div style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: "800", color: "#047857" }}>{alumno.codigo_equipo}</div>
                    </div>
                    <button
                      onClick={() => copiarAlPortapapeles(alumno.codigo_equipo)}
                      className="btn btn-secondary"
                      style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem", background: "white" }}
                      title="Copiar codigo para enviar al terapeuta"
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
                            💡 <strong>Recomendacion del docente:</strong> {ultimoDocente.estrategia_sugerida}
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
                      <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>Sin notas terapeuticas recientes.</p>
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
                    style={{ background: "var(--familiar-color)" }}
                  >
                    <PlusCircle size={16} /> Compartir Observacion Familiar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && selectedAlumno && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>Compartir novedad con docentes y terapeutas</h3>
              <button onClick={() => setShowModal(false)} style={{ fontSize: "1.25rem", color: "#64748b" }}>✕</button>
            </div>

            {successMsg && <div className="alert alert-success">Observacion compartida con el equipo</div>}

            <form onSubmit={handleCrearReporteFamiliar}>
              <div className="form-group">
                <label className="form-label">Tema principal</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cambio de rutina de sueno / Fin de semana"
                  className="form-input"
                  value={reporteData.titulo}
                  onChange={(e) => setReporteData({ ...reporteData, titulo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">¿Como estuvo en casa?</label>
                <select
                  className="form-select"
                  value={reporteData.semaforo}
                  onChange={(e) => setReporteData({ ...reporteData, semaforo: e.target.value })}
                >
                  <option value="bueno">🟢 Muy bien (Tranquilo, buen descanso y colaborativo)</option>
                  <option value="regular">🟡 Normal con algunos momentos de desgano</option>
                  <option value="atencion">🔴 Desafiante (Poco sueno, angustia o irritabilidad)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detalle para el equipo</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe lo que consideres importante que el docente o terapeuta sepa antes de iniciar la semana..."
                  className="form-textarea"
                  value={reporteData.observaciones}
                  onChange={(e) => setReporteData({ ...reporteData, observaciones: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: "var(--familiar-color)" }}>
                  Enviar Novedad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
