import pg from "pg";
// const pool = new Pool({
//   user: "postgres",
//   password: "nemongo",
//   host: "localhost",
//   port: 5432,
//   database: "sasa",
// });

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

export default pool;
