import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

export default pool;
