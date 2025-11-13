import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center border rounded input input-bordered w-24 md:w-auto px-2">
      <FaSearch className="text-gray-500 mr-1" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Tactic..."
        className="w-full outline-none border-none"
      />
    </div>
  );
}
