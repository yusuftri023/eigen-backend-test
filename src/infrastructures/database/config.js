import "dotenv/config";
import knex from "knex";
import bookSchema from "./book.js";
import memberSchema from "./member.js";

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

export const knexConnection = knex({
  client: "pg",
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    ssl: false ? { rejectUnauthorized: false } : false,
  },
  pool: {
    min: 0,
    max: 10,
  },
});
await knexConnection
  .select(1)
  .then(() => bookSchema())
  .then(() => memberSchema());
