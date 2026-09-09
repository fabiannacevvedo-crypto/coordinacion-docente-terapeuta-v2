import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const DocentePerfilModel = sequelize.define(
  "DocentePerfil",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    institucion: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cue_escuela: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "Codigo Unico de Establecimiento Educativo (9 digitos)",
    },
    cargo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nivel_educativo: {
      type: DataTypes.STRING(50),
      defaultValue: "Primario",
    },
    constancia_adjunta: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL o referencia de constancia laboral / toma de posesion",
    },
    verificado_institucional: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "perfiles_docentes",
    timestamps: true,
  }
);
