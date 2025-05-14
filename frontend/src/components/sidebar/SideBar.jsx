import React from 'react'
import SearchBar from './SearchBar';
import Chats from './Chats';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchBar />
        <div className='divider px-2.5'></div>
        <Chats /> 
        <LogoutButton />
    </div>
  )
}

export default Sidebar;