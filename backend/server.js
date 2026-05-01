require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Expense = require("./models/Expense");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" Error:", err));

// POST - Add Expense
app.post("/expenses", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category required" });
    }
    if (!date) {
      return res.status(400).json({ error: "Date required" });
    }

    const expense = new Expense({
      amount,
      category,
      description,
      date,
    });

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Get Expenses
app.get("/expenses", async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = {};
    if (category) query.category = category;

    let sortOption = {};
    if (sort === "date_desc") sortOption.date = -1;
    if (sort === "date_asc") sortOption.date = 1;

    const expenses = await Expense.find(query).sort(sortOption);

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
