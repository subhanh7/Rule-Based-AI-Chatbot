import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { BrandingPanel } from '../BrandingPanel/BrandingPanel';
import { useChat } from '../../context/ChatContext';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { botName, clearChat } = useChat();

  const handleNewChat = () => {
    clearChat();
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={handleNewChat} 
      />
      
      <main className={styles.main}>
        <BrandingPanel 
          onMenuClick={() => setIsSidebarOpen(true)} 
          botName={botName}
        />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};
