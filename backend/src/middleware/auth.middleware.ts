import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model';

/**
 * Protect the items for being shown to public, which are been added by the user who
 *  matches the created after the authentication is successfull.
 *  Otherwise the items will not be visible
 */
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, String(process.env.JWT_STRING));

        // Get user from the token (extra, the password will not be added)
        (req as any).user = await User.findById((decoded as any).id).select(
          '-pasword'
        );

        next();
      } catch (error) {
        // If the token does not match, the user should not be authorized to have access to see the items
        console.log(error);
        res.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      // If there is no token, the user should not be authorized to have access to see the items, 
      // and will see that no token has been created.
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);
