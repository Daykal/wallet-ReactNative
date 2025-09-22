import { db } from "../lib/db.js";

export const createTransaction = async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(user_id, title, amount, category);
    const transaction = await db.query(`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `,[user_id, title, amount, category]);
    res.status(201).json(transaction.rows[0]);
  } catch (error) {
    console.log("error creating transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
