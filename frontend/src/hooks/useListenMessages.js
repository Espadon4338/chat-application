import { useEffect } from 'react';
import useSocketContext from './useSocketContext.js';
import useChat from '../zustand/useChat.js';
import useAuthContext from './useAuthContext.js';
import notification_sound from '../assets/sounds/discord_notification_sound.mp3';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages, selectedChat, updateMessageInState, deleteMessageFromState } = useChat();
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (socket && selectedChat && authUser) {
            const handleNewMessage = (newMessage) => {
                const sound = new Audio(notification_sound);
                sound.play();

                const currentUserId = authUser._id;
                const otherUserIdInChat = selectedChat._id;

                const messageIsForCurrentChat =
                    (newMessage.sender_id === otherUserIdInChat && newMessage.reciever_id === currentUserId) ||
                    (newMessage.sender_id === currentUserId && newMessage.reciever_id === otherUserIdInChat);

                if (messageIsForCurrentChat) {
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                } else {
                    console.log("New message received for a different chat:", newMessage);
                }
            };

            const handleMessageUpdated = (updatedMessage) => {
                 console.log("Message updated via socket:", updatedMessage);
                // Проверяем, относится ли обновленное сообщение к текущему чату
                // Это важно, чтобы не обновлять сообщения в других открытых чатах
                const currentUserId = authUser._id;
                const otherUserIdInChat = selectedChat._id;

                const messageIsForCurrentChat =
                    (updatedMessage.sender_id === otherUserIdInChat && updatedMessage.reciever_id === currentUserId) ||
                    (updatedMessage.sender_id === currentUserId && updatedMessage.reciever_id === otherUserIdInChat);

                if (messageIsForCurrentChat) {
                    updateMessageInState(updatedMessage); // Обновляем состояние через Zustand
                } else {
                    console.log("Message updated in a different chat:", updatedMessage);
                }
            };

            const handleMessageDeleted = (deletedMessageInfo) => {
                console.log("Message deleted via socket:", deletedMessageInfo);
                 // Проверяем, относится ли удаленное сообщение к текущему чату
                const currentUserId = authUser._id;
                const otherUserIdInChat = selectedChat._id;

                 // Проверка может быть более сложной, если deletedMessageInfo не содержит reciever_id/sender_id напрямую
                 // В твоем контроллере ты отправляешь deletedMessageInfo с sender_id и reciever_id, это хорошо.
                const messageWasInCurrentChat =
                    (deletedMessageInfo.sender_id === otherUserIdInChat && deletedMessageInfo.reciever_id === currentUserId) ||
                    (deletedMessageInfo.sender_id === currentUserId && deletedMessageInfo.reciever_id === otherUserIdInChat);

                if (messageWasInCurrentChat) {
                    deleteMessageFromState(deletedMessageInfo._id); // Удаляем из состояния через Zustand
                } else {
                    console.log("Message deleted in a different chat:", deletedMessageInfo);
                }
            };

            socket.on("newMessage", handleNewMessage);
            socket.on("messageUpdated", handleMessageUpdated);
            socket.on("messageDeleted", handleMessageDeleted);

            return () => {
                socket.off("newMessage", handleNewMessage);
                socket.off("messageUpdated", handleMessageUpdated);
                socket.off("messageDeleted", handleMessageDeleted);
            };
        }
    }, [socket, selectedChat, authUser, setMessages, updateMessageInState, deleteMessageFromState]);

    return null;
};

export default useListenMessages;