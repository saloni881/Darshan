import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const FB = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/bf/b9/dd/somnath-temple-main-entrance.jpg?w=1400&h=1400&s=1https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80';

export default function MyTemple() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/temples/my').then(r => setData(r.data)).catch(() => setData(null)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  if (!data) return (
    <div className="page-wrap text-center">
      <h2 className="page-header">My Temple</h2>
      <p className="text-muted mb-3">You haven't created a temple yet.</p>
      <button className="btn btn-teal" onClick={() => navigate('/organizer/create-temple')}>+ Add Temple</button>
    </div>
  );

  const { temple, slots } = data;

  return (
    <div className="detail-wrap">
      <div className="flex-between mb-3">
        <h2 className="page-header" style={{margin:0}}>My Temple</h2>
        <button className="btn btn-teal btn-sm" onClick={() => navigate(`/organizer/update-temple/${temple._id}`)}>
          Edit Temple
        </button>
      </div>

      <div className="detail-header">
        <img className="detail-img" src={temple.image||FB} alt={temple.name} onError={e=>e.target.src=FB} />
        <div className="detail-info">
          <div className="detail-name">{temple.name}</div>
          <div className="detail-meta">
            Open: <span>{slots[0]?.open || 'N/A'}</span><br/>
            Close: <span>{slots[0]?.close || 'N/A'}</span><br/>
            Location: <span>{temple.location}</span><br/>
          </div>
          <div className="detail-desc">{temple.description}</div>
        </div>
      </div>

      <div className="detail-section-title">Timing's</div>
      {slots.length === 0
        ? <div className="empty">No darshan slots yet. <a style={{color:'var(--teal)',cursor:'pointer'}} onClick={() => navigate('/organizer/darshans')}>Add Darshans →</a></div>
        : (
          <div className="slot-cards">
            {slots.map(s => (
              <div key={s._id} className="slot-card">
                <div className="slot-card-name">{s.name}</div>
                <div className="slot-card-meta">
                  Open: <span>{s.open}</span><br/>
                  Close: <span>{s.close}</span><br/>
                  Normal: <span>{s.normalDarshan}</span><br/>
                  VIP: <span>{s.vipDarshan}</span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}