import React from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full input input-bordered h-15 input-info
                    bg-gray-300 text-black placeholder:text-gray-600"
        />
        <button 
            type="submit" 
            className="absolute inset-y-0 end-0 flex items-center pe-3">
            <IoIosSend className= "text-blue-500" size={30} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
