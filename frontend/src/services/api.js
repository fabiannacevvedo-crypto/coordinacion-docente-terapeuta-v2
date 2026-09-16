const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("rednec_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Envia y recibe cookies HttpOnly
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && endpoint !== "/auth/login") {
      localStorage.removeItem("rednec_token");
    }
    const errorMsg = data.errores
      ? data.errores.map((e) => e.mensaje).join(", ")
      : data.mensaje || "Error en la comunicacion con el servidor";
    throw new Error(errorMsg);
  }

  return data;
};

export const api = {
  // Autenticacion
  login: (credentials) => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (userData) => request("/auth/register", { method: "POST", body: JSON.stringify(userData) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  getPerfil: () => request("/auth/perfil"),

  // Alumnos
  getMisAlumnos: () => request("/alumnos"),
  crearAlumno: (alumno) => request("/alumnos", { method: "POST", body: JSON.stringify(alumno) }),
  vincularAlumno: (codigo) => request("/alumnos/vincular", { method: "POST", body: JSON.stringify({ codigo }) }),

  // Reportes
  getReportesAlumno: (alumnoId) => request(`/reportes/alumno/${alumnoId}`),
  crearReporte: (reporte) => request("/reportes", { method: "POST", body: JSON.stringify(reporte) }),

  // Administrador / Verificaciones
  getUsuariosPendientes: () => request("/admin/usuarios-pendientes"),
  cambiarEstadoVerificacion: (id, nuevo_estado, motivo) =>
    request(`/admin/usuarios/${id}/verificacion`, {
      method: "PATCH",
      body: JSON.stringify({ nuevo_estado, motivo }),
    }),
  getEstadisticas: () => request("/admin/estadisticas"),
};
