"use client";

import { useState } from "react";

export default function IncomePage() {
  const [incomeType, setIncomeType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [income, setIncome] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [totalIncome, setTotalIncome] = useState("");

  const handleIncomeChange = () => {
    if (frequency === "yearly") {
      setTotalIncome((income / 12).toFixed(2));
    } else if (frequency === "wage") {
      setTotalIncome((hoursWorked * hourlyWage).toFixed(2));
    } else {
      setTotalIncome(income);
    }
  };

  const handleSave = () => {
    if (totalIncome) {
      alert(`Income type: ${incomeType}, Frequency: ${frequency}, Total Income: $${totalIncome} saved successfully!`);
      // Here you can add the functionality to save the data to a database or state management.
    } else {
      alert("Please complete all fields.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      <div className="m-auto w-full max-w-md px-6 py-8 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6">Income</h1>
        <p className="text-xl text-center mb-8">
          This is where you can add or manage your income details.
        </p>
        <div className="flex flex-col space-y-4">
          <select
            value={incomeType}
            onChange={(e) => setIncomeType(e.target.value)}
            className="w-full p-2 border rounded-md text-black"
          >
            <option value="">Select Income Type</option>
            <option value="job">Job</option>
            <option value="business">Business</option>
            <option value="freelance">Freelance</option>
            <option value="investment">Investment</option>
            <option value="other">Other</option>
          </select>

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border rounded-md text-black"
          >
            <option value="">Select Income Frequency</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="wage">Wage</option>
          </select>

          {frequency === "monthly" && (
            <input
              type="number"
              placeholder="Enter Monthly Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          )}

          {frequency === "yearly" && (
            <input
              type="number"
              placeholder="Enter Yearly Income"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
                handleIncomeChange();
              }}
              className="w-full p-2 border rounded-md text-black"
            />
          )}

          {frequency === "wage" && (
            <>
              <input
                type="number"
                placeholder="Enter Hours Worked (Monthly)"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                className="w-full p-2 border rounded-md text-black"
              />
              <input
                type="number"
                placeholder="Enter Hourly Wage"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(e.target.value)}
                className="w-full p-2 border rounded-md text-black"
              />
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
