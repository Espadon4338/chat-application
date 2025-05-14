import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5"
import useChat from '../../zustand/useChat.js'
import useGetChats from '../../hooks/useGetChats.js'
import toast from 'react-hot-toast'

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const {setSelectedChat} = useChat();
  const {chats} = useGetChats();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search)
      return;

    if(search.length < 4) {
      toast.error("Search string must be at least 4 characters");
      return;
    }

    const chat = chats.find(
      (x) => x.display_name.toLowerCase().includes(search.toLowerCase())
    );

    if(chat) {
      setSelectedChat(chat);
      setSearch('');
    } else {
      toast.error("No user found");
    }
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input type="text" placeholder='Search...' 
      className='input input-bordered rounded-full'
      value={search}
      onChange={(e) => setSearch(e.target.value)} />

      <button type="submit" className='btn btn-circle bg-sky-700 text-white'>
        <IoSearchOutline className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchBar;