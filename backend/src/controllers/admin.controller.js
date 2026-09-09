import { UserModel, RoleModel, DocentePerfilModel, TerapeutaPerfilModel, FamiliarPerfilModel, AlumnoModel, ReporteModel } from "../models/index.js";

export const getUsuariosPendientes = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll({
      where: { estado_verificacion: "PENDIENTE" },
      attributes: { exclude: ["password"] },
      include: [
        { model: RoleModel, as: "roles", attributes: ["id", "name"] },
        { model: DocentePerfilModel, as: "perfil_docente" },
        { model: TerapeutaPerfilModel, as: "perfil_terapeuta" },
        { model: FamiliarPerfilModel, as: "perfil_familiar" },
      ],
      order: [["created_at", "DESC"]],
    });

    return res.json({ ok: true, usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios pendientes:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al obtener usuarios pendientes", error: error.message });
  }
};

export const cambiarEstadoVerificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevo_estado, motivo } = req.body; // 'APROBADO' o 'RECHAZADO'

    if (!["APROBADO", "RECHAZADO"].includes(nuevo_estado)) {
      return res.status(400).json({ ok: false, mensaje: "Estado no valido. Debe ser APROBADO o RECHAZADO" });
    }

    const usuario = await UserModel.findByPk(id, {
      include: [
        { model: DocentePerfilModel, as: "perfil_docente" },
        { model: TerapeutaPerfilModel, as: "perfil_terapeuta" },
        { model: FamiliarPerfilModel, as: "perfil_familiar" },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: "Usuario no encontrado" });
    }

    usuario.estado_verificacion = nuevo_estado;
    usuario.motivo_rechazo = nuevo_estado === "RECHAZADO" ? (motivo || "Documentacion no valida") : null;
    await usuario.save();

    // Actualizar flags de perfil
    if (nuevo_estado === "APROBADO") {
      if (usuario.perfil_docente) {
        usuario.perfil_docente.verificado_institucional = true;
        await usuario.perfil_docente.save();
      }
      if (usuario.perfil_terapeuta) {
        usuario.perfil_terapeuta.verificado_salud = true;
        await usuario.perfil_terapeuta.save();
      }
      if (usuario.perfil_familiar) {
        usuario.perfil_familiar.verificado_tutela = true;
        await usuario.perfil_familiar.save();
      }
    }

    return res.json({
      ok: true,
      mensaje: `Usuario ${usuario.nombre} ${usuario.apellido} ha sido ${nuevo_estado === "APROBADO" ? "aprobado y verificado" : "rechazado"}`,
      usuario,
    });
  } catch (error) {
    console.error("Error al cambiar estado de verificacion:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al actualizar estado", error: error.message });
  }
};

export const getEstadisticas = async (req, res) => {
  try {
    const totalUsuarios = await UserModel.count();
    const pendientes = await UserModel.count({ where: { estado_verificacion: "PENDIENTE" } });
    const aprobados = await UserModel.count({ where: { estado_verificacion: "APROBADO" } });
    const totalAlumnos = await AlumnoModel.count();
    const totalReportes = await ReporteModel.count();

    return res.json({
      ok: true,
      estadisticas: {
        totalUsuarios,
        pendientes,
        aprobados,
        totalAlumnos,
        totalReportes,
      },
    });
  } catch (error) {
    console.error("Error al obtener estadisticas:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al obtener estadisticas", error: error.message });
  }
};
