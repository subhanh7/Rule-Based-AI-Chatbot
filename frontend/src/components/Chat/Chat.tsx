import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { Message } from '../Message/Message';
import { EmptyState } from '../EmptyState/EmptyState';
import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { InputBar } from '../InputBar/InputBar';
import styles from './Chat.module.css';

export const Chat: React.FC = () => {
  const { messages, isLoading, botName, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <EmptyState botName={botName} />
        ) : (
          <div className={styles.messagesList}>
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className={styles.indicatorWrapper}>
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className={styles.inputArea}>
        <InputBar onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
