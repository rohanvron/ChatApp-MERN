import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {

  const {loading, sendMessage} = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full input input-bordered h-15 input-info
                    bg-gray-300 text-black placeholder:text-gray-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
            type="submit" 
            className="absolute inset-y-0 end-0 flex items-center pe-3">
            { 
              loading 
              ? 
              <div className="loading loading-spinner"></div> 
              : 
              <IoIosSend className="text-blue-500 h-8 w-8"/>
            }
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
