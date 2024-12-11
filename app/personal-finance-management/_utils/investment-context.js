"use client";
import React, { createContext, useContext, useState } from "react";

const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);

  const addInvestment = (investment) => {
    setInvestments((prevInvestments) => [...prevInvestments, investment]);
  };

  const editInvestment = (index, updatedInvestment) => {
    setInvestments((prevInvestments) =>
      prevInvestments.map((inv, i) => (i === index ? updatedInvestment : inv))
    );
  };

  const updateTotalInvestment = () => {
    const total = investments.reduce(
      (sum, inv) => sum + parseFloat(inv["Invested Amount"] || inv["Total Amount"] || 0),
      0
    );
    setTotalInvestment(total);
    return total;
  };

  return (
    <InvestmentContext.Provider
      value={{
        investments,
        totalInvestment,
        addInvestment,
        editInvestment,
        updateTotalInvestment,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => useContext(InvestmentContext);
