export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="🔎 Search Tactic..."
      className="input input-bordered w-24 md:w-auto"
    />
  );
}
