import { UserModel, RoleModel, UserRoleModel, DocentePerfilModel, TerapeutaPerfilModel, FamiliarPerfilModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcript.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      telefono,
      rol,
      // Datos especificos de Docente
      institucion,
      cue_escuela,
      cargo,
      nivel_educativo,
      constancia_adjunta,
      // Datos especificos de Terapeuta
      especialidad,
      matricula_tipo,
      matricula_numero,
      colegio_profesional,
      jurisdiccion,
      credencial_adjunta,
      // Datos especificos de Familiar
      dni,
      parentesco,
      codigo_vinculacion,
      documento_adjunto,
    } = req.body;

    // 1. Verificar si el email ya existe
    const existe = await UserModel.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({
        ok: false,
        mensaje: "El correo electronico ya se encuentra registrado",
      });
    }

    // 2. Hashear password
    const hashedPassword = await hashPassword(password);

    // 3. Crear Usuario (por defecto PENDIENTE de verificacion)
    const nuevoUsuario = await UserModel.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      telefono: telefono || null,
      estado_verificacion: "PENDIENTE",
    });

    // 4. Asignar Rol
    const roleRecord = await RoleModel.findOne({ where: { name: rol } });
    if (roleRecord) {
      await UserRoleModel.create({
        user_id: nuevoUsuario.id,
        role_id: roleRecord.id,
      });
    }

    // 5. Crear Perfil especifico segun el rol
    if (rol === "DOCENTE") {
      await DocentePerfilModel.create({
        user_id: nuevoUsuario.id,
        institucion,
        cue_escuela,
        cargo,
        nivel_educativo: nivel_educativo || "Primario",
        constancia_adjunta: constancia_adjunta || "constancia_simulada_docente.pdf",
        verificado_institucional: false,
      });
    } else if (rol === "TERAPEUTA") {
      await TerapeutaPerfilModel.create({
        user_id: nuevoUsuario.id,
        especialidad,
        matricula_tipo,
        matricula_numero,
        colegio_profesional,
        jurisdiccion: jurisdiccion || "Nacional",
        credencial_adjunta: credencial_adjunta || "credencial_simulada_terapeuta.pdf",
        verificado_salud: false,
      });
    } else if (rol === "FAMILIAR") {
      await FamiliarPerfilModel.create({
        user_id: nuevoUsuario.id,
        dni,
        parentesco,
        codigo_vinculacion: codigo_vinculacion || null,
        documento_adjunto: documento_adjunto || "partida_simulada.pdf",
        verificado_tutela: false,
      });
    }

    // 6. Generar Token para sesion inicial
    const token = generateToken({
      id: nuevoUsuario.id,
      email: nuevoUsuario.email,
    });

    // Enviar cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 24 horas
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Usuario registrado exitosamente. Su cuenta se encuentra en proceso de verificacion de identidad.",
      token,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        roles: [rol],
        estado_verificacion: nuevoUsuario.estado_verificacion,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno al registrar usuario",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: { email },
      include: [
        { model: RoleModel, as: "roles", attributes: ["id", "name"] },
        { model: DocentePerfilModel, as: "perfil_docente" },
        { model: TerapeutaPerfilModel, as: "perfil_terapeuta" },
        { model: FamiliarPerfilModel, as: "perfil_familiar" },
      ],
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        mensaje: "Credenciales invalidas (usuario o password incorrectos)",
      });
    }

    // Comparar password
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        mensaje: "Credenciales invalidas (usuario o password incorrectos)",
      });
    }

    // Generar Token
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    // Enviar cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    const rolesList = user.roles.map((r) => r.name);

    return res.json({
      ok: true,
      mensaje: "Inicio de sesion exitoso",
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        roles: rolesList,
        estado_verificacion: user.estado_verificacion,
        motivo_rechazo: user.motivo_rechazo,
        perfil_docente: user.perfil_docente,
        perfil_terapeuta: user.perfil_terapeuta,
        perfil_familiar: user.perfil_familiar,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno en inicio de sesion",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    ok: true,
    mensaje: "Sesion cerrada correctamente",
  });
};

export const getPerfil = async (req, res) => {
  return res.json({
    ok: true,
    usuario: req.user,
    roles: req.roles,
  });
};
