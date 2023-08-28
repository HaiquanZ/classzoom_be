import * as groupService from '../services/group.service';

require('dotenv').config();

export const createGroup = async (req, res, next) => {
    let {groupname, description, subject} = req.body;
    if (!description || !groupname){
        return res.status(404).json({
            error: 'Name and description of group are required'
        });
    }
    try{
        const data = await groupService.createGroup(
            {groupname, description, totalmember: 1, subject},
            req.user.user.id
        );
        res.status(200).json({msg: 'Created group!'});
    }catch(err){
        next(err);
    }
}

export const addMember = async (req, res, next) => {
    //check is admin of group
    const adminId = await groupService.findOwnerGroup(req.body.groupId);
    if (req.user.user.id !== adminId.userid){
        return res.status(401).json({
            error: "You are not a moderator of the group"
        })
    };

    
    //check if user already has group
    const user = await groupService.findUserOnGroup(req.body.groupId, req.body.email);
    if (user){
        return res.status(400).json({
            error: "This user have already added!"
        })
    }

    try{
        const data = await groupService.addMemberByEmail(req.body.groupId, req.body.email);
        res.status(200).json({msg: 'Added member!'});
    }catch(err){
        next(err);
    }
};

export const getAllGroupByUser = async (req, res, next) => {
    try{
        const data = await groupService.getAllGroupByUser(req.user.user.id);
        let result = data.map(item => ({
            groupId: item.groupid,
            role: item.role,
            groupName: item.Group.groupname,
            description: item.Group.description,
            totalMember: item.Group.totalmember,
            subject: item.Group.subject
        }));
        res.status(200).json(result);
    }catch(err){
        next(err);
    }
}

export const deleteGroup = async (req, res, next) => {
    //check is moderator of group
    console.log(req.params.id);
    const adminId = await groupService.findOwnerGroup(req.params.id);
    if (req.user.user.id !== adminId.userid){
        return res.status(401).json({
            error: "You are not a moderator of the group"
        })
    };
    console.log(req.params.id);

    try{
        await groupService.deleteGroup(req.params.id);
        res.status(200).json({msg: "Deleted"});
    }catch(err){
        next(err);
    }
}

export const getInforGroup = async (req, res, next) => {
    try{
        const data = await groupService.getInfoGroup(req.params.groupId);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
};

export const getUserByGroup = async (req, res, next) => {
    try{
        const rawData = await groupService.getUserByGroup(req.params.id);
        const data = rawData.map( item => ({
            userId: item.userid,
            userName: item.User.username,
            gender: item.User.gender,
            email: item.User.email,
            role: item.role
        }))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}