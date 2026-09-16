import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { sequelize } from "./src/models/index.js";

// Rutas
import authRoutes from "./src/routes/auth.routes.js";
import alumnoRoutes from "./src/routes/alumno.routes.js";
import reporteRoutes from "./src/routes/reporte.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ======================================
// MIDDLEWARES GLOBALES
// ======================================
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ======================================
// CONEXION A LA BASE DE DATOS
// ======================================
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Base de datos conectada correctamente (${process.env.DB_DIALECT || "sqlite"})`);
    await sequelize.sync();
    console.log("✅ Tablas y relaciones sincronizadas con Sequelize");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
  }
})();

// ======================================
// RUTAS DE LA API
// ======================================
app.use("/api/auth", authRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/admin", adminRoutes);

// Ruta de estado
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    version: "2.0.0",
    service: "Coordinacion Docente-Terapeuta API",
    timestamp: new Date(),
  });
});

// ======================================
// MANEJO DE ERRORES GLOBAL
// ======================================
app.use((err, req, res, next) => {
  console.error("❌ Error no controlado:", err);
  res.status(500).json({
    ok: false,
    mensaje: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ======================================
// INICIO DEL SERVIDOR
// ======================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend v2 corriendo en http://localhost:${PORT}`);
  console.log(`📡 Esperando conexiones del frontend en ${FRONTEND_URL}`);
});

export default app;
