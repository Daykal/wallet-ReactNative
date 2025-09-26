import e from "express";
import { db } from "../lib/db.js";

export const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.params;
    const transactions = await db.query(
      `
            SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC
            `,
      [user_id]
    );
    res.status(200).json(transactions.rows);
  } catch (error) {
    console.log("error creating transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(user_id, title, amount, category);
    const transaction = await db.query(
      `
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `,
      [user_id, title, amount, category]
    );
    res.status(201).json(transaction.rows[0]);
  } catch (error) {
    console.log("error creating transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const result = await db.query(
      `
      DELETE FROM transactions WHERE id = $1
      `,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("error creating transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSummary = async (req, res) => {
  try {
    const { user_id } = req.params;

    const balanceResult = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = $1
      `,
      [user_id]
    );

    const IncomeResult = await db.query(
      `
        SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = $1 AND amount > 0
        `,
      [user_id]
    );
    const ExpenseResult = await db.query(
      `
          SELECT COALESCE(SUM(amount), 0) as expense FROM transactions WHERE user_id = $1 AND amount < 0
          `,
      [user_id]
    );
    res.status(200).json({
      balance: balanceResult.rows[0].balance,
      income: IncomeResult.rows[0].income,
      expense: ExpenseResult.rows[0].expense,
    });
  } catch (error) {
    console.log("error getting summary", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
