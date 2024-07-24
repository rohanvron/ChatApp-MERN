import { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ onConversationSelect }) => {
  const [filteredConversations, setFilteredConversations] = useState(null);

  return (
    <div className="w-full md:w-1/3 h-full border-r p-6 border-gray-300 flex flex-col 
                    backdrop-filter backdrop-blur-lg bg-opacity-5 bg-gray-100">
      <SearchInput 
        setFilteredConversations={setFilteredConversations} 
        filteredConversations={filteredConversations}
      />
      {!filteredConversations && (
        <>
          <div className="divider px-3"></div>
          <Conversations onSelect={onConversationSelect} />
        </>
      )}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;