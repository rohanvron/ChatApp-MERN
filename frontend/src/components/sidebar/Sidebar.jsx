import React from "react";
import SearchInput from "./SearchInput.jsx";
import Conversation from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Sidebar = () => {
  return (
    <div
      className="w-1/3 h-full border-r p-6 border-gray-300 flex flex-col 
                    backdrop-filter backdrop-blur-lg bg-opacity-5 bg-gray-100"
    >
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversation />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
