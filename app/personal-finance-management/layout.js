import { AuthContextProvider } from "./_utils/auth-context";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header (optional, for navigation) */}
        <header className="bg-gray-800 text-white py-4 shadow-md">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-semibold">Personal Finance Management</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer (optional) */}
        <footer className="bg-gray-800 text-white py-2 text-center">
          <p>&copy; {new Date().getFullYear()} Personal Finance Management. All rights reserved.</p>
        </footer>
      </div>
    </AuthContextProvider>
  );
}
