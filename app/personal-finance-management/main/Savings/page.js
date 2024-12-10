"use client";

export default function SavingsPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      <div className="m-auto text-center">
        <h1 className="text-4xl font-bold">Savings</h1>
        <p className="text-xl mt-4">
          Here you can view and manage your past savings records.
        </p>
        {/* Placeholder for savings details */}
        <div className="mt-6">
          <p className="text-lg">No savings records available yet.</p>
        </div>
      </div>
    </div>
  );
}
