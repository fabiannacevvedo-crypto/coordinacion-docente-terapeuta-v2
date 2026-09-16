import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { sequelize } from "./src/models/index.js";
import { asegurarBaseDeDatos } from "./src/config/database.js";

// Rutas
import authRoutes from "./src/routes/auth.routes.js";
import alumnoRoutes from "./src/routes/alumno.routes.js";
import reporteRoutes from "./src/routes/reporte.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ======================================
// MIDDLEWARES GLOBALES
// ======================================
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite solicitudes sin origen (como Postman o scripts) o cualquier localhost/127.0.0.1
      if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ======================================
// CONEXION A LA BASE DE DATOS (MYSQL WAMPSERVER)
// ======================================
(async () => {
  try {
    await asegurarBaseDeDatos();
    await sequelize.authenticate();
    const dbName = process.env.DB_NAME || "rednec_db_2";
    console.log(`✅ Base de datos MySQL conectada correctamente (${dbName} en WampServer)`);
    await sequelize.sync();
    console.log("✅ Tablas y relaciones sincronizadas con Sequelize en MySQL");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos MySQL:", error.message);
    console.error("💡 Verifica que WampServer tenga el servicio MySQL activo en el puerto 3306.");
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
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor backend v2 corriendo en http://localhost:${PORT}`);
  console.log(`📡 Esperando conexiones del frontend (CORS habilitado para localhost en cualquier puerto)`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ El puerto ${PORT} ya está en uso. Cierra el proceso anterior o define otro PORT en .env.`);
  } else {
    console.error("❌ Error en el servidor backend:", err.message);
  }
});

export default app;
