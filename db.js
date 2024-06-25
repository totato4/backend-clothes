import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString:
    "postgres://default:X9vOn6bBgIKU@ep-rapid-bar-00288653.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

export default pool;
