import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  PanelLeftClose, 
  PanelLeftOpen,
  SquarePen, 
  X,
  Plus,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('rulebot_sidebar_collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('rulebot_sidebar_collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isCollapsed ? styles.collapsed : ''}`}
        initial={false}
      >
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.logoArea} title="RuleBot">
            <div className={styles.logoWrapper}>
              <Bot size={20} className={styles.botIcon} strokeWidth={1.5} />
            </div>
          </div>
          
          <button 
            className={styles.iconBtn} 
            onClick={toggleCollapse} 
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
          
          {/* Mobile close button overlay fallback */}
          <button className={styles.mobileCloseBtn} onClick={onClose} aria-label="Close Mobile Sidebar">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <button className={styles.newChatBtn} onClick={onNewChat} title="New Chat">
            <div className={styles.newChatInner}>
              <div className={styles.newChatIcon}>
                <Plus size={20} />
              </div>
              <span className={styles.btnText}>New Chat</span>
            </div>
            {!isCollapsed && <SquarePen size={18} className={styles.editIcon} />}
          </button>

          <div className={styles.conversationList}>
            <button className={`${styles.chatItem} ${styles.active}`} title="Current Conversation">
              <MessageSquare size={18} className={styles.chatIcon} />
              <span className={styles.chatTitle}>Current Conversation</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
