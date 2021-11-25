import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./data.db",
  },
};

const knexInstance = knex(config);

export default knexInstance;
