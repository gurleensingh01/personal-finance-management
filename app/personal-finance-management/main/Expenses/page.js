"use client";
 
import { useState } from "react";

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

        {/* Group heading and fixed cards together */}
        <div className="m-auto text-center mt-6 mb-8">
        {/* Fixed cards for Wants, Needs, and Others */}
        <div className="mt-6 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className={`${getCardColor("Want")} text-white p-8 rounded-3xl shadow-md`}>
            <h3 className="text-3xl font-bold mb-2">Wants</h3>
            <p className="text-lg">
              Total: ${getTotalByType("Want").toFixed(2)}
            </p>
          </div>
          <div className={`${getCardColor("Need")} text-white p-8 rounded-3xl shadow-md`}>
            <h3 className="text-3xl font-bold mb-2">Needs</h3>
            <p className="text-lg">
              Total: ${getTotalByType("Need").toFixed(2)}
            </p>
          </div>
          <div className={`${getCardColor("Others")} text-white p-8 rounded-3xl shadow-md`}>
            <h3 className="text-3xl font-bold mb-2">Others</h3>
            <p className="text-lg">
              Total: ${getTotalByType("Others").toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Display Expenses with full-width grid */}
      <div className="mt-8 w-2/3 px-4 sm:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-center">
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