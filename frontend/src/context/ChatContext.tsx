import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Message } from '../types/chat';
import { fetchConfig, sendChatMessage } from '../services/api';

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  botName: string;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botName, setBotName] = useState('AI Assistant');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initChat = async () => {
      const config = await fetchConfig();
      setBotName(config.botName);
      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: config.welcomeMessage,
        },
      ]);
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initChat();
    }
  }, [isInitialized]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(content);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An error occurred.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setIsInitialized(false);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, botName, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};
