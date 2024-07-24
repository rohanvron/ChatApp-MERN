import React, { useEffect } from "react";
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { LuMessagesSquare  } from "react-icons/lu";
import useConversation from "../../store/useConversation.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

const MessageContainer = ({ onBack }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
 
return (
    <div className="w-full md:w-2/3 h-full flex flex-col backdrop-filter backdrop-blur-lg bg-opacity-5">
      {!selectedConversation ? (
        <WelcomeMessage />
      ) : (
        <>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 mb-2 flex items-center">
            <button onClick={onBack} className="md:hidden mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="label-text text-green-300">To:</span>{" "}
            <span className="text-white font-semibold">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const WelcomeMessage = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        className="flex flex-col px-4 text-center sm:text-lg md:text-xl 
                        text-white font-semibold items-center gap-2">

        <p>Welcome !! {authUser.fullName} 💙</p>
        <p>Select a chat to start messaging!</p>
        <LuMessagesSquare className="text-6xl md:text-6xl text-center mt-4" />
      </div>
    </div>
  );
};
