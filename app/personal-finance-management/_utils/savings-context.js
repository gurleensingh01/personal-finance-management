"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useIncome } from "../_utils/income-context"; // Import income context
import { useExpenses } from "../_utils/expenses-context"; // Import expenses context

// Create Savings Context
const SavingsContext = createContext();

// Savings Provider Component
export const SavingsProvider = ({ children }) => {
  const [savings, setSavings] = useState([]); // Array to hold all savings records
  const { totalIncome } = useIncome(); // Access total income
  const { totalExpenses } = useExpenses(); // Access total expenses

  // Dynamically calculate total savings as income - expenses + saved amounts
  const totalSavings = totalIncome - totalExpenses + savings.reduce((sum, saving) => sum + parseFloat(saving.amount || 0), 0);

  // Add a saving record
  const addSaving = (saving) => {
    setSavings((prevSavings) => [...prevSavings, saving]);
  };

  const updateTotalSavings = () => {
    // Calculate total savings whenever savings data changes
    const newTotalSavings = totalIncome - totalExpenses + savings.reduce((sum, saving) => sum + parseFloat(saving.amount || 0), 0);
    return newTotalSavings;
  }

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
