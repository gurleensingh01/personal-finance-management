"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    await googleSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  useEffect(() => {
    if (user && typeof window !== "undefined") {
      router.push("/personal-finance-management/main");
    }
  }, [user, router]);

  return (
    <div className="flex h-screen bg-black font-serif">
        <div className="m-auto text-center">
        <div>
          {!user ? (
            <div className="flex h-screen bg-black font-serif">
                <div className="m-auto text-center">
                    <p className="text-white text-5xl mb-8">Personal Finance Management</p>
                    <button
                        onClick={handleSignIn}
                        className="text-3xl hover:underline hover:cursor-pointer"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
          ): ( null )}
        </div>
      </div>
    </div>
  );
}
