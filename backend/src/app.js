import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Enable CORS for frontend (React app)
app.use(cors({
  origin: "http://localhost:5173", // React app URL
  credentials: true                // allow cookies/auth headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

export default app;
