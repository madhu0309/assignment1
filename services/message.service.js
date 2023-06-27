const Message = require("../models/Message");
const Group = require("../models/Group");

const findMessages = async (userId, groupId) => {
  try {
    return Message.find({ userId: userId, groupId: groupId });
  } catch (error) {
    console.log(error);
  }
};

const addMessage = async (message, userId, groupId) => {
  try {
    
    const msg = new Message({
      message: message,
      userId: userId,
      groupId: groupId,
    });

    return msg.save();
  } catch (error) {
    console.log(error);
  }
};

const addLike = async (messageId, userId) => {
  try {
    const message = await Message.updateOne(
      {
        _id: messageId,
      },
      {
        $addToSet: {
          likes: userId,
        },
      }
    ).lean();

    return message;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findMessages,
  addMessage,
  addLike,
};
