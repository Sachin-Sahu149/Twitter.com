import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { wrapAsync } from '../../lib/wrapAsync.js';
import { allCreatedPost, allPost, commentOnPost, createPost, deletePost, getFollowedPost, getLikedPost, getUsersPost, likeUnLikePost } from '../Controllers/post.controller.js';

const router = express.Router();

router.get('/all',protectRoute,wrapAsync(allPost));
// router.get('/:username',protectRoute,wrapAsync(allCreatedPost));
router.get('/liked',protectRoute,wrapAsync(getLikedPost));
router.get('/following',protectRoute,wrapAsync(getFollowedPost));
router.get('/user/:username',protectRoute,wrapAsync(getUsersPost));
router.post('/create',protectRoute,wrapAsync(createPost))
router.post('/like/:id',protectRoute,wrapAsync(likeUnLikePost))
router.post('/comment/:id',protectRoute,wrapAsync(commentOnPost))
router.delete('/:postID',protectRoute,wrapAsync(deletePost))



export default router;