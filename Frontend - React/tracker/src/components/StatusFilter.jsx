export default function StatusFilter({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="New">New</option>
      <option value="InProgress">InProgress</option>
      <option value="Blocked">Blocked</option>
      <option value="Completed">Completed</option>
    </select>
  );
}
