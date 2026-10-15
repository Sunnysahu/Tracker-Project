import { useState } from 'react';

export default function WorkRequestForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    clientName: '',
    description: '',
    priority: 'Medium',
    status: 'New',
    dueDate: '',
    notes: '',
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        priority: form.priority,
        status: form.status,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, width: 400 }}>
        <h2>New Work Request</h2>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}

        <div style={{ marginBottom: 8 }}>
          <label>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Client Name *</label>
          <input name="clientName" value={form.clientName} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Priority *</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Status *</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="New">New</option>
            <option value="InProgress">InProgress</option>
            <option value="Blocked">Blocked</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Due Date *</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Create'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
