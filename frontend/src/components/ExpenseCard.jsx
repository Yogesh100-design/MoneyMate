import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  if (!expense) return null;



  return (
    <div className="md:w-7xl mt-6  mx-auto mb-6 p-5 bg-gradient-to-r from-white to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center ">
      <div>
        <h3 className="text-xl font-extrabold text-gray-900 tracking-wide">
          {expense.title}
        </h3>
        <p className="text-red-600 font-extrabold text-2xl mt-1 drop-shadow-sm">
          ₹{expense.amount}
        </p>
      </div>

      <div className="flex gap-4">
        

        <button
          onClick={() => onDelete(expense._id)}
          className="flex items-center gap-2 text-dark px-5 py-2 rounded-lg shadow-md transition transform hover:-translate-y-1
             bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800"
          aria-label="Delete Expense"
          title="Delete Expense"
        >
          <FaTrashAlt />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
