"use client";
import { useUserAuth } from '../_utils/auth-context.js';
import Link from 'next/link'; 

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  if (!user) {
    return (
      <main className="flex h-screen bg-black font-serif">
        <div className="m-auto text-center">
          <p className="text-white text-5xl mb-8">Personal Finance Management</p>
          <p className="text-2xl m-3">
            Please <Link className="text-2xl hover:underline" href="/personal-finance-management">login</Link> to access the app.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex h-screen bg-black font-serif">
     
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="m-auto text-center">
        <p className="text-white text-5xl mb-8">Personal Finance Management</p>
        <p className="text-2xl m-3">
                Welcome, {user.displayName}. Let's manage your finances.
              </p>
        <div className="border-4 border-white p-5 rounded-full w-96 mx-auto">
          <label
            className="block text-white text-2xl font-semibold mb-2"
            htmlFor="salary"
          >
            Enter your salary:
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="p-2 rounded-md text-black w-28"
            placeholder="Amount"
          />
          <select
            className="ml-4 p-2 rounded-md text-black"
            name="salaryType"
            id="salaryType"
          >
            <option value="wage">Wage</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
    </div>
  );
}
