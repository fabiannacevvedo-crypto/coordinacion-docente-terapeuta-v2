import {
  sequelize,
  UserModel,
  RoleModel,
  UserRoleModel,
  DocentePerfilModel,
  TerapeutaPerfilModel,
  FamiliarPerfilModel,
  AlumnoModel,
  VinculoAlumnoModel,
  ReporteModel,
} from "../models/index.js";
import { hashPassword } from "../helpers/bcript.helper.js";

export const ejecutarSeed = async () => {
  try {
    console.log("🌱 Sincronizando base de datos para sembrado...");
    await sequelize.sync({ force: true });

    console.log("🌱 Creando roles...");
    const rolAdmin = await RoleModel.create({ name: "ADMIN", descripcion: "Administrador general y coordinador" });
    const rolDocente = await RoleModel.create({ name: "DOCENTE", descripcion: "Docente de escuela / grado" });
    const rolTerapeuta = await RoleModel.create({ name: "TERAPEUTA", descripcion: "Profesional de la salud / terapia" });
    const rolFamiliar = await RoleModel.create({ name: "FAMILIAR", descripcion: "Madre, padre o tutor legal" });

    console.log("🌱 Creando contrasenia encriptada...");
    const defaultPassHash = await hashPassword("Rednec123!");

    // 1. ADMIN
    const admin = await UserModel.create({
      nombre: "Coordinacion",
      apellido: "Central",
      email: "admin@rednec.com",
      password: defaultPassHash,
      telefono: "+54 11 4444-5555",
      estado_verificacion: "APROBADO",
    });
    await UserRoleModel.create({ user_id: admin.id, role_id: rolAdmin.id });

    // 2. DOCENTE VERIFICADO
    const docenteVerif = await UserModel.create({
      nombre: "Laura",
      apellido: "Gimenez",
      email: "docente@escuela.edu.ar",
      password: defaultPassHash,
      telefono: "+54 11 5555-6666",
      estado_verificacion: "APROBADO",
    });
    await UserRoleModel.create({ user_id: docenteVerif.id, role_id: rolDocente.id });
    await DocentePerfilModel.create({
      user_id: docenteVerif.id,
      institucion: "Escuela Primaria N° 12 D.E. 10",
      cue_escuela: "020012300",
      cargo: "Maestra de 4to Grado A",
      nivel_educativo: "Primario",
      constancia_adjunta: "constancia_nombramiento_oficial.pdf",
      verificado_institucional: true,
    });

    // 3. TERAPEUTA VERIFICADO
    const terapeutaVerif = await UserModel.create({
      nombre: "Dr. Martin",
      apellido: "Peralta",
      email: "terapeuta@salud.com",
      password: defaultPassHash,
      telefono: "+54 11 6666-7777",
      estado_verificacion: "APROBADO",
    });
    await UserRoleModel.create({ user_id: terapeutaVerif.id, role_id: rolTerapeuta.id });
    await TerapeutaPerfilModel.create({
      user_id: terapeutaVerif.id,
      especialidad: "Psicologia y Neurodesarrollo",
      matricula_tipo: "MN",
      matricula_numero: "MN-48291",
      colegio_profesional: "Colegio de Psicologos de la Nacion",
      jurisdiccion: "CABA",
      credencial_adjunta: "credencial_mn48291.pdf",
      verificado_salud: true,
    });

    // 4. FAMILIAR VERIFICADO
    const familiarVerif = await UserModel.create({
      nombre: "Patricia",
      apellido: "Martinez",
      email: "familiar@familia.com",
      password: defaultPassHash,
      telefono: "+54 11 7777-8888",
      estado_verificacion: "APROBADO",
    });
    await UserRoleModel.create({ user_id: familiarVerif.id, role_id: rolFamiliar.id });
    await FamiliarPerfilModel.create({
      user_id: familiarVerif.id,
      dni: "34890123",
      parentesco: "MADRE",
      documento_adjunto: "partida_nacimiento_lucas.pdf",
      verificado_tutela: true,
    });

    // 5. USUARIOS PENDIENTES (para probar el panel de verificacion admin)
    const docentePend = await UserModel.create({
      nombre: "Mariana",
      apellido: "Torres",
      email: "mariana.docente@gmail.com",
      password: defaultPassHash,
      telefono: "+54 11 8888-1111",
      estado_verificacion: "PENDIENTE",
    });
    await UserRoleModel.create({ user_id: docentePend.id, role_id: rolDocente.id });
    await DocentePerfilModel.create({
      user_id: docentePend.id,
      institucion: "Colegio Belgrano Day",
      cue_escuela: "020088899",
      cargo: "Docente de Apoyo a la Inclusion (DAI)",
      nivel_educativo: "Primario",
      constancia_adjunta: "acta_designacion_torres.pdf",
      verificado_institucional: false,
    });

    const terapeutaPend = await UserModel.create({
      nombre: "Lic. Carlos",
      apellido: "Sosa",
      email: "carlos.terapeuta@salud.com",
      password: defaultPassHash,
      telefono: "+54 11 8888-2222",
      estado_verificacion: "PENDIENTE",
    });
    await UserRoleModel.create({ user_id: terapeutaPend.id, role_id: rolTerapeuta.id });
    await TerapeutaPerfilModel.create({
      user_id: terapeutaPend.id,
      especialidad: "Fonoaudiologia",
      matricula_tipo: "MP",
      matricula_numero: "MP-91823",
      colegio_profesional: "Colegio de Fonoaudiologos PBA",
      jurisdiccion: "Provincia de Buenos Aires",
      credencial_adjunta: "carnet_fono_sosa.jpg",
      verificado_salud: false,
    });

    // 6. ALUMNO DE PRUEBA: Lucas Martinez (coordinado por los 3 roles)
    console.log("🌱 Creando alumnos y reportes de prueba...");
    const alumnoLucas = await AlumnoModel.create({
      nombre: "Lucas",
      apellido: "Martinez",
      dni: "52147890",
      fecha_nacimiento: "2016-05-14",
      grado_sala: "4to Grado A",
      escuela: "Escuela Primaria N° 12 D.E. 10",
      diagnostico_resumen: "Trastorno del Espectro Autista (TEA Nivel 1) con adaptaciones curriculares en lectoescritura.",
      cud_vigente: true,
      codigo_familiar: "FAM-LUCAS",
      codigo_equipo: "EQ-LUCAS",
    });

    // Vincular al equipo
    await VinculoAlumnoModel.create({ alumno_id: alumnoLucas.id, user_id: docenteVerif.id, rol_en_caso: "DOCENTE_TITULAR" });
    await VinculoAlumnoModel.create({ alumno_id: alumnoLucas.id, user_id: terapeutaVerif.id, rol_en_caso: "TERAPEUTA_EXTERNO" });
    await VinculoAlumnoModel.create({ alumno_id: alumnoLucas.id, user_id: familiarVerif.id, rol_en_caso: "TUTOR_LEGAL" });

    // Reporte del Docente
    await ReporteModel.create({
      alumno_id: alumnoLucas.id,
      autor_id: docenteVerif.id,
      tipo: "PEDAGOGICO",
      titulo: "Adaptacion positiva al trabajo en grupo",
      semaforo: "bueno",
      observaciones: "Lucas participo activamente en la clase de Ciencias Sociales usando pictogramas en su cuaderno. Mantuvo la atencion durante 35 minutos sin signos de frustracion.",
      estrategia_sugerida: "Continuar anticipando el cambio de actividad con el reloj de arena visual.",
      fecha: "2026-09-01",
    });

    // Reporte del Terapeuta
    await ReporteModel.create({
      alumno_id: alumnoLucas.id,
      autor_id: terapeutaVerif.id,
      tipo: "TERAPEUTICO",
      titulo: "Regulacion sensorial frente a ruidos intensos",
      semaforo: "regular",
      observaciones: "En la sesion semanal trabajamos la anticipacion de los timbres y ruidos del recreo. Se acordo el uso de auriculares canceladores de ruido de forma preventiva.",
      estrategia_sugerida: "Permitirle salir al patio 2 minutos antes del toque de timbre general para evitar el agobio acustico.",
      fecha: "2026-09-03",
    });

    // Reporte del Familiar
    await ReporteModel.create({
      alumno_id: alumnoLucas.id,
      autor_id: familiarVerif.id,
      tipo: "FAMILIAR",
      titulo: "Semana tranquila en casa con rutinas",
      semaforo: "bueno",
      observaciones: "Completamos las tareas de matematicas en bloques de 15 minutos con pausas activas. Durmio muy bien toda la semana.",
      estrategia_sugerida: "Seguimos la misma pauta de refuerzo positivo que sugirio el terapeuta.",
      fecha: "2026-09-05",
    });

    // Alumno 2 libre (para vincular mediante codigo)
    await AlumnoModel.create({
      nombre: "Sofia",
      apellido: "Gomez",
      dni: "54987123",
      fecha_nacimiento: "2018-09-22",
      grado_sala: "2do Grado B",
      escuela: "Escuela N° 18 San Martin",
      diagnostico_resumen: "Retraso en la adquisicion del lenguaje fonologico.",
      cud_vigente: false,
      codigo_familiar: "FAM-SOFIA",
      codigo_equipo: "EQ-SOFIA",
    });

    console.log("✅ Datos sembrados exitosamente:");
    console.log("   👉 Admin: admin@rednec.com (Clave: Rednec123!)");
    console.log("   👉 Docente: docente@escuela.edu.ar (Clave: Rednec123!)");
    console.log("   👉 Terapeuta: terapeuta@salud.com (Clave: Rednec123!)");
    console.log("   👉 Familiar: familiar@familia.com (Clave: Rednec123!)");
    console.log("   👉 Docente Pendiente: mariana.docente@gmail.com");
    console.log("   👉 Terapeuta Pendiente: carlos.terapeuta@salud.com");
  } catch (error) {
    console.error("❌ Error durante el sembrado:", error);
  }
};

// Si se ejecuta directamente con node seed.js
if (process.argv[1].endsWith("seed.js")) {
  ejecutarSeed().then(() => {
    console.log("Listo.");
    process.exit(0);
  });
}
