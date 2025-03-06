"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../_utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Create Income Context
const IncomeContext = createContext();

export const IncomeProvider = ({ children, userId }) => {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0); // Added state for total income

  // Fetch incomes from Firestore when component mounts
  useEffect(() => {
    if (userId) fetchIncomes();
  }, [userId]);

  const fetchIncomes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/incomes`));
      const fetchedIncomes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncomes(fetchedIncomes);
      updateTotalIncome(fetchedIncomes); // Update total income after fetching
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  // Add income to Firestore
  const addIncome = async (income) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/incomes`), income);
      const newIncomes = [...incomes, { id: docRef.id, ...income }];
      setIncomes(newIncomes);
      updateTotalIncome(newIncomes); // Update total income after adding
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  // Delete income from Firestore
  const deleteIncome = async (incomeId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/incomes`, incomeId));
      const updatedIncomes = incomes.filter((income) => income.id !== incomeId);
      setIncomes(updatedIncomes);
      updateTotalIncome(updatedIncomes); // Update total income after deleting
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  // Properly updates total income in state
  const updateTotalIncome = (incomeData = incomes) => {
    const total = incomeData.reduce(
      (sum, income) => sum + (parseFloat(income.amount) || 0),
      0
    );
    setTotalIncome(total); // Set total income in state
  };

  return (
    <IncomeContext.Provider value={{ incomes, totalIncome, addIncome, deleteIncome, updateTotalIncome }}>
      {children}
    </IncomeContext.Provider>
  );
};

// Custom hook for using income context
export const useIncome = () => useContext(IncomeContext);
