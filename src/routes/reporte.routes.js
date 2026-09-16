import { Router } from "express";
import { getReportesByAlumno, crearReporte } from "../controllers/reporte.controller.js";
import { crearReporteValidation } from "../middlewares/validations/reporte.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireVerified } from "../middlewares/roles.middleware.js";

const router = Router();

router.get("/alumno/:alumnoId", authMiddleware, requireVerified, getReportesByAlumno);
router.post("/", authMiddleware, requireVerified, crearReporteValidation, validate, crearReporte);

export default router;
