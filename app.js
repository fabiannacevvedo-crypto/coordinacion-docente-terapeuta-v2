import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { sequelize } from "./src/models/index.js";
import { asegurarBaseDeDatos } from "./src/config/database.js";

// Rutas de la API (Arquitectura estandar IPF)
import authRoutes from "./src/routes/auth.routes.js";
import alumnoRoutes from "./src/routes/alumno.routes.js";
import reporteRoutes from "./src/routes/reporte.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const distPath = path.join(__dirname, "frontend", "dist");

// ======================================
// MIDDLEWARES GLOBALES
// ======================================
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origen (scripts, curl, mobile) o cualquier localhost/127.0.0.1
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
// CONEXION CON MYSQL (WAMPSERVER)
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

// Endpoint de estado y verificacion
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    version: "2.0.0",
    service: "Coordinacion Docente-Terapeuta API",
    database: "MySQL (WampServer)",
    timestamp: new Date(),
  });
});

// ======================================
// SERVIDO DE FRONTEND REACT (SOLUCION A "Cannot GET /")
// ======================================
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Comodin para SPA de React
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();

  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  // Si todavia no se ha compilado dist, renderizar landing informativa con enlace a Vite
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>RedNeC v2 - Coordinación Docente-Terapeuta</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; color: #1e293b; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; max-width: 600px; width: 100%; border-radius: 16px; padding: 36px; box-shadow: 0 10px 25px rgba(0,0,0,0.06); text-align: center; border: 1px solid #e2e8f0; }
        h1 { color: #0284c7; font-size: 24px; margin-top: 10px; }
        p { font-size: 15px; line-height: 1.6; color: #475569; }
        .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 6px 14px; border-radius: 9999px; font-weight: 600; font-size: 13px; }
        .btn { display: inline-block; background: #0284c7; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px; transition: background 0.2s; }
        .btn:hover { background: #0369a1; }
        .code { background: #0f172a; color: #38bdf8; padding: 10px 16px; border-radius: 8px; font-family: monospace; font-size: 14px; margin: 16px 0; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">🚀 Backend Conectado a MySQL (WampServer)</span>
        <h1>Coordinación Docente-Terapeuta (RedNeC v2)</h1>
        <p>El servidor API está corriendo correctamente en el puerto <strong>3001</strong>.</p>
        <p>Para ver el frontend en desarrollo con Vite en tiempo real, ejecuta:</p>
        <div class="code">npm run dev</div>
        <p>O abre el cliente React directamente en:</p>
        <a href="http://localhost:5173" class="btn">Ir a Aplicación React (http://localhost:5173)</a>
      </div>
    </body>
    </html>
  `);
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
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📡 Esperando conexiones (Frontend Vite en http://localhost:5173)`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ El puerto ${PORT} ya está en uso. Cierra el proceso anterior o define otro PORT en .env.`);
  } else {
    console.error("❌ Error en el servidor backend:", err.message);
  }
});

export default app;
