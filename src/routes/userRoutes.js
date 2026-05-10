import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/userController.js';

const router = Router();

router.use(authenticate);

router.get('/users/me', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', upload.single('avatar'), updateUserAvatar);

export default router;
