import { Router } from 'express';
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals
} from '../controller/goal.controller';
import { protect } from '../middleware/auth.middleware';

// create a router named router to setup with the express Router function
const router = Router();

// rows of controllers
router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);

export { router as goalRouter };
