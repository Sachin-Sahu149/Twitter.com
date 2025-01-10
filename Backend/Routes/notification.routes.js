import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { wrapAsync } from '../../lib/wrapAsync.js';
import { deleteOneNotification, deleteNotifications, getNotifications } from '../Controllers/notification.controller.js';

const router = express.Router();

router.get('/',protectRoute,wrapAsync(getNotifications));
router.delete('/',protectRoute,wrapAsync(deleteNotifications));
router.delete('/:id',protectRoute,wrapAsync(deleteOneNotification));


export default router;