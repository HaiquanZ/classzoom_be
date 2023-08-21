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
        
        resolve(result);
    }catch(err){
        reject(new Error(err.message));
    }
});