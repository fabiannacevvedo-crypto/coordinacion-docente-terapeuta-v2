import { Router } from "express";
import { getUsuariosPendientes, cambiarEstadoVerificacion, getEstadisticas } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/roles.middleware.js";

const router = Router();

router.get("/usuarios-pendientes", authMiddleware, requireRole("ADMIN"), getUsuariosPendientes);
router.patch("/usuarios/:id/verificacion", authMiddleware, requireRole("ADMIN"), cambiarEstadoVerificacion);
router.get("/estadisticas", authMiddleware, requireRole("ADMIN"), getEstadisticas);

export default router;
