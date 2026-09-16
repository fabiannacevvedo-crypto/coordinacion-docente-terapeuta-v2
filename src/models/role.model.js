import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const RoleModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);
