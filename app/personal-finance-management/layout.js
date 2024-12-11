"use client";
import { AuthContextProvider } from "./_utils/auth-context";
import { InvestmentProvider } from "./_utils/investment-context";
import { IncomeProvider } from "./_utils/income-context";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <InvestmentProvider>
        <IncomeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white py-4 shadow-md">
              <div className="container mx-auto text-center">
                <h1 className="text-2xl font-semibold">Personal Finance Management</h1>
              </div>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="bg-gray-800 text-white py-2 text-center">
              <p>&copy; {new Date().getFullYear()} Personal Finance Management. All rights reserved.</p>
            </footer>
          </div>
        </IncomeProvider>
      </InvestmentProvider>
    </AuthContextProvider>
  );
}
