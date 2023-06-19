const { addMessage, addLike } = require("../services/message.service");

const createMessage = async (req, res) => {
    try {
        const { message, groupId } = req.body;
        const userId = req.userId;
        const msg = await addMessage(message, userId, groupId)
        res.status(201).json({success: true, data: msg});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const likeMessage = async (req, res) => {
    try {     
        const { messageId } = req.body;
        const userId = req.userId;
        const msg = await addLike(messageId, userId);
        res.status(200).json({success: true, data: msg});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {
    createMessage,
    likeMessage
}