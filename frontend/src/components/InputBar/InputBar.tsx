import React, { useState, useRef, useEffect } from 'react';
import { Plus, Mic, AudioLines, ArrowUp } from 'lucide-react';
import styles from './InputBar.module.css';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="button" className={styles.iconButton} aria-label="Attach file">
            <Plus size={24} strokeWidth={1.5} />
          </button>
          
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            rows={1}
            disabled={isLoading}
          />
          
          <div className={styles.rightActions}>
            {!input.trim() && (
              <button type="button" className={styles.iconButton} aria-label="Voice input">
                <Mic size={20} strokeWidth={1.5} />
              </button>
            )}
            
            {input.trim() ? (
              <button 
                type="submit" 
                className={`${styles.primaryButton} ${isLoading ? styles.disabled : ''}`}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <ArrowUp size={20} strokeWidth={3} className={styles.sendIcon} />
              </button>
            ) : (
              <button type="button" className={styles.primaryButton} aria-label="Voice mode">
                <AudioLines size={20} strokeWidth={2.5} className={styles.audioIcon} />
              </button>
            )}
          </div>
        </form>
      </div>
      <div className={styles.disclaimer}>
        Rule-based AI. Only responds to predefined text.
      </div>
    </div>
  );
};
