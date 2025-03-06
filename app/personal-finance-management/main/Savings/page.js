"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSavings } from "../../_utils/savings-context"; 
import { useUserAuth } from "../../_utils/auth-context"; 

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SavingsPage() {
  const { user } = useUserAuth(); 
  const { addSaving, savings, updateTotalSavings, deleteSaving } = useSavings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingType, setSavingType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) updateTotalSavings();
  }, [savings, updateTotalSavings, user]);

  const handleAddSavingClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSavingType("");
    setAmount("");
    setDescription("");
  };

  const handleSaveSaving = async () => {
    if (savingType && amount) {
      const newSaving = {
        type: savingType,
        amount: parseFloat(amount),
        description: description || "",
        createdAt: new Date().toISOString(), 
      };

      await addSaving(newSaving);
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

  const handleDeleteSaving = async (savingId) => {
    await deleteSaving(savingId);
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
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Savings</h1>
      </header>

      <div className="mt-6 w-2/3 gap-6">
        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-md">
          <h3 className="text-3xl font-bold mb-2 text-center">Total Savings</h3>
          <p className="text-lg text-center">${updateTotalSavings()}</p>
        </div>
      </div>

      <div className="mt-6 w-full flex flex-col lg:flex-row items-center lg:justify-center gap-8">
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {savings.map((saving) => (
            <div key={saving.id} className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{saving.type}</h3>
              <p className="text-lg">Amount: ${saving.amount.toFixed(2)}</p>
              {saving.description && <p className="text-md mt-2">{saving.description}</p>}
              <button 
                onClick={() => handleDeleteSaving(saving.id)} 
                className="mt-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3 h-96">
          <h2 className="text-2xl font-bold text-center mb-4">Savings by Category</h2>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <button 
        onClick={handleAddSavingClick} 
        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
      >
        Add Saving
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add Saving</h2>

            <div className="mb-4">
              <label htmlFor="saving-type" className="block text-lg">Select Type:</label>
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

            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg">Amount Saved:</label>
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
              <label htmlFor="description" className="block text-lg">Description:</label>
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
