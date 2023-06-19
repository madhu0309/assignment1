const Group = require("../models/Group");

const getGroups = async (query) => {
    try {     
        if (query) {
            return Group.find({ name: new RegExp(query, 'i') });
        }
        return Group.find();
    } catch (error) {
        console.log(error);
    }
};

const addGroup = async (name, userId) => {
    try {     
        const group = new Group({
            name: name
        });
    
        group.users.push(userId);
        return group.save();
    } catch (error) {
        console.log(error);
    }
}

const removeGroup = async (groupId) => {
    try {
        return Group.deleteById({_id: groupId});
    } catch (error) {
        console.log(error);
    }
}

const addMember = async (userId, groupId) => {
    try {     
        const group = await Group.findOne({_id: groupId});
        if (group) {
            group.users.push(userId);
            group.save();
        }
        return group;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGroups,
    addGroup,
    removeGroup,
    addMember
}