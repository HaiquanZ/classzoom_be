import * as postService from '../services/post.service';
import * as groupService from '../services/group.service';

require('dotenv').config();

export const createPost = async (req, res, next) => {
    try{
        // check: just admin can create a assignment

        //handle undifined dueto
        if (!req.body.dueto || !req.body.name){
            req.body.dueto = '1';
            req.body.name = '1';
        }
        const dataPost = await postService.createPost(
            req.body.content,
            req.body.type,
            req.body.groupId,
            req.user.user.id,
            req.body.dueto,
            req.body.name
        )
        //handle add answer assignment
        if (req.body.type === 'assignment'){
                const rawData = await groupService.getUserByGroup(req.body.groupId);
                const data = rawData.map( item => ({
                    userId: item.userid,
                    userName: item.User.username,
                    gender: item.User.gender,
                    email: item.User.email,
                    role: item.role
                }))
            await postService.initAnswer(data, dataPost.id, req.user.user.id);
        }
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

export const getAllAssignmentsByUser = async (req, res, next) => {
    try{
        const data = await postService.getAllAssignmentsByUser(req.user.user.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}

export const getDetailAssignment = async (req, res, next) => {
    try{
        const data = await postService.getDetailAssignment(req.params.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
};

export const submitAnswer = async (req, res, next) => {
    try{
        console.log(req.file);
        //upload.single(req.body.file);
        await postService.submitAnswer(req.file.filename ,req.user.user.id);
        res.status(200).json({msg: 'Submitted answer'});
    }catch(err){
        next(err);
    }
}

export const getAnswerOfUser = async (req, res, next) => {
    try{
        const data = await postService.getAnswerOfUser(req.params.id, req.user.user.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
};

export const getAnswerOfAssignment = async (req, res, next) => {
    try{
        const data = await postService.getAnswerOfAssignment(req.params.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}