"use client";
import { useState } from "react";
 
export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    dateOfBirth: "",
    currency: "",
  });
  const [isEditing, setIsEditing] = useState(true); // Default to editing mode
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the profile data (replace with backend or Firestore save logic)
    console.log("Profile Data Saved:", formData);
    alert("Profile saved successfully!");
    setIsEditing(false); // Exit edit mode after saving
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-6 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Profile</h1>
        {isEditing ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Edit
          </button>
        )}
      </header>
 
      {/* Main Content */}
      <main className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">First Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Enter your first name"
              />
            ) : (
              <p className="text-xl">{formData.firstName || "N/A"}</p>
            )}
          </div>
 
          {/* Last Name */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Last Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Enter your last name"
              />
            ) : (
              <p className="text-xl">{formData.lastName || "N/A"}</p>
            )}
          </div>
 
          {/* Email */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Email ID</h3>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Enter your email ID"
              />
            ) : (
              <p className="text-xl">{formData.email || "N/A"}</p>
            )}
          </div>
 
          {/* Nationality */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Nationality</h3>
            {isEditing ? (
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-black"
              >
                <option value="" disabled>Select your nationality</option>
                <option value="Canadian">Canadian</option>
                <option value="American">American</option>
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-xl">{formData.nationality || "N/A"}</p>
            )}
          </div>
 
          {/* Date of Birth */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Date of Birth</h3>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-black"
              />
            ) : (
              <p className="text-xl">{formData.dateOfBirth || "N/A"}</p>
            )}
          </div>
 
          {/* Currency */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Preferred Currency</h3>
            {isEditing ? (
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-black"
              >
                <option value="" disabled>Select your currency</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-xl">{formData.currency || "N/A"}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}