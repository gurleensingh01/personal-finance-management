"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create Savings Context
const SavingsContext = createContext();

// Savings Provider Component
export const SavingsProvider = ({ children }) => {
  const [savings, setSavings] = useState([]); // Array to hold all savings records
  const [totalSavings, setTotalSavings] = useState(0); // Total savings amount

  // Add a saving record
  const addSaving = (saving) => {
    setSavings((prevSavings) => [...prevSavings, saving]);
  };

  // Update total savings
  const updateTotalSavings = () => {
    const total = savings.reduce((sum, saving) => sum + parseFloat(saving.amount || 0), 0);
    setTotalSavings(total);
  };

  // Automatically update total savings when the savings list changes
  useEffect(() => {
    updateTotalSavings();
  }, [savings]);

  return (
    <SavingsContext.Provider
      value={{
        savings,
        totalSavings,
        addSaving,
        updateTotalSavings,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
};

// Hook to use Savings Context
export const useSavings = () => useContext(SavingsContext);
