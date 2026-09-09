import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, GraduationCap, Stethoscope, Users, CheckCircle2, Lock, FileText, ArrowRight } from "lucide-react";

export const GuiaVerificacion = () => {
  return (
    <div style={{ maxWidth: "880px", margin: "1rem auto 3rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)", marginBottom: "0.5rem" }}>
          Seguridad & Confiabilidad
        </span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a" }}>
          Protocolo de Verificacion de Identidad y Roles
        </h1>
        <p style={{ fontSize: "1rem", color: "#64748b", maxWidth: "650px", margin: "0.5rem auto 0" }}>
          ¿Como garantiza el sistema que quien se registra como Docente es realmente docente, el Terapeuta es profesional habilitado y el Familiar tiene la patria potestad?
        </p>
      </div>

      {/* Explicacion 1: Docente */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ background: "var(--docente-bg)", color: "var(--docente-color)", padding: "0.6rem", borderRadius: "10px" }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>1. Verificacion del Docente</h2>
            <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>Proteccion del entorno escolar y confidencialidad</div>
          </div>
        </div>

        <p style={{ fontSize: "0.9375rem", color: "#334155", marginBottom: "1rem", lineHeight: 1.6 }}>
          Para evitar que cualquier persona ingrese afirmando ser docente de un grado y acceda a legajos de ninos:
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>CUE Escolar Obligatorio:</strong> Se valida que el Codigo Unico de Establecimiento (9 digitos) pertenezca al padron oficial de escuelas activas.</span>
          </li>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Filtrado de Correo Institucional:</strong> Preferencia por dominios educativos autorizados (ej: <code>@bue.edu.ar</code>, <code>@abc.gob.ar</code>).</span>
          </li>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Aprobacion Directiva / Coordinacion:</strong> El usuario se registra en estado <code>PENDIENTE</code> hasta que el directivo de la escuela o el administrador de la red confirma su cargo.</span>
          </li>
        </ul>
      </div>

      {/* Explicacion 2: Terapeuta */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ background: "var(--terapeuta-bg)", color: "var(--terapeuta-color)", padding: "0.6rem", borderRadius: "10px" }}>
            <Stethoscope size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>2. Verificacion del Terapeuta</h2>
            <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>Cotejo de matriculas y secreto profesional de salud</div>
          </div>
        </div>

        <p style={{ fontSize: "0.9375rem", color: "#334155", marginBottom: "1rem", lineHeight: 1.6 }}>
          Los terapeutas manipulan diagnosticos neurocognitivos y pautas terapeuticas:
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--terapeuta-color)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Matricula Oficial (MN / MP):</strong> Registro obligatorio del numero de matricula, tipo y colegio profesional emisor.</span>
          </li>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--terapeuta-color)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Auditoria en SISA / Registro Federal:</strong> Los coordinadores cotejan la matricula contra el Sistema Integrado de Informacion Sanitaria Argentino.</span>
          </li>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--terapeuta-color)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Consentimiento Parental (Doble Factor):</strong> Un terapeuta, aun verificado, NO ve a todos los ninos. Solo accede a aquel alumno cuya familia le proveyo el <strong>Codigo de Vinculacion de Equipo</strong>.</span>
          </li>
        </ul>
      </div>

      {/* Explicacion 3: Familiar */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ background: "var(--familiar-bg)", color: "var(--familiar-color)", padding: "0.6rem", borderRadius: "10px" }}>
            <Users size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>3. Verificacion del Familiar / Tutor</h2>
            <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>Garantia de patria potestad y custodia legal</div>
          </div>
        </div>

        <p style={{ fontSize: "0.9375rem", color: "#334155", marginBottom: "1rem", lineHeight: 1.6 }}>
          Para evitar que terceros no autorizados o personas con impedimentos legales reclamen ser los padres de un menor:
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--familiar-color)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Token de Vinculacion Escolar Presencial:</strong> La escuela (que posee los legajos fisicos y la constancia de matriculacion legal) emite un codigo unico e irrepetible para la familia (ej: <code>FAM-LUCAS</code>).</span>
          </li>
          <li style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
            <CheckCircle2 size={18} color="var(--familiar-color)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span><strong>Cotejo de DNI y Tutela:</strong> El DNI del tutor y del menor quedan asentados para validar cualquier solicitud extraordinaria.</span>
          </li>
        </ul>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/register" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
          Comenzar Registro Seguro <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};
