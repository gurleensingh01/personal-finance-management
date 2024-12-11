"use client";
import { useState } from "react";

export default function InvestmentsPage() {
  const [popupContent, setPopupContent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [currentInvestment, setCurrentInvestment] = useState({});

  const handleAddClick = (investmentType) => {
    setCurrentInvestment({ type: investmentType });
    switch (investmentType) {
      case "Stocks":
        setPopupContent(
          <div>
            <h2 className="text-xl font-bold mb-4">Add details for Stocks</h2>
            <input
              type="text"
              placeholder="Stock Name"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, quantity: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, price: e.target.value })}
            />
          </div>
        );
        break;
      case "Bonds":
        setPopupContent(
          <div>
            <h2 className="text-xl font-bold mb-4">Add details for Bonds</h2>
            <input
              type="text"
              placeholder="Bond Name"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Invested Amount"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, amount: e.target.value })}
            />
            <input
              type="text"
              placeholder="Time Period"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, time: e.target.value })}
            />
            <input
              type="number"
              placeholder="Return"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, return: e.target.value })}
            />
          </div>
        );
        break;
      case "Mutual Funds":
        setPopupContent(
          <div>
            <h2 className="text-xl font-bold mb-4">Add details for Mutual Funds</h2>
            <input
              type="text"
              placeholder="Fund Name"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Invested Amount"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, amount: e.target.value })}
            />
            <input
              type="number"
              placeholder="Expected Return"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, return: e.target.value })}
            />
          </div>
        );
        break;
      case "Crypto":
        setPopupContent(
          <div>
            <h2 className="text-xl font-bold mb-4">Add details for Crypto</h2>
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, quantity: e.target.value })}
            />
          </div>
        );
        break;
      case "Real Estate":
        setPopupContent(
          <div>
            <h2 className="text-xl font-bold mb-4">Add details for Real Estate</h2>
            <input
              type="text"
              placeholder="Type"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Invested Amount"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setCurrentInvestment({ ...currentInvestment, amount: e.target.value })}
            />
          </div>
        );
        break;
      default:
        setPopupContent(null);
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
    setCurrentInvestment({});
  };

  const saveInvestment = () => {
    setInvestments([...investments, currentInvestment]);
    closePopup();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      <div className="text-center pt-10">
        <h1 className="text-4xl font-bold mb-4">Investments</h1>
        <p className="text-xl mb-8">
          This is where you can add or manage your investments.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {investments.map((investment, index) => (
            <div
              key={index}
              className="bg-gray-700 text-white p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold">{investment.type}</h3>
              {Object.entries(investment)
                .filter(([key]) => key !== "type")
                .map(([key, value]) => (
                  <p key={key} className="text-sm capitalize">
                    {key}: ${value}
                  </p>
                ))}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
  <button
    onClick={() => handleAddClick("Stocks")}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-48 text-2xl mx-auto"
  >
    Add Stocks
  </button>
  <button
    onClick={() => handleAddClick("Bonds")}
    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-48 text-2xl mx-auto"
  >
    Add Bonds
  </button>
  <button
    onClick={() => handleAddClick("Mutual Funds")}
    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg w-48 text-2xl mx-auto"
  >
    Add Mutual Funds
  </button>
  <button
    onClick={() => handleAddClick("Crypto")}
    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-48 text-2xl mx-auto"
  >
    Add Crypto
  </button>
  <button
    onClick={() => handleAddClick("Real Estate")}
    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-48 text-2xl mx-auto"
  >
    Add Real Estate
  </button>
</div>




        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-80">
              {popupContent}
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
    </div>
  );
}
