"use client";

import { useState, useEffect } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    salary: "",
    expenses: "",
    savings: "",
    investments: "",
    investmentDescription: "",
    targetPercentage: "",
  });
   // will change this later---------------------------------------------------------------
  // Fetch profile data from localStorage when the component mounts
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile)); // Set the form data with values from localStorage
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated form data to localStorage
    localStorage.setItem("profileData", JSON.stringify(formData));
    alert("Profile updated successfully!");
  };
/////-------------------------------------------------------------------------------
  return (
    <div className="p-8 bg-gray-100 h-screen">
      <h1 className="text-3xl mb-6 text-gray-800">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md p-6 rounded-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="expenses" className="block text-sm font-medium text-gray-700">
              Expenses
            </label>
            <input
              type="text"
              id="expenses"
              name="expenses"
              value={formData.expenses}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="savings" className="block text-sm font-medium text-gray-700">
              Savings
            </label>
            <input
              type="text"
              id="savings"
              name="savings"
              value={formData.savings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="investments" className="block text-sm font-medium text-gray-700">
              Investments
            </label>
            <input
              type="text"
              id="investments"
              name="investments"
              value={formData.investments}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="investmentDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Investment Description
            </label>
            <textarea
              id="investmentDescription"
              name="investmentDescription"
              value={formData.investmentDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="targetPercentage" className="block text-sm font-medium text-gray-700">
              Financial Target (%)
            </label>
            <input
              type="text"
              id="targetPercentage"
              name="targetPercentage"
              value={formData.targetPercentage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
