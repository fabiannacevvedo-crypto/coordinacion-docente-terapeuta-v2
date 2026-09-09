import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { ShieldCheck, Check, X, CheckCircle2 } from "lucide-react";

export const AdminVerificaciones = () => {
  const [pendientes, setPendientes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [resPendientes, resStats] = await Promise.all([
        api.getUsuariosPendientes(),
        api.getEstadisticas(),
      ]);

      if (resPendientes.ok) setPendientes(resPendientes.usuarios || []);
      if (resStats.ok) setStats(resStats.estadisticas);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleVerificar = async (usuarioId, nuevoEstado) => {
    try {
      const res = await api.cambiarEstadoVerificacion(usuarioId, nuevoEstado, nuevoEstado === "RECHAZADO" ? "Documentacion incompleta o matricula no valida" : null);
      if (res.ok) {
        setMensaje({ tipo: "success", texto: res.mensaje });
        cargarDatos();
      }
    } catch (err) {
      setMensaje({ tipo: "danger", texto: err.message });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--admin-color)", fontWeight: "700", fontSize: "0.875rem", textTransform: "uppercase" }}>
          <ShieldCheck size={20} /> Centro de Control de Coordinacion
        </div>
        <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#0f172a" }}>
          Auditoria y Verificacion de Identidades
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Revision y aprobacion obligatoria de credenciales para Docentes, Terapeutas y Tutores Legales
        </p>
      </div>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`}>
          <CheckCircle2 size={18} /> {mensaje.texto}
        </div>
      )}

      {stats && (
        <div className="grid-3" style={{ marginBottom: "2rem" }}>
          <div className="card" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <div style={{ fontSize: "0.8125rem", color: "#1e40af", fontWeight: "700" }}>PENDIENTES DE AUDITORIA</div>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#1d4ed8" }}>{stats.pendientes}</div>
            <div style={{ fontSize: "0.75rem", color: "#60a5fa" }}>Requieren validacion manual</div>
          </div>

          <div className="card" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: "0.8125rem", color: "#166534", fontWeight: "700" }}>USUARIOS VERIFICADOS</div>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#15803d" }}>{stats.aprobados}</div>
            <div style={{ fontSize: "0.75rem", color: "#4ade80" }}>Habilitados en la plataforma</div>
          </div>

          <div className="card" style={{ background: "#faf5ff", border: "1px solid #e9d5ff" }}>
            <div style={{ fontSize: "0.8125rem", color: "#6b21a8", fontWeight: "700" }}>LEGAJOS ACTIVOS</div>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#7e22ce" }}>{stats.totalAlumnos}</div>
            <div style={{ fontSize: "0.75rem", color: "#c084fc" }}>Con reportes multidisciplinares</div>
          </div>
        </div>
      )}

      <div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
          Solicitudes de Registro en Espera ({pendientes.length})
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>Cargando solicitudes...</div>
        ) : pendientes.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <CheckCircle2 size={40} color="#10b981" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>¡Todo al dia!</h3>
            <p style={{ color: "#64748b" }}>No hay profesionales ni familiares esperando verificacion en este momento.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {pendientes.map((usuario) => {
              const rol = usuario.roles?.[0]?.name || "DESCONOCIDO";

              return (
                <div key={usuario.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <span className={`badge badge-${rol.toLowerCase()}`}>{rol}</span>
                      <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>ID #{usuario.id}</span>
                    </div>

                    <div style={{ fontSize: "1.125rem", fontWeight: "800", color: "#0f172a" }}>
                      {usuario.nombre} {usuario.apellido}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>
                      {usuario.email} · Tel: {usuario.telefono || "No especificado"}
                    </div>

                    <div style={{ marginTop: "0.75rem", background: "#f8fafc", padding: "0.6rem 0.875rem", borderRadius: "8px", fontSize: "0.8125rem" }}>
                      {rol === "DOCENTE" && usuario.perfil_docente && (
                        <div>
                          <strong>Escuela:</strong> {usuario.perfil_docente.institucion} | <strong>CUE:</strong> <code>{usuario.perfil_docente.cue_escuela}</code> | <strong>Cargo:</strong> {usuario.perfil_docente.cargo}
                        </div>
                      )}

                      {rol === "TERAPEUTA" && usuario.perfil_terapeuta && (
                        <div>
                          <strong>Especialidad:</strong> {usuario.perfil_terapeuta.especialidad} | <strong>Matricula:</strong> <code>{usuario.perfil_terapeuta.matricula_tipo} {usuario.perfil_terapeuta.matricula_numero}</code> | <strong>Colegio:</strong> {usuario.perfil_terapeuta.colegio_profesional}
                        </div>
                      )}

                      {rol === "FAMILIAR" && usuario.perfil_familiar && (
                        <div>
                          <strong>Parentesco:</strong> {usuario.perfil_familiar.parentesco} | <strong>DNI:</strong> <code>{usuario.perfil_familiar.dni}</code>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleVerificar(usuario.id, "RECHAZADO")}
                      className="btn btn-danger"
                      style={{ padding: "0.5rem 0.875rem", fontSize: "0.8125rem" }}
                    >
                      <X size={16} /> Rechazar
                    </button>
                    <button
                      onClick={() => handleVerificar(usuario.id, "APROBADO")}
                      className="btn btn-success"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                    >
                      <Check size={16} /> Aprobar Credenciales
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
