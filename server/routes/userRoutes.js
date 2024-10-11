import express from 'express';
import { login, registerUser } from '../controllers/userController.js';

const router = express.Router();


// Route đăng ký người dùng
router.post('/register', registerUser);
router.post('/login', login);


export default router;

