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

// Create Expenses Context
const ExpensesContext = createContext();

export const ExpensesProvider = ({ children, userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0); // Added state for total expenses

  // Fetch expenses from Firestore when the component mounts
  useEffect(() => {
    if (userId) fetchExpenses();
  }, [userId]);

  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/expenses`));
      const fetchedExpenses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(fetchedExpenses);
      updateTotalExpenses(fetchedExpenses); // Update total expenses after fetching
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Add expense to Firestore
  const addExpense = async (expense) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/expenses`), expense);
      const newExpenses = [...expenses, { id: docRef.id, ...expense }];
      setExpenses(newExpenses);
      updateTotalExpenses(newExpenses); // Update total expenses after adding
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Delete expense from Firestore
  const deleteExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/expenses`, expenseId));
      const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
      setExpenses(updatedExpenses);
      updateTotalExpenses(updatedExpenses); // Update total expenses after deleting
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Properly updates total expenses in state
  const updateTotalExpenses = (expensesData = expenses) => {
    const total = expensesData.reduce(
      (sum, expense) => sum + (parseFloat(expense.amount) || 0),
      0
    );
    setTotalExpenses(total); // Set total expenses in state
  };

  return (
    <ExpensesContext.Provider value={{ expenses, totalExpenses, addExpense, deleteExpense, updateTotalExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

// Custom hook for using expenses context
export const useExpenses = () => useContext(ExpensesContext);
