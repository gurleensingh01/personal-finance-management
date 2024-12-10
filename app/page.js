import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 to-black font-serif">
      <div className="m-auto text-center">
        {/* Title */}
        <p className="text-white text-5xl font-bold mb-8">
          Personal Finance Management
        </p>
        {/* Subtext */}
        <p className="text-2xl text-gray-300">
          Take control of your finances today!
        </p>
        {/* Call-to-action Link */}
        <p className="mt-4">
          <Link
            href="/personal-finance-management"
            className="text-blue-400 text-2xl underline hover:text-blue-600 transition-colors duration-300"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
