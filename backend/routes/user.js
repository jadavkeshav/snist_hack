import express from 'express';
import { updatePassword, updateAvatar, updateEmail, updateName, deleteUser, suggestInstructors, getAllStudents, updateCoins } from '../controllers/user.js';

const router = express.Router();

router.put('/update-password', updatePassword);
router.put('/update-avatar', updateAvatar);
router.put('/update-email', updateEmail);
router.put('/update-name', updateName);
router.delete('/delete', deleteUser);
router.get('/suggest-instructors/:studentId', suggestInstructors);
router.get('/leaderboard', getAllStudents);
router.put('/update-coins', updateCoins);


export default router;