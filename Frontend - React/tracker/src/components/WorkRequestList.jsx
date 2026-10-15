import StatusBadge from './StatusBadge';

export default function WorkRequestList({ items, onStatusChange, onAddNote }) {
  if (!items.length) return <p>No work requests found.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
          <th>Title</th>
          <th>Client</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td>{item.title}</td>
            <td>{item.clientName}</td>
            <td>{item.priority}</td>
            <td>
              <StatusBadge status={item.status} />
              <select value={item.status} onChange={(e) => onStatusChange(item.id, e.target.value)} style={{ marginLeft: 8 }}>
                <option value="New">New</option>
                <option value="InProgress">InProgress</option>
                <option value="Blocked">Blocked</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td>{item.dueDate}</td>
            <td style={{ maxWidth: 250, whiteSpace: 'pre-wrap' }}>{item.notes || '—'}</td>
            <td>
              <button
                onClick={async () => {
                  const note = prompt('Add note:');
                  if (!note?.trim()) return;
                  try {
                    await onAddNote(item.id, note.trim());
                  } catch (err) {
                    alert(err.message);
                  }
                }}
              >
                + Note
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
