import { body, param } from "express-validator";

export const crearAlumnoValidation = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del alumno es obligatorio"),
  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido del alumno es obligatorio"),
  body("dni")
    .trim()
    .notEmpty()
    .withMessage("El DNI del alumno es obligatorio"),
  body("fecha_nacimiento")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .isDate()
    .withMessage("Formato de fecha invalido (AAAA-MM-DD)"),
  body("grado_sala")
    .notEmpty()
    .withMessage("El grado o sala es obligatorio"),
  body("escuela")
    .notEmpty()
    .withMessage("La escuela del alumno es obligatoria"),
];

export const vincularAlumnoValidation = [
  body("codigo")
    .trim()
    .notEmpty()
    .withMessage("El codigo de vinculacion es obligatorio")
    .isLength({ min: 6 })
    .withMessage("El codigo debe tener al menos 6 caracteres"),
];
