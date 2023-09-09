import express from 'express';
import * as commentController from '../controllers/comment.controller';
import authorize from '../middlewares/auth';
const router = express.Router();

router.post('/', authorize, commentController.createComment);
router.get('/:id', authorize, commentController.getCommentByPost);

export default router;