import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ReporteModel = sequelize.define(
  "Reporte",
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
    autor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("PEDAGOGICO", "TERAPEUTICO", "FAMILIAR", "GENERAL"),
      allowNull: false,
      defaultValue: "PEDAGOGICO",
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    semaforo: {
      type: DataTypes.ENUM("bueno", "regular", "atencion"),
      allowNull: false,
      defaultValue: "bueno",
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estrategia_sugerida: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "reportes",
    timestamps: true,
  }
);
