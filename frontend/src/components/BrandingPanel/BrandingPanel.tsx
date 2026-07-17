import React from 'react';
import { Bot, Menu } from 'lucide-react';
import styles from './BrandingPanel.module.css';

interface BrandingPanelProps {
  botName: string;
  onMenuClick: () => void;
}

export const BrandingPanel: React.FC<BrandingPanelProps> = ({ botName, onMenuClick }) => {
  return (
    <div className={styles.container}>
      <button 
        className={styles.menuButton} 
        onClick={onMenuClick}
        aria-label="Toggle Sidebar"
      >
        <Menu size={20} />
      </button>
      <div className={styles.panel}>
        <div className={styles.iconWrapper}>
          <Bot size={22} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>{botName}</h1>
          <span className={styles.subtitle}>Your Intelligent Assistant</span>
        </div>
      </div>
    </div>
  );
};
