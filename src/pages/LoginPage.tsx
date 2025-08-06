import React, { useState } from "react";
import { githubSignIn, googleSignIn } from "../firebase/authFunctions";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import OAuthButton from "../components/OAuthButton";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);

    let authResult;
    try {
      if (provider === "google") {
        authResult = await googleSignIn();
      } else {
        authResult = await githubSignIn();
      }

      login(authResult.user, authResult.token);
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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm text-center space-y-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <OAuthButton
          onClick={() => handleLogin("google")}
          icon={<GoogleIcon />}
          label="Sign in with Google"
          loading={loading}
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
        />

        <OAuthButton
          onClick={() => handleLogin("github")}
          icon={<GithubIcon />}
          label="Sign in with GitHub"
          loading={loading}
          bgColor="bg-gray-700"
          hoverColor="hover:bg-gray-600"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

// SVG Icons
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.7-1.6-34.7-4.6-51.2H272v96.8h147.1c-6.3 34.1-25.1 62.9-53.4 82.3v68h86.2c50.4-46.4 81.6-114.7 81.6-195.9z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.9 0 134-24.2 178.6-65.7l-86.2-68c-24 16.1-54.8 25.7-92.4 25.7-71 0-131.2-47.9-152.7-112.2H31.1v70.5C75.3 475.9 167.4 544.3 272 544.3z"
    />
    <path
      fill="#FBBC04"
      d="M119.3 324.1c-10.5-30.8-10.5-63.9 0-94.7V159h-88C4.5 206.3 0 246.7 0 272c0 25.2 4.5 65.7 31.3 113.1l88-70.5z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c39.6-.6 77.6 14.2 106.5 41.5l79.6-77.3C411.9 26.1 343.3 0 272 0 167.4 0 75.3 68.4 31.1 159l88 70.5c21.5-64.2 81.7-112.1 152.9-121.8z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .5C5.5.5.5 5.5.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.5 3-.5 1 0 2.1.2 3 .5 2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.3-5.4 5.7.4.4.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.5 18.5.5 12 .5z" />
  </svg>
);
