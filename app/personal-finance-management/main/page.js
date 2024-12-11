"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useUserAuth } from "../_utils/auth-context.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // State to control the hamburger menu
  const [income, setIncome] = useState(123);
  const [expenses, setExpenses] = useState(58);
  const [savings, setSavings] = useState(65);
  const [investments, setInvestments] = useState(0); // Auto-calculated based on categories
  const [stocks, setStocks] = useState(20);
  const [bonds, setBonds] = useState(10);
  const [mutualFunds, setMutualFunds] = useState(10);
  const [crypto, setCrypto] = useState(5);
  const [realEstate, setRealEstate] = useState(30);

  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (!user) {
      router.push("/personal-finance-management");
    }
  }, [user, router]);

  // Automatically calculate total investments
  useEffect(() => {
    setInvestments(stocks + bonds + mutualFunds + crypto + realEstate);
  }, [stocks, bonds, mutualFunds, crypto, realEstate]);

  // Data for Pie Charts
  const incomeVsExpensesData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income || 0, expenses || 0],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
      },
    ],
  };

  const savingsDistributionData = {
    labels: ["Savings", "Expenses", "Investments"],
    datasets: [
      {
        data: [savings || 0, expenses || 0, investments || 0],
        backgroundColor: ["#2196f3", "#ff9800", "#9c27b0"],
        hoverBackgroundColor: ["#42a5f5", "#ffb74d", "#ba68c8"],
      },
    ],
  };

  const investmentBreakdownData = {
    labels: ["Stocks", "Bonds", "Mutual Funds", "Crypto", "Real Estate"],
    datasets: [
      {
        data: [stocks || 0, bonds || 0, mutualFunds || 0, crypto || 0, realEstate || 0],
        backgroundColor: ["#ffeb3b", "#4caf50", "#2196f3", "#9c27b0", "#f44336"],
        hoverBackgroundColor: ["#ffee58", "#66bb6a", "#42a5f5", "#ba68c8", "#e57373"],
      },
    ],
  };

  // If the user is not loaded yet, display a loader
  if (!user) {
    return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
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

      {/* Main Content */}
      <main className="container mx-auto py-10">
        <h2 className="text-4xl mb-6">Welcome, {user.displayName}!</h2>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Income */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Total Income</h3>
            <p className="text-xl">${income !== null ? income.toFixed(2) : "N/A"}</p>
            <button
              onClick={() => router.push("/personal-finance-management/main/Income")}
              className="text-blue-400 hover:underline mt-2"
            >
              Manage Income
            </button>
          </div>

          {/* Total Expenses */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Total Expenses</h3>
            <p className="text-xl">${expenses !== null ? expenses.toFixed(2) : "N/A"}</p>
            <button
              onClick={() => router.push("/personal-finance-management/main/Expenses")}
              className="text-blue-400 hover:underline mt-2"
            >
              Manage Expenses
            </button>
          </div>

          {/* Total Savings */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Total Savings</h3>
            <p className="text-xl">${savings !== null ? savings.toFixed(2) : "N/A"}</p>
            <button
              onClick={() => router.push("/personal-finance-management/main/Savings")}
              className="text-blue-400 hover:underline mt-2"
            >
              View Savings
            </button>
          </div>

          {/* Investments */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Investments</h3>
            <p className="text-xl">${investments !== null ? investments.toFixed(2) : "N/A"}</p>
            <button
              onClick={() => router.push("/personal-finance-management/main/Investments")}
              className="text-blue-400 hover:underline mt-2"
            >
              Manage Investments
            </button>
          </div>
        </div>

        {/* Reports Section */}
        <section className="mt-12">
          <h3 className="text-3xl mb-4">Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Income vs Expenses Pie Chart */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl mb-4">Income vs Expenses</h4>
              <Pie data={incomeVsExpensesData} />
            </div>

            {/* Savings Distribution Pie Chart */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl mb-4">Savings Distribution</h4>
              <Pie data={savingsDistributionData} />
            </div>

            {/* Investment Breakdown Pie Chart */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl mb-4">Investment Breakdown</h4>
              <Pie data={investmentBreakdownData} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
