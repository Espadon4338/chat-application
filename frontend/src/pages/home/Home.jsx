import React from 'react';
import SideBar from '../../components/sidebar/Sidebar';
import ChatWindow from '../../components/chatWindow/ChatWindow';
import './home.scss';
import useSocketContext from '../../hooks/useSocketContext'; // Добавляем при необходимости

const Home = () => {
  // Если дочерним компонентам нужен socket:
  const { socket } = useSocketContext();

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 comp-body'>
      {/* Если SideBar должен реагировать на real-time события (например, список чатов) */}
      <SideBar socket={socket} />
      
      {/* ChatWindow уже содержит useListenMessages */}
      <ChatWindow socket={socket} />
    </div>
  )
}

export default Home; 