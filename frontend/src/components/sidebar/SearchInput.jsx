import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
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
