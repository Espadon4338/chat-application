import { useState, useEffect } from "react";
import useAuthContext from '../hooks/useAuthContext.js'; 
import io from 'socket.io-client';
import { SocketContext } from "./SocketContext.jsx";

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("https://chat-application-rtg6.onrender.com", {
                query: {
                    userId: authUser._id,
                }
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
} 