import React from "react";
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { LuMessagesSquare  } from "react-icons/lu";

const MessageContainer = () => {
  const welcomeMsg = true;

  return (
    <div className="w-2/3 h-full flex flex-col backdrop-filter backdrop-blur-lg bg-opacity-5">
      {welcomeMsg ? ( <WelcomeMessage />
      ) : (
        <>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 mb-2">
            <span className="label-text text-green-300">To:</span>{" "}
            <span className="text-white font-semibold">Bikesh Barkane</span>
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
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        className="flex flex-col px-4 text-center sm:text-lg md:text-xl 
                        text-white font-semibold items-center gap-2">

        <p>Welcome !! Rohan Verma 💙</p>
        <p>Select a chat to start messaging!</p>
        <LuMessagesSquare className="text-3xl md:text-6xl text-center mt-4" />
      </div>
    </div>
  );
};
