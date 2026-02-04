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

  // Find user
  const user = await Register.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Password check
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid email or password');
  }

  // Generate tokens
  const { accessToken, refreshToken } = await user.generateAccessTokenAndRefreshToken();

  // Cookie options for NETLIFY ↔ RENDER
  const cookieOptions = {
    httpOnly: true,
    secure: true,          // required for Render HTTPS
    sameSite: "None",      // required for cross-origin cookies
    path: "/"              // ensures cookies work everywhere
  };

  // Send cookies + data
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          id: user._id,
          name: user.name,
          email: user.email,
          accessToken,
          refreshToken,
        },
        "Login successful"
      )
    );
});

export default loginUser;
