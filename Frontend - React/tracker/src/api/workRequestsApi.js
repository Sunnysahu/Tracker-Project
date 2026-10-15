const API_BASE = 'https://localhost:7108/api/WorkRequests';

export async function getWorkRequests({ status = '', search = '', page = 1, pageSize = 10 }) {
  const params = new URLSearchParams();

  if (status) params.append('status', status);

  if (search) params.append('search', search);

  params.append('page', page);

  params.append('pageSize', pageSize);

  const res = await fetch(`${API_BASE}?${params}`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to load work requests');
  }
  return res.json();
}

export async function createWorkRequest(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));

    let message = 'Create failed';

    if (Array.isArray(err.errors)) {
      message = err.errors.join(', ');
    } else if (err.errors && typeof err.errors === 'object') {
      message = Object.values(err.errors).flat().join(', ');
    } else if (err.message) {
      message = err.message;
    } else if (err.title) {
      message = err.title;
    }

    throw new Error(message);
  }

  return res.json();
}
export async function updateStatus(id, status) {
  const res = await fetch(`${API_BASE}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Status update failed');
  }

  return res.json();
}

export async function addNote(id, note) {
  const res = await fetch(`${API_BASE}/${id}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note }), // must be { note: "..." }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    let message = 'Add note failed';

    if (Array.isArray(err.errors)) {
      message = err.errors.join(', ');
    } else if (err.errors && typeof err.errors === 'object') {
      message = Object.values(err.errors).flat().join(', ');
    } else if (err.message) {
      message = err.message;
    }

    throw new Error(message);
  }

  return res.json();
}
