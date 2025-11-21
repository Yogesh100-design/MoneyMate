import asyncHandler from "../utils/asynchandler.utils.js";
import Expense from "../models/expence.models.js";
import ApiResponce from "../utils/apiresponse.js";
import ApiError from "../utils/apierror.js";
import Register from "../models/register.models.js";

/* -------------------------------------------------------
   Create Expense
-------------------------------------------------------- */
const expenseController = asyncHandler(async (req, res) => {
  const { title, amount, category, date } = req.body;
  const userId = req.user._id;

  if (!title || !amount || !category) {
    throw new ApiError("Title, amount, and category are required");
  }

  const expense = new Expense({
    title,
    amount,
    category,
    date: date || Date.now(),
    user: userId,
  });

  await expense.save();

  res.status(201).json(
    new ApiResponce(201, expense, "Expense saved successfully !!")
  );
});

/* -------------------------------------------------------
   Get All Expenses
-------------------------------------------------------- */
const getAllExpence = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allExpence = await Expense.find({ user: userId });

  if (!allExpence || allExpence.length === 0) {
    return res.status(200).json(
      new ApiResponce(200, [], "No expenses found")
    );
  }

  res.status(200).json(
    new ApiResponce(200, allExpence, "All expenses fetched successfully!!")
  );
});

/* -------------------------------------------------------
   Delete Expense (FIXED!)
-------------------------------------------------------- */
const deleteExpence = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Correct Mongoose method
  const expense = await Expense.findOneAndDelete({ _id: id, user: userId });

  if (!expense) {
    throw new ApiError(404, "Expense not found or not authorized to delete");
  }

  res.status(200).json(
    new ApiResponce(200, expense, "Expense deleted successfully!!")
  );
});

/* -------------------------------------------------------
   Update Expense
-------------------------------------------------------- */
const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const { title, amount, category, date } = req.body;

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { title, amount, category, date },
    { new: true, runValidators: true }
  );

  if (!updatedExpense) {
    throw new ApiError(404, "Expense not found");
  }

  res.status(200).json(
    new ApiResponce(200, updatedExpense, "Expense updated successfully!!")
  );
});

export { expenseController, getAllExpence, deleteExpence, updateExpense };
