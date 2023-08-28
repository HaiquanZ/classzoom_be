import db from '../models';

export const createPost = (content, type, groupId, userId, dueto, name) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Post.create({
            content: content,
            type: type,
            groupid: groupId,
            userid: userId
        });

        if (type === 'assignment'){
            await db.Assignment.create({
                postid:result.id,
                dueto: dueto,
                name: name
            });
        }
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const initAnswer = (data, postId) => new Promise(async(resolve, reject) => {
    try{
        (async function loop() {
            console.log('okiii');
            for (let i = 0; i < data.length; i++) {
                if ( data[i].role === 'member'){
                    await db.Answer.create({
                        userid: data[i].userId,
                        content: 'none',
                        postid: postId
                    })
                }else{
                    await db.Answer.create({
                        userid: data[i].userId,
                        content: 'owner',
                        postid: postId
                    })
                }
            }
        })();

        resolve({msg: "Success"});
    }catch(err) {
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

export const getAllAssignmentsByUser = (userId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Answer.findAll({
            where: {
                // userid: userId,
                userid: userId
            },
            include: {
                model: db.Assignment,
                as: 'assignment'
            }
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});
