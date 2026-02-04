import asyncHandler from "../utils/asynchandler.utils.js";
import { Budget } from "../models/budget.model.js";
import ApiResponce from "../utils/apiresponse.js";
import ApiError from "../utils/apierror.js";

/* -------------------------------------------------------
   Create or Update Budget
-------------------------------------------------------- */
const saveBudget = asyncHandler(async (req, res) => {
    const { totalBudget, allocations } = req.body;
    const userId = req.user._id;

    if (totalBudget === undefined || !allocations) {
        throw new ApiError(400, "Total budget and allocations are required");
    }

    // Check if budget exists for user
    let budget = await Budget.findOne({ userId });

    if (budget) {
        budget.totalBudget = totalBudget;
        budget.allocations = allocations;
        await budget.save();
    } else {
        budget = await Budget.create({
            userId,
            totalBudget,
            allocations
        });
    }

    res.status(200).json(
        new ApiResponce(200, budget, "Budget saved successfully")
    );
});

/* -------------------------------------------------------
   Get Budget
-------------------------------------------------------- */
const getBudget = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const budget = await Budget.findOne({ userId });

    if (!budget) {
        return res.status(200).json(
            new ApiResponce(200, null, "No budget found")
        );
    }

    res.status(200).json(
        new ApiResponce(200, budget, "Budget fetched successfully")
    );
});

export { saveBudget, getBudget };
