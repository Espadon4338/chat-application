import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContext';

const useSocketContext = () => {
  return useContext(SocketContext);
}

export default useSocketContext;