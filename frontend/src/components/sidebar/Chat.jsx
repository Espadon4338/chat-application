import React from 'react'
import useChat from '../../zustand/useChat.js';
import useSocketContext from '../../hooks/useSocketContext.js';

const Chat = ({ chat, lastIdx }) => {
    const {selectedChat, setSelectedChat } = useChat();
    
    const isSelected = selectedChat?._id === chat._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(chat._id);

    return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-700 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedChat(chat)}
        >
        <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
            <div className='w-12 rounded-full'>
                <img src={chat.avatar_url} alt="user avatar" />
            </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p>{chat.display_name}</p>
            </div>
        </div>
    </div>
    
    {!lastIdx && <div className='divider my-1 h-1' />}
  </>)
}

export default Chat; 