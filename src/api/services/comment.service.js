import db from '../models';

export const createComment = (postId, userId , comment) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Comment.create({
            comment: comment,
            postid: postId,
            userid: userId
        })
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const getCommentByPost = (postId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Comment.findAll({
            where: {
                postid: postId
            },
            include: {
                model: db.User
            }
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});