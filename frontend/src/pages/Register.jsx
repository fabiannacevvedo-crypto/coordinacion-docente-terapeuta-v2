import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, GraduationCap, Stethoscope, Users, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const Register = () => {
  const [rol, setRol] = useState("DOCENTE");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    // Docente
    institucion: "",
    cue_escuela: "",
    cargo: "",
    nivel_educativo: "Primario",
    // Terapeuta
    especialidad: "Psicologia",
    matricula_tipo: "MN",
    matricula_numero: "",
    colegio_profesional: "",
    jurisdiccion: "CABA",
    // Familiar
    dni: "",
    parentesco: "MADRE",
    codigo_vinculacion: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = { ...formData, rol };
      const res = await register(payload);
      if (res.ok) {
        navigate(`/dashboard/${rol.toLowerCase()}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}>Crear Cuenta con Verificacion</h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
            Selecciona tu rol para completar los campos de validacion de identidad
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Selector Visual de Rol */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <button
            type="button"
            onClick={() => setRol("DOCENTE")}
            style={{
              padding: "0.75rem",
              borderRadius: "10px",
              border: `2px solid ${rol === "DOCENTE" ? "var(--docente-color)" : "var(--border-color)"}`,
              background: rol === "DOCENTE" ? "var(--docente-bg)" : "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <GraduationCap size={22} color={rol === "DOCENTE" ? "var(--docente-color)" : "#64748b"} />
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: rol === "DOCENTE" ? "var(--docente-color)" : "#334155" }}>Docente</span>
          </button>

          <button
            type="button"
            onClick={() => setRol("TERAPEUTA")}
            style={{
              padding: "0.75rem",
              borderRadius: "10px",
              border: `2px solid ${rol === "TERAPEUTA" ? "var(--terapeuta-color)" : "var(--border-color)"}`,
              background: rol === "TERAPEUTA" ? "var(--terapeuta-bg)" : "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Stethoscope size={22} color={rol === "TERAPEUTA" ? "var(--terapeuta-color)" : "#64748b"} />
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: rol === "TERAPEUTA" ? "var(--terapeuta-color)" : "#334155" }}>Terapeuta</span>
          </button>

          <button
            type="button"
            onClick={() => setRol("FAMILIAR")}
            style={{
              padding: "0.75rem",
              borderRadius: "10px",
              border: `2px solid ${rol === "FAMILIAR" ? "var(--familiar-color)" : "var(--border-color)"}`,
              background: rol === "FAMILIAR" ? "var(--familiar-bg)" : "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Users size={22} color={rol === "FAMILIAR" ? "var(--familiar-color)" : "#64748b"} />
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: rol === "FAMILIAR" ? "var(--familiar-color)" : "#334155" }}>Familiar</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Datos Personales Comunes */}
          <div className="grid-2" style={{ gap: "0.75rem" }}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input type="text" required name="nombre" value={formData.nombre} onChange={handleChange} className="form-input" placeholder="Juan" />
            </div>
            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input type="text" required name="apellido" value={formData.apellido} onChange={handleChange} className="form-input" placeholder="Perez" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email (preferentemente institucional si eres docente)</label>
            <input type="email" required name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="correo@institucion.edu.ar" />
          </div>

          <div className="grid-2" style={{ gap: "0.75rem" }}>
            <div className="form-group">
              <label className="form-label">Contrasenia</label>
              <input type="password" required name="password" value={formData.password} onChange={handleChange} className="form-input" placeholder="Min. 6 caracteres" />
            </div>
            <div className="form-group">
              <label className="form-label">Telefono de Contacto</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="form-input" placeholder="+54 9 11..." />
            </div>
          </div>

          {/* CAMPOS ESPECIFICOS: DOCENTE */}
          {rol === "DOCENTE" && (
            <div style={{ background: "var(--docente-bg)", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
              <div style={{ fontWeight: "700", fontSize: "0.875rem", color: "var(--docente-color)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ShieldCheck size={18} /> Validacion de Credenciales Docentes
              </div>
              <div className="form-group">
                <label className="form-label">Institucion Educativa</label>
                <input type="text" required name="institucion" value={formData.institucion} onChange={handleChange} className="form-input" placeholder="Ej: Escuela N° 12 D.E. 10" />
              </div>
              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">CUE de la Escuela (9 digitos)</label>
                  <input type="text" required maxLength={9} name="cue_escuela" value={formData.cue_escuela} onChange={handleChange} className="form-input" placeholder="020012300" />
                </div>
                <div className="form-group">
                  <label className="form-label">Cargo Docente</label>
                  <input type="text" required name="cargo" value={formData.cargo} onChange={handleChange} className="form-input" placeholder="Maestro/a de 4to A / DAI" />
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#0369a1" }}>
                * Se cotejara el CUE de la escuela con el padron educativo oficial.
              </div>
            </div>
          )}

          {/* CAMPOS ESPECIFICOS: TERAPEUTA */}
          {rol === "TERAPEUTA" && (
            <div style={{ background: "var(--terapeuta-bg)", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
              <div style={{ fontWeight: "700", fontSize: "0.875rem", color: "var(--terapeuta-color)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ShieldCheck size={18} /> Validacion de Matricula Profesional de Salud
              </div>
              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">Especialidad</label>
                  <select name="especialidad" value={formData.especialidad} onChange={handleChange} className="form-select">
                    <option value="Psicologia">Psicologia</option>
                    <option value="Psicopedagogia">Psicopedagogia</option>
                    <option value="Fonoaudiologia">Fonoaudiologia</option>
                    <option value="Terapia Ocupacional">Terapia Ocupacional</option>
                    <option value="Neurologia Infantil">Neurologia Infantil</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo de Matricula</label>
                  <select name="matricula_tipo" value={formData.matricula_tipo} onChange={handleChange} className="form-select">
                    <option value="MN">MN (Nacional)</option>
                    <option value="MP">MP (Provincial)</option>
                  </select>
                </div>
              </div>
              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">Numero de Matricula</label>
                  <input type="text" required name="matricula_numero" value={formData.matricula_numero} onChange={handleChange} className="form-input" placeholder="Ej: 48291" />
                </div>
                <div className="form-group">
                  <label className="form-label">Colegio Profesional / Entidad</label>
                  <input type="text" required name="colegio_profesional" value={formData.colegio_profesional} onChange={handleChange} className="form-input" placeholder="Colegio de Psicologos" />
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b21a8" }}>
                * Su matricula sera verificada en los registros oficiales de prestadores de salud antes de habilitar el acceso a legajos.
              </div>
            </div>
          )}

          {/* CAMPOS ESPECIFICOS: FAMILIAR */}
          {rol === "FAMILIAR" && (
            <div style={{ background: "var(--familiar-bg)", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
              <div style={{ fontWeight: "700", fontSize: "0.875rem", color: "var(--familiar-color)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ShieldCheck size={18} /> Vinculacion Familiar y Patria Potestad
              </div>
              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">DNI del Adulto Responsable</label>
                  <input type="text" required name="dni" value={formData.dni} onChange={handleChange} className="form-input" placeholder="DNI sin puntos" />
                </div>
                <div className="form-group">
                  <label className="form-label">Parentesco</label>
                  <select name="parentesco" value={formData.parentesco} onChange={handleChange} className="form-select">
                    <option value="MADRE">Madre</option>
                    <option value="PADRE">Padre</option>
                    <option value="TUTOR_LEGAL">Tutor Legal / Guardador</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Codigo de Vinculacion Escolar (Opcional)</label>
                <input type="text" name="codigo_vinculacion" value={formData.codigo_vinculacion} onChange={handleChange} className="form-input" placeholder="Ej: FAM-LUCAS (provisto por la escuela)" />
              </div>
              <div style={{ fontSize: "0.75rem", color: "#065f46" }}>
                * Si la escuela ya te entrego el codigo familiar, quedaras vinculado automaticamente a tu hijo/a.
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ padding: "0.75rem" }}>
            {loading ? "Registrando..." : "Completar Registro"} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: "700" }}>
            Inicia sesion
          </Link>
        </div>
      </div>
    </div>
  );
};
