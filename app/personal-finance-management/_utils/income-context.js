"use client";
import React, { createContext, useContext, useState } from "react";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const addIncome = (income) => {
    setIncomes((prevIncomes) => {
      const updatedIncomes = [...prevIncomes, income];
      calculateTotalIncome(updatedIncomes);
      return updatedIncomes;
    });
  };

  const calculateTotalIncome = (incomeList) => {
    const total = incomeList.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
    setTotalIncome(total);
  };

  const updateTotalIncome = () => {
    calculateTotalIncome(incomes);
    return totalIncome;
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        totalIncome,
        addIncome,
        updateTotalIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => useContext(IncomeContext);
