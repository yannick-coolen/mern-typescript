import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Goal from '../models/goal.modal';
import User from '../models/user.model';
import { I_Goals } from '../interface/Props';

/**
 * @description Get all goals which are available in the database.
 * @route GET: `*./api/goals`
 * @access Private
 * @param res Sets the status.
 */
export const getGoals = asyncHandler(async (req: Request, res: Response) => {
  const goals: I_Goals[] = await Goal.find({ user: (req as any).user.id });

  res.status(200).json(goals);
});

/**
 * @description Sets a new goal.
 * @route POST: `*./api/goals`
 * @access Private
 * @param req API request for a value
 * @param res Sets the status.
 */
export const setGoals = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a textfield');
  }

  const goal: I_Goals = await Goal.create({
    text: req.body.text,
    user: (req as any).user.id
  });

  res.status(200).json(goal);
});

/**
 * @description Send a request to receive the ID, to update the goal.
 * @route PUT:  `*./api/goals/:id`
 * @access Private
 * @param req Request the id from the `URL`
 * @param res Sets the status.
 */
export const updateGoals = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ message: 'Goal not found' });
  }

  // Check for user
  if (!(req as any).user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if ((goal as any)!.user.toString() !== (req as any).user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.status(200).json(updatedGoal);
});

/**
 * @description Send a request to receive the ID, to delete the goal.
 * @route PUT: `*./api/goals/:id`
 * @access Private
 * @param req Request the id from the `URL`
 * @param res Sets the status.
 */
export const deleteGoals = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);

  // Check if goal exist
  if (!goal) {
    res.status(400);
    throw new Error('Goal not foud');
  }

  // Check for user
  if (!(req as any).user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if ((goal as any).user.toString() !== (req as any).user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Remove goal
  await Goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});
