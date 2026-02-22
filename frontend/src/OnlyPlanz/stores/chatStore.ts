import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type MessageProp = {
  label: string;
  content: string;
  timestamp: string;
};

type ChatState = {
  messages: MessageProp[];
  addSendMessage: (content: string) => void;
  addReceiveMessage: (message: MessageProp) => void;
  clearMessages: () => void;
};

/**
 * Returns a Zustand store for a specific chatroom
 * @param chatID unique identifier for this chatroom (userID, roomID, etc.)
 */
export const createChatStore = (chatID: string) =>
  create<ChatState>()(
    persist(
      (set, get) => ({
        messages: [],
        addSendMessage: (content: string) => {
          const newMessage: MessageProp = {
            label: "me",
            content,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          };
          set({ messages: [...get().messages, newMessage] });
        },
        addReceiveMessage: (message: MessageProp) => {
          set({ messages: [...get().messages, message] });
        },
        clearMessages: () => set({ messages: [] }),
      }),
      {
        name: `chat-${chatID}`,
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );