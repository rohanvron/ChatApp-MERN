import Conversation from './Conversation.jsx'
import useGetConversations from '../../hooks/useGetConversations.js'

const Conversations = ({ filteredConversations, onSelect }) => {
  const {loading, conversations} = useGetConversations();

  if (loading) {
    return <span className="loading loading-spinner mx-auto"></span>;
  }

  const displayConversations = filteredConversations || conversations;

  if (!Array.isArray(displayConversations)) {
    console.error('Conversations is not an array:', displayConversations);
    return <p>Error: Conversations data is not in the expected format.</p>;
  }

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {displayConversations.length > 0 ? (
        displayConversations.map((conversation, index) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIndex={index === displayConversations.length - 1}
            onSelect={() => onSelect && onSelect(conversation)}
          />
        ))
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  )
}

export default Conversations
