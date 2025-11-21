import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Register from '../models/register.models.js';
import ApiError from '../utils/apierror.js';
import ApiResponse from '../utils/apiresponse.js';
import asyncHandler from '../utils/asynchandler.utils.js';

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  // Find user by email
  const user = await Register.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid credentials');
    alert("Please enter correct email or password ")
  }

  // Generate tokens
  const { accessToken, refreshToken } = await user.generateAccessTokenAndRefreshToken();

  const options = {
    httpOnly: true,
    secure: true, // set true if HTTPS
    sameSite: "Strict", // prevent CSRF
  };

  // Set cookies and respond
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
    200,
    "Login successful",
    {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
    }
)

    );
});

export default loginUser;
