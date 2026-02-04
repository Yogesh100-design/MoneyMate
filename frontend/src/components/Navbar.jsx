import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status on mount AND when route changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // Re-run when route changes

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to landing page after logout
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top"
        style={{
          background: "linear-gradient(90deg, #ff512f, #dd2476)",
        }}
      >
        <div className="container-fluid">
          {/* Brand - Updated to match landing page */}
          <h1 className="text-white font-bold">MoneyMate</h1>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* Updated to point to dashboard instead of home */}
                <Link className="nav-link fw-semibold px-3" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/budget">
                  Budget Planner
                </Link>
              </li>
            </ul>

            {/* Auth Section - Conditionally rendered */}
            <div className="d-flex gap-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <button
                      type="button"
                      className="btn fw-semibold rounded-pill px-5 py-2 shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #FF6A00 0%, #EE0979 100%)',
                        border: '2px solid rgba(255, 255, 255, 0.7)',
                        color: '#fff',
                        boxShadow: '0 4px 15px rgba(238, 9, 121, 0.6)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #EE0979 0%, #FF6A00 100%)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 9, 121, 0.8)';
                        e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #FF6A00 0%, #EE0979 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 9, 121, 0.6)';
                        e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.7)';
                      }}
                    >
                      Sign Up
                    </button>
                  </Link>

                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <button
                      type="button"
                      className="btn btn-outline-primary fw-semibold rounded-pill px-5 py-2 shadow-lg"
                      style={{
                        borderWidth: '2px',
                        transition: 'all 0.3s ease',
                        border: '2px solid rgba(255, 255, 255, 0.7)',
                        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                        color: '#fff',
                        boxShadow: '0 4px 15px rgba(37, 117, 252, 0.4)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 117, 252, 0.6)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 117, 252, 0.4)';
                      }}
                    >
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn fw-semibold rounded-pill px-5 py-2 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.7)',
                    color: '#fff',
                    boxShadow: '0 4px 15px rgba(220, 53, 69, 0.6)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #c82333 0%, #dc3545 100%)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.8)';
                    e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.6)';
                    e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.7)';
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;