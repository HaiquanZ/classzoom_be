import express from 'express';
import * as groupController from '../controllers/group.controller';
import authorize from '../middlewares/auth';
const router = express.Router();

router.post('/create', authorize, groupController.createGroup);
router.post('/member', authorize, groupController.addMember);
router.get('', authorize, groupController.getAllGroupByUser);
router.get('/:groupId', authorize, groupController.getInforGroup);
router.delete('/:id', authorize, groupController.deleteGroup);
router.post('/:id', authorize, groupController.getUserByGroup);

export default router;