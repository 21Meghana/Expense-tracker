import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("date_desc");

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(
      `https://expense-backend-723e.onrender.com/expenses?sort=${sort}`,
    );
    setExpenses(res.data);
  };

  const handleSubmit = async () => {
    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all required fields");
      return;
    }

    await axios.post(
      "https://expense-backend-723e.onrender.com/expenses",
      form,
    );

    setForm({
      amount: "",
      category: "",
      description: "",
      date: "",
    });

    fetchExpenses();
  };

  // 🔍 Filter + Sort on frontend
  const filteredExpenses = expenses
    .filter((e) => e.category.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sort === "date_asc") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  const total = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // ⭐ Category summary
  const categoryTotals = filteredExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div className="container">
      <h1>Expense tracker</h1>

      <div className="grid">
        {/* LEFT */}
        <div>
          <div className="card">
            <h3>ADD EXPENSE</h3>

            <input
              placeholder="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <input
              list="categories"
              placeholder="Type or select category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <datalist id="categories">
              <option value="Food" />
              <option value="Shopping" />
              <option value="Travel" />
            </datalist>

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <button onClick={handleSubmit}>Add expense</button>
          </div>

          {/* ⭐ BY CATEGORY */}
          <div className="card" style={{ marginTop: "20px" }}>
            <h3>BY CATEGORY</h3>

            {Object.keys(categoryTotals).length === 0 ? (
              <p>No data yet</p>
            ) : (
              Object.entries(categoryTotals).map(([cat, val]) => (
                <div
                  key={cat}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span>{cat}</span>
                  <span>₹{val}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="summary">
            <div>Total ₹{total}</div>
            <div>Entries {filteredExpenses.length}</div>
          </div>

          {/* 🔍 SEARCH + SORT */}
          <div className="controls">
            <input
              placeholder="Search category..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />

            <select onChange={(e) => setSort(e.target.value)}>
              <option value="date_desc">Newest</option>
              <option value="date_asc">Oldest</option>
            </select>
          </div>

          {/* LIST */}
          <div className="list">
            {filteredExpenses.length === 0 ? (
              <p>No expenses found</p>
            ) : (
              filteredExpenses.map((e) => (
                <div className="item" key={e._id}>
                  <div>
                    {/* CATEGORY ON TOP */}
                    <strong style={{ fontSize: "16px" }}>
                      {e.category.toUpperCase()}
                    </strong>

                    {/* DESCRIPTION */}
                    <div style={{ color: "#bbb" }}>
                      {e.description || "No description"}
                    </div>

                    {/* DATE */}
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {new Date(e.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* AMOUNT RIGHT */}
                  <div style={{ fontWeight: "bold" }}>₹{e.amount}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
