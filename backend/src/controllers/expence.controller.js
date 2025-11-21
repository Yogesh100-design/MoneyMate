import asyncHandler from "../utils/asynchandler.utils.js";
import Expense from "../models/expence.models.js";
import ApiResponce from "../utils/apiresponse.js";
import ApiError from "../utils/apierror.js";
import Register from "../models/register.models.js";

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
    new ApiResponce(200 , expense , "Expence saved successfully !!")
  );
});

const getAllExpence = asyncHandler(async (req, res) => {
    const user = req.user._id;

    const allExpence = await Expense.find({ user });

    // If no expenses, return empty array (NOT an error)
    if (!allExpence || allExpence.length === 0) {
        return res.status(200).json(
            new ApiResponce(
                200,
                "No expenses found",
                []  // return empty list
            )
        );
    }

    // If expenses exist, return them
    res.status(200).json(
        new ApiResponce(
            200,
            "All expenses fetched successfully!!",
            allExpence
        )
    );
});



const deleteExpence = asyncHandler(async (req, res) => {
    const { id } = req.params; // expense id from URL
    const userId = req.user._id; // logged in user id

    
    const expense = await Expense.findByIdAndDelete ({ _id: id, user: userId });

    if (!expense) {
        throw new ApiError(404, "Expense not found or not authorized to delete");
    }

    res.status(200).json(
        new ApiResponce(200,"Expense deleted successfully!!", expense)
    );
});

const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params; // expense ID from URL
    const { title, amount, category, date } = req.body; // data from body

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { title, amount, category, date },
        { new: true, runValidators: true } // return updated doc & validate
    );

    if (!updatedExpense) {
        throw new ApiError(404, "Expense not found");
    }

    res.status(200).json(
    new ApiResponce(200, "Expense updated successfully!!", updatedExpense)
);

});



export { expenseController, getAllExpence ,deleteExpence , updateExpense};

