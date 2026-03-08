import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => api.get('/admin/users').then(r=>setUsers(r.data)).catch(console.error).finally(()=>setLoading(false));
  useEffect(() => { fetchUsers(); }, []);

  const del = async (id) => {
    if (!confirm('Delete this user?')) return;
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="page-wrap">
      <h2 className="page-header">Users</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>UserId</th><th>User name</th><th>Email</th><th>Operation</th></tr></thead>
          <tbody>
            {users.map((u,i) => (
              <tr key={u._id}>
                <td>{i+1}</td>
                <td><small style={{fontFamily:'monospace',fontSize:11}}>{u._id}</small></td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td><button className="btn btn-red btn-sm" onClick={() => del(u._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}