import { create } from 'zustand';

const useChat = create((set, get) => ({ 
    selectedChat: null,
    setSelectedChat: (selectedChat) => set({ selectedChat }),
    messages: [], 
    setMessages: (newMessagesOrFn) => {
        let finalMessages;
        if (typeof newMessagesOrFn === 'function') {
            const currentState = get();
            finalMessages = newMessagesOrFn(currentState.messages);
        } else {
            finalMessages = newMessagesOrFn;
        }

        console.log(
            '%c Zustand setMessages CALLED',
            'color: red; font-weight: bold;',
            '\nType of finalMessages:', typeof finalMessages,
            '\nIs finalMessages an Array:', Array.isArray(finalMessages),
            '\nValue of finalMessages:', JSON.stringify(finalMessages),
            '\nCaller stack (approx):', (new Error().stack).split('\n').slice(2, 5).join('\n')
        );

        if (!Array.isArray(finalMessages)) {
            console.error(
                '%c CRITICAL: setMessages called with NON-ARRAY!',
                'color: red; font-size: 16px; font-weight: bold;',
                finalMessages
            );
        }

        set({ messages: finalMessages });
    },
    updateMessageInState: (updatedMessage) =>
        set((state) => {
            return {
                messages: state.messages.map(msg =>
                msg._id === updatedMessage._id ? updatedMessage : msg),
            };
        }
    ),
    deleteMessageFromState: (messageId) =>
        set((state) => {
            return {
                messages: state.messages.filter(msg => msg._id !== messageId),
            };
        }
    ),
}));

export default useChat;