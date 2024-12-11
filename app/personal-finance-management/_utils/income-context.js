"use client";
import React, { createContext, useContext, useState } from "react";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const addIncome = (income) => {
    setIncomes((prevIncomes) => [...prevIncomes, income]);
  };

  const editIncome = (index, updatedIncome) => {
    setIncomes((prevIncomes) =>
      prevIncomes.map((inc, i) => (i === index ? updatedIncome : inc))
    );
  };

  const updateTotalIncome = () => {
    const total = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
    setTotalIncome(total);
    return total;
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        totalIncome,
        addIncome,
        editIncome,
        updateTotalIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => useContext(IncomeContext);
