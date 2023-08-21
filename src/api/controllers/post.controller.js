import * as postService from '../services/post.service';

require('dotenv').config();

export const createPost = async (req, res, next) => {
    try{
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