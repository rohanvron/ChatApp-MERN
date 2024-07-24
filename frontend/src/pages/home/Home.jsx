import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'
import useConversation from '../../store/useConversation.js';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the correct state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBack = () => {
    setShowSidebar(true);
    setSelectedConversation(null);
  };

  return (
    <div className="flex h-screen">
      <div className="mx-auto my-12 max-w-7xl flex-grow flex">
        {(!isMobile || showSidebar) && (
          <Sidebar onConversationSelect={handleConversationSelect} />
        )}
        {(!isMobile || (!showSidebar && selectedConversation)) && (
          <MessageContainer onBack={handleBack} />
        )}
      </div>
    </div>
  )
}

export default Home