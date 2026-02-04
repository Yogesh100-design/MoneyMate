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

  // Check if user exists
  const userAlreadyExist = await Register.findOne({ email });
  if (userAlreadyExist) {
    throw new ApiError(400, "User already exists!!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await Register.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate tokens
  const { accessToken, refreshToken } =
    await user.generateAccessTokenAndRefreshToken();

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Cookie options for Netlify + Render
  const cookieOptions = {
    httpOnly: true,
    secure: true,        // required for Render HTTPS
    sameSite: "None",    // required for cross-origin cookies
    path: "/",           
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, cookieOptions);

  // Send response
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      },
      "User registered successfully"
    )
  );
});

export { registerUser };
