import db from '../_utils/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

/**
 * Fetch data from a sub-collection inside a user's document.
 * @param {string} userId - The ID of the user.
 * @param {string} subCollection - The sub-collection name (income, expenses, savings, investments).
 * @returns {Promise<Array>} - Returns an array of documents.
 */
export const getData = async (userId, subCollection) => {
    try {
        const data = [];
        const querySnapshot = await getDocs(collection(db, `users/${userId}/${subCollection}`));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error(`Error fetching ${subCollection}:`, error);
        throw error;
    }
};

/**
 * Add a new document to a sub-collection inside a user's document.
 * @param {string} userId - The ID of the user.
 * @param {string} subCollection - The sub-collection name (income, expenses, savings, investments).
 * @param {Object} data - The data to add.
 */
export const addData = async (userId, subCollection, data) => {
    try {
        await addDoc(collection(db, `users/${userId}/${subCollection}`), data);
        console.log(`${subCollection} added successfully!`);
    } catch (error) {
        console.error(`Error adding ${subCollection}:`, error);
        throw error;
    }
};

/**
 * Update a document inside a user's sub-collection.
 * @param {string} userId - The ID of the user.
 * @param {string} subCollection - The sub-collection name (income, expenses, savings, investments).
 * @param {string} docId - The document ID to update.
 * @param {Object} newData - The new data to update.
 */
export const updateData = async (userId, subCollection, docId, newData) => {
    try {
        const docRef = doc(db, `users/${userId}/${subCollection}`, docId);
        await updateDoc(docRef, newData);
        console.log(`${subCollection} updated successfully!`);
    } catch (error) {
        console.error(`Error updating ${subCollection}:`, error);
        throw error;
    }
};

/**
 * Delete a document inside a user's sub-collection.
 * @param {string} userId - The ID of the user.
 * @param {string} subCollection - The sub-collection name (income, expenses, savings, investments).
 * @param {string} docId - The document ID to delete.
 */
export const deleteData = async (userId, subCollection, docId) => {
    try {
        const docRef = doc(db, `users/${userId}/${subCollection}`, docId);
        await deleteDoc(docRef);
        console.log(`${subCollection} deleted successfully!`);
    } catch (error) {
        console.error(`Error deleting ${subCollection}:`, error);
        throw error;
    }
};
