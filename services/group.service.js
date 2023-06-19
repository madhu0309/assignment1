const Group = require("../models/Group");

const getGroups = async (query) => {
    if (query) {
        return Group.find({ name: new RegExp(query, 'i') });
    }
    return Group.find();
};

const addGroup = async (name, userId) => {
    const group = new Group({
        name: name
    });

    group.users.push(userId);
    return group.save();
}

const removeGroup = async (groupId) => {
    return Group.deleteById({_id: groupId});
}

const addMember = async (userId, groupId) => {
    const group = await Group.findOne({_id: groupId});
    if (group) {
        group.users.push(userId);
        group.save();
    }
    return group;
}

module.exports = {
    getGroups,
    addGroup,
    removeGroup,
    addMember
}