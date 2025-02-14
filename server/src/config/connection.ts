import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

// create sequelize connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          // rejectUnauthorized: false, // Use with caution
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            // rejectUnauthorized: false, // Use with caution
          },
        },
      }
    );

export default sequelize;
