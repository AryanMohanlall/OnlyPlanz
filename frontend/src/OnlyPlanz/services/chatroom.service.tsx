import { useState } from 'react';

export type MessageProp = {
    label: string,
    content: string,
    timestamp: string
};

export const useChat = () => {
    const [messages, setMessages] = useState<MessageProp[]>([]);

    const addReceiveMessage = (message: MessageProp) => {
        setMessages((prev) => [...prev, message]);
    };

    const addSendMessage = (content: string) => {
        const newMessage: MessageProp = {
            label: "me",
            content: content,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    return { messages, addReceiveMessage, addSendMessage };
};
