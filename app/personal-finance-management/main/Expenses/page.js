"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useExpenses } from "../../_utils/expenses-context"; // Context for managing expenses
import { useUserAuth } from "../../_utils/auth-context"; // Ensures we fetch expenses for the logged-in user

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesPage() {
  const { user } = useUserAuth(); // Get authenticated user
  const { addExpense, expenses, updateTotalExpenses, deleteExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) updateTotalExpenses();
  }, [expenses, updateTotalExpenses, user]);

  const handleAddExpenseClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExpenseType("");
    setAmount("");
    setDescription("");
  };

  const handleSaveExpense = async () => {
    if (expenseType && amount && description) {
      const newExpense = {
        type: expenseType,
        amount: parseFloat(amount),
        description: description,
        createdAt: new Date().toISOString(), // Timestamp
      };

      await addExpense(newExpense); // Save to Firestore
      handleCloseModal();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const getTotalByType = (type) => {
    return expenses
      .filter((expense) => expense.type === type)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const handleDeleteExpense = async (expenseId) => {
    await deleteExpense(expenseId);
  };

  const pieChartData = {
    labels: ["Essential", "Leisure", "Others"],
    datasets: [
      {
        data: [
          getTotalByType("Essential"),
          getTotalByType("Leisure"),
          getTotalByType("Others"),
        ],
        backgroundColor: ["#48bb78", "#3182ce", "#e6e600"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Expenses</h1>
      </header>

      {/* Total Expenses Card */}
      <div className="mt-6 w-2/3 gap-6">
        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-md">
          <h3 className="text-3xl font-bold mb-2 text-center">Total Expenses</h3>
          <p className="text-lg text-center">${updateTotalExpenses()}</p>
        </div>
      </div>

      {/* Expense List and Pie Chart */}
      <div className="mt-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8">
        {/* Expense Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {expenses.map((expense) => (
            <div key={expense.id} className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{expense.type}</h3>
              <p className="text-lg">Amount: ${expense.amount.toFixed(2)}</p>
              <p className="text-md mt-2">{expense.description}</p>
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="mt-2 bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/3 h-96">
          <h2 className="text-2xl font-bold text-center mb-4">Expenses by Category</h2>
          <Pie
            data={pieChartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Add Expense Button */}
      <button
        onClick={handleAddExpenseClick}
        className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
      >
        Add Expense
      </button>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

            <div className="mb-4">
              <label htmlFor="expense-type" className="block text-lg">
                Select Type:
              </label>
              <select
                id="expense-type"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Essential">Essential</option>
                <option value="Leisure">Leisure</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg">
                Amount Spent:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-lg">
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="Enter a description"
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExpense}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
