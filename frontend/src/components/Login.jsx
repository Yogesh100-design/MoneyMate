import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // ✅ Login Function (Corrected)
  // ------------------------------
  const loginUser = async (email, password) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://moneymate-2fsn.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // 🔥 REQUIRED for sending cookies (tokens)
        credentials: "include",

        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens (if you're using localStorage)
        if (data?.data?.accessToken)
          localStorage.setItem("accessToken", data.data.accessToken);

        if (data?.data?.refreshToken)
          localStorage.setItem("refreshToken", data.data.refreshToken);

        setCredentials({ email: "", password: "" });

        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });

        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setMessage({
          type: "error",
          text: data.message || data.error || "Invalid email or password.",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage({
        type: "error",
        text: "Network error: Could not reach the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials.email, credentials.password);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  // ------------------------------
  // 🎨 Styles (Matching SignUp)
  // ------------------------------
  const primaryGradientStyle = {
    background: "linear-gradient(90deg, #ff9966, #ff5e62)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
  };

  const backgroundGradient =
    "linear-gradient(135deg, #89f7fe 0%, #ebedf0ff 100%)";

  const cardStyle = {
    backdropFilter: "blur(12px)",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    maxWidth: "420px",
    width: "90%",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-5"
      style={{ background: backgroundGradient }}
    >
      <div className="p-8 shadow-2xl border border-white/30" style={cardStyle}>
        {/* Title */}
        <div
          className="text-center font-extrabold mb-6"
          style={{
            fontSize: "1.8rem",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
            color: "#374151",
          }}
        >
          🔐 Login to <span className="text-red-600">FinanceFlow</span>
        </div>

        {/* Message Box */}
        {message && (
          <div
            className={`p-3 rounded-lg mb-4 text-sm font-medium ${
              message.type === "error"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-full border-0 shadow-md focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              id="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-full border-0 shadow-md focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              id="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
            style={primaryGradientStyle}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-5">
          <small className="text-gray-700 font-medium">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-600 font-bold hover:text-red-700 transition"
              style={{ textDecoration: "underline" }}
            >
              Sign up
            </Link>
          </small>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <div className="text-center text-gray-600 text-sm">
          <p>© 2025 FinanceFlow. All rights reserved. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
