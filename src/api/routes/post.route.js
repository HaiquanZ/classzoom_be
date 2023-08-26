import express from 'express';
import * as postController from '../controllers/post.controller';
import authorize from '../middlewares/auth';
const router = express.Router();

router.post('/create', authorize, postController.createPost);
router.delete('', authorize, postController.deletePost);
router.get('/assignment', authorize, postController.getAllAssignmentsByUser);
router.get('/:id', authorize, postController.getALlPostsByGroupId);


export default router;