const colors = {
  New: '#3498db',
  InProgress: '#f39c12',
  Blocked: '#e74c3c',
  Completed: '#27ae60',
};

export default function StatusBadge({ status }) {
  return (
    <span
      style={{
        background: colors[status] || '#999',
        color: '#fff',
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 12,
      }}
    >
      {status}
    </span>
  );
}
