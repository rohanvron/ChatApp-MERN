import React from 'react'
import Conversation from './Conversation.jsx'
import useGetConversations from '../../hooks/useGetConversations.js'

const Conversations = () => {
  const {loading, conversations} = useGetConversations();

  if (loading) {
    return <span className="loading loading-spinner mx-auto"></span>;
  }

  if (!Array.isArray(conversations)) {
    console.error('Conversations is not an array:', conversations);
    return <p>Error: Conversations data is not in the expected format.</p>;
  }

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.length > 0 ? (
        conversations.map((conversation, index) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIndex={index === conversations.length - 1}
          />
        ))
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  )
}

export default Conversations
