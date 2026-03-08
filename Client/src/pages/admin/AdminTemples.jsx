import { useState, useEffect } from 'react';
import api from '../../api/axios';

const FB = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/bf/b9/dd/somnath-temple-main-entrance.jpg?w=1400&h=1400&s=1';

export default function AdminTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTemples = () => api.get('/admin/temples').then(r=>setTemples(r.data)).catch(console.error).finally(()=>setLoading(false));
  useEffect(() => { fetchTemples(); }, []);

  const del = async (id) => {
    if (!confirm('Delete this temple and all its data?')) return;
    await api.delete(`/temples/${id}`);
    fetchTemples();
  };

  if (loading) return <div className="loading">Loading temples...</div>;

  return (
    <div className="page-wrap">
      <h2 className="page-header">Temples</h2>
      <div className="cards-grid">
        {temples.map(t => (
          <div key={t._id} className="temple-card">
            <img src={t.image||FB} alt={t.name} onError={e=>e.target.src=FB} />
            <div className="temple-card-body">
              <div className="temple-card-name">{t.name}</div>
              <div className="temple-card-meta">📍 <span>{t.location}</span><br/>👤 <span>{t.organizer?.username}</span></div>
            </div>
            <div className="temple-card-footer">
              <button className="btn btn-red btn-sm" onClick={() => del(t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}