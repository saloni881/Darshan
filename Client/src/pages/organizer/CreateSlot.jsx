import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function CreateSlot() {
  const [slots, setSlots] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:'', open:'', close:'', normalDarshan:'', vipDarshan:'', description:'' });
  const [err, setErr] = useState(''); const [msg, setMsg] = useState(''); const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSlots = () => api.get('/slots/my').then(r=>setSlots(r.data)).catch(console.error);
  useEffect(() => { fetchSlots(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setErr(''); setMsg(''); setLoading(true);
    try {
      await api.post('/slots', form);
      setMsg('Darshan created successfully!');
      setForm({ name:'', open:'', close:'', normalDarshan:'', vipDarshan:'', description:'' });
      setShowForm(false);
      fetchSlots();
    } catch (er) { setErr(er.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this darshan slot?')) return;
    await api.delete(`/slots/${id}`);
    fetchSlots();
  };

  return (
    <div className="page-wrap">
      <div className="flex-between mb-3">
        <h2 className="page-header" style={{margin:0}}>My Darshans</h2>
        <button className="btn btn-teal btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Darshan'}
        </button>
      </div>

      {/* Existing darshan cards */}
      {slots.length === 0
        ? <div className="empty mb-3">No darshan slots yet. Click "Create Darshan" to add one.</div>
        : (
          <div className="darshan-cards mb-3">
            {slots.map(s => (
              <div key={s._id} className="darshan-card">
                <div className="darshan-card-name">Darshan Name: {s.name}</div>
                <div className="darshan-meta">
                  Open: <span>{s.open}</span><br/>
                  Close: <span>{s.close}</span><br/>
                  Normal Darshan: <span>{s.normalDarshan}</span><br/>
                  Vip Darshan: <span>{s.vipDarshan}</span><br/>
                  Description: <span>{s.description || '—'}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="btn btn-red btn-sm" onClick={() => del(s._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )
      }

      {/* Create form */}
      {showForm && (
        <div className="form-card">
          <div className="form-card-title">Create Darshan</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Darshan Name</label>
              <input className="form-input" placeholder="e.g. Bangru-Darshan" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Open</label>
                <input className="form-input" placeholder="06:00 AM" value={form.open} onChange={e=>setForm({...form,open:e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Close</label>
                <input className="form-input" placeholder="01:00 PM" value={form.close} onChange={e=>setForm({...form,close:e.target.value})} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Normal Darshan</label>
                <input className="form-input" type="number" min="1" value={form.normalDarshan} onChange={e=>setForm({...form,normalDarshan:e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Vip Darshan</label>
                <input className="form-input" type="number" min="1" value={form.vipDarshan} onChange={e=>setForm({...form,vipDarshan:e.target.value})} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            </div>
            {err && <p className="error-msg">{err}</p>}
            {msg && <p style={{color:'#b7f5ee',fontSize:'12px',fontWeight:'700',marginTop:'5px'}}>{msg}</p>}
            <button className="btn btn-orange btn-full mt-3" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}