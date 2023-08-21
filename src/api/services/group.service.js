import db, { Sequelize } from '../models';

export const createGroup = (group, adminId) => new Promise(async(resolve, reject) => {
    try{
        const createGroup = await db.Group.create(group);
        const addRoleAdmin = await db.Membergroup.create({
            userid: adminId, 
            groupid: createGroup.id, 
            role: 'moderator'
        });
        const result = {
            createGroup: createGroup,
            addRoleAdmin: addRoleAdmin
        }
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const findOwnerGroup = (groupId) => new Promise(async(resolve, reject) => {
    try{
        const adminId = await db.Membergroup.findOne({
            where: {
                groupid: groupId,
                role: 'moderator'
            }
        });

        resolve(adminId);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const findUserOnGroup = (groupId, userId) => new Promise(async(resolve, reject,) => 
{
    try{
        const user = await db.Membergroup.findOne({
            where: {
                groupid: groupId,
                userid: userId
            }
        });

        resolve(user);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const addMember = (groupId, memberId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Membergroup.create({
            userid: memberId,
            groupid: groupId,
            role: 'member'
        });

        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const getAllGroupByUser = (userId) => new Promise(async(resolve, reject) => {
    try{
        const result = await db.Membergroup.findAll({
            where: {
                userid: userId,
            },
            include: db.Group,
        });
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});

export const deleteGroup = (groupId) => new Promise(async(resolve, reject) => {
    try{
        //delete Group table
        await db.Group.destroy({
            where: {
                id: groupId
            }
        })
        //delete Membergroup table
        await db.Membergroup.destroy({
            where: {
                groupid: groupId
            }
        })

        resolve({msg: "Deleted"})
    }catch(err){
        reject(new Error(err.message));
    }
})