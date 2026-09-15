import { Sequelize } from "sequelize";
import dotenv from "dotenv";

import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolvedSqlitePath = process.env.DB_STORAGE 
  ? path.resolve(process.cwd(), process.env.DB_STORAGE) 
  : path.resolve(__dirname, "../../../database.sqlite");

const isSqlite = (process.env.DB_DIALECT || "sqlite") === "sqlite";

export const sequelize = isSqlite
  ? new Sequelize({
      dialect: "sqlite",
      storage: resolvedSqlitePath,
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
    })
  : new Sequelize(
      process.env.DB_NAME || "rednec_db",
      process.env.DB_USER || "root",
      process.env.DB_PASS || "",
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
        define: {
          timestamps: true,
          underscored: true,
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

export default sequelize;
