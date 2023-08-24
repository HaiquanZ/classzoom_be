import * as postService from '../services/post.service';

require('dotenv').config();

export const createPost = async (req, res, next) => {
    try{
        //check if user is member of group

        const data = await postService.createPost(
            req.body.content,
            req.body.type,
            req.body.groupId,
            req.user.user.id
        )
        res.status(201).json({msg: "Created post successfully"});
    }catch(err){
        next(err);
    }
}

export const deletePost = async (req, res, next) => {
    try{
        //check user is owner of post

        await postService.deletePost(req.body.postId);
        res.status(204).json({msg: "Deleted post successfully"});
    }catch(err){
        next(err);
    }
};

export const getALlPostsByGroupId = async (req, res, next) => {
    try{
        console.log(req.param.groupId);
        const data = await postService.getALlPostsByGroupId(req.params.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}