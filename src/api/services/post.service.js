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

export const initAnswer = (data, postId, ownerId) => new Promise(async(resolve, reject) => {
    try{
        (async function loop() {
            console.log('okiii');
            for (let i = 0; i < data.length; i++) {
                if ( data[i].userId != ownerId){
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
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: db.User
                },
            ]
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
                association: db.Answer.Assignment 
            }
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const getDetailAssignment = (id) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Post.findOne({
            where: {
                id: id 
            },
            include: {
                model: db.Assignment
            }
        })
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const submitAnswer = (content, userId) => new Promise(async(resolve, reject) => {
    try{
        let user = await db.Answer.findOne({
            where: {
                userid: userId
            }
        })

        await user.update({
            content: content
        })

        resolve({msg: 'Submited answer'});

    }catch(err){
        reject(new Error(err.message));
    }
});

export const getAnswerOfUser = (postId, userId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Answer.findOne({
            where: {
                postid: postId,
                userid: userId
            }
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const getAnswerOfAssignment = (postId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Answer.findAll({
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

export const getFile = (id) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Answer.findOne({
            where: {
                id: id
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
