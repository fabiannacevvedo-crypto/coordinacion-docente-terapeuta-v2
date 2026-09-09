import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const VinculoAlumnoModel = sequelize.define(
  "VinculoAlumno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alumno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rol_en_caso: {
      type: DataTypes.ENUM("DOCENTE_TITULAR", "TERAPEUTA_EXTERNO", "TUTOR_LEGAL"),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "vinculos_alumnos",
    timestamps: true,
  }
);
