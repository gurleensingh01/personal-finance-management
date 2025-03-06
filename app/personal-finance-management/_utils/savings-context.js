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

// Create Savings Context
const SavingsContext = createContext();

export const SavingsProvider = ({ children, userId }) => {
  const [savings, setSavings] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0); // Added state for total savings

  // Fetch savings from Firestore when component mounts
  useEffect(() => {
    if (userId) fetchSavings();
  }, [userId]);

  const fetchSavings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/savings`));
      const fetchedSavings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavings(fetchedSavings);
      updateTotalSavings(fetchedSavings); // Update total savings after fetching
    } catch (error) {
      console.error("Error fetching savings:", error);
    }
  };

  // Add saving to Firestore
  const addSaving = async (saving) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/savings`), saving);
      const newSavings = [...savings, { id: docRef.id, ...saving }];
      setSavings(newSavings);
      updateTotalSavings(newSavings); // Update total savings after adding
    } catch (error) {
      console.error("Error adding saving:", error);
    }
  };

  // Delete saving from Firestore
  const deleteSaving = async (savingId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/savings`, savingId));
      const updatedSavings = savings.filter((saving) => saving.id !== savingId);
      setSavings(updatedSavings);
      updateTotalSavings(updatedSavings); // Update total savings after deleting
    } catch (error) {
      console.error("Error deleting saving:", error);
    }
  };

  // Properly updates total savings in state
  const updateTotalSavings = (savingsData = savings) => {
    const total = savingsData.reduce(
      (sum, saving) => sum + (parseFloat(saving.amount) || 0),
      0
    );
    setTotalSavings(total); // Set total savings in state
  };

  return (
    <SavingsContext.Provider value={{ savings, totalSavings, addSaving, deleteSaving, updateTotalSavings }}>
      {children}
    </SavingsContext.Provider>
  );
};

// Custom hook for using savings context
export const useSavings = () => useContext(SavingsContext);
