"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSavings } from "../../_utils/savings-context"; // Import Savings Context

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SavingsPage() {
  const { addSaving, savings, updateTotalSavings } = useSavings(); // Access Savings Context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingType, setSavingType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState(""); // State for description

  // Update total savings whenever savings data changes
  useEffect(() => {
    updateTotalSavings();
  }, [savings, updateTotalSavings]);

  const handleAddSavingClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSavingType("");
    setAmount("");
    setDescription("");
  };

  const handleSaveSaving = () => {
    if (savingType && amount) {
      const newSaving = {
        type: savingType,
        amount: parseFloat(amount),
        description: description || "",
        id: Date.now(), // Unique ID
      };

      addSaving(newSaving); // Persist saving data using context
      handleCloseModal();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const getTotalByType = (type) => {
    return savings
      .filter((saving) => saving.type === type)
      .reduce((total, saving) => total + saving.amount, 0);
  };

  const pieChartData = {
    labels: ["Short-Term", "Long-Term", "Emergency"],
    datasets: [
      {
        data: [
          getTotalByType("Short-Term"),
          getTotalByType("Long-Term"),
          getTotalByType("Emergency"),
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
        borderColor: ["#388e3c", "#1976d2", "#f57c00"],
        borderWidth: 2,
      },
    ],
  };

  const getCardColor = (type) => {
    switch (type) {
      case "Short-Term":
        return "bg-green-800";
      case "Long-Term":
        return "bg-blue-800";
      case "Emergency":
        return "bg-orange-800";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Savings</h1>
      </header>

      {/* Total Card */}
      <div className="mt-6 w-2/3 gap-6">
        <div className={`${getCardColor("Total")} text-white p-8 rounded-3xl shadow-md`}>
          <h3 className="text-3xl font-bold mb-2 text-center">Total Savings</h3>
          <p className="text-lg text-center">
            ${getTotalByType("Short-Term") + getTotalByType("Long-Term") + getTotalByType("Emergency")}
          </p>
        </div>
      </div>

      {/* Main Content with Cards and Pie Chart */}
      <div className="mt-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8">
        {/* Saving Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 m-10 lg:grid-cols-3 gap-6 text-center">
          {savings.map((saving) => (
            <div
              key={saving.id}
              className={`${getCardColor(saving.type)} text-white p-4 rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-bold mb-2">{saving.type}</h3>
              <p className="text-lg">Amount: ${saving.amount.toFixed(2)}</p>
              {saving.description && <p className="text-md mt-2 break-words">{saving.description}</p>}
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/3 h-96">
          <h2 className="text-2xl font-bold text-center mb-4">Savings by Category</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>

      <button
        onClick={handleAddSavingClick}
        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
      >
        Add Saving
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add Saving</h2>

            {/* Saving Type Selection */}
            <div className="mb-4">
              <label htmlFor="saving-type" className="block text-lg">
                Select Type:
              </label>
              <select
                id="saving-type"
                value={savingType}
                onChange={(e) => setSavingType(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Short-Term">Short-Term</option>
                <option value="Long-Term">Long-Term</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg">
                Amount Saved:
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

            {/* Description Input */}
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
                onClick={handleSaveSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
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
