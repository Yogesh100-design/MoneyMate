import React from 'react';

// Accept theme prop
const DashboardSummary = ({ totalExpenses, categoryTotals, isLoading, theme }) => {
  const formatCurrency = (amount) => `₹ ${amount.toFixed(2)}`;

  // Define styles based on theme
  const isDark = theme === 'dark';
  const cardClasses = isDark ? 'bg-gray-800 text-gray-100 border-gray-700 shadow-xl' : 'bg-white text-gray-900 border-indigo-100 shadow-lg';
  const headerClasses = isDark ? 'text-blue-400' : 'text-indigo-600';
  const totalBoxClasses = isDark ? 'bg-gray-700 border-blue-500/50' : 'bg-indigo-50 border-indigo-200';
  const totalTextClasses = isDark ? 'text-blue-200' : 'text-indigo-800';

  if (isLoading) {
    // ... (Loading state remains mostly the same, adjust colors if needed)
    return (
      <div className={`rounded-xl p-5 animate-pulse h-48 ${cardClasses}`}>
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-600 rounded w-full"></div>
          <div className="h-3 bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className={`rounded-xl p-5 border ${cardClasses}`}>
      <h3 className={`text-xl font-bold mb-4 flex items-center ${headerClasses}`}>
        <span className="mr-2">📈</span> Dashboard Summary
      </h3>

      <div className={`mb-4 p-4 rounded-lg border ${totalBoxClasses}`}>
        <p className={`text-lg font-medium ${totalTextClasses}`}>Total Expenses</p>
        <p className="text-3xl font-extrabold text-white">{formatCurrency(totalExpenses)}</p>
      </div>

      <h4 className="text-md font-semibold text-gray-400 mb-2">Top Categories:</h4>
      <ul className="space-y-1">
        {sortedCategories.length > 0 ? (
          sortedCategories.map(([category, amount]) => (
            <li key={category} className="flex justify-between text-sm text-gray-300 border-b border-gray-600 pb-1 last:border-b-0">
              <span className="font-medium">{category}</span>
              <span>{formatCurrency(amount)}</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No category data available.</p>
        )}
      </ul>
      <p className="text-xs text-gray-500 mt-4 text-center">
        (Visual chart integration goes here)
      </p>
    </div>
  );
};

export default DashboardSummary;