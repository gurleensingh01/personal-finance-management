"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../_utils/firebase"; // Firebase configuration

const db = getFirestore();

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    savings: "",
    investments: "",
    targetSavingsPercentage: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser; // Get the currently logged-in user
      if (!user) {
        alert("You need to log in first.");
        return;
      }

      // Save profile data to Firestore
      const userDoc = doc(db, "profiles", user.uid); // Collection: profiles, Document ID: user.uid
      await setDoc(userDoc, formData);

      alert("Profile created successfully!");
      // Redirect to the Dashboard after saving the profile
      router.push("/main");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save your profile. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-lg bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-3xl mb-6 text-gray-800 font-semibold">Create Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="income">
              Monthly Income:
            </label>
            <input
              type="number"
              name="income"
              id="income"
              placeholder="Enter your income"
              value={formData.income}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="expenses">
              Monthly Expenses:
            </label>
            <input
              type="number"
              name="expenses"
              id="expenses"
              placeholder="Enter your expenses"
              value={formData.expenses}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="savings">
              Current Savings:
            </label>
            <input
              type="number"
              name="savings"
              id="savings"
              placeholder="Enter your savings"
              value={formData.savings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="investments">
              Investments:
            </label>
            <input
              type="number"
              name="investments"
              id="investments"
              placeholder="Enter your investments"
              value={formData.investments}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="targetSavingsPercentage">
              Target Savings Percentage (%):
            </label>
            <input
              type="number"
              name="targetSavingsPercentage"
              id="targetSavingsPercentage"
              placeholder="Enter your target percentage"
              value={formData.targetSavingsPercentage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
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
