import * as groupService from '../services/group.service';

require('dotenv').config();

export const createGroup = async (req, res, next) => {
    let {groupname, description} = req.body;
    if (!description || !groupname){
        return res.status(404).json({
            error: 'Name and description of group are required'
        });
    }
    try{
        const data = await groupService.createGroup(
            {groupname, description, totalmember: 1},
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
        return res.status(400).json({
            error: "You are not a moderator of the group"
        })
    };
    //check if user already has group
    const user = await groupService.findUserOnGroup(req.body.groupId, req.body.memberId);
    if (user){
        return res.status(400).json({
            error: "This user have already added!"
        })
    }

    try{
        const data = await groupService.addMember(req.body.groupId, req.body.memberId);
        res.status(200).json({msg: 'Added member!'});
    }catch(err){
        next(err);
    }
};

export const getAllGroupByUser = async (req, res, next) => {
    try{
        const data = await groupService.getAllGroupByUser(req.user.user.id);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}