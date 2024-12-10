"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, googleSignIn } = useUserAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      await googleSignIn();
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect authenticated user to the dashboard
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      router.push("/personal-finance-management/main");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white font-serif">
      

      {/* Main Content */}
      <main className="container mx-auto py-10">
        <h2 className="text-4xl mb-6 text-center">Welcome to Personal Finance Management</h2>
        <p className="text-xl text-center mb-6">Please sign in to manage your finances.</p>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <div className="flex justify-center">
          <button
            onClick={handleSignIn}
            className="px-6 py-3 bg-blue-600 text-white text-2xl rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login with Google"}
          </button>
        </div>
      </main>
    </div>
  );
}
