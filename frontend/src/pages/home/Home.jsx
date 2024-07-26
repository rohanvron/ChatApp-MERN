import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'
import useConversation from '../../store/useConversation.js';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation, setSelectedConversation } = useConversation();

  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const validateUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem("chat-user"));
      if (storedUser && (!storedUser.userId || typeof storedUser.userId !== 'string')) {
        setAuthUser(null);
        localStorage.removeItem("chat-user");
        navigate('/login');
      }
    };
    validateUserData();

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setAuthUser, navigate]);

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
