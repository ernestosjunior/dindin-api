import { Knex, knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const dbPort = Number(process.env.DB_PORT!)
const dbSsl = process.env.DB_PORT === 'true' ? true : false

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: dbPort,
    ssl: {
      rejectUnauthorized: dbSsl,
    },
  },
}

const knexInstance = knex(config)

export default knexInstance
