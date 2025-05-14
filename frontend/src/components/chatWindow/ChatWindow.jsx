import { useEffect } from 'react'
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useChat from '../../zustand/useChat';
import useAuthContext from '../../hooks/useAuthContext';
import useSocketContext from '../../hooks/useSocketContext';
import { extractTime, extractDate } from '../../util/extractTime.js';
import useListenLast_seen from '../../hooks/useListenLast_seen';

const ChatWindow = () => {
  const { selectedChat, setSelectedChat } = useChat();
  const { onlineUsers } = useSocketContext();
  useListenLast_seen();

  useEffect(() => {
    return () => setSelectedChat(null);
  }, [setSelectedChat])

  return (
    <div className='md:min-w-[450px] flex flex-col'>
        { !selectedChat ? <NoChatSelected /> : (
          <>
            <div className='bg-slate-500 flex flex-row justify-between'>
              <div className='px-4 py-2 mb-2'>
                <span className='label-text'>To: </span>
                <span className='text-sky-500 font-bold'>{selectedChat.display_name}</span>
              </div>
              <div className='px-4 py-2 mb-2'>
                { 
                  onlineUsers.includes(selectedChat._id) 
                  ? <span className='label-text'>Online</span>
                  : <span className='label-text'>last seen at: {extractDate(selectedChat?.last_seen)}, {extractTime(selectedChat?.last_seen)}</span> 
                }
              </div>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
    </div>
  )
}

export default ChatWindow;

const NoChatSelected = () => {
  const {authUser} = useAuthContext();

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome, {authUser.display_name}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}