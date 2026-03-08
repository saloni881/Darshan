import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const FB = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/bf/b9/dd/somnath-temple-main-entrance.jpg?w=1400&h=1400&s=1';

export default function TempleList() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/temples').then(r => setTemples(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading temples...</div>;

  return (
    <div className="page-wrap">
      <h2 className="page-header">Temples</h2>
      {temples.length === 0
        ? <div className="empty">No temples available yet.</div>
        : (
          <div className="cards-grid">
            {temples.map(t => (
              <div key={t._id} className="temple-card" onClick={() => navigate(`/temples/${t._id}`)}>
                <img src={t.image || FB} alt={t.name} onError={e => e.target.src=FB} />
                <div className="temple-card-body">
                  <div className="temple-card-name">{t.name}</div>
                  <div className="temple-card-meta">
                    Open: <span>{t.openTime || 'N/A'}</span> &nbsp; Close: <span>{t.closeTime || 'N/A'}</span><br/>
                    📍 <span>{t.location}</span><br/>
                    👤 <span>{t.organizer?.username}</span>
                  </div>
                  <div className="temple-card-desc">{t.description}</div>
                </div>
                <div className="temple-card-footer">
                  <button className="btn btn-teal btn-sm" onClick={e => { e.stopPropagation(); navigate(`/temples/${t._id}`); }}>View</button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}