import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const UserModel = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    estado_verificacion: {
      type: DataTypes.ENUM("PENDIENTE", "APROBADO", "RECHAZADO"),
      defaultValue: "PENDIENTE",
      allowNull: false,
    },
    motivo_rechazo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);
