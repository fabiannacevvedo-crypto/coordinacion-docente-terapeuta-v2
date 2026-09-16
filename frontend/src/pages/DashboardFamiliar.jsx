import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import {
  Users,
  Copy,
  Check,
  PlusCircle,
  FileText,
  Link2,
  CheckCircle2,
  Heart,
  Sparkles,
  Award,
  Sun,
  Smile,
  Meh,
  Frown,
  Lightbulb,
  Calendar,
  Share2,
  ThumbsUp,
  BookmarkCheck,
  Clock,
  ShieldAlert,
} from "lucide-react";

export const DashboardFamiliar = () => {
  const { user } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState("bitacora"); // 'bitacora' | 'logros' | 'consejos'

  // Reacciones locales interactivas para que el familiar interactue en 1 clic
  const [reacciones, setReacciones] = useState({
    docente_1: { count: 3, userReacted: false },
    terapeuta_1: { count: 2, userReacted: false },
  });

  // Modal para reporte familiar con selector de caritas
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [caritaSeleccionada, setCaritaSeleccionada] = useState("bueno");
  const [reporteData, setReporteData] = useState({
    titulo: "",
    observaciones: "",
    estrategia_sugerida: "",
  });
  const [successMsg, setSuccessMsg] = useState(false);
  const [celebrando, setCelebrando] = useState(false);

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
      console.error("Error al cargar alumnos:", err);
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
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleReaccionar = (idKey) => {
    setReacciones((prev) => {
      const actual = prev[idKey] || { count: 0, userReacted: false };
      return {
        ...prev,
        [idKey]: {
          count: actual.userReacted ? actual.count - 1 : actual.count + 1,
          userReacted: !actual.userReacted,
        },
      };
    });
  };

  const celebrarLogro = () => {
    setCelebrando(true);
    setTimeout(() => setCelebrando(false), 3000);
  };

  const handleCrearReporteFamiliar = async (e) => {
    e.preventDefault();
    try {
      await api.crearReporte({
        alumno_id: selectedAlumno.id,
        tipo: "FAMILIAR",
        titulo:
          reporteData.titulo ||
          (caritaSeleccionada === "bueno"
            ? "Día muy positivo en casa"
            : caritaSeleccionada === "regular"
            ? "Día tranquilo con necesidad de descanso"
            : "Momento de apoyo requerido en casa"),
        semaforo: caritaSeleccionada,
        observaciones: reporteData.observaciones,
        estrategia_sugerida: reporteData.estrategia_sugerida,
      });

      setSuccessMsg(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg(false);
        setReporteData({ titulo: "", observaciones: "", estrategia_sugerida: "" });
        setCaritaSeleccionada("bueno");
        cargarAlumnos();
      }, 1200);
    } catch (err) {
      alert("Error al enviar la nota: " + err.message);
    }
  };

  const handleVincular = async (e) => {
    e.preventDefault();
    setLinkError(null);
    setLinkSuccess(false);

    try {
      await api.vincularAlumno(codigoVinculo.trim().toUpperCase());
      setLinkSuccess(true);
      setCodigoVinculo("");
      setTimeout(() => {
        setShowLinkModal(false);
        setLinkSuccess(false);
        cargarAlumnos();
      }, 1500);
    } catch (err) {
      setLinkError(err.message);
    }
  };

  return (
    <div>
      {/* BANNER DE CELEBRACIÓN / CONFETI INTERACTIVO */}
      {celebrando && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "9999px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontWeight: "700",
            fontSize: "1.1rem",
            animation: "pulse-gentle 1s ease-in-out infinite",
          }}
        >
          <Sparkles size={24} /> ¡Qué alegría! Celebrando en familia este gran avance 🎉✨
        </div>
      )}

      {/* HEADER AMIGABLE Y ACOGEDOR */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ffffff 100%)",
          borderColor: "#a7f3d0",
          padding: "2rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "white", border: "1px solid #d1fae5", padding: "0.3rem 0.9rem", borderRadius: "9999px", color: "#065f46", fontWeight: "700", fontSize: "0.8125rem", marginBottom: "0.75rem" }}>
              <Sun size={16} color="#059669" /> Espacio Familiar · Comunidad RedNeC
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "#064e3b", marginBottom: "0.35rem" }}>
              ¡Hola, {user?.nombre || "Familia"}! 🏡
            </h1>
            <p style={{ fontSize: "1rem", color: "#374151", maxWidth: "680px", lineHeight: "1.6" }}>
              Te damos la bienvenida a tu portal familiar. Aquí podés ver de forma simple y clara los logros de tus hijos, cómo van en la escuela y qué recomiendan sus terapeutas para el día a día.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              onClick={() => setShowLinkModal(true)}
              className="btn btn-success"
              style={{ padding: "0.75rem 1.4rem", fontSize: "0.95rem", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)" }}
            >
              <Link2 size={18} /> Vincular Hijo/a con Código Escolar
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#64748b" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌱</div>
          Cargando la información familiar...
        </div>
      ) : alumnos.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 2rem", background: "#f8fafc" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎒</div>
          <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>
            Aún no tienes hijos vinculados en el sistema
          </h3>
          <p style={{ color: "#64748b", maxWidth: "480px", margin: "0 auto 1.5rem auto", lineHeight: "1.6" }}>
            Para ver el seguimiento en tiempo real, ingresa el código escolar que te entregó la institución educativa (ej: <strong>FAM-LUCAS</strong>).
          </p>
          <button onClick={() => setShowLinkModal(true)} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
            <Link2 size={18} /> Ingresar Código Escolar
          </button>
        </div>
      ) : (
        alumnos.map((alumno) => {
          const reportes = alumno.reportes || [];
          const ultimoDocente = reportes.find((r) => r.tipo === "PEDAGOGICO");
          const ultimoTerapeuta = reportes.find((r) => r.tipo === "TERAPEUTICO");
          const ultimoFamiliar = reportes.find((r) => r.tipo === "FAMILIAR");

          // Cálculo del medidor de bienestar positivo
          const totalReportes = reportes.length;
          const positivos = reportes.filter((r) => r.semaforo === "bueno").length;
          const porcentajePositivo = totalReportes > 0 ? Math.round((positivos / totalReportes) * 100) : 90;

          return (
            <div key={alumno.id} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* TARJETA PRINCIPAL DEL ALUMNO */}
              <div className="card interactive-card" style={{ padding: "2rem", border: "2px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #0284c7, #0369a1)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.8rem",
                        fontWeight: "900",
                        boxShadow: "0 6px 16px rgba(2, 132, 199, 0.25)",
                      }}
                    >
                      {alumno.nombre.charAt(0)}
                    </div>
                    <div>
                      <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0f172a", marginBottom: "0.25rem" }}>
                        {alumno.nombre} {alumno.apellido}
                      </h2>
                      <div style={{ fontSize: "0.9375rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: "700", color: "#0284c7" }}>{alumno.grado_sala}</span>
                        <span>•</span>
                        <span>{alumno.escuela}</span>
                      </div>
                    </div>
                  </div>

                  {/* CÓDIGO COMPARTIBLE CON EL TERAPEUTA */}
                  <div style={{ background: "#f0fdf4", border: "2px dashed #86efac", padding: "0.75rem 1.25rem", borderRadius: "14px", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#166534", textTransform: "uppercase" }}>
                        Código para tus terapeutas:
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: "1.25rem", fontWeight: "900", color: "#15803d" }}>
                        {alumno.codigo_equipo}
                      </div>
                    </div>
                    <button
                      onClick={() => copiarAlPortapapeles(alumno.codigo_equipo)}
                      className="btn btn-secondary"
                      style={{ background: "white", padding: "0.5rem 0.8rem", fontSize: "0.8125rem", fontWeight: "700" }}
                      title="Copiar código para enviar por WhatsApp"
                    >
                      {copiedCode === alumno.codigo_equipo ? (
                        <span style={{ color: "#16a34a", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Check size={16} /> ¡Copiado!
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Copy size={16} /> Copiar
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMÓMETRO / MEDIDOR VISUAL DE BIENESTAR */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.25rem 1.5rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "800", color: "#1e293b", fontSize: "0.95rem" }}>
                      <Sparkles size={18} color="#f59e0b" /> Medidor de Adaptación y Bienestar General:
                    </div>
                    <span style={{ fontWeight: "900", fontSize: "1.1rem", color: "#059669" }}>
                      {porcentajePositivo}% Positivo
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${porcentajePositivo}%` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#64748b", marginTop: "0.5rem" }}>
                    <span>🌱 Adaptación continua en aula</span>
                    <span>🌟 {positivos} reportes con semáforo verde de {totalReportes} totales</span>
                  </div>
                </div>

                {/* SELECTOR DE PESTAÑAS INTERACTIVAS */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setActiveTab("bitacora")}
                    className={`tab-pill ${activeTab === "bitacora" ? "active" : ""}`}
                  >
                    <Clock size={16} /> Novedades Recientes ({reportes.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("logros")}
                    className={`tab-pill ${activeTab === "logros" ? "active" : ""}`}
                  >
                    <Award size={16} color="#eab308" /> Muro de Logros & Medallas
                  </button>
                  <button
                    onClick={() => setActiveTab("consejos")}
                    className={`tab-pill ${activeTab === "consejos" ? "active" : ""}`}
                  >
                    <Lightbulb size={16} color="#0284c7" /> Consejos para el Hogar
                  </button>
                </div>

                {/* CONTENIDO 1: NOVEDADES RECIENTES DE ESCUELA Y TERAPIA */}
                {activeTab === "bitacora" && (
                  <div>
                    <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
                      {/* TARJETA DOCENTE */}
                      <div
                        style={{
                          background: "#f0f9ff",
                          border: "2px solid #bae6fd",
                          padding: "1.5rem",
                          borderRadius: "16px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                            <span className="badge badge-docente" style={{ fontSize: "0.8125rem", padding: "0.35rem 0.75rem" }}>
                              🏫 Desde la Escuela
                            </span>
                            {ultimoDocente && <SemaforoBadge estado={ultimoDocente.semaforo} />}
                          </div>

                          {ultimoDocente ? (
                            <div>
                              <h4 style={{ fontWeight: "800", fontSize: "1.1rem", color: "#0369a1", marginBottom: "0.4rem" }}>
                                {ultimoDocente.titulo}
                              </h4>
                              <p style={{ fontSize: "0.9375rem", color: "#1e293b", lineHeight: "1.6", marginBottom: "0.75rem" }}>
                                "{ultimoDocente.observaciones}"
                              </p>
                              {ultimoDocente.estrategia_sugerida && (
                                <div style={{ background: "white", borderLeft: "4px solid #0284c7", padding: "0.75rem 1rem", borderRadius: "0 8px 8px 0", fontSize: "0.85rem", color: "#0c4a6e", marginBottom: "1rem" }}>
                                  💡 <strong>Consejo del Docente:</strong> {ultimoDocente.estrategia_sugerida}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Sin reportes de la escuela aún.</p>
                          )}
                        </div>

                        {/* REACCIÓN RÁPIDA DE FAMILIA */}
                        {ultimoDocente && (
                          <div style={{ borderTop: "1px solid #e0f2fe", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>¿Leíste la nota?</span>
                            <button
                              onClick={() => handleReaccionar("docente_1")}
                              className={`reaction-pill ${reacciones.docente_1.userReacted ? "reacted" : ""}`}
                            >
                              <ThumbsUp size={14} /> {reacciones.docente_1.userReacted ? "¡Leído por mamá/papá!" : "Confirmar lectura"} ({reacciones.docente_1.count})
                            </button>
                          </div>
                        )}
                      </div>

                      {/* TARJETA TERAPÉUTICA */}
                      <div
                        style={{
                          background: "#faf5ff",
                          border: "2px solid #e9d5ff",
                          padding: "1.5rem",
                          borderRadius: "16px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                            <span className="badge badge-terapeuta" style={{ fontSize: "0.8125rem", padding: "0.35rem 0.75rem" }}>
                              🩺 Desde la Terapia
                            </span>
                            {ultimoTerapeuta && <SemaforoBadge estado={ultimoTerapeuta.semaforo} />}
                          </div>

                          {ultimoTerapeuta ? (
                            <div>
                              <h4 style={{ fontWeight: "800", fontSize: "1.1rem", color: "#6b21a8", marginBottom: "0.4rem" }}>
                                {ultimoTerapeuta.titulo}
                              </h4>
                              <p style={{ fontSize: "0.9375rem", color: "#1e293b", lineHeight: "1.6", marginBottom: "0.75rem" }}>
                                "{ultimoTerapeuta.observaciones}"
                              </p>
                              {ultimoTerapeuta.estrategia_sugerida && (
                                <div style={{ background: "white", borderLeft: "4px solid #7c3aed", padding: "0.75rem 1rem", borderRadius: "0 8px 8px 0", fontSize: "0.85rem", color: "#4c1d95", marginBottom: "1rem" }}>
                                  🎯 <strong>Pauta para el Hogar:</strong> {ultimoTerapeuta.estrategia_sugerida}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Sin notas terapéuticas aún.</p>
                          )}
                        </div>

                        {/* REACCIÓN RÁPIDA DE FAMILIA */}
                        {ultimoTerapeuta && (
                          <div style={{ borderTop: "1px solid #f3e8ff", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Pauta recibida</span>
                            <button
                              onClick={() => handleReaccionar("terapeuta_1")}
                              className={`reaction-pill ${reacciones.terapeuta_1.userReacted ? "reacted" : ""}`}
                            >
                              <Heart size={14} color="#ec4899" fill={reacciones.terapeuta_1.userReacted ? "#ec4899" : "none"} /> {reacciones.terapeuta_1.userReacted ? "¡Lo aplicaremos!" : "Agradecer pauta"} ({reacciones.terapeuta_1.count})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENIDO 2: MURO DE LOGROS & MEDALLAS (GAMIFICACIÓN Y MOTIVACIÓN) */}
                {activeTab === "logros" && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.9rem", color: "#475569", margin: 0 }}>
                        Medallas ganadas por {alumno.nombre} por sus avances y esfuerzos continuos:
                      </p>
                      <button onClick={celebrarLogro} className="btn btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.8125rem" }}>
                        🎉 ¡Celebrar con Confeti!
                      </button>
                    </div>

                    <div className="grid-3">
                      <div className="badge-logro">
                        <div style={{ fontSize: "2.5rem" }}>🌟</div>
                        <div>
                          <h4 style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.95rem" }}>Participación en Clase</h4>
                          <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Trabajó con pictogramas durante 35 minutos continuos sin frustración.</p>
                        </div>
                      </div>

                      <div className="badge-logro">
                        <div style={{ fontSize: "2.5rem" }}>🎧</div>
                        <div>
                          <h4 style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.95rem" }}>Autorregulación Sensorial</h4>
                          <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Aceptó y usó sus protectores auditivos de forma preventiva frente a ruidos.</p>
                        </div>
                      </div>

                      <div className="badge-logro">
                        <div style={{ fontSize: "2.5rem" }}>🧩</div>
                        <div>
                          <h4 style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.95rem" }}>Rutinas en Casa</h4>
                          <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Completó sus actividades en bloques de 15 minutos con pausas activas.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENIDO 3: CONSEJOS PRÁCTICOS PARA CASA */}
                {activeTab === "consejos" && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div className="grid-2">
                      <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "1.25rem", borderRadius: "14px" }}>
                        <h4 style={{ color: "#065f46", fontWeight: "800", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <CheckCircle2 size={18} /> Pauta de Comunicación Positiva
                        </h4>
                        <p style={{ fontSize: "0.875rem", color: "#1e293b", lineHeight: "1.5" }}>
                          Cuando le des una consigna, ponte a su altura visual y utiliza frases cortas. Por ejemplo: <em>"Primero guardamos los lápices, después jugamos"</em>.
                        </p>
                      </div>

                      <div style={{ background: "#fef3c7", border: "1px solid #fde68a", padding: "1.25rem", borderRadius: "14px" }}>
                        <h4 style={{ color: "#92400e", fontWeight: "800", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Lightbulb size={18} /> Transición sin Sorpresas
                        </h4>
                        <p style={{ fontSize: "0.875rem", color: "#1e293b", lineHeight: "1.5" }}>
                          Anticípale 5 minutos antes de cambiar de actividad. Un temporizador en el celular con sonido suave ayuda a evitar momentos de agobio.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* BOTONERA INFERIOR PRINCIPAL */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem" }}>
                  <Link to={`/alumnos/${alumno.id}`} className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: "700" }}>
                    <FileText size={18} color="#0284c7" /> Ver Historial y Bitácora Completa
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedAlumno(alumno);
                      setShowModal(true);
                    }}
                    className="btn btn-primary"
                    style={{
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.95rem",
                      background: "linear-gradient(135deg, #0284c7, #0369a1)",
                      boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <PlusCircle size={20} /> Contar cómo estuvo {alumno.nombre} en casa
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* MODAL INTERACTIVO CON SELECTOR DE EMOJIS (FÁCIL Y ATRACTIVO) */}
      {showModal && selectedAlumno && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "560px", width: "100%", padding: "2rem", borderRadius: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <span className="badge badge-familiar" style={{ marginBottom: "0.25rem" }}>Aporte de la Familia</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a" }}>
                  ¿Cómo estuvo {selectedAlumno.nombre} hoy?
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ fontSize: "1.5rem", color: "#94a3b8", width: "36px", height: "36px", borderRadius: "50%", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ✕
              </button>
            </div>

            {successMsg && (
              <div className="alert alert-success" style={{ animation: "pulse-gentle 0.5s ease" }}>
                <CheckCircle2 size={20} /> ¡Nota enviada con éxito! La maestra y los terapeutas ya pueden verla.
              </div>
            )}

            <form onSubmit={handleCrearReporteFamiliar}>
              {/* SELECTOR DE CARITAS / EMOJIS DINÁMICOS */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="form-label" style={{ fontWeight: "700", marginBottom: "0.5rem" }}>
                  1. Selecciona cómo se sintió hoy en casa:
                </label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="button"
                    onClick={() => setCaritaSeleccionada("bueno")}
                    className={`emoji-selector-btn ${caritaSeleccionada === "bueno" ? "active-bueno" : ""}`}
                  >
                    <span style={{ fontSize: "2.2rem" }}>😊</span>
                    <span style={{ fontWeight: "800", fontSize: "0.875rem", color: "#065f46" }}>¡Muy Bien!</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Contento y con rutinas estables</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCaritaSeleccionada("regular")}
                    className={`emoji-selector-btn ${caritaSeleccionada === "regular" ? "active-regular" : ""}`}
                  >
                    <span style={{ fontSize: "2.2rem" }}>😐</span>
                    <span style={{ fontWeight: "800", fontSize: "0.875rem", color: "#92400e" }}>Tranquilo</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Cansado o con sensibilidad</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCaritaSeleccionada("atencion")}
                    className={`emoji-selector-btn ${caritaSeleccionada === "atencion" ? "active-atencion" : ""}`}
                  >
                    <span style={{ fontSize: "2.2rem" }}>😟</span>
                    <span style={{ fontWeight: "800", fontSize: "0.875rem", color: "#991b1b" }}>Necesita Apoyo</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Frustración o cambio de rutina</span>
                  </button>
                </div>
              </div>

              {/* DETALLE AMIGABLE */}
              <div className="form-group">
                <label className="form-label">
                  2. ¿Qué te gustaría compartir con la maestra y terapeutas?
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ej: Anoche durmió muy bien. Desayunó tranquilo y tiene muchas ganas de la clase de dibujo..."
                  className="form-textarea"
                  style={{ fontSize: "0.9375rem", lineHeight: "1.5" }}
                  value={reporteData.observaciones}
                  onChange={(e) => setReporteData({ ...reporteData, observaciones: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "0.75rem 1.75rem", fontSize: "0.95rem", background: "#059669" }}
                >
                  ✨ Enviar Nota al Equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VINCULAR ALUMNO POR CÓDIGO */}
      {showLinkModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div className="card" style={{ maxWidth: "480px", width: "100%", padding: "2rem", borderRadius: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <span className="badge badge-familiar" style={{ marginBottom: "0.25rem" }}>Acceso Escolar</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a" }}>
                  Vincular Hijo/a con Código
                </h3>
              </div>
              <button onClick={() => setShowLinkModal(false)} style={{ fontSize: "1.5rem", color: "#94a3b8" }}>✕</button>
            </div>

            {linkError && <div className="alert alert-danger">{linkError}</div>}
            {linkSuccess && (
              <div className="alert alert-success">
                <CheckCircle2 size={18} /> ¡Vinculación confirmada exitosamente!
              </div>
            )}

            <form onSubmit={handleVincular}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: "700" }}>Código Escolar Familiar:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: FAM-LUCAS o FAM-SOFIA"
                  className="form-input"
                  style={{ textTransform: "uppercase", letterSpacing: "2px", fontFamily: "monospace", fontSize: "1.1rem", textAlign: "center", padding: "0.75rem" }}
                  value={codigoVinculo}
                  onChange={(e) => setCodigoVinculo(e.target.value)}
                />
                <p style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.5rem", textAlign: "center" }}>
                  Ingresa el código que te entregó la institución educativa en la inscripción.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button type="button" onClick={() => setShowLinkModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
                  Confirmar Vinculación
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
