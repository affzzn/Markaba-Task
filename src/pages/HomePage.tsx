import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [greeting, setGreeting] = useState("Welcome !");

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting((prev) => (prev === "Welcome !" ? "! مرحباً" : "Welcome !"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-pulse">{greeting}</h1>

        <p className="text-gray-300 mb-6 max-w-md">
          A secure dashboard demo built with OAuth login and live tech news.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Login
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-sm text-gray-500 text-center">
        Built with React · Tailwind · Vite · OAuth (Firebase)
      </footer>
    </div>
  );
};

export default HomePage;
