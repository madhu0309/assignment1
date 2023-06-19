const Message = require("../models/Message");

const addMessage = async (message, userId, groupId) => {
    try {
        const msg = new Message({
            message: message,
            userId: userId,
            groupId: groupId
        })
    
        return msg.save();
    } catch (error) {
        console.log(error);
    }
}

const addLike = async (messageId, userId) => {
    try {     
        const msg = await Message.findOne({_id: messageId});
        if (msg) {
            msg.likes.push(userId);
        }
        return msg.save();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addMessage,
    addLike
}