"use client";

import { useState } from "react";

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    salary: "",
    expenses: "",
    savings: "",
    investments: "",
    investmentDescription: "",
    targetPercentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the form data to localStorage
    localStorage.setItem("profileData", JSON.stringify(formData));
    alert("Profile created successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-3/4 bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-3xl mb-6 text-gray-800 font-semibold">Create Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="salary"
            placeholder="Enter Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="expenses"
            placeholder="Enter Expenses"
            value={formData.expenses}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="savings"
            placeholder="Enter Savings"
            value={formData.savings}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="investments"
            placeholder="Investment Type"
            value={formData.investments}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="investmentDescription"
            placeholder="Investment Description"
            value={formData.investmentDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="targetPercentage"
            placeholder="Financial Target (%)"
            value={formData.targetPercentage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
