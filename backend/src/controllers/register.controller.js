import Register from "../models/register.models.js";
import ApiError from "../utils/apierror.js";
import ApiResponse from "../utils/apiresponse.js";
import asyncHandler from "../utils/asynchandler.utils.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    throw new ApiError(400, "Name, password, and email are required");
  }

  const userAlreadyExist = await Register.findOne({ email });

  if (userAlreadyExist) {
    throw new ApiError(400, "User already exists!!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Register.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate tokens
  const { accessToken, refreshToken } = user.generateAccessTokenAndRefreshToken();

  // Save refresh token in DB for future validation/revocation
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Send refresh token in HttpOnly cookie (more secure)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  // Send access token in response body
  res.status(201).json(
    new ApiResponse(
  200,
  "Login successful",   // message
  {                     // data
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken,
  }
)

  );
});

export { registerUser };
