import React from "react";
import { Link } from "react-router-dom";

const ExpenseTrackerLanding = () => {
  // Styles based on the glassmorphism aesthetic from the user's Login component
  const primaryGradientStyle = {
    background: "linear-gradient(90deg, #ff9966, #ff5e62)", // Orange/Red Primary Gradient
    boxShadow: "0 4px 10px rgba(255, 94, 98, 0.4)",
  };

  const glassmorphismCardStyle = {
    backdropFilter: "blur(12px)",
    background: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans"
      style={{
        background: "linear-gradient(135deg, #89f7fe 0%, #ebedf0ff 100%)",
        color: "#1f2937",
      }}
    >
      {/* Header */}
      <header className="p-6">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    
    {/* Logo/App Name */}
    <Link to="/" className="text-3xl font-extrabold tracking-tight">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500">
        MoneyMate
      </span>
    </Link>
    
    {/* Navigation/Auth Links */}
    <nav className="flex items-center space-x-6">

      {/* 👇 NEW ABOUT BUTTON ADDED HERE */}
      <Link to="/about">
        <button 
          className="px-5 py-2.5 text-lg font-semibold rounded-lg text-white shadow-xl hover:scale-105 transition-all duration-300 transform"
          style={primaryGradientStyle}
        >
          About
        </button>
      </Link>

      <Link to="/login">
        <button 
          className="px-5 py-2.5 text-lg font-semibold rounded-lg text-white shadow-xl hover:scale-105 transition-all duration-300 transform"
          style={primaryGradientStyle}
        >
          Log In
        </button>
      </Link>

      <Link to="/signup">
        <button 
          className="px-5 py-2.5 text-lg font-semibold rounded-lg text-white shadow-xl hover:scale-105 transition-all duration-300 transform"
          style={primaryGradientStyle}
        >
          Sign Up
        </button>
      </Link>
    </nav>
  </div>

  {/* Separator */}
  <div className="w-full h-[2px] bg-gray-900 opacity-40 mt-3"></div>
</header>


      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-snug">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500">
              Master Your Money.
            </span>
            <span className="block text-gray-800 mt-2">Simplify Your Life.</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Gain <strong>complete clarity</strong> over your finances with intelligent, effortless expense tracking. Start saving smarter today.
          </p>

          {/* Main CTA Button */}
          <Link to="/signup">
            <button 
              className="group relative px-12 py-5 rounded-full font-bold text-2xl text-white shadow-3xl hover:scale-105 transition-all duration-300 transform border-2 border-transparent hover:border-white"
              style={{
                ...primaryGradientStyle,
                boxShadow: "0 8px 20px rgba(255, 94, 98, 0.6)",
              }}
            >
              Start Tracking for Free
              <span className="ml-3 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </Link>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {/* Feature 1 */}
            <div 
              className="p-8 rounded-3xl shadow-xl hover:border-red-500 transition-all duration-300 transform hover:shadow-2xl"
              style={glassmorphismCardStyle}
            >
              <div className="text-red-500 text-4xl font-bold mb-3">₹0</div>
              <div className="text-gray-800 text-lg font-semibold">Risk-Free Start</div>
              <p className="text-gray-600 mt-1">Free core features, forever.</p>
            </div>
            
            {/* Feature 2 */}
            <div 
              className="p-8 rounded-3xl shadow-xl hover:border-pink-500 transition-all duration-300 transform hover:shadow-2xl"
              style={glassmorphismCardStyle}
            >
              <div className="text-pink-500 text-4xl font-bold mb-3">🔒</div>
              <div className="text-gray-800 text-lg font-semibold">Enterprise-Grade Security</div>
              <p className="text-gray-600 mt-1">Your financial data is protected.</p>
            </div>
            
            {/* Feature 3 */}
            <div 
              className="p-8 rounded-3xl shadow-xl hover:border-red-500 transition-all duration-300 transform hover:shadow-2xl"
              style={glassmorphismCardStyle}
            >
              <div className="text-red-500 text-4xl font-bold mb-3">📈</div>
              <div className="text-gray-800 text-lg font-semibold">Insightful Reporting</div>
              <p className="text-gray-600 mt-1">Visual graphs & spending trends.</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="mt-32 max-w-6xl mx-auto px-4 w-full">
          <h3 className="text-5xl font-extrabold text-center mb-16 tracking-tight">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500">FinanceFlow</span> Difference
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl shadow-2xl text-center" style={glassmorphismCardStyle}>
              <div className="text-6xl mb-4" style={{ color: '#ff9966' }}>1</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Effortless Tracking</h4>
              <p className="text-gray-600 leading-relaxed">
                Log transactions quickly on any device with auto-categorized entries.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl shadow-2xl text-center" style={glassmorphismCardStyle}>
              <div className="text-6xl mb-4" style={{ color: '#ff5e62' }}>2</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Deep Dive Analysis</h4>
              <p className="text-gray-600 leading-relaxed">
                Understand spending patterns with charts and insights.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl shadow-2xl text-center" style={glassmorphismCardStyle}>
              <div className="text-6xl mb-4" style={{ color: '#ff9966' }}>3</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Achieve Financial Goals</h4>
              <p className="text-gray-600 leading-relaxed">
                Set budgets with smart alerts to keep you on track.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 w-full max-w-5xl p-8 rounded-3xl text-center shadow-3xl"
          style={{
            ...primaryGradientStyle,
            boxShadow: "0 10px 30px rgba(255, 94, 98, 0.7)",
          }}
        >
          <h4 className="text-3xl font-bold text-white mb-4">Ready to Change Your Financial Future?</h4>
          <p className="text-lg text-white/90 mb-6">
            Join thousands of users who are now in full control of their money.
          </p>
          <Link to="/signup">
            <button 
              className="px-8 py-3 bg-white text-xl font-bold text-gray-800 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Sign Up Now →
            </button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 FinanceFlow. All rights reserved. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default ExpenseTrackerLanding;
