import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../store/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const {setSelectedConversation} = useConversation();
  const { conversations } = useGetConversations();


  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) {
     return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find(c => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      return;

    } else {
      toast.error("No such user found");
    }
  };

  return (
    <form 
          onSubmit={handleSubmitSearch} 
          className="flex items-center gap-2">
      <input
        value={search}
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
      ></input>

      <button
        type="submit"
        className="btn btn-circle hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
      >
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default SearchInput;
