import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome !</h1>
      <Link to="/login" className="text-blue-500 hover:underline text-lg">
        Go to Login
      </Link>
    </div>
  );
};

export default HomePage;
