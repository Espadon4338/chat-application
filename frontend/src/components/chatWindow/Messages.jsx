import React, { useEffect, useRef } from 'react'
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';

import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {messages, loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  console.log(
        '%c Messages Component RENDERING with messages',
        'color: green;',
        '\nType:', typeof messages,
        '\nIs Array:', Array.isArray(messages)
    );

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  }, [messages])

  return (
    <div className='px-4 flex flex-col flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
      
      {loading ?? [...Array(2)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center py-2'>Send a message to start messaging</p>
      )}
    </div>
  )
}

export default Messages;