import Message from '../models/message.model.js';
import Chat from '../models/chat.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let chat = await Chat.findOne({
            members: { $all: [senderId, recieverId]}
        });

        if(!chat) {
            chat = await Chat.create({
                members: [senderId, recieverId],
            })
        };

        const newMessage = new Message({
            sender_id: senderId,
            reciever_id: recieverId,
            text: message,
            status: "sent"
        });

        if(newMessage) {
            chat.messages.push(newMessage._id);
        }

        await Promise.all([chat.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in send message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const chat = await Chat.findOne({
            members: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if(!chat)
            return res.status(200).json([]);

        res.status(200).json(chat.messages);
    } catch (error) {
        console.log("Error in get message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const {messageId} = req.params;
        const {text:newText} = req.body;
        const userId = req.user._id;

        if (!newText) {
            return res.status(400).json({ error: "Message text cannot be empty" });
        }

        const messageToUpdate = await Message.findById(messageId);

        if (!messageToUpdate) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (messageToUpdate.sender_id.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Unauthorized: You can only update your own messages" });
        }

        messageToUpdate.text = newText;
        messageToUpdate.status = "modified";

        await messageToUpdate.save();

        res.status(200).json(messageToUpdate);
    } catch (error) {
        console.log("Error in update message controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const {messageId} = req.params;
        const userId = req.user._id;

        const messageToDelete = await Message.findById(messageId);

        if (!messageToDelete) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (messageToDelete.sender_id.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Unauthorized: You can only delete your own messages" });
        }

        await Message.findByIdAndDelete(messageToDelete._id);

        const deletedMessageInfo = {
            _id: messageToDelete._id,
            chatId: null,
            sender_id: messageToDelete.sender_id,
            reciever_id: messageToDelete.reciever_id,
            updatedAt: messageToDelete.updatedAt
        };

        const senderId = messageToDelete.sender_id.toString();
        const recieverId = messageToDelete.reciever_id.toString();

        const senderSocketId = getRecieverSocketId(senderId);
        const recieverSocketId = getRecieverSocketId(recieverId);

        if (senderSocketId) {
            io.to(senderSocketId).emit("messageDeleted", deletedMessageInfo);
        }
        if (recieverSocketId && recieverSocketId !== senderSocketId) {
            io.to(recieverSocketId).emit("messageDeleted", deletedMessageInfo);
        }

        res.status(200).json({ message: "Message deleted successfully", deletedMessage: messageToDelete });
    } catch (error) {
        console.log("Error in delete message controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};