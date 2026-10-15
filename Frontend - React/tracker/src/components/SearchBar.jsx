export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search title or client..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ minWidth: 220 }}
    />
  );
}
