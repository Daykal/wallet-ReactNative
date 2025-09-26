import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getSummary
} from "../controllers/transaction.controller.js";
const router = express.Router();

router.get("/:user_id", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:user_id", getSummary);

export default router;
