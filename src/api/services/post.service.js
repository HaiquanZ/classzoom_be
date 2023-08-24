import db from '../models';

export const createPost = (content, type, groupId, userId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Post.create({
            content: content,
            type: type,
            groupid: groupId,
            userid: userId
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const getALlPostsByGroupId = (groupId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Post.findAll({
            where: {
                groupid: groupId
            }
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const deletePost = (postId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Post.destroy({
            where: {id: postId}
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});