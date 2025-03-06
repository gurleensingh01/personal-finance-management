"use client";

import { useUserAuth } from "./_utils/auth-context"; // Get user context
import { AuthContextProvider } from "./_utils/auth-context";
import { InvestmentProvider } from "./_utils/investment-context";
import { ExpensesProvider } from "./_utils/expenses-context";
import { IncomeProvider } from "./_utils/income-context";
import { SavingsProvider } from "./_utils/savings-context";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <UserProviders>{children}</UserProviders>
    </AuthContextProvider>
  );
}

// A separate component to ensure userId is available before rendering providers
function UserProviders({ children }) {
  const { user } = useUserAuth(); // Get authenticated user
  const userId = user?.uid; // Extract userId

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h1>Loading...</h1>
      </div>
    ); // Prevent rendering until user is authenticated
  }

  return (
    <InvestmentProvider userId={userId}>
      <IncomeProvider userId={userId}>
        <ExpensesProvider userId={userId}>
          <SavingsProvider userId={userId}>
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <header className="bg-gray-800 text-white py-4 shadow-md">
                <div className="container mx-auto text-center">
                  <h1 className="text-2xl font-semibold">
                    Personal Finance Management
                  </h1>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-grow">{children}</main>

              {/* Footer */}
              <footer className="bg-gray-800 text-white py-2 text-center">
                <p>
                  &copy; {new Date().getFullYear()} Personal Finance
                  Management. All rights reserved.
                </p>
              </footer>
            </div>
          </SavingsProvider>
        </ExpensesProvider>
      </IncomeProvider>
    </InvestmentProvider>
  );
}
