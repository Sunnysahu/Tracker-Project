import { useState, useEffect, useCallback } from 'react';
import { getWorkRequests, createWorkRequest, updateStatus, addNote } from '../api/workRequestsApi';
import WorkRequestList from '../components/WorkRequestList';
import WorkRequestForm from '../components/WorkRequestForm';
import StatusFilter from '../components/StatusFilter';
import SearchBar from '../components/SearchBar';

export default function WorkRequestsPage() {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWorkRequests({ status, search, page, pageSize });
      setItems(data.items);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [status, search, page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (formData) => {
    await createWorkRequest(formData);
    setShowForm(false);
    setPage(1);
    load();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus(id, newStatus);
    load();
  };

  const handleAddNote = async (id, note) => {
    await addNote(id, note);
    load();
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20, fontFamily: 'system-ui' }}>
      <h1>Work Request Tracker</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <StatusFilter
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        />
        <button onClick={() => setShowForm(true)}>+ New Request</button>
      </div>

      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
      {loading && <div>Loading...</div>}

      {!loading && <WorkRequestList items={items} onStatusChange={handleStatusChange} onAddNote={handleAddNote} />}

      <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} (Total: {totalCount})
        </span>
        <button disabled={page * pageSize >= totalCount} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

      {showForm && <WorkRequestForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
    </div>
  );
}
