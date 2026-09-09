import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel, RoleModel, DocentePerfilModel, TerapeutaPerfilModel, FamiliarPerfilModel } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Extraer token de cookie o de Authorization Header (Bearer)
    let token = req.cookies ? req.cookies.token : null;

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        ok: false,
        mensaje: "Acceso no autorizado: Token de sesion requerido",
      });
    }

    // 2. Verificar y decodificar el token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        ok: false,
        mensaje: "Token invalido o expirado",
      });
    }

    // 3. Buscar al usuario con sus roles y perfiles
    const user = await UserModel.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: RoleModel, as: "roles", attributes: ["id", "name"] },
        { model: DocentePerfilModel, as: "perfil_docente" },
        { model: TerapeutaPerfilModel, as: "perfil_terapeuta" },
        { model: FamiliarPerfilModel, as: "perfil_familiar" },
      ],
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado",
      });
    }

    // 4. Adjuntar datos del usuario verificado
    req.user = user;
    req.roles = user.roles.map((r) => r.name);
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno en autenticacion",
      error: error.message,
    });
  }
};
