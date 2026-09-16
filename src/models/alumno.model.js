import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const AlumnoModel = sequelize.define(
  "Alumno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    grado_sala: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    escuela: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    diagnostico_resumen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cud_vigente: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codigo_familiar: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: "Token de acceso emitido por la escuela para los padres",
    },
    codigo_equipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: "Token para vincular al terapeuta o docente al caso",
    },
  },
  {
    tableName: "alumnos",
    timestamps: true,
  }
);
