import { Knex, knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const dbPort = process.env.DB_PORT!;

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(dbPort),
  },
};

const knexInstance = knex(config);

export default knexInstance;
