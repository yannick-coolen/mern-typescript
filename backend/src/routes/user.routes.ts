import { Router } from 'express';
import {
  getUser,
  loginUser,
  registerUser
} from '../controller/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getUser);

export { router as userRouter };
