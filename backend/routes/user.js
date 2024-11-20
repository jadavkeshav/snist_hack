import express from 'express';
import { updatePassword, updateAvatar, updateEmail, updateName, deleteUser, suggestInstructors } from '../controllers/user.js';

const router = express.Router();

router.put('/update-password', updatePassword);
router.put('/update-avatar', updateAvatar);
router.put('/update-email', updateEmail);
router.put('/update-name', updateName);
router.delete('/delete', deleteUser);
router.get('/suggest-instructors', suggestInstructors);


export default router;