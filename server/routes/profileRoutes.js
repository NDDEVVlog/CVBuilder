import express from 'express';
import { create, getProfile,updateProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route for creating a profile
router.post('/create', create);

// Change this to a GET request for fetching profile
router.get('/getProfile', getProfile);

router.post('/updateProfile', updateProfile);

export default router;
