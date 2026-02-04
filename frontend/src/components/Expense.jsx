import React, { useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import { API_BASE_URL } from "../config";

const ExpenseContainerFullScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Set today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // ---------------------------
  // ✅ FETCH EXPENSES FUNCTION
  // ---------------------------
  const fetchExpenses = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    setIsLoading(true);

    fetch(`${API_BASE_URL}/getAllExpence`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(Array.isArray(data?.data) ? data.data : []);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setIsLoading(false));
  };

  // Fetch at initial load
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Total amount
  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  // --------------------------------
  // ✅ ADD EXPENSE + AUTO REFRESH
  // --------------------------------
  const handleAddExpense = () => {
    if (!title || !amount || !category) {
      alert("Please fill out all fields");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    fetch(`${API_BASE_URL}/expence`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, amount, category, date }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Re-fetch the full updated expense list
        fetchExpenses();

        // Reset inputs
        setTitle("");
        setAmount("");
        setCategory("");
        setDate(new Date().toISOString().split("T")[0]);
      })
      .catch((err) => console.error("Add error:", err));
  };

  // --------------------------------
  // DELETE EXPENSE
  // --------------------------------
  const handleDelete = (id) => {
    const accessToken = localStorage.getItem("accessToken");

    fetch(`${API_BASE_URL}/deleteExpence/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.statusCode === 200) {
          setExpenses((prev) => prev.filter((exp) => exp._id !== id));
        }
      })
      .catch((err) => console.error("Delete Error:", err));
  };

  const handleEdit = (id) => {
    console.log("Edit expense:", id);
  };

  const categories = [
    { value: "food", label: "🍔 Food" },
    { value: "transport", label: "🚗 Transport" },
    { value: "utilities", label: "⚡ Utilities" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "other", label: "📌 Other" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 p-6 md:p-8 text-center rounded-2xl mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative">💰 Expense Tracker</h2>
        <p className="text-white/90 text-sm md:text-base relative mb-6">Track your spending with passion</p>
        
        <a href="/budget" className="relative inline-block px-8 py-3 bg-white text-red-500 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
           📅 Go to Budget Planner
        </a>
      </div>

      {/* STATS */}
      {!isLoading && (
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl mb-6 border border-rose-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-red-500 text-xs font-semibold">Total</p>
              <p className="text-2xl md:text-3xl font-bold text-red-600">₹{totalAmount}</p>
            </div>
            <div className="text-center">
              <p className="text-pink-500 text-xs font-semibold">Transactions</p>
              <p className="text-2xl md:text-3xl font-bold text-pink-600">{expenses.length}</p>
            </div>
            <div className="text-center">
              <p className="text-rose-500 text-xs font-semibold">Average</p>
              <p className="text-2xl md:text-3xl font-bold text-rose-600">
                ₹{expenses.length ? Math.round(totalAmount / expenses.length) : 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="bg-white p-6 md:p-8 rounded-2xl mb-6 border border-rose-100">
        <h3 className="text-xl font-semibold text-red-600 mb-6">➕ Add New Expense</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-rose-200"
          />

          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-rose-200"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-rose-200"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-rose-200"
          />
        </div>

        <button
          onClick={handleAddExpense}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg"
        >
          🔥 Add Expense
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-rose-100">
        <h3 className="text-xl font-semibold text-red-600 mb-6">📊 Recent Expenses</h3>

        {isLoading ? (
          <p className="text-center text-red-400">Loading...</p>
        ) : expenses.length ? (
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense._id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDelete}
                categories={categories}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-rose-50 rounded-xl">
            <p className="text-rose-600 text-lg">No expenses yet</p>
            <p className="text-rose-500 text-sm">Start tracking your first expense!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseContainerFullScreen;
