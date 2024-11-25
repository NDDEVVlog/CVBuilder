import express from 'express';
import { create, getProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route for creating a profile
router.post('/create', create);

// Change this to a GET request for fetching profile
router.get('/getProfile', getProfile);



export default router;
