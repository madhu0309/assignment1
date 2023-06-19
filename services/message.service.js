const Message = require("../models/Message");

const addMessage = async (message, userId, groupId) => {
    const msg = new Message({
        message: message,
        userId: userId,
        groupId: groupId
    })

    return msg.save();
}

const addLike = async (messageId, userId) => {
    const msg = await Message.findOne({_id: messageId});
    if (msg) {
        msg.likes.push(userId);
    }
    return msg.save();;
}

module.exports = {
    addMessage,
    addLike
}