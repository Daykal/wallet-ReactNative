import express from "express";
import dotenv from "dotenv";
import {db} from "./lib/db.js";
import transactionRoutes from "./routes/transaction.route.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
async function initDB() {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(8,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`);
  } catch (error) {
    console.log("error initializing db", error);
  }
}
app.use("/api/transaction", transactionRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
