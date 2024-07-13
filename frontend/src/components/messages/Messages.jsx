import { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from '../../hooks/useGetMessages.js'

const Messages = () => {
  const {messages, loading} = useGetMessages();
  const messagesContainerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (messagesContainerRef.current && !isFirstRender.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    } else {
      isFirstRender.current = false;
    }
  }, [messages]);

  return (
    <div 
      ref={messagesContainerRef} 
      className='px-4 flex-1 overflow-auto relative'
      style={{ display: 'flex', flexDirection: 'column-reverse' }}
    >
      {!loading && messages.length > 0 && messages.slice().reverse().map((message) => (
        <Message key={message._id} message={message} />
      ))}

      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500'></div>
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-gray-500'>
            <p className='text-2xl'>No messages yet.</p>
            <p>Send a message to start the conversation!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
