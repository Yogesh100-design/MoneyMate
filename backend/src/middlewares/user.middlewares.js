import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asynchandler.utils.js";
import Register from "../models/register.models.js";
import dotenv from "dotenv";
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let accessToken;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) 
  {
    try {
      // Get token string after "Bearer "
      accessToken = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);

      // Attach user info to req.user (exclude password)
      req.user = await Register.findById(decoded._id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
});

export default protect;
