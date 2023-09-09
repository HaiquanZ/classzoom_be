import express from 'express';
import * as postController from '../controllers/post.controller';
import authorize from '../middlewares/auth';
const router = express.Router();

const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, 'upload/')
    },
    filename: (req, file, res) => {
        res(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({storage: storage});

router.post('/create', authorize, postController.createPost);
router.delete('', authorize, postController.deletePost);
router.get('/assignment', authorize, postController.getAllAssignmentsByUser);
router.get('/assignment/:id', authorize, postController.getDetailAssignment);
router.get('/:id', authorize, postController.getALlPostsByGroupId);
router.post('/answer', authorize, upload.single('file'), postController.submitAnswer);
router.get('/answer/:id', authorize, postController.getAnswerOfUser);
router.get('/answer-all/:id', authorize, postController.getAnswerOfAssignment);
router.get('/answer-file/:id', authorize, postController.getFile);


export default router;