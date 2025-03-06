"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useIncome } from "../../_utils/income-context";
import { useUserAuth } from "../../_utils/auth-context"; // Ensure auth context provides userId

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function IncomePage() {
  const { user } = useUserAuth(); // Get authenticated user
  const { addIncome, incomes, updateTotalIncome, deleteIncome } = useIncome();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeType, setIncomeType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {
    if (user) updateTotalIncome();
  }, [incomes, updateTotalIncome, user]);

  const handleAddIncomeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIncomeType("");
    setAmount("");
    setDescription("");
    setFrequency("");
    setHours("");
  };

  const handleSaveIncome = async () => {
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
        amount: totalIncome,
        description: incomeType === "Other" ? description : "",
        createdAt: new Date().toISOString(),
      };

      await addIncome(newIncome);
      handleCloseModal();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const getTotalByType = (type) => {
    return incomes
      .filter((income) => income.type === type)
      .reduce((total, income) => total + income.amount, 0);
  };

  const handleDeleteIncome = async (incomeId) => {
    await deleteIncome(incomeId);
  };

  const pieChartData = {
    labels: ["Job", "Other"],
    datasets: [
      {
        data: [getTotalByType("Job"), getTotalByType("Other")],
        backgroundColor: ["#48bb78", "#3182ce"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Income</h1>
      </header>

      {/* Total Card */}
      <div className="mt-6 w-2/3">
        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-md">
          <h3 className="text-3xl font-bold mb-2 text-center">Total Income</h3>
          <p className="text-lg text-center">${updateTotalIncome()}</p>
        </div>
      </div>

      {/* Income List */}
      <div className="mt-6 w-full flex flex-col lg:flex-row items-center lg:justify-center gap-8">
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {incomes.map((income) => (
            <div key={income.id} className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{income.type}</h3>
              <p className="text-lg">Amount: ${income.amount.toFixed(2)}</p>
              {income.description && <p className="text-md mt-2">{income.description}</p>}
              <button
                onClick={() => handleDeleteIncome(income.id)}
                className="mt-2 bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/3 h-96">
          <h2 className="text-2xl font-bold text-center mb-4">Income by Category</h2>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Add Income Button */}
      <button
        onClick={handleAddIncomeClick}
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
      >
        Add Income
      </button>

      {/* Modal for Adding Income */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add Income</h2>
            <div className="mb-4">
              <label htmlFor="income-type" className="block text-lg">
                Select Type:
              </label>
              <select
                id="income-type"
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Job">Job</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {incomeType === "Job" && (
              <div className="mb-4">
                <label htmlFor="frequency" className="block text-lg">
                  Frequency:
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="wage">Wage</option>
                </select>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg">
                Amount:
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
            {frequency === "wage" && (
              <div className="mb-4">
                <label htmlFor="hours" className="block text-lg">
                  Number of Hours (per month):
                </label>
                <input
                  type="number"
                  id="hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg"
                  placeholder="Enter hours"
                />
              </div>
            )}
            <div className="flex justify-between">
              <button onClick={handleCloseModal} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSaveIncome} className="bg-green-600 text-white py-2 px-4 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
