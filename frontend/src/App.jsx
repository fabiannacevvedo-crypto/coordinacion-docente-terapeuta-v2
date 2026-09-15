import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { GuiaVerificacion } from "./pages/GuiaVerificacion";
import { Informacion } from "./pages/Informacion";
import { Contacto } from "./pages/Contacto";
import { Seguimiento } from "./pages/Seguimiento";
import { DashboardDocente } from "./pages/DashboardDocente";
import { DashboardTerapeuta } from "./pages/DashboardTerapeuta";
import { DashboardFamiliar } from "./pages/DashboardFamiliar";
import { AdminVerificaciones } from "./pages/AdminVerificaciones";
import { AlumnoDetalle } from "./pages/AlumnoDetalle";

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div style={{ textAlign: "center", padding: "4rem" }}>Cargando sesion...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Rutas Publicas */}
              <Route path="/" element={<Home />} />
              <Route path="/informacion" element={<Informacion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/seguimiento" element={<Seguimiento />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/guia-verificacion" element={<GuiaVerificacion />} />

              {/* Rutas Privadas por Rol */}
              <Route
                path="/dashboard/docente"
                element={
                  <PrivateRoute>
                    <DashboardDocente />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/terapeuta"
                element={
                  <PrivateRoute>
                    <DashboardTerapeuta />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/familiar"
                element={
                  <PrivateRoute>
                    <DashboardFamiliar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <PrivateRoute>
                    <AdminVerificaciones />
                  </PrivateRoute>
                }
              />

              {/* Detalle y Bitácora del Alumno */}
              <Route
                path="/alumnos/:id"
                element={
                  <PrivateRoute>
                    <AlumnoDetalle />
                  </PrivateRoute>
                }
              />

              {/* Redireccion por defecto */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
