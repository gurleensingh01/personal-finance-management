"use client";

import React, { createContext, useContext, useState } from "react";

// Create Expenses Context
const ExpensesContext = createContext();

// Expenses Provider Component
export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Function to add a new expense
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  // Function to update an existing expense
  const editExpense = (index, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((exp, i) => (i === index ? updatedExpense : exp))
    );
  };

  // Function to calculate and update the total expenses
  const updateTotalExpenses = () => {
    const total = expenses.reduce(
      (sum, exp) => sum + parseFloat(exp.amount || 0),
      0
    );
    setTotalExpenses(total);
    return total;
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        totalExpenses,
        addExpense,
        editExpense,
        updateTotalExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

// Custom hook to use the Expenses Context
export const useExpenses = () => useContext(ExpensesContext);
