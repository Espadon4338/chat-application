import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useChat from '../zustand/useChat';

const useUpdateMessage = () => {
    const [loading, setLoading] = useState(false);
    const { updateMessageInState } = useChat();

    const updateMessage = async (messageId, newText) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newText }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update message');
            }

            updateMessageInState(data);

            return true;
        } catch (error) {
            console.error("Error updating message:", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateMessage };
}

export default useUpdateMessage;