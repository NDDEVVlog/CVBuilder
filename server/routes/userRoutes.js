import express from 'express';
import { login, registerUser, getUser } from '../controllers/userController.js';

const router = express.Router();

// [GET]
router.get('/getUser', getUser)

// Route đăng ký người dùng
router.post('/register', registerUser);
router.post('/login', login);



export default router;

