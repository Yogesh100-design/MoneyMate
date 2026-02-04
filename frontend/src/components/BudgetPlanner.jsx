import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

const BudgetPlanner = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const categories = [
    { value: "food", label: "🍔 Food" },
    { value: "transport", label: "🚗 Transport" },
    { value: "utilities", label: "⚡ Utilities" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "other", label: "📌 Other" },
  ];

  // Fetch Budget
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // If no token, maybe redirect or just stop
        if (!accessToken) return;

        const res = await fetch(`${API_BASE_URL}/budget`, {
           headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        
        if (data.statusCode === 200 && data.data) {
           setTotalBudget(data.data.totalBudget);
           // Merge saved allocations with all categories
           const savedAllocations = data.data.allocations || [];
           const mergedAllocations = categories.map(cat => {
              const saved = savedAllocations.find(a => a.category === cat.value);
              return saved ? saved : { category: cat.value, amount: 0 };
           });
           setAllocations(mergedAllocations);
        } else {
            // Initialize allocations
             const initAllocations = categories.map(cat => ({ category: cat.value, amount: 0 }));
             setAllocations(initAllocations);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);

  const handleAllocationChange = (category, amount) => {
    const newAllocations = allocations.map(a => 
       a.category === category ? { ...a, amount: Number(amount) } : a
    );
    setAllocations(newAllocations);
  };

  const handleSave = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setMessage(null);
      try {
          const res = await fetch(`${API_BASE_URL}/budget`, {
              method: "POST",
              headers: { 
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}` 
              },
              body: JSON.stringify({ totalBudget, allocations })
          });
          const data = await res.json();
          if (data.statusCode === 200) {
              setMessage({ type: "success", text: "Budget saved successfully!" });
              setTimeout(() => setMessage(null), 3000);
          } else {
              setMessage({ type: "error", text: data.message || "Failed to save" });
          }
      } catch (err) {
          setMessage({ type: "error", text: "Error saving budget" });
      }
  };
  
  const totalAllocated = allocations.reduce((sum, a) => sum + (a.amount || 0), 0);
  const remaining = totalBudget - totalAllocated;
  const isOverBudget = remaining < 0;

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Budget...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6">
       
       <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl mb-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <h2 className="text-3xl font-bold mb-2">📅 Budget Planner</h2>
                <p className="text-indigo-100">Plan your finances effectively</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column: Inputs */}
              <div className="md:col-span-2 space-y-6">
                  
                  {/* Total Budget Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Total Monthly Budget</h3>
                      <input 
                        type="number" 
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(Number(e.target.value))}
                        className="w-full text-3xl font-bold text-indigo-600 border-b-2 border-indigo-200 focus:border-indigo-500 outline-none py-2 bg-transparent"
                        placeholder="0"
                      />
                  </div>

                  {/* Allocations */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">📂 Category Allocation</h3>
                      <div className="space-y-4">
                          {allocations.map((alloc) => {
                              const catLabel = categories.find(c => c.value === alloc.category)?.label || alloc.category;
                              return (
                                  <div key={alloc.category} className="flex items-center gap-4">
                                      <span className="w-1/3 text-gray-700 font-medium">{catLabel}</span>
                                      <div className="flex-1 relative">
                                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                          <input 
                                              type="number"
                                              value={alloc.amount === 0 ? '' : alloc.amount}
                                              onChange={(e) => handleAllocationChange(alloc.category, e.target.value)}
                                              className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
                                              placeholder="0"
                                          />
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  </div>

                  <button 
                    onClick={handleSave}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
                  >
                      Save Budget Plan
                  </button>

                  {message && (
                      <div className={`p-4 rounded-xl text-center font-medium ${message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {message.text}
                      </div>
                  )}

              </div>

              {/* Right Column: Summary */}
              <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 sticky top-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Summary</h3>
                      
                      <div className="space-y-4 mb-8">
                          <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Total Budget</span>
                              <span className="font-bold text-gray-800">₹{totalBudget}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Allocated</span>
                              <span className="font-bold text-indigo-600">₹{totalAllocated}</span>
                          </div>
                           <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    style={{ width: `${Math.min((totalAllocated / (totalBudget || 1)) * 100, 100)}%` }} 
                                    className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-indigo-500'}`}
                                ></div>
                           </div>
                          <div className="flex justify-between text-lg pt-4 border-t border-gray-100">
                              <span className="font-semibold text-gray-700">Remaining</span>
                              <span className={`font-bold ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                                  ₹{remaining}
                              </span>
                          </div>
                          {isOverBudget && (
                              <p className="text-xs text-red-500 mt-1">⚠️ You have exceeded your total budget!</p>
                          )}
                      </div>

                      {/* Chart (Simple visual distribution) */}
                      <div>
                          <h4 className="text-sm font-semibold text-gray-500 mb-3">Distribution</h4>
                          <div className="flex h-4 rounded-full overflow-hidden w-full">
                              {allocations.map((alloc, i) => {
                                  if(!alloc.amount) return null;
                                  const colors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400'];
                                  const width = (alloc.amount / (totalAllocated || 1)) * 100;
                                  return (
                                      <div key={alloc.category} style={{ width: `${width}%` }} className={`${colors[i % colors.length]}`} title={`${alloc.category}: ${alloc.amount}`}></div>
                                  )
                              })}
                          </div>
                      </div>
                  </div>
              </div>

          </div>
       </div>
    </div>
  );
};

export default BudgetPlanner;
