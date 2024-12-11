"use client";
import { useState, useEffect } from "react";
import { useInvestment } from "../../_utils/investment-context"; // Import shared context
import { Pie } from "react-chartjs-2"; // Import Pie Chart
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentsPage() {
  const { investments, addInvestment, editInvestment, updateTotalInvestment } =
    useInvestment(); // Access shared context
  const [currentInvestment, setCurrentInvestment] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [investmentType, setInvestmentType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const investmentFields = {
    Stocks: ["Stock Name", "Quantity", "Price Per Unit", "Market Value (Optional)"],
    Bonds: ["Bond Name", "Invested Amount", "Time Period (Months)", "Interest Rate (%)"],
    "Mutual Funds": ["Fund Name", "Invested Amount", "Expected Return (%)", "Current Value (Optional)"],
    Crypto: ["Name", "Price Per Unit", "Quantity", "Market Value (Optional)"],
    "Real Estate": ["Type", "Invested Amount", "Market Value (Optional)"],
  };

  // Calculate Total Investments and Update Shared Context
  useEffect(() => {
    const total = investments.reduce(
      (sum, inv) => sum + parseFloat(inv["Invested Amount"] || inv["Total Amount"] || 0),
      0
    );
    updateTotalInvestment(total); // Update the shared state
  }, [investments, updateTotalInvestment]);

  const handleAddClick = (type) => {
    setInvestmentType(type);
    setCurrentInvestment({ type });
    setShowPopup(true);
    setEditMode(false);
  };

  const handleEditClick = (index) => {
    setCurrentInvestment(investments[index]);
    setInvestmentType(investments[index].type);
    setShowPopup(true);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleChange = (field, value) => {
    let updatedInvestment = { ...currentInvestment, [field]: value };

    // Crypto and Stocks: Calculate Total Amount and Profit/Loss
    if (investmentType === "Crypto" || investmentType === "Stocks") {
      const price = parseFloat(updatedInvestment["Price Per Unit"]) || 0;
      const quantity = parseFloat(updatedInvestment["Quantity"]) || 0;
      const marketValue = parseFloat(updatedInvestment["Market Value (Optional)"]) || null;

      const totalAmount = price * quantity;
      updatedInvestment["Total Amount"] = totalAmount.toFixed(2);

      if (marketValue !== null) {
        const profitLoss = (marketValue - price) * quantity;
        updatedInvestment["Profit/Loss"] = profitLoss.toFixed(2);
      } else {
        delete updatedInvestment["Profit/Loss"];
      }
    }

    // Real Estate: Calculate Profit/Loss
    if (investmentType === "Real Estate") {
      const investedAmount = parseFloat(updatedInvestment["Invested Amount"]) || 0;
      const marketValue = parseFloat(updatedInvestment["Market Value (Optional)"]) || null;

      if (marketValue !== null) {
        const profitLoss = marketValue - investedAmount;
        updatedInvestment["Profit/Loss"] = profitLoss.toFixed(2);
      } else {
        delete updatedInvestment["Profit/Loss"];
      }
    }

    // Mutual Funds: Calculate Expected Return and Profit/Loss
    if (investmentType === "Mutual Funds") {
      const investedAmount = parseFloat(updatedInvestment["Invested Amount"]) || 0;
      const expectedReturn = parseFloat(updatedInvestment["Expected Return (%)"]) || 0;
      const currentValue = parseFloat(updatedInvestment["Current Value (Optional)"]) || null;

      const expectedReturnAmount = (investedAmount * expectedReturn) / 100;
      updatedInvestment["Expected Return"] = expectedReturnAmount.toFixed(2);

      if (currentValue !== null) {
        const profitLoss = currentValue - investedAmount;
        updatedInvestment["Profit/Loss"] = profitLoss.toFixed(2);
      } else {
        delete updatedInvestment["Profit/Loss"];
      }
    }

    // Bonds: Calculate Maturity Value
    if (investmentType === "Bonds") {
      const investedAmount = parseFloat(updatedInvestment["Invested Amount"]) || 0;
      const timePeriod = parseFloat(updatedInvestment["Time Period (Months)"]) || 0;
      const interestRate = parseFloat(updatedInvestment["Interest Rate (%)"]) || 0;

      const maturityValue =
        investedAmount * (1 + (interestRate / 100) * (timePeriod / 12));
      updatedInvestment["Maturity Value"] = maturityValue.toFixed(2);
    }

    setCurrentInvestment(updatedInvestment);
  };

  const saveInvestment = () => {
    if (editMode) {
      editInvestment(editIndex, currentInvestment);
    } else {
      addInvestment(currentInvestment);
    }
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentInvestment({});
    setInvestmentType("");
    setEditMode(false);
    setEditIndex(null);
  };

  // Prepare Data for Pie Chart
  const pieData = {
    labels: Object.keys(investmentFields),
    datasets: [
      {
        label: "Investments Distribution",
        data: Object.keys(investmentFields).map(
          (type) =>
            investments
              .filter((inv) => inv.type === type)
              .reduce((sum, inv) => sum + parseFloat(inv["Invested Amount"] || inv["Total Amount"] || 0), 0)
        ),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
        ],
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Investment</h1>
      </header>

      {/* Total Investments Summary */}
      <div className="container mx-auto py-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">Total Investments</h2>
          <p className="text-xl mt-2">
            ${
              investments
                .reduce((sum, inv) => sum + parseFloat(inv["Invested Amount"] || inv["Total Amount"] || 0), 0)
                .toFixed(2)
            }
          </p>
        </div>
      </div>

      {/* Investment List */}
      <div className="container mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {investments.map((investment, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">{investment.type}</h3>
            {Object.entries(investment)
              .filter(([key]) => key !== "type")
              .map(([key, value]) => (
                <p key={key} className="text-sm capitalize">
                  {key}: {key === "Quantity" || key === "Expected Return (%)" || key === "Interest Rate (%)" ? value : isNaN(value) ? value : `$${value}`}
                </p>
              ))}
            <button
              onClick={() => handleEditClick(index)}
              className="text-blue-400 hover:underline mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Add Investment Buttons */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center mt-6">
        {Object.keys(investmentFields).map((type) => (
          <button
            key={type}
            onClick={() => handleAddClick(type)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add {type}
          </button>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="mx-auto py-6">
        <h2 className="text-2xl font-bold text-center mb-4">Investments Distribution</h2>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit" : "Add"} details for {investmentType}</h2>
            {investmentFields[investmentType].map((field) => (
              <div key={field} className="mb-4">
                <input
                  type={
                    field.includes("Amount") ||
                    field.includes("Price") ||
                    field.includes("Return") ||
                    field.includes("Quantity")
                      ? "number"
                      : "text"
                  }
                  placeholder={field}
                  value={currentInvestment[field] || ""}
                  className="border p-2 w-full rounded"
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}
            {currentInvestment["Maturity Value"] && investmentType === "Bonds" && (
              <p className="text-sm font-bold mt-2">
                Maturity Value: ${currentInvestment["Maturity Value"]}
              </p>
            )}
            {currentInvestment["Profit/Loss"] && (
              <p className="text-sm font-bold mt-2">
                Profit/Loss: ${currentInvestment["Profit/Loss"]}
              </p>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={saveInvestment}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
