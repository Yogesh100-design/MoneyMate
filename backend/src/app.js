import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Allowed origins (frontend URLs)
const allowedOrigins = [
  "http://localhost:5173",
  "https://moneymate-y.netlify.app/"  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

export default app;
