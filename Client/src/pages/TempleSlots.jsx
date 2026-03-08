import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const FB = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/bf/b9/dd/somnath-temple-main-entrance.jpg?w=1400&h=1400&s=1https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80';

export default function TempleSlots() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selSlot, setSelSlot] = useState(null);
  const [form, setForm] = useState({ bookingDate:'', darshnaName:'', noOfSlots:1, type:'Normal' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    api.get(`/temples/${id}`).then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const book = async (e) => {
    e.preventDefault(); setErr(''); setMsg('');
    try {
      await api.post('/bookings', { templeId:id, slotId:selSlot._id, ...form });
      setMsg('Booking Confirmed! 🎉');
      setTimeout(() => { setModal(false); navigate('/my-bookings'); }, 1500);
    } catch (er) { setErr(er.response?.data?.message || 'Booking failed'); }
  };

  if (loading) return <div className="loading">Loading temple...</div>;
  if (!data)   return <div className="empty">Temple not found.</div>;

  const { temple, slots } = data;

  return (
    <div className="detail-wrap">
      {/* Temple Info */}
      <div className="detail-header">
        <img className="detail-img" src={temple.image || FB} alt={temple.name} onError={e => e.target.src=FB} />
        <div className="detail-info">
          <div className="detail-name">{temple.name}</div>
          <div className="detail-meta">
            Open: <span>{slots[0]?.open || 'N/A'}</span><br/>
            Close: <span>{slots[0]?.close || 'N/A'}</span><br/>
            Location: <span>{temple.location}</span><br/>
            Organizer: <span>{temple.organizer?.username}</span><br/>
            Address: <span>{temple.location}</span>
          </div>
        </div>
      </div>

      <p style={{fontSize:'13.5px',color:'#555',lineHeight:'1.7'}}>{temple.description}</p>

      {/* Darshans */}
      <div className="detail-section-title">Darshans</div>
      {slots.length === 0
        ? <div className="empty">No darshan slots available yet.</div>
        : (
          <div className="slot-cards">
            {slots.map(slot => (
              <div key={slot._id} className="slot-card">
                <div className="slot-card-name">{slot.name}</div>
                <div className="slot-card-meta">
                  Open: <span>{slot.open}</span><br/>
                  Close: <span>{slot.close}</span><br/>
                  Normal Darshan: <span>{slot.normalDarshan}</span><br/>
                  Vip Darshan: <span>{slot.vipDarshan}</span><br/>
                  {slot.description && <><br/><span style={{color:'#555'}}>{slot.description}</span></>}
                </div>
                {user?.role === 'user' && (
                  <button className="btn btn-teal btn-sm mt-2"
                    onClick={() => { setSelSlot(slot); setModal(true); setMsg(''); setErr(''); }}>
                    Book Now
                  </button>
                )}
                {!user && (
                  <button className="btn btn-outline btn-sm mt-2" onClick={() => navigate('/login')}>Login to Book</button>
                )}
              </div>
            ))}
          </div>
        )
      }

      {/* Booking Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            <div className="modal-title">Book — {selSlot?.name}</div>
            <form onSubmit={book}>
              <div className="form-group">
                <label className="form-label">Booking Date</label>
                <input className="form-input" type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.bookingDate} onChange={e => setForm({...form, bookingDate:e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Darshan Name</label>
                <input className="form-input" placeholder="Your name"
                  value={form.darshnaName} onChange={e => setForm({...form, darshnaName:e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">No. of Slots</label>
                  <input className="form-input" type="number" min="1" max="10"
                    value={form.noOfSlots} onChange={e => setForm({...form, noOfSlots:e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                    <option value="Normal">Normal</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              </div>
              {err && <p className="error-msg">{err}</p>}
              {msg && <p className="success-msg">{msg}</p>}
              <button className="btn btn-teal btn-full mt-3">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}