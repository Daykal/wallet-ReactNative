import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
console.log(process.env.DATABASE_URL);
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDB() {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(8,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`);
  } catch (error) {
    console.log("error initializing db", error);
  }
}
