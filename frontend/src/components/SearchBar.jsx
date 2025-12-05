import { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  });

  return (
    <div className="flex items-center border rounded input input-bordered w-24 md:w-auto px-2">
      <FaSearch className="text-gray-500 mr-1" />
      <input
        ref={searchRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Tactic..."
        className="w-full outline-none border-none"
      />
    </div>
  );
}
