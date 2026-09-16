import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const UserRoleModel = sequelize.define(
  "User_Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios_roles",
    timestamps: false,
  }
);
