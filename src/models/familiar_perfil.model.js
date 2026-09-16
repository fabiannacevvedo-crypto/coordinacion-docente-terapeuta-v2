import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const FamiliarPerfilModel = sequelize.define(
  "FamiliarPerfil",
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
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    parentesco: {
      type: DataTypes.ENUM("MADRE", "PADRE", "TUTOR_LEGAL", "OTRO"),
      allowNull: false,
    },
    codigo_vinculacion: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Codigo provisto por la institucion o generado por el tutor",
    },
    documento_adjunto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verificado_tutela: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "perfiles_familiares",
    timestamps: true,
  }
);
