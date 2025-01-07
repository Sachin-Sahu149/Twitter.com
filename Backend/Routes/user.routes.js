import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserProfile,followUnfollowUser, getSuggestedUser, updateUserProfile } from '../Controllers/user.controller.js';
import { wrapAsync } from '../../lib/wrapAsync.js';

const router = express.Router();

router.get('/profile/:username',wrapAsync(protectRoute),wrapAsync(getUserProfile));
router.get('/suggested',protectRoute,wrapAsync(getSuggestedUser));
router.post('/follow/:id',wrapAsync(protectRoute),wrapAsync(followUnfollowUser));
router.put('/update',protectRoute,wrapAsync(updateUserProfile));

export default router;