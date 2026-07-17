export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  botName: string;
}
