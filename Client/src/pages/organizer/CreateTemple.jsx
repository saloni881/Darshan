import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function CreateTemple() {
  const [form, setForm] = useState({ name:'', location:'', description:'', image:'' });
  const [err, setErr] = useState(''); const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setErr(''); setLoading(true);
    try {
      await api.post('/temples', form);
      navigate('/organizer/temple');
    } catch (er) { setErr(er.response?.data?.message || 'Failed to create temple'); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-wrap">
      <div className="form-card">
        <div className="form-card-title">Create Temple</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Temple Name</label>
            <input className="form-input" placeholder="e.g. Tirupati Balaji" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Location / Address</label>
            <input className="form-input" placeholder="City, State, Country" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required />
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
          <button className="btn btn-orange btn-full mt-3" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Temple'}
          </button>
        </form>
      </div>
    </div>
  );
}