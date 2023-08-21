import express from 'express';
import * as postController from '../controllers/post.controller';
import authorize from '../middlewares/auth';
const router = express.Router();

router.post('/create', authorize, postController.createPost);

export default router;