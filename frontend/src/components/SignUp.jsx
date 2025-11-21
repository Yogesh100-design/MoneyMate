import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------------ SIGN UP FUNCTION -------------------
  const signupUser = async (name, email, password) => {
    setLoading(true);
    setMessage(null);

    const apiUrl = "https://moneymate-2fsn.onrender.com/api/v1/user/Register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      // ------------------ SUCCESS ------------------
      if (response.ok) {
        localStorage.setItem("token", data.authToken || "");

        setCredentials({ name: "", email: "", password: "" });

        setMessage({
          type: "success",
          text: `Signup successful! Welcome, ${name}. Redirecting...`,
        });

        setTimeout(() => navigate("/login"), 1500);
      } 
      
      // ------------------ ERRORS ------------------
      else {
        let errorText =
          data.error || data.msg || "Signup failed due to a server error.";

        // Detect “User already exists”
        if (
          errorText.toLowerCase().includes("user already exists") ||
          errorText.toLowerCase().includes("already")
        ) {
          errorText = "This email is already registered. Please log in.";
        }

        // Validation errors
        else if (data.errors && Array.isArray(data.errors)) {
          errorText = data.errors.map((err) => err.msg).join(", ");
        }

        setMessage({ type: "error", text: errorText });
      }
    } 
    
    // ------------------ NETWORK ERROR ------------------
    catch (error) {
      console.error("Network error:", error);
      setMessage({
        type: "error",
        text: "Network Error: Could not reach the server.",
      });
    } 
    
    finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(credentials.name, credentials.email, credentials.password);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  // ------------------ UI Styles -------------------
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

  // ------------------ JSX -------------------
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
          📝 Sign up for <span className="text-red-600">FinanceFlow</span>
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

        {/* FORM */}
        <form autoComplete="on" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={credentials.name}
              onChange={onChange}
              required
              placeholder="Enter full name"
              className="w-full px-4 py-3 rounded-full border-0 shadow-md focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={onChange}
              required
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-full border-0 shadow-md focus:ring-2 focus:ring-red-500"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={credentials.password}
                onChange={onChange}
                required
                minLength={6}
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-full border-0 shadow-md focus:ring-2 focus:ring-red-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-600 hover:text-gray-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-full font-bold text-white hover:scale-[1.02] transition disabled:opacity-50"
            style={primaryGradientStyle}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <small className="text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-bold underline hover:text-red-700"
            >
              Log In
            </Link>
          </small>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6">
        <p className="text-gray-600 text-sm">
          © 2025 FinanceFlow. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default SignUp;
