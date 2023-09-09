import * as commentService from '../services/comment.service';

require('dotenv').config();

export const createComment = async (req, res, next) => {
    try{
        const data = await commentService.createComment(req.body.postId, req.user.user.id, req.body.comment);
        res.status(201).json({msg: 'Comment created successfully!'});
    }catch(err){
        next(err);
    }
}

export const getCommentByPost = async (req, res, next) => {
    try{
        const data = await commentService.getCommentByPost(req.params.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
};