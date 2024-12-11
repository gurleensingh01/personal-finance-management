"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function IncomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeType, setIncomeType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const [frequency, setFrequency] = useState(""); // State for income frequency
  const [hours, setHours] = useState(""); // State for hours if frequency is "wage"
  const [incomes, setIncomes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle modal open
  const handleAddIncomeClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIncomeType("");
    setAmount("");
    setDescription(""); // Reset description when closing modal
    setFrequency("");
    setHours("");
  };

  const handleTypeChange = (e) => {
    setIncomeType(e.target.value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setAmount(value);
    } else {
      alert("Income cannot be negative.");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Handle description input
  };

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleSaveIncome = () => {
    if (incomeType && amount && (incomeType === "Job" ? frequency : true) && (incomeType === "Job" && frequency === "wage" ? hours : true)) {
      let totalIncome = parseFloat(amount);

      if (incomeType === "Job") {
        if (frequency === "yearly") {
          totalIncome = totalIncome / 12;
        } else if (frequency === "wage") {
          totalIncome = totalIncome * parseFloat(hours);
        }
      }

      const newIncome = {
        type: incomeType,
        amount: totalIncome, // Set total income based on frequency logic
        description: incomeType === "Other" ? description : "", // Include description if it's 'Other'
        id: Date.now(), // Unique ID based on current timestamp
      };
      setIncomes([...incomes, newIncome]); // Add the new income to the list
      handleCloseModal(); // Close the modal after saving
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Calculate total amount for each category
  const getTotalByType = (type) => {
    return incomes
      .filter((income) => income.type === type)
      .reduce((total, income) => total + income.amount, 0);
  };

  // Pie chart data
  const pieChartData = {
    labels: ["Job", "Other"],
    datasets: [
      {
        data: [
          getTotalByType("Job"),
          getTotalByType("Other"),
        ],
        backgroundColor: ["#48bb78", "#3182ce"], // Colors for the slices
        borderColor: ["#2f855a", "#2b6cb0"],
        borderWidth: 2,
      },
    ],
  };

  // Function to determine the card color based on income type
  const getCardColor = (type) => {
    switch (type) {
      case "Job":
        return "bg-green-800"; // Green for Job
      case "Other":
        return "bg-blue-800"; // Blue for Other
      default:
        return "bg-gray-800"; // Default for others
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Income</h1>
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
          <h3 className="text-3xl font-bold mb-2 text-center">Total Income</h3>
          <p className="text-lg text-center">
            ${getTotalByType("Job") + getTotalByType("Other")}
          </p>
        </div>
      </div>

      {/* Main Content with Cards and Pie Chart */}
      <div className="mt-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8">
        {/* Income Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 m-10 lg:grid-cols-3 gap-6 text-center">
          {incomes.map((income) => (
            <div
              key={income.id}
              className={`${getCardColor(income.type)} text-white p-4 rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-bold mb-2">{income.type}</h3>
              <p className="text-lg">Amount: ${income.amount}</p>
              {income.description && <p className="text-md mt-2 break-words">{income.description}</p>}
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/3 h-96">
          <h2 className="text-2xl font-bold text-center mb-4">Income by Category</h2>
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
        onClick={handleAddIncomeClick}
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
      >
        Add Income
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add Income</h2>

            {/* Income Type Selection */}
            <div className="mb-4">
              <label htmlFor="income-type" className="block text-lg">
                Select Type:
              </label>
              <select
                id="income-type"
                value={incomeType}
                onChange={handleTypeChange}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Job">Job</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Frequency Input for Job */}
            {incomeType === "Job" && (
              <div className="mb-4">
                <label htmlFor="frequency" className="block text-lg">
                  Frequency:
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={handleFrequencyChange}
                  className="w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="wage">Wage</option>
                </select>
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg">
                Amount:
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

            {/* Hours Input for Wage Frequency */}
            {frequency === "wage" && (
              <div className="mb-4">
                <label htmlFor="hours" className="block text-lg">
                  Number of Hours (per month):
                </label>
                <input
                  type="number"
                  id="hours"
                  value={hours}
                  onChange={handleHoursChange}
                  className="w-full mt-2 p-2 border rounded-lg"
                  placeholder="Enter hours"
                />
              </div>
            )}

            {/* Description Input for 'Other' income type */}
            {incomeType === "Other" && (
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
            )}

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIncome}
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
