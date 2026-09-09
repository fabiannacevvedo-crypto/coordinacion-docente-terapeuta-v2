import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al cargar, verificar si hay sesion activa
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("rednec_token");
        if (token) {
          const res = await api.getPerfil();
          if (res.ok && res.usuario) {
            setUser(res.usuario);
            const userRoles = res.usuario.roles ? res.usuario.roles.map((r) => r.name) : [];
            setRoles(userRoles);
            setActiveRole(userRoles[0] || null);
          }
        }
      } catch (err) {
        console.warn("Sesion expirada o no autenticado:", err.message);
        localStorage.removeItem("rednec_token");
        setUser(null);
        setRoles([]);
        setActiveRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.ok && res.token) {
      localStorage.setItem("rednec_token", res.token);
      setUser(res.usuario);
      setRoles(res.usuario.roles || []);
      setActiveRole(res.usuario.roles?.[0] || null);
    }
    return res;
  };

  const register = async (formData) => {
    const res = await api.register(formData);
    if (res.ok && res.token) {
      localStorage.setItem("rednec_token", res.token);
      setUser(res.usuario);
      setRoles(res.usuario.roles || []);
      setActiveRole(res.usuario.roles?.[0] || null);
    }
    return res;
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // Ignorar error al cerrar
    }
    localStorage.removeItem("rednec_token");
    setUser(null);
    setRoles([]);
    setActiveRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        activeRole,
        setActiveRole,
        isAuthenticated: !!user,
        isVerified: user?.estado_verificacion === "APROBADO" || roles.includes("ADMIN"),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
