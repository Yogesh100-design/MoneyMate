import express from "express";
import { registerUser } from "../controllers/register.controller.js";
import loginUser from "../controllers/login.controller.js";
import {expenseController,getAllExpence,deleteExpence,updateExpense} from "../controllers/expence.controller.js";
import protect from "../middlewares/user.middlewares.js"

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);
router.post("/login", loginUser);


router.post("/expence",protect , expenseController);
router.get("/getAllExpence",protect , getAllExpence);
router.post("/deleteExpence/:id",protect ,deleteExpence);
router.post("/deleteExpence/:id",protect ,updateExpense);





export default router;
