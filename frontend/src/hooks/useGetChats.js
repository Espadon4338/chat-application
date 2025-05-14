import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const useGetChats = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getChats = async () => {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();

                if(data.error)
                    throw new Error(data.error);

                setChats(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getChats();
    }, []);

    return {loading, chats};
}

export default useGetChats;