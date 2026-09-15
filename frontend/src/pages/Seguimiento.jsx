import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { SemaforoBadge } from "../components/common/SemaforoBadge";
import {
  Activity,
  Users,
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  PlusCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export const Seguimiento = () => {
  const { isAuthenticated, user, isVerified } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroSemaforo, setFiltroSemaforo] = useState("TODOS");

  useEffect(() => {
    const cargarDatos = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await api.getMisAlumnos();
        if (res.ok) {
          setAlumnos(res.alumnos || []);
        }
      } catch (err) {
        console.error("Error al cargar alumnos para seguimiento:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [isAuthenticated]);

  // Calculos de metricas
  const totalAlumnos = alumnos.length;
  let totalObservaciones = 0;
  let buenProgresoCount = 0;
  let atencionCount = 0;

  alumnos.forEach((al) => {
    const reps = al.reportes || [];
    totalObservaciones += reps.length;
    const ultimoRep = reps[0];
    if (ultimoRep) {
      if (ultimoRep.semaforo === "bueno") buenProgresoCount++;
      if (ultimoRep.semaforo === "atencion" || ultimoRep.semaforo === "regular") atencionCount++;
    }
  });

  // Filtrado de alumnos
  const alumnosFiltrados = alumnos.filter((al) => {
    const coincideTexto =
      `${al.nombre} ${al.apellido} ${al.escuela} ${al.grado_sala} ${al.dni}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    if (!coincideTexto) return false;

    if (filtroSemaforo === "TODOS") return true;
    const ult = al.reportes && al.reportes[0];
    if (!ult) return filtroSemaforo === "SIN_REPORTE";
    if (filtroSemaforo === "BUENO") return ult.semaforo === "bueno";
    if (filtroSemaforo === "ATENCION") return ult.semaforo === "atencion" || ult.semaforo === "regular";
    return true;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Hero Seguimiento */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d9488 100%)",
          color: "white",
          borderRadius: "1.25rem",
          padding: "3.5rem 2rem",
          textAlign: "center",
          marginBottom: "2.5rem",
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
          <Sparkles size={16} /> Monitor Global de Evolución
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", lineHeight: 1.2, marginBottom: "0.75rem" }}>
          Seguimiento de Alumnos
        </h1>
        <p style={{ fontSize: "1.125rem", maxWidth: "680px", margin: "0 auto", opacity: 0.9, lineHeight: 1.6 }}>
          Un solo lugar para evaluar avances, registrar observaciones multidisciplinares y monitorear semáforos de alerta temprana.
        </p>
      </section>

      {/* Tarjetas de Estadisticas (KPIs) */}
      <section style={{ marginBottom: "2.5rem" }}>
        <div className="grid-4" style={{ gap: "1rem" }}>
          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary)" }}>
              {isAuthenticated ? totalAlumnos : "4"}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem", fontWeight: "600" }}>
              Alumnos Activos
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#0d9488" }}>
              {isAuthenticated ? totalObservaciones : "18"}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem", fontWeight: "600" }}>
              Observaciones (Mes)
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#10b981" }}>
              {isAuthenticated ? buenProgresoCount : "3"}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem", fontWeight: "600" }}>
              Progreso Sostenido
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#f59e0b" }}>
              {isAuthenticated ? atencionCount : "1"}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem", fontWeight: "600" }}>
              Requieren Atención
            </div>
          </div>
        </div>
      </section>

      {/* Si no esta autenticado, invitar a loguearse */}
      {!isAuthenticated ? (
        <section className="card" style={{ padding: "3rem 2rem", textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ maxWidth: "580px", margin: "0 auto" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--primary-light)",
                color: "var(--primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Users size={32} />
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.75rem" }}>
              Iniciá sesión para acceder al panel de seguimiento en vivo
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1.75rem" }}>
              Por normativas de protección de datos de menores (Ley 26.061), los legajos y reportes confidenciales solo son visibles para profesionales y tutores autorizados.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/login" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
                Iniciar Sesión <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
                Crear Cuenta Nueva
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Vista cuando esta autenticado */
        <section>
          {/* Barra de Filtros y Buscador */}
          <div
            className="card"
            style={{
              padding: "1.25rem",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Buscador */}
            <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
              <Search
                size={18}
                color="#94a3b8"
                style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Buscar por nombre, DNI, escuela..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem 0.6rem 2.25rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            {/* Filtros de semaforo */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setFiltroSemaforo("TODOS")}
                className={`btn ${filtroSemaforo === "TODOS" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                Todos ({alumnos.length})
              </button>
              <button
                onClick={() => setFiltroSemaforo("BUENO")}
                className={`btn ${filtroSemaforo === "BUENO" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                🟢 Buen Progreso
              </button>
              <button
                onClick={() => setFiltroSemaforo("ATENCION")}
                className={`btn ${filtroSemaforo === "ATENCION" ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
              >
                🟡🔴 Requieren Atención
              </button>
            </div>
          </div>

          {/* Listado de Alumnos */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
              Cargando nómina de alumnos vinculados...
            </div>
          ) : alumnosFiltrados.length === 0 ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ color: "#64748b", marginBottom: "1rem" }}>
                No se encontraron alumnos con el criterio de búsqueda o filtro seleccionado.
              </div>
              <button onClick={() => { setBusqueda(""); setFiltroSemaforo("TODOS"); }} className="btn btn-secondary">
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {alumnosFiltrados.map((alumno) => {
                const ultReporte = alumno.reportes && alumno.reportes[0];
                return (
                  <div
                    key={alumno.id}
                    className="card"
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      {/* Avatar con Iniciales */}
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                          fontWeight: "800",
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {alumno.nombre.charAt(0)}{alumno.apellido.charAt(0)}
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                            {alumno.nombre} {alumno.apellido}
                          </h3>
                          {alumno.cud_vigente && (
                            <span className="badge" style={{ background: "#f1f5f9", color: "#475569", fontSize: "0.75rem" }}>
                              CUD Vigente
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem" }}>
                          DNI: {alumno.dni} · {alumno.grado_sala} · {alumno.escuela}
                        </div>
                      </div>
                    </div>

                    {/* Estado de Semáforo y Enlace */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.25rem" }}>
                          ÚLTIMO ESTADO
                        </div>
                        <SemaforoBadge estado={ultReporte?.semaforo || "bueno"} />
                      </div>

                      <Link
                        to={`/alumnos/${alumno.id}`}
                        className="btn btn-primary"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 0.875rem", fontSize: "0.875rem" }}
                      >
                        Ver Legajo <ExternalLink size={15} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Seguimiento;
