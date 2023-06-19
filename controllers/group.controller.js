const { getGroups, addGroup, removeGroup, addMember } = require("../services/group.service");

const groupsList = async (req, res) => {
    try {
        const query = req.query.name;
        const groups = await getGroups(query);
        res.status(200).json({success: true, data: groups});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId;
        const group = await addGroup(name, userId);
        res.status(201).json({success: true, data: group});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        await removeGroup(groupId);
        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const addGroupMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const groupId = req.params.id;
        await addMember(userId, groupId);
        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {
    groupsList,
    createGroup,
    deleteGroup,
    addGroupMember,
}