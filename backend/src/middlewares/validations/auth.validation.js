import { body } from "express-validator";

export const registerValidation = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),
  
  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"),
  
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email valido")
    .normalizeEmail(),
  
  body("password")
    .notEmpty()
    .withMessage("La contrasenia es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contrasenia debe tener al menos 6 caracteres"),

  body("rol")
    .notEmpty()
    .withMessage("El rol a registrar es obligatorio")
    .isIn(["DOCENTE", "TERAPEUTA", "FAMILIAR"])
    .withMessage("El rol debe ser DOCENTE, TERAPEUTA o FAMILIAR"),

  // Validaciones condicionales segun el rol
  body("institucion")
    .if(body("rol").equals("DOCENTE"))
    .notEmpty()
    .withMessage("La institucion educativa es obligatoria para docentes"),

  body("cue_escuela")
    .if(body("rol").equals("DOCENTE"))
    .notEmpty()
    .withMessage("El CUE de la escuela es obligatorio")
    .isLength({ min: 9, max: 9 })
    .withMessage("El CUE debe contener exactamente 9 digitos"),

  body("cargo")
    .if(body("rol").equals("DOCENTE"))
    .notEmpty()
    .withMessage("El cargo docente es obligatorio"),

  body("especialidad")
    .if(body("rol").equals("TERAPEUTA"))
    .notEmpty()
    .withMessage("La especialidad terapeutica es obligatoria"),

  body("matricula_tipo")
    .if(body("rol").equals("TERAPEUTA"))
    .isIn(["MN", "MP"])
    .withMessage("El tipo de matricula debe ser MN (Nacional) o MP (Provincial)"),

  body("matricula_numero")
    .if(body("rol").equals("TERAPEUTA"))
    .notEmpty()
    .withMessage("El numero de matricula profesional es obligatorio"),

  body("colegio_profesional")
    .if(body("rol").equals("TERAPEUTA"))
    .notEmpty()
    .withMessage("El colegio profesional o entidad emisora es obligatoria"),

  body("dni")
    .if(body("rol").equals("FAMILIAR"))
    .notEmpty()
    .withMessage("El DNI del familiar es obligatorio")
    .isLength({ min: 7, max: 10 })
    .withMessage("El DNI debe tener entre 7 y 10 digitos"),

  body("parentesco")
    .if(body("rol").equals("FAMILIAR"))
    .isIn(["MADRE", "PADRE", "TUTOR_LEGAL", "OTRO"])
    .withMessage("El parentesco debe ser MADRE, PADRE, TUTOR_LEGAL u OTRO"),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email valido"),

  body("password")
    .notEmpty()
    .withMessage("La contrasenia es obligatoria"),
];
