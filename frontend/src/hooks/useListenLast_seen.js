import { useEffect } from "react"
import useSocketContext from "./useSocketContext";
import useChat from "../zustand/useChat";

const useListenLast_seen = () => {
    const { socket } = useSocketContext();
    const { selectedChat, setSelectedChat } = useChat();

    useEffect(() => {
        if (!socket) 
            return;

        const handleLastSeenUpdate = ({ userId, lastSeen }) => {
            if (selectedChat?._id === userId) {
                setSelectedChat({
                    ...selectedChat,
                    last_seen: new Date(lastSeen)
                });
            }
        };

        socket.on("userLastSeen", handleLastSeenUpdate);

        return () => {
            socket.off("userLastSeen", handleLastSeenUpdate);
        };
    }, [socket, selectedChat, setSelectedChat]);

    return null;
};

export default useListenLast_seen;