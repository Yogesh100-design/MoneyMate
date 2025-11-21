import express from "express";
import { registerUser } from "../controllers/register.controller.js";
import loginUser from "../controllers/login.controller.js";
import { 
  expenseController,
  getAllExpence,
  deleteExpence,
  updateExpense 
} from "../controllers/expence.controller.js";
import protect from "../middlewares/user.middlewares.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Expense Routes
router.post("/expense", protect, expenseController);       // Add expense
router.get("/expenses", protect, getAllExpence);            // Get all expenses
router.delete("/expense/:id", protect, deleteExpence);      // Delete expense
router.put("/expense/:id", protect, updateExpense);         // Update expense

export default router;
