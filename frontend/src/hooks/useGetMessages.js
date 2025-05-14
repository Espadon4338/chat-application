import { useEffect, useState } from 'react';
import useChat from '../zustand/useChat';
import { toast } from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedChat } = useChat();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedChat._id}`);

                if (!res.ok) {
                    let errorMsg = `Failed to fetch messages. Status: ${res.status}`;
                    try {
                        const errorData = await res.json();
                        if (errorData && errorData.error) {
                            errorMsg = errorData.error;
                        }
                    } catch (e) {
                        console.error("Failed to parse error response JSON", e);
                    }
                    throw new Error(errorMsg);
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    console.error("Received non-array data from /api/messages:", data);
                    toast.error("Error: Received invalid message format.");
                    setMessages([]);
                }
            } catch (error) {
                toast.error(error.message);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedChat?._id) {
            getMessages();
        } else {
            setMessages([]);
            setLoading(false);
        }
    }, [selectedChat?._id, setMessages]);

    console.log(
    '%c useGetMessages RETURNING',
    'color: blue;',
    '\nType of messages:', typeof messages,
    '\nIs messages an Array:', Array.isArray(messages)
);

    return { messages, loading };
};

export default useGetMessages;