export const requireRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !req.roles) {
      return res.status(401).json({
        ok: false,
        mensaje: "No autenticado",
      });
    }

    // El ADMIN siempre tiene acceso a todo
    if (req.roles.includes("ADMIN")) {
      return next();
    }

    const tienePermiso = req.roles.some((rol) => rolesPermitidos.includes(rol));
    if (!tienePermiso) {
      return res.status(403).json({
        ok: false,
        mensaje: `Acceso denegado: se requiere uno de los siguientes roles: ${rolesPermitidos.join(", ")}`,
      });
    }

    next();
  };
};

export const requireVerified = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, mensaje: "No autenticado" });
  }

  // Admin siempre esta verificado
  if (req.roles.includes("ADMIN")) {
    return next();
  }

  if (req.user.estado_verificacion !== "APROBADO") {
    return res.status(403).json({
      ok: false,
      mensaje: `Su cuenta se encuentra en estado: ${req.user.estado_verificacion}. Requiere aprobacion para acceder a los datos de alumnos.`,
      estado_verificacion: req.user.estado_verificacion,
    });
  }

  next();
};
