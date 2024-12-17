import express from 'express'
import { getme, login, signout, signup } from '../Controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/me',protectRoute,getme);

router.post('/signup',signup);

router.post('/login',login);

router.post('/signout',signout);



export default router;