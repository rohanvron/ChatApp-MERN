import { useState } from "react";
import { FaSearch, FaHome } from "react-icons/fa";
import useConversation from "../../store/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import toast from "react-hot-toast";
import Conversation from "./Conversation.jsx";

const SearchInput = ({ setFilteredConversations, filteredConversations }) => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!search) {
      setFilteredConversations(null);
      return;
    }
    if (search.length < 2) {
      return toast.error("Search term must be at least 2 characters long");
    }

    const filteredResults = conversations.filter(c => 
      c.fullName.toLowerCase().startsWith(search.toLowerCase())
    );

    setFilteredConversations(filteredResults);

    if (filteredResults.length === 0) {
      toast.error("No matching users found");
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setSearch("");
    setFilteredConversations(null);
  };

  const handleHomeClick = () => {
    setSelectedConversation(null);
    setSearch("");
    setFilteredConversations(null);
  };  

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleHomeClick}
          className="btn btn-circle hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          <FaHome size={25} />
        </button>
        <form onSubmit={handleSubmitSearch} className="flex items-center gap-2 flex-1">
          <input
            value={search}
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
          />
          <button
            type="submit"
            className="btn btn-circle hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
          >
            <FaSearch size={20} />
          </button>
        </form>
      </div>
      {filteredConversations && (
        <div className="mt-4">
          {filteredConversations.map((conversation, index) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIndex={index === filteredConversations.length - 1}
              onClick={() => handleConversationSelect(conversation)}
            />
          ))}
        </div>
      )}
    </>
  );
  
};

export default SearchInput;
