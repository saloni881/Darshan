import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

export default function UpdateTemple() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', location:'', description:'', image:'', openTime:'', closeTime:'' });
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(''); const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/temples/my').then(r => {
      const t = r.data.temple;
      setForm({ name:t.name, location:t.location, description:t.description, image:t.image||'', openTime:t.openTime||'', closeTime:t.closeTime||'' });
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setErr(''); setMsg(''); setLoading(true);
    try {
      await api.put(`/temples/${id}`, form);
      setMsg('Temple updated successfully!');
      setTimeout(() => navigate('/organizer/temple'), 1200);
    } catch (er) { setErr(er.response?.data?.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-wrap">
      <div className="form-card">
        <div className="form-card-title">Update Temple</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Temple Name</label>
            <input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Open Time</label>
              <input className="form-input" placeholder="06:00 AM" value={form.openTime} onChange={e=>setForm({...form,openTime:e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Close Time</label>
              <input className="form-input" placeholder="01:30 PM" value={form.closeTime} onChange={e=>setForm({...form,closeTime:e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Location / Address</label>
            <input className="form-input" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Temple Image URL</label>
            <input className="form-input" placeholder="https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
          </div>
          {err && <p className="error-msg">{err}</p>}
          {msg && <p style={{color:'#b7f5ee',fontSize:'12px',fontWeight:'700',marginTop:'5px'}}>{msg}</p>}
          <button className="btn btn-orange btn-full mt-3" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
}