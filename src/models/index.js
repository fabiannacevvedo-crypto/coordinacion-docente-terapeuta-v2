import sequelize from "../config/database.js";
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";
import { UserRoleModel } from "./user_role.model.js";
import { DocentePerfilModel } from "./docente_perfil.model.js";
import { TerapeutaPerfilModel } from "./terapeuta_perfil.model.js";
import { FamiliarPerfilModel } from "./familiar_perfil.model.js";
import { AlumnoModel } from "./alumno.model.js";
import { VinculoAlumnoModel } from "./vinculo_alumno.model.js";
import { ReporteModel } from "./reporte.model.js";

// ==========================================
// RELACIONES: Usuario <-> Roles (Muchos a Muchos)
// ==========================================
UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "user_id",
  as: "roles",
});
RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});

// ==========================================
// RELACIONES: Usuario <-> Perfiles (Uno a Uno)
// ==========================================
UserModel.hasOne(DocentePerfilModel, { foreignKey: "user_id", as: "perfil_docente", onDelete: "CASCADE" });
DocentePerfilModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" });

UserModel.hasOne(TerapeutaPerfilModel, { foreignKey: "user_id", as: "perfil_terapeuta", onDelete: "CASCADE" });
TerapeutaPerfilModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" });

UserModel.hasOne(FamiliarPerfilModel, { foreignKey: "user_id", as: "perfil_familiar", onDelete: "CASCADE" });
FamiliarPerfilModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" });

// ==========================================
// RELACIONES: Usuario <-> Alumno (Muchos a Muchos a traves de VinculoAlumno)
// ==========================================
AlumnoModel.belongsToMany(UserModel, {
  through: VinculoAlumnoModel,
  foreignKey: "alumno_id",
  as: "equipo",
});
UserModel.belongsToMany(AlumnoModel, {
  through: VinculoAlumnoModel,
  foreignKey: "user_id",
  as: "alumnos_asignados",
});

VinculoAlumnoModel.belongsTo(AlumnoModel, { foreignKey: "alumno_id", as: "alumno" });
VinculoAlumnoModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" });
AlumnoModel.hasMany(VinculoAlumnoModel, { foreignKey: "alumno_id", as: "vinculos" });

// ==========================================
// RELACIONES: Reportes
// ==========================================
AlumnoModel.hasMany(ReporteModel, { foreignKey: "alumno_id", as: "reportes", onDelete: "CASCADE" });
ReporteModel.belongsTo(AlumnoModel, { foreignKey: "alumno_id", as: "alumno" });

UserModel.hasMany(ReporteModel, { foreignKey: "autor_id", as: "reportes_creados" });
ReporteModel.belongsTo(UserModel, { foreignKey: "autor_id", as: "autor" });

export {
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
};
