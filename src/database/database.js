import knex from "knex";

const database = knex({
  client: process.env.DEV_DATABASE_CLIENT,
  connection: {
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_POST,
    user: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
  },
});

export default database;
