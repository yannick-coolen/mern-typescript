import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import User from '../models/user.model';
import { I_Users } from '../interface/Props';

/**
 * @description Register a new user.
 * @route POST: `*./api/users`
 * @access Public
 * @param res Sets the status.
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password }: I_Users = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    // Check if user exist
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exist');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user: I_Users = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Check if user is valid
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid.');
    }
  }
);

/**
 * @description Authenticate an user.
 * @route POST: `*./api/users/login`
 * @access Public
 * @param res Sets the status.
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: I_Users = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

/**
 * @description Get user data.
 * @route GET: `*./api/users/user`
 * @access Private
 * @param res Sets the status.
 */
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json((req as any).user);
});

// Generate JWT
const generateToken = (id: any) => {
  return jwt.sign({ id }, String(process.env.JWT_STRING), {
    expiresIn: '30d'
  });
};
