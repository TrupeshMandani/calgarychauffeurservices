"use client";
import { useState } from "react";
import { firebaseApp } from "../_utils/Firebase"; // Import Firebase app
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err) {
      // Log error details for debugging
      console.error("Email login error: ", err);
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login successful with Google!");
    } catch (err) {
      // Log error details for debugging
      console.error("Google login error: ", err);
      setError("Failed to log in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Calgary Chauffeur Service</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Log in to continue</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        
        {/* Forgot Password & Sign up */}
        <div className="flex items-center justify-between mt-6">
          <button className="text-sm text-blue-500">Forgot password?</button>
          <button className="text-sm text-blue-500">Sign up!</button>
        </div>

        {/* Google Sign-in Button */}
        <div className="mt-4 text-center">
          <p>OR</p>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
