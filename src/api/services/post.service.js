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