import { Router } from "express";
import { register, login, logout, getPerfil } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../middlewares/validations/auth.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", logout);
router.get("/perfil", authMiddleware, getPerfil);

export default router;
