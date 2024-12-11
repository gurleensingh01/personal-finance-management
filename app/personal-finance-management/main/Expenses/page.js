"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const [expenses, setExpenses] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle modal open
  const handleAddExpenseClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExpenseType("");
    setAmount("");
    setDescription(""); // Reset description when closing modal
  };

  const handleTypeChange = (e) => {
    setExpenseType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Handle description input
  };

  const handleSaveExpense = () => {
    if (expenseType && amount && description) {
      const newExpense = {
        type: expenseType,
        amount: parseFloat(amount), // Ensure amount is a number
        description: description, // Include description
        id: Date.now(), // Unique ID based on current timestamp
      };
      setExpenses([...expenses, newExpense]); // Add the new expense to the list
      handleCloseModal(); // Close the modal after saving
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Calculate total amount for each category
  const getTotalByType = (type) => {
    return expenses
      .filter((expense) => expense.type === type)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  // Pie chart data
  const pieChartData = {
    labels: ["Essential", "Leisure", "Others"],
    datasets: [
      {
        data: [
          getTotalByType("Essential"),
          getTotalByType("Leisure"),
          getTotalByType("Others"),
        ],
        backgroundColor: ["#48bb78", "#3182ce", "#e6e600"], // Colors for the slices
        borderColor: ["#2f855a", "#2b6cb0", "#b3b300"],
        borderWidth: 2,
      },
    ],
  };

  // Function to determine the card color based on expense type
  const getCardColor = (type) => {
    switch (type) {
      case "Essential":
        return "bg-green-800"; // Green for Essentials
      case "Leisure":
        return "bg-blue-800"; // Blue for Leisure
      case "Others":
        return "bg-yellow-800"; // Yellow for Others
      default:
        return "bg-gray-800"; // Default for others
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Expenses</h1>
        <div className="relative">
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-700 px-3 py-2 rounded-md focus:outline-none hover:bg-gray-600"
          >
            ☰
          </button>

          {/* Pop-Up Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
              {/* Profile Option */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/personal-finance-management/main/Profile");
                }}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Profile
              </button>
              {/* Logout Option */}
              <button
                onClick={() => {
                  firebaseSignOut();
                  router.push("/personal-finance-management");
                }}
                className="block px-4 py-2 text-red-500 hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Total Card */}
      <div className="mt-6 w-2/3 gap-6">
        <div className={`${getCardColor("Total")} text-white p-8 rounded-3xl shadow-md`}>
          <h3 className="text-3xl font-bold mb-2 text-center">Total Expenses</h3>
          <p className="text-lg text-center">
            ${getTotalByType("Essential") + getTotalByType("Leisure") + getTotalByType("Others")}
          </p>
        </div>
      </div>

      {/* Main Content with Cards and Pie Chart */}
      <div className="mt-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8">
        {/* Expense Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 m-10 lg:grid-cols-3 gap-6 text-center">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className={`${getCardColor(expense.type)} text-white p-4 rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-bold mb-2">{expense.type}</h3>
              <p className="text-lg">Amount: ${expense.amount}</p>
              {/* Truncate description to 30 characters */}
              <p className="text-md mt-2 break-words">
                {expense.description.length > 20
                  ? `${expense.description.slice(0, 20)}...`
                  : expense.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/3 h-96">
          <h2 className="text-2xl font-bold text-center mb-4">Expenses by Category</h2>
          <Pie 
            data={pieChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false, // This allows custom height and width
              plugins: {
                legend: {
                  position: 'top', // Position the legend on top of the chart
                },
              },
            }} 
          />
        </div>
      </div>

      <button
        onClick={handleAddExpenseClick}
        className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
      >
        Add Expense
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

            {/* Expense Type Selection */}
            <div className="mb-4">
              <label htmlFor="expense-type" className="block text-lg">
                Select Type:
              </label>
              <select
                id="expense-type"
                value={expenseType}
                onChange={handleTypeChange}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Essential">Essential</option>
                <option value="Leisure">Leisure</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg">
                Amount Spent:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="Enter amount"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg">
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="Enter a description"
              />
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
