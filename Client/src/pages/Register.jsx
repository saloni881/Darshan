import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username:'', email:'', password:'', role:'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const data = await register(form.username, form.email, form.password, form.role);
      if (data.role === 'organizer') navigate('/organizer/dashboard');
      else if (data.role === 'admin') navigate('/admin/dashboard');
      else navigate('/temples');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-box auth-box-single">
        <div className="auth-form-panel">
          <div className="auth-logo">🛕</div>
          <div className="auth-title">Create Account</div>
          <div className="auth-subtitle">Join thousands of devotees</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" placeholder="Enter username"
                value={form.username} onChange={e => setForm({...form, username:e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="Enter email"
                value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Create password"
                value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Register As</label>
              <select className="form-select" value={form.role} onChange={e => setForm({...form, role:e.target.value})}>
                <option value="user">User (Devotee)</option>
                <option value="organizer">Organizer (Temple Admin)</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button className="btn btn-orange btn-full mt-3" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="auth-switch mt-3">
            Already have an account? <a onClick={() => navigate('/login')}>Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
}