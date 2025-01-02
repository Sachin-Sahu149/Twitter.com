import express from 'express'
import { getme, login, signout, signup } from '../Controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { wrapAsync } from '../../lib/wrapAsync.js';

const router = express.Router();

router.get('/me',wrapAsync(protectRoute),wrapAsync(getme));

router.post('/signup',wrapAsync(signup));

router.post('/login',wrapAsync(login));

router.post('/signout',wrapAsync(signout));



export default router;