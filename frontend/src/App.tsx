
import { ChatProvider } from './context/ChatContext';
import { Layout } from './components/Layout/Layout';
import { Chat } from './components/Chat/Chat';

function App() {
  return (
    <ChatProvider>
      <Layout>
        <Chat />
      </Layout>
    </ChatProvider>
  );
}

export default App;
