import { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <div className="w-full flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full input input-bordered h-12 rounded-r-none bg-gray-300 text-black placeholder:text-gray-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center bg-gray-300 h-12 rounded-r-lg px-2">
          <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="mr-2">
            <BsEmojiSmile className="text-blue-500 h-6 w-6" />
          </button>
          <button type="submit" disabled={loading}>
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <IoIosSend className="text-blue-500 h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-full right-0 mb-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
};

export default MessageInput;
