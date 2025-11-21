import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar.jsx'
import ExpenseContainer from './components/Expense.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx';
import ProtectedRoute from './components/Protectedroute.jsx';
import ExpenseTrackerLanding from './components/landingpage.jsx';
import AboutPage from './components/about.jsx';

function App() {
  const location = useLocation();
  
  // Hide navbar on landing page for a clean look
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ExpenseTrackerLanding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={ 
          <ProtectedRoute> 
            <ExpenseContainer/> 
          </ProtectedRoute>  
        } />
      </Routes>
    </>
  )
}

export default App