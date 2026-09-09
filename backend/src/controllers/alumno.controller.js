import { AlumnoModel, VinculoAlumnoModel, UserModel, ReporteModel } from "../models/index.js";

// Generador de tokens unicos tipo TOKEN-8A2F
const generarCodigo = (prefijo) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefijo}-${result}`;
};

export const getMisAlumnos = async (req, res) => {
  try {
    const esAdmin = req.roles.includes("ADMIN");

    if (esAdmin) {
      const todos = await AlumnoModel.findAll({
        include: [
          {
            model: VinculoAlumnoModel,
            as: "vinculos",
            include: [{ model: UserModel, as: "usuario", attributes: ["id", "nombre", "apellido", "email"] }],
          },
          { model: ReporteModel, as: "reportes" },
        ],
      });
      return res.json({ ok: true, alumnos: todos });
    }

    // Para Docente, Terapeuta o Familiar, buscar solo los asignados
    const vinculos = await VinculoAlumnoModel.findAll({
      where: { user_id: req.user.id, activo: true },
      include: [
        {
          model: AlumnoModel,
          as: "alumno",
          include: [
            {
              model: VinculoAlumnoModel,
              as: "vinculos",
              include: [{ model: UserModel, as: "usuario", attributes: ["id", "nombre", "apellido", "email"] }],
            },
            { model: ReporteModel, as: "reportes" },
          ],
        },
      ],
    });

    const alumnos = vinculos.map((v) => v.alumno).filter(Boolean);
    return res.json({ ok: true, alumnos });
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al obtener alumnos", error: error.message });
  }
};

export const crearAlumno = async (req, res) => {
  try {
    const { nombre, apellido, dni, fecha_nacimiento, grado_sala, escuela, diagnostico_resumen, cud_vigente } = req.body;

    // Verificar si ya existe alumno con ese DNI
    const existe = await AlumnoModel.findOne({ where: { dni } });
    if (existe) {
      return res.status(400).json({ ok: false, mensaje: "Ya existe un alumno registrado con ese DNI" });
    }

    // Generar codigos unicos de vinculacion
    const codigo_familiar = generarCodigo("FAM");
    const codigo_equipo = generarCodigo("EQ");

    const nuevoAlumno = await AlumnoModel.create({
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      grado_sala,
      escuela,
      diagnostico_resumen: diagnostico_resumen || "",
      cud_vigente: cud_vigente || false,
      codigo_familiar,
      codigo_equipo,
    });

    // Auto-vincular al creador segun su rol
    let rolEnCaso = "DOCENTE_TITULAR";
    if (req.roles.includes("TERAPEUTA")) rolEnCaso = "TERAPEUTA_EXTERNO";
    if (req.roles.includes("FAMILIAR")) rolEnCaso = "TUTOR_LEGAL";

    await VinculoAlumnoModel.create({
      alumno_id: nuevoAlumno.id,
      user_id: req.user.id,
      rol_en_caso: rolEnCaso,
      activo: true,
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Alumno dado de alta exitosamente y vinculado a su cuenta",
      alumno: nuevoAlumno,
    });
  } catch (error) {
    console.error("Error al crear alumno:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al crear alumno", error: error.message });
  }
};

export const vincularAlumnoPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.body;
    const codigoUpper = codigo.trim().toUpperCase();

    // Buscar si el codigo coincide con codigo_familiar o codigo_equipo
    const alumno = await AlumnoModel.findOne({
      where: sequelize.or(
        { codigo_familiar: codigoUpper },
        { codigo_equipo: codigoUpper }
      ),
    });

    if (!alumno) {
      return res.status(404).json({
        ok: false,
        mensaje: "Codigo de vinculacion invalido o no encontrado",
      });
    }

    // Verificar si ya esta vinculado
    const vinculoExistente = await VinculoAlumnoModel.findOne({
      where: { alumno_id: alumno.id, user_id: req.user.id },
    });

    if (vinculoExistente) {
      return res.status(400).json({
        ok: false,
        mensaje: "Usted ya se encuentra vinculado a este alumno",
      });
    }

    // Determinar rol en el caso
    let rolEnCaso = "DOCENTE_TITULAR";
    if (req.roles.includes("TERAPEUTA")) rolEnCaso = "TERAPEUTA_EXTERNO";
    if (req.roles.includes("FAMILIAR")) rolEnCaso = "TUTOR_LEGAL";

    await VinculoAlumnoModel.create({
      alumno_id: alumno.id,
      user_id: req.user.id,
      rol_en_caso: rolEnCaso,
      activo: true,
    });

    return res.json({
      ok: true,
      mensaje: `¡Vinculacion exitosa con el alumno ${alumno.nombre} ${alumno.apellido}!`,
      alumno,
    });
  } catch (error) {
    console.error("Error al vincular alumno:", error);
    return res.status(500).json({ ok: false, mensaje: "Error al vincular alumno", error: error.message });
  }
};
