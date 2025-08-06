import React, { useState } from "react";
import { googleSignIn } from "../firebase/authFunctions";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch {
      setError("faill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in.." : "Sign in with Google"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
