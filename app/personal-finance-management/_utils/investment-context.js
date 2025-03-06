"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../_utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Create Investment Context
const InvestmentContext = createContext();

export const InvestmentProvider = ({ children, userId }) => {
  const [investments, setInvestments] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0); // Added totalInvestment state

  // Fetch investments from Firestore when component mounts
  useEffect(() => {
    if (userId) fetchInvestments();
  }, [userId]);

  const fetchInvestments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/investments`));
      const fetchedInvestments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvestments(fetchedInvestments);
      updateTotalInvestment(fetchedInvestments); // Update total investment after fetching
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  // Add investment to Firestore
  const addInvestment = async (investment) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/investments`), investment);
      const newInvestment = { id: docRef.id, ...investment };
      const updatedInvestments = [...investments, newInvestment];
      setInvestments(updatedInvestments);
      updateTotalInvestment(updatedInvestments); // Update total investment
    } catch (error) {
      console.error("Error adding investment:", error);
    }
  };

  // Edit investment in Firestore
  const editInvestment = async (investmentId, updatedInvestment) => {
    try {
      const docRef = doc(db, `users/${userId}/investments`, investmentId);
      await updateDoc(docRef, updatedInvestment);

      const updatedInvestments = investments.map((inv) =>
        inv.id === investmentId ? { id: investmentId, ...updatedInvestment } : inv
      );
      setInvestments(updatedInvestments);
      updateTotalInvestment(updatedInvestments); // Update total investment
    } catch (error) {
      console.error("Error updating investment:", error);
    }
  };

  // Delete investment from Firestore
  const deleteInvestment = async (investmentId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/investments`, investmentId));
      const updatedInvestments = investments.filter((inv) => inv.id !== investmentId);
      setInvestments(updatedInvestments);
      updateTotalInvestment(updatedInvestments); // .Update total investment
    } catch (error) {
      console.error("Error deleting investment:", error);
    }
  };

  // Properly updates total investment in state
  const updateTotalInvestment = (investmentData = investments) => {
    const total = investmentData.reduce(
      (sum, inv) => sum + parseFloat(inv["Invested Amount"] || inv["Total Amount"] || 0),
      0
    );
    setTotalInvestment(total); // Set total investment in state
  };

  return (
    <InvestmentContext.Provider value={{ investments, totalInvestment, addInvestment, editInvestment, deleteInvestment, updateTotalInvestment }}>
      {children}
    </InvestmentContext.Provider>
  );
};

// Custom hook for using investments context
export const useInvestment = () => useContext(InvestmentContext);
