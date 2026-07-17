import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, FileText, Lightbulb } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  botName: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ botName }) => {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.iconWrapper}>
          <Sparkles size={48} className={styles.icon} />
        </div>
        <h2 className={styles.title}>How can I help you today?</h2>
        <p className={styles.subtitle}>
          I'm {botName}, your personal AI assistant. I can help with a variety of tasks.
        </p>
      </motion.div>

      <motion.div 
        className={styles.suggestions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.card}>
          <Lightbulb size={24} className={styles.cardIcon} />
          <p>Explain quantum computing in simple terms</p>
        </div>
        <div className={styles.card}>
          <Code size={24} className={styles.cardIcon} />
          <p>Write a React component for a navigation bar</p>
        </div>
        <div className={styles.card}>
          <FileText size={24} className={styles.cardIcon} />
          <p>Summarize the main plot points of The Great Gatsby</p>
        </div>
      </motion.div>
    </div>
  );
};
