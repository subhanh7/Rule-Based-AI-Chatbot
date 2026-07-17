import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface BotConfig {
  botName: string;
  welcomeMessage: string;
}

export interface ChatResponse {
  response: string;
}

export const fetchConfig = async (): Promise<BotConfig> => {
  try {
    const response = await axios.get<BotConfig>(`${API_BASE_URL}/config`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bot config:', error);
    // Fallback defaults if the backend is down
    return {
      botName: 'AI Assistant',
      welcomeMessage: 'Hello! I am your AI assistant. How can I help you today?'
    };
  }
};

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, { message });
    return response.data.response;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw new Error('Sorry, I am having trouble connecting to the server.');
  }
};
