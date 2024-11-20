import express from 'express';
import { updatePassword, updateAvatar, updateEmail, updateName, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.put('/update-password', updatePassword);
router.put('/update-avatar', updateAvatar);
router.put('/update-email', updateEmail);
router.put('/update-name', updateName);
router.delete('/delete', deleteUser);

export default router;