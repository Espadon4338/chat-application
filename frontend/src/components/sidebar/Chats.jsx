import React from 'react'
import Chat from './Chat';
import useGetChats from '../../hooks/useGetChats';

const Chats = () => {
  const {chats} = useGetChats();
  console.log("Chats:", chats);

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {chats.map((chat, idx) => (
        <Chat 
        key={chat._id}
        chat={chat}
        lastIdx={idx === chats.length - 1} />
      ))}
    </div>
  ) 
}

export default Chats;