import express from "express";
import dotenv from "dotenv";
import { initDB } from "./lib/db.js";
import transactionRoutes from "./routes/transaction.route.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transaction", transactionRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
