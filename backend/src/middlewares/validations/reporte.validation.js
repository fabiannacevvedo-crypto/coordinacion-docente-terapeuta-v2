import { body, param } from "express-validator";

export const crearReporteValidation = [
  body("alumno_id")
    .notEmpty()
    .withMessage("El ID del alumno es obligatorio")
    .isInt()
    .withMessage("El ID del alumno debe ser un numero entero"),
  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("El titulo del reporte es obligatorio")
    .isLength({ max: 150 })
    .withMessage("El titulo no debe exceder 150 caracteres"),
  body("semaforo")
    .notEmpty()
    .withMessage("El semaforo es obligatorio")
    .isIn(["bueno", "regular", "atencion"])
    .withMessage("El semaforo debe ser: bueno, regular o atencion"),
  body("observaciones")
    .trim()
    .notEmpty()
    .withMessage("Las observaciones son obligatorias")
    .isLength({ min: 10 })
    .withMessage("Las observaciones deben ser descriptivas (minimo 10 caracteres)"),
  body("tipo")
    .optional()
    .isIn(["PEDAGOGICO", "TERAPEUTICO", "FAMILIAR", "GENERAL"])
    .withMessage("Tipo de reporte no valido"),
];
