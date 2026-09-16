import { Router } from "express";
import { getMisAlumnos, crearAlumno, vincularAlumnoPorCodigo } from "../controllers/alumno.controller.js";
import { crearAlumnoValidation, vincularAlumnoValidation } from "../middlewares/validations/alumno.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireVerified } from "../middlewares/roles.middleware.js";

const router = Router();

router.get("/", authMiddleware, requireVerified, getMisAlumnos);
router.post("/", authMiddleware, requireVerified, crearAlumnoValidation, validate, crearAlumno);
router.post("/vincular", authMiddleware, requireVerified, vincularAlumnoValidation, validate, vincularAlumnoPorCodigo);

export default router;
