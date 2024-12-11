"use client";

import { AuthContextProvider } from "./_utils/auth-context";
import { InvestmentProvider } from "./_utils/investment-context";
import { ExpensesProvider } from "./_utils/expenses-context";
import { IncomeProvider } from "./_utils/income-context";
import { SavingsProvider } from "./_utils/savings-context"; // Import SavingsProvider

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <InvestmentProvider>
        <IncomeProvider>
          <ExpensesProvider>
            <SavingsProvider>
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
                <footer className="bg-gray-800 text-white py-2 text-center mb-auto">
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
    </AuthContextProvider>
  );
}
