import { ReporteModel, AlumnoModel, UserModel, VinculoAlumnoModel } from "../models/index.js";

export const getReportesByAlumno = async (req, res) => {
  try {
    const { alumnoId } = req.params;

    // Si no es admin, verificar que tenga vinculo con el alumno
    if (!req.roles.includes("ADMIN")) {
      const vinculo = await VinculoAlumnoModel.findOne({
        where: { alumno_id: alumnoId, user_id: req.user.id, activo: true },
      });

      if (!vinculo) {
        return res.status(403).json({
          ok: false,
          mensaje: "Acceso denegado: no tiene autorizacion para ver este alumno",
        });
      }
    }

    const reportes = await ReporteModel.findAll({
      where: { alumno_id: alumnoId },
      include: [
        {
          model: UserModel,
          as: "autor",
          attributes: ["id", "nombre", "apellido", "email"],
        },
      ],
      order: [["fecha", "DESC"], ["created_at", "DESC"]],
    });

    return res.json({ ok: true, reportes });
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al obtener reportes", error: error.message });
  }
};

export const crearReporte = async (req, res) => {
  try {
    const { alumno_id, titulo, semaforo, observaciones, estrategia_sugerida, tipo } = req.body;

    // Verificar si el usuario tiene permiso para este alumno
    if (!req.roles.includes("ADMIN")) {
      const vinculo = await VinculoAlumnoModel.findOne({
        where: { alumno_id, user_id: req.user.id, activo: true },
      });

      if (!vinculo) {
        return res.status(403).json({
          ok: false,
          mensaje: "Acceso denegado: debe estar vinculado al alumno para redactar reportes",
        });
      }
    }

    // Auto-asignar tipo segun rol
    let tipoCalculado = tipo || "PEDAGOGICO";
    if (req.roles.includes("TERAPEUTA")) tipoCalculado = "TERAPEUTICO";
    if (req.roles.includes("FAMILIAR")) tipoCalculado = "FAMILIAR";

    const nuevoReporte = await ReporteModel.create({
      alumno_id,
      autor_id: req.user.id,
      tipo: tipoCalculado,
      titulo,
      semaforo,
      observaciones,
      estrategia_sugerida: estrategia_sugerida || "",
      fecha: new Date(),
    });

    const reporteCompleto = await ReporteModel.findByPk(nuevoReporte.id, {
      include: [{ model: UserModel, as: "autor", attributes: ["id", "nombre", "apellido", "email"] }],
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Reporte registrado exitosamente",
      reporte: reporteCompleto,
    });
  } catch (error) {
    console.error("Error al crear reporte:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al crear reporte", error: error.message });
  }
};
