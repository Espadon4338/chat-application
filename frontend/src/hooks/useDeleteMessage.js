import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useChat from '../zustand/useChat';

const useDeleteMessage = () => {
    const [loading, setLoading] = useState(false);
    const { deleteMessageFromState } = useChat();

    const deleteMessage = async (messageId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${messageId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to delete message');
            }

            deleteMessageFromState(messageId);

            return true;
        } catch (error) {
            console.error("Error deleting message:", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteMessage };
}

export default useDeleteMessage;