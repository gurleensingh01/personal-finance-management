"use client";

import { useState, useEffect } from "react";
import { useInvestment } from "../../_utils/investment-context"; 
import { useUserAuth } from "../../_utils/auth-context"; 
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentsPage() {
  const { user } = useUserAuth(); 
  const { investments, addInvestment, editInvestment, deleteInvestment, updateTotalInvestment } = useInvestment();
  const [currentInvestment, setCurrentInvestment] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [investmentType, setInvestmentType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user) updateTotalInvestment();
  }, [investments, updateTotalInvestment, user]);

  const handleAddClick = (type) => {
    setInvestmentType(type);
    setCurrentInvestment({ type });
    setShowPopup(true);
    setEditMode(false);
  };

  const handleEditClick = (investment) => {
    setCurrentInvestment(investment);
    setInvestmentType(investment.type);
    setShowPopup(true);
    setEditMode(true);
    setEditId(investment.id);
  };

  const handleDeleteClick = async (investmentId) => {
    await deleteInvestment(investmentId);
  };

  const handleChange = (field, value) => {
    setCurrentInvestment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveInvestment = async () => {
    if (editMode) {
      await editInvestment(editId, currentInvestment);
    } else {
      await addInvestment(currentInvestment);
    }
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentInvestment({});
    setInvestmentType("");
    setEditMode(false);
    setEditId(null);
  };

  const pieData = {
    labels: ["Stocks", "Bonds", "Mutual Funds", "Crypto", "Real Estate"],
    datasets: [
      {
        label: "Investments Distribution",
        data: investments.map((inv) => parseFloat(inv["Invested Amount"] || inv["Total Amount"] || 0)),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      <header className="bg-gray-900 py-4 px-6 w-full shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Investments</h1>
      </header>

      <div className="container mx-auto py-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">Total Investments</h2>
          <p className="text-xl mt-2">${updateTotalInvestment().toFixed(2)}</p>
        </div>
      </div>

      <div className="container mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {investments.map((investment) => (
          <div key={investment.id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">{investment.type}</h3>
            <p className="text-sm capitalize">Invested Amount: ${investment["Invested Amount"]}</p>
            <button onClick={() => handleEditClick(investment)} className="text-blue-400 hover:underline mt-2">
              Edit
            </button>
            <button onClick={() => handleDeleteClick(investment.id)} className="text-red-400 hover:underline mt-2 ml-2">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center mt-6">
        {["Stocks", "Bonds", "Mutual Funds", "Crypto", "Real Estate"].map((type) => (
          <button
            key={type}
            onClick={() => handleAddClick(type)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add {type}
          </button>
        ))}
      </div>

      <div className="mx-auto py-6">
        <h2 className="text-2xl font-bold text-center mb-4">Investments Distribution</h2>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <Pie data={pieData} />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit" : "Add"} {investmentType}</h2>
            <input
              type="text"
              placeholder="Invested Amount"
              value={currentInvestment["Invested Amount"] || ""}
              className="border p-2 w-full rounded mb-4"
              onChange={(e) => handleChange("Invested Amount", e.target.value)}
            />
            {investmentType === "Stocks" || investmentType === "Crypto" ? (
              <>
                <input
                  type="text"
                  placeholder="Quantity"
                  value={currentInvestment["Quantity"] || ""}
                  className="border p-2 w-full rounded mb-4"
                  onChange={(e) => handleChange("Quantity", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Price Per Unit"
                  value={currentInvestment["Price Per Unit"] || ""}
                  className="border p-2 w-full rounded mb-4"
                  onChange={(e) => handleChange("Price Per Unit", e.target.value)}
                />
              </>
            ) : null}
            {investmentType === "Bonds" && (
              <>
                <input
                  type="text"
                  placeholder="Time Period (Months)"
                  value={currentInvestment["Time Period (Months)"] || ""}
                  className="border p-2 w-full rounded mb-4"
                  onChange={(e) => handleChange("Time Period (Months)", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Interest Rate (%)"
                  value={currentInvestment["Interest Rate (%)"] || ""}
                  className="border p-2 w-full rounded mb-4"
                  onChange={(e) => handleChange("Interest Rate (%)", e.target.value)}
                />
              </>
            )}
            {investmentType === "Mutual Funds" && (
              <input
                type="text"
                placeholder="Expected Return (%)"
                value={currentInvestment["Expected Return (%)"] || ""}
                className="border p-2 w-full rounded mb-4"
                onChange={(e) => handleChange("Expected Return (%)", e.target.value)}
              />
            )}
            <div className="flex justify-between mt-4">
              <button onClick={saveInvestment} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                Save
              </button>
              <button onClick={closePopup} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
