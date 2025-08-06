import React, { useState } from "react";
import { githubSignIn, googleSignIn } from "../firebase/authFunctions";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);
    try {
      if (provider === "google") {
        await googleSignIn();
      } else {
        await githubSignIn();
      }
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
        setError(error.message || "Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center space-y-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button
          onClick={() => handleLogin("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in.." : "Sign in with Google"}
        </button>
        <button
          onClick={() => handleLogin("github")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign in with GitHub"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
