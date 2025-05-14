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

};

export const updateMessage = async (req, res) => {

};

export const deleteMessage = async (req, res) => {

};