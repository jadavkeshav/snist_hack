import express from 'express';
import login from '../controllers/auth/login.js';
import register from '../controllers/auth/register.js';
import validate from '../controllers/auth/validate.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/validate-token', validate);

export default router;