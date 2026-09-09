import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const TerapeutaPerfilModel = sequelize.define(
  "TerapeutaPerfil",
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
    especialidad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    matricula_tipo: {
      type: DataTypes.ENUM("MN", "MP"),
      allowNull: false,
    },
    matricula_numero: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    colegio_profesional: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    jurisdiccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    credencial_adjunta: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL o referencia de credencial profesional",
    },
    verificado_salud: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "perfiles_terapeutas",
    timestamps: true,
  }
);
