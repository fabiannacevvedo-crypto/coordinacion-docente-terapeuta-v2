import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.formatWith((err) => {
      return {
        campo: err.path,
        mensaje: err.msg,
      };
    });

    return res.status(400).json({
      ok: false,
      mensaje: "Errores de validacion en la solicitud",
      errores: formatted.array(),
    });
  }
  next();
};
